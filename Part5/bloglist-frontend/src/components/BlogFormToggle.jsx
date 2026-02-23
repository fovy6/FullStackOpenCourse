import BlogForm from './BlogForm'

const BlogFormToggle = ({
    blogFormVisible,
    setBlogFormVisible,
    handleNewBlog,
    title,
    setTitle,
    author,
    setAuthor,
    url,
    setUrl
  }) => {

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenNotVisible = { display: blogFormVisible ? '' : 'none' }
  
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