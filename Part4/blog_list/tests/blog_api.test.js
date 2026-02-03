const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper= require('./test_helper')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObject = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObject.map(blog => blog.save())

  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct number of blogs is returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('id property is named correctly', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach((blog) => {
    assert.ok(blog.id)
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 1
  }

  const response = await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
  const BlogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(BlogsAtEnd.length, helper.initialBlogs.length + 1)
  assert.strictEqual(response.body.title, newBlog.title)
  assert.strictEqual(response.body.author, newBlog.author)
  assert.strictEqual(response.body.url, newBlog.url)
  assert.strictEqual(response.body.likes, newBlog.likes)
})

test('if likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'Blog without likes',
    author: 'Author',
    url: 'http://blogwithoutlikes.com'
  }

  const response = await api.post('/api/blogs').send(newBlog).expect(201)

  assert.strictEqual(response.body.likes, 0)
})

test('blog without title or url results in bad request', async () => {
  const newBlog1 = {
    author: 'Author',
    likes: 2
  }

  const newBlog2 = {
    title: 'Title Only',
    author: 'Author',
    likes: 4
  }

  const newBlog3 = {
    author: 'Author',
    url: 'http://urlonly.com',
    likes: 3
  }

  await api.post('/api/blogs').send(newBlog1).expect(400)
  await api.post('/api/blogs').send(newBlog2).expect(400)
  await api.post('/api/blogs').send(newBlog3).expect(400)

  const BlogsAtEnd = await helper.blogsInDb()
  const response1 = await api.post('/api/blogs').send(newBlog1)
  const response2 = await api.post('/api/blogs').send(newBlog2)
  const response3 = await api.post('/api/blogs').send(newBlog3)
  assert.strictEqual(response1.status, 400)
  assert.strictEqual(response2.status, 400)
  assert.strictEqual(response3.status, 400)
  assert.strictEqual(BlogsAtEnd.length, helper.initialBlogs.length)
})

after(async () => {
  await mongoose.connection.close()
})