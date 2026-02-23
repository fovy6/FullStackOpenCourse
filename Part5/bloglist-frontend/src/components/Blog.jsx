import { useState } from 'react'

const Blog = ({ blog }) => {
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
  

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}&nbsp;
      <span style={hideWhenVisible}>
          <button onClick={() => setBlogDetailsVisible(true)}>view</button>
      </span>
        <span style={showWhenVisible}>
          <button onClick={() => setBlogDetailsVisible(false)}>hide</button>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button>like</button></p>
          <p>{blog.user.name}</p>
        </span>
    </div>  
  )
}

export default Blog