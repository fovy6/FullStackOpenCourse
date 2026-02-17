const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper= require('./test_helper')
const app = require('../app')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
  let authToken

  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const password = 'sekret'
    const user = new User({ username: 'testuser', name: 'Test User', password: password })
    const savedUser = await user.save()

    const blogObjects = helper.initialBlogs.map(blog => new Blog({ ...blog, user: savedUser._id }))
    const savedBlogs = await Promise.all(blogObjects.map(blog => blog.save()))

    savedUser.blogs = savedBlogs.map(blog => blog._id)
    await savedUser.save()

    const userForToken = {
      username: savedUser.username,
      id: savedUser._id
    }
    authToken = `Bearer ${jwt.sign(userForToken, process.env.SECRET)}`
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

  describe('addition of a new blog', () => {
    test('is valid', async () => {
      const newBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://testblog.com',
        likes: 1
      }
      const response = await api
        .post('/api/blogs')
        .set('Authorization', authToken)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const BlogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(BlogsAtEnd.length, helper.initialBlogs.length + 1)
      assert.strictEqual(response.body.title, newBlog.title)
      assert.strictEqual(response.body.author, newBlog.author)
      assert.strictEqual(response.body.url, newBlog.url)
      assert.strictEqual(response.body.likes, newBlog.likes)
    })

    test('likes defaults to 0 if the likes property is missing', async () => {
      const newBlog = {
        title: 'Blog without likes',
        author: 'Author',
        url: 'http://blogwithoutlikes.com'
      }

      const response = await api
        .post('/api/blogs')
        .set('Authorization', authToken)
        .send(newBlog)
        .expect(201)

      assert.strictEqual(response.body.likes, 0)
    })

    test('is invalid without title or url', async () => {
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

      await api.post('/api/blogs').set('Authorization', authToken).send(newBlog1).expect(400)
      await api.post('/api/blogs').set('Authorization', authToken).send(newBlog2).expect(400)
      await api.post('/api/blogs').set('Authorization', authToken).send(newBlog3).expect(400)

      const BlogsAtEnd = await helper.blogsInDb()
      const response1 = await api.post('/api/blogs').set('Authorization', authToken).send(newBlog1)
      const response2 = await api.post('/api/blogs').set('Authorization', authToken).send(newBlog2)
      const response3 = await api.post('/api/blogs').set('Authorization', authToken).send(newBlog3)
      assert.strictEqual(response1.status, 400)
      assert.strictEqual(response2.status, 400)
      assert.strictEqual(response3.status, 400)
      assert.strictEqual(BlogsAtEnd.length, helper.initialBlogs.length)
    })

    test('fails with status code 401 if token is not provided', async () => {
      const newBlog = {
        title: 'Unauthorized Blog',
        author: 'Unauthorized Author',
        url: 'http://unauthorizedblog.com',
        likes: 5
      }

      const response = await api.post('/api/blogs').send(newBlog).expect(401)

      assert.strictEqual(response.body.error, 'Unauthorized')
      const BlogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(BlogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('a blog deletion', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const BlogsAtStart = await helper.blogsInDb()
      const blogToDelete = BlogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).set('Authorization', authToken).expect(204)

      const BlogsAtEnd = await helper.blogsInDb()
      const ids = BlogsAtEnd.map(blog => blog.id)
      assert(!ids.includes(blogToDelete.id))

      assert.strictEqual(BlogsAtEnd.length, helper.initialBlogs.length - 1)
    })
  })

  describe('updating a blog', () => {
    test('succeeds in updating the blog', async () => {
      const BlogsAtStart = await helper.blogsInDb()
      const blogToUpdate = BlogsAtStart[0]

      const updatedBlogData = {
        title: 'Updated Title',
        author: 'Updated Author',
        url: 'http://updatedurl.com',
        likes: 10
      }

      const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlogData).expect(200).expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.title, updatedBlogData.title)
      assert.strictEqual(response.body.author, updatedBlogData.author)
      assert.strictEqual(response.body.url, updatedBlogData.url)
      assert.strictEqual(response.body.likes, updatedBlogData.likes)
    })
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'newuser',
      name: 'New User',
      password: 'pw',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('password must be at least 3 characters long'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'newuser',
      name: 'New User',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('password must be at least 3 characters long'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ro',
      name: 'Short Username',
      password: 'validpassword',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('is shorter than the minimum allowed length'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})