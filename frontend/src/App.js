import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Footer from './components/Footer'
import Header from './components/Header'
import ErrorNotification from './components/ErrorNotification'
import Post from './components/Post'
import SuccessNotification from './components/SuccessNotification'

import postService from './services/posts'

const App = () => {
  const { i18n } = useTranslation()
  const [posts, setPosts] = useState([])
  const [newPostHeader, setNewPostHeader] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    console.log('All systems are working normally')
    postService.getAll().then((initialPosts) => {
      setPosts(initialPosts)
    })
  }, [])
  console.log('Rendered', posts.length, 'posts in 4 different languages')

  const addPost = (event) => {
    event.preventDefault()
    const postObject = {
      postDate: new Date().toISOString(),
      postHeader: newPostHeader,
      postContent: newPostContent,
      id: posts.length + 1,
    }

    postService
      .create(postObject)
      .then((returnedPost) => {
        setPosts(posts.concat(returnedPost))
        setNewPostHeader('')
        setNewPostContent('')
        setSuccessMessage(`Post was added successfully!`)
        setTimeout(() => {
          setSuccessMessage(null)
          window.location.reload()
        }, 5000)
      })
      .catch((error) => {
        setErrorMessage(`${error.response.data.error}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const makeSearch = (event) => {
    event.preventDefault()
    console.log(posts.filter((post) => post.postContent.includes(search)))
  }

  let resultOfSearch = posts.filter((post) => post.postContent.includes(search))

  const handlePostHeaderChange = (event) => {
    setNewPostHeader(event.target.value)
  }

  const handlePostContentChange = (event) => {
    setNewPostContent(event.target.value)
  }

  const handleOnclick = (e) => {
    e.preventDefault()
    setLanguage(e.target.value)
    i18n.changeLanguage(e.target.value)
  }

  return (
    <div className="flex">
      <div>
        <Header lang={language} />
        <div className="buttons">
          <button value="en" onClick={handleOnclick}>
            English
          </button>
          <button value="pl" onClick={handleOnclick}>
            Polski
          </button>
          <button value="ua" onClick={handleOnclick}>
            Українська
          </button>
          <button value="ru" onClick={handleOnclick}>
            Русский
          </button>
        </div>
      </div>

      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />

      {/* searching div */}
      <div>
        <h5 style={{ margin: '5px' }}>Searching</h5>
        <form
          onSubmit={makeSearch}
          style={{ marginLeft: '5px', marginBottom: '5px' }}
        >
          <input value={search} onChange={handleSearchChange} />
        </form>
      </div>

      {/* posts div */}
      <div className="flex-inside">
        {resultOfSearch.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>

      {/* new post form div */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setShowForm(!showForm)}>Add new post</button>

        {/* form */}
        <div className={showForm ? null : 'hidden'}>
          <form onSubmit={addPost} style={{ marginTop: '15px' }}>
            {/* header */}
            <label>
              Header:
              <br />
              <input
                value={newPostHeader}
                onChange={handlePostHeaderChange}
                style={{ margin: '5px' }}
              />
            </label>
            <br />

            {/* content */}
            <label>
              Content:
              <br />
              <textarea
                style={{ width: '95%', height: '100px', margin: '5px' }}
                value={newPostContent}
                onChange={handlePostContentChange}
              />
            </label>

            {/* sending button */}
            <button type="submit">Send post</button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default App
