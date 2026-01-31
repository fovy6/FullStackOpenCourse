const dummy = (blogs) => (
  1
)

const totalLikes = (blogs) => {
    return blogs.length === 0 
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.length === 0
    ? []
    : blogs.reduce((max, blog) => {
      return blog.likes > max.likes 
      ? max = blog 
      : max = max
    })
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog
}