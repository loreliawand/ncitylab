import { React, useState } from 'react'
import postService from '../services/posts'

import SuccessNotification from './SuccessNotification'
import ErrorNotification from './ErrorNotification'

const Post = ({ post }) => {
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  return (
    <div className="post">
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      <p className="postDate">{post.postDate}</p>
      <h3 className="postHeader">{post.postHeader}</h3>
      <p className="postContent">{post.postContent}</p>
      {/* not working for now */}
      <button
        onClick={() =>
          postService
            .update(post.id)
            .then(
              setSuccessMessage(`Post was edited successfully!`),
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
        Edit
      </button>
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
