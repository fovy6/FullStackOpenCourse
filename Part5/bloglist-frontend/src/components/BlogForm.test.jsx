import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

vi.mock('../services/blogs')

test('BlogForm calls the event handler it received as props with the right details when a new blog is created', async () => {
  const mockSetBlogs = vi.fn()
  const mockSetAlertMessage = vi.fn()

  render(<BlogForm blogService={blogService} setBlogs={mockSetBlogs} setAlertMessage={mockSetAlertMessage} />)

  const user = userEvent.setup()
  const createBlogButton = screen.getByText('create new blog')
  await user.click(createBlogButton)

  const titleInput = screen.getByLabelText('title:')
  const authorInput = screen.getByLabelText('author:')
  const urlInput = screen.getByLabelText('url:')

  await user.type(titleInput, 'Testing a form')
  await user.type(authorInput, 'Test Author')
  await user.type(urlInput, 'http://testurl.com')

  const createButton = screen.getByText('create')
  await user.click(createButton)

  expect(blogService.create).toHaveBeenCalledWith({
    title: 'Testing a form',
    author: 'Test Author',
    url: 'http://testurl.com'
  })
  expect(mockSetBlogs).toHaveBeenCalledTimes(1)
})