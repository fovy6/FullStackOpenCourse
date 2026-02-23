const blogForm = ({
    handleNewBlog,
    title,
    setTitle,
    author,
    setAuthor,
    url,
    setUrl
  }) => {
  
  return (
  <div>
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
  </div>
  )
}

export default blogForm