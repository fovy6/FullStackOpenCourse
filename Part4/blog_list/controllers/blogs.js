const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1  })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'Unauthorized' })
  }
  if (body.likes === undefined) {
    body.likes = 0
  }
  if (body.title === undefined || body.url === undefined) {
    return response.status(400).end()
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  await savedBlog.populate('user', { username: 1, name: 1 })

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }
  if (blog.user.toString() !== request.user._id.toString()) {
    return response.status(401).json({ error: 'Unauthorized' })
  }
  const user = request.user

  await blog.deleteOne()
  user.blogs = user.blogs.filter(blogId => blogId.toString() !== request.params.id)
  await user.save()

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const id = request.params.id

  const blog = await Blog.findById(id)
  if (!blog) {
    response.statusMessage = 'Blog not found.'
    return response.status(404).end()
  } else {
    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes
  }

  const updatedBlog = await blog.save()
  response.json(updatedBlog)
})

module.exports = blogsRouter