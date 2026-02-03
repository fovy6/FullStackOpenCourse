const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'First Blog',
    author: 'Author One',
    url: 'http://firstblog.com',
    likes: 10
  },
  {
    title: 'Second Blog',
    author: 'Author Two',
    url: 'http://secondblog.com',
    likes: 5
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs
}

module.exports = {
  initialBlogs,
  blogsInDb
}