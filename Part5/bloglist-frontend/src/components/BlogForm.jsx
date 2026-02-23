import { useState } from 'react'
import Togglable from './Togglable'

const BlogForm = ({
    blogService, 
    setBlogs, 
    setAlertMessage
  }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()
    
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    await blogService.create(blogObject)
    setBlogs(await blogService.getAll())
    setAlertMessage(`a new blog ${title} by ${author} added`)
    setTimeout(() => {
      setAlertMessage(null)
    }, 5000)
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  
  return (
  <div>
    <Togglable buttonLabel="create new blog" cancelLabel="cancel">
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          /><br />
          author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          /><br />
          url:
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
      <button type="submit">create</button>
    </form>
    </Togglable>
  </div>
  )
}

export default BlogForm