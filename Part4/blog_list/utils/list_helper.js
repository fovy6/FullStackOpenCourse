const _ = require('lodash');
const blog = require('../models/blog');

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

const mostBlogs = (blogs) => {
    const authorCounts = _.countBy(blogs, 'author')
    const maxAuthor = _.maxBy(_.keys(authorCounts), (author) => authorCounts[author])

    return blogs.length === 0
    ? undefined
    : {author: maxAuthor, blogs: authorCounts[maxAuthor]}
}

const mostLikes = (blogs) => {
    const totalLikesByAuthor = _.mapValues(_.groupBy(blogs, 'author'), (authorBlogs) => _.sumBy(authorBlogs, 'likes'))
    const maxAuthor = _.maxBy(_.keys(totalLikesByAuthor), (author) => totalLikesByAuthor[author])
    
    return blogs.length === 0
    ? undefined
    : {author: maxAuthor, likes: totalLikesByAuthor[maxAuthor]}
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}