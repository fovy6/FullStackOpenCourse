const { test, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct number of blogs is returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 2)
})

test('id property is named correctly', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach((blog) => {
    assert.ok(blog.id)
  })
})

test('a valid blog can be added', async () => {
  const numberOfBlogsAtStart = (await api.get('/api/blogs')).body.length

  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 1
  }

  const response = await api.post('/api/blogs').send(newBlog).expect(201)
  const numberOfBlogsAtEnd = (await api.get('/api/blogs')).body.length

  assert.strictEqual(numberOfBlogsAtEnd, numberOfBlogsAtStart + 1)
  assert.strictEqual(response.body.title, newBlog.title)
  assert.strictEqual(response.body.author, newBlog.author)
  assert.strictEqual(response.body.url, newBlog.url)
  assert.strictEqual(response.body.likes, newBlog.likes)
})

after(async () => {
  await mongoose.connection.close()
})