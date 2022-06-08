import { React, useState } from 'react'
import postService from '../services/posts'

import SuccessNotification from './SuccessNotification'
import ErrorNotification from './ErrorNotification'

const Post = ({ post }) => {
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  // const [showForm, setShowForm] = useState(false)
  // const [newPostHeader, setNewPostHeader] = useState('')
  // const [newPostContent, setNewPostContent] = useState('')
  // const [posts, setPosts] = useState([])

  // const handlePostHeaderChange = (event) => {
  //   setNewPostHeader(event.target.value)
  // }

  // const handlePostContentChange = (event) => {
  //   setNewPostContent(event.target.value)
  // }

  // const editPost = (event) => {
  //   event.preventDefault()
  //   const postObject = {
  //     postHeader: newPostHeader,
  //     postContent: newPostContent,
  //   }

  //   postService
  //     .update(postObject)
  //     .then((returnedPost) => {
  //       setPosts(posts.concat(returnedPost))
  //       setNewPostHeader('')
  //       setNewPostContent('')
  //       setSuccessMessage(`Post was edited successfully!`)
  //       setTimeout(() => {
  //         setSuccessMessage(null)
  //         window.location.reload()
  //       }, 5000)
  //     })
  //     .catch((error) => {
  //       setErrorMessage(`${error.response.data.error}`)
  //       setTimeout(() => {
  //         setErrorMessage(null)
  //       }, 5000)
  //     })
  // }

  return (
    <div className="post">
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      <p className="postDate">{post.postDate}</p>
      <h3 className="postHeader">{post.postHeader}</h3>
      <p className="postContent">{post.postContent}</p>

      {/*<button onClick={() => setShowForm(!showForm)}>Edit</button>

       <div className={showForm ? null : 'hidden'}>
        <form onSubmit={editPost} style={{ marginTop: '15px' }}>
          {/* header */}
      {/* <label>
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
      {/* <label>
            Content:
            <br />
            <textarea
              style={{ width: '95%', height: '100px', margin: '5px' }}
              value={newPostContent}
              onChange={handlePostContentChange}
            />
          </label>

          {/* sending button */}
      {/* <button type="submit">Send post</button>
        </form>
      </div> */}

      <button
        onClick={() =>
          postService
            .deletePost(post.id)
            .then(
              setSuccessMessage(`Post was deleted successfully!`),
              setTimeout(() => {
                setSuccessMessage(null)
                window.location.reload()
              }, 2000)
            )
            .catch((error) => {
              setErrorMessage(`${error.response.data.error}`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            })
        }
      >
        Delete
      </button>
    </div>
  )
}

export default Post
