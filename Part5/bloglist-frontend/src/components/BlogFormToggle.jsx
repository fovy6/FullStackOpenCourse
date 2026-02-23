import { useState } from 'react'
import BlogForm from './BlogForm'

const BlogFormToggle = ({ blogService, setBlogs, setAlertMessage }) => {

  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenNotVisible = { display: blogFormVisible ? '' : 'none' }

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
    <div style={hideWhenVisible}>
        <button onClick={() => setBlogFormVisible(true)}>create new blog</button>
    </div>
    <div style={showWhenNotVisible}>
        <BlogForm 
          handleNewBlog={handleNewBlog}
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
        />
        <button onClick={() => setBlogFormVisible(false)}>cancel</button><br /><br />
    </div>
    </div>
  )
}

export default BlogFormToggle