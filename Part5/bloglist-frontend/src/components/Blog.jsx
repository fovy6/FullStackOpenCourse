import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [blogDetailsVisible, setBlogDetailsVisible] = useState(false)

  const hideWhenVisible = { display: blogDetailsVisible ? 'none' : '' }
  const showWhenVisible = { display: blogDetailsVisible ? '' : 'none' }

  const handleLike = async (event) => {
    event.preventDefault()
    
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user.id,
      likes: blog.likes + 1,
    }

    await blogService.update(blog.id, blogObject)
    setBlogs(await blogService.getAll())
  }

  const handleDelete = async (event) => {
    event.preventDefault()

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      setBlogs(await blogService.getAll())
    }
  }  

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}&nbsp;
      <span style={hideWhenVisible}>
          <button onClick={() => setBlogDetailsVisible(true)}>view</button>
      </span>
        <span style={showWhenVisible}>
          <button onClick={() => setBlogDetailsVisible(false)}>hide</button>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
          <p>{blog.user.name}</p>
          {blog.author === blog.user.name && (
            <button onClick={handleDelete}>delete</button>
          )}
        </span>
    </div>  
  )
}

export default Blog