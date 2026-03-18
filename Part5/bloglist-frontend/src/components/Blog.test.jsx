import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

test('renders title and author, but not url or likes by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Full Stack Open',
    url: 'https://fullstackopen.com/en/part5',
    likes: 10,
    user: {
      name: 'Test User'
    }
  }

  render(<Blog blog={blog} setBlogs={() => {}} />)

  const titleElement = screen.getByText('Component testing is done with react-testing-library', { exact: false })
  const authorElement = screen.getByText('Full Stack Open', { exact: false })
  const urlElement = screen.queryByText('https://fullstackopen.com/en/part5')
  const likesElement = screen.queryByText('likes 10')

  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()
  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})

test('renders url and likes when the view button is clicked', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Full Stack Open',
    url: 'https://fullstackopen.com/en/part5',
    likes: 10,
    user: {
      name: 'Test User'
    }
  }

  render(<Blog blog={blog} setBlogs={() => {}} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(screen.getByText('https://fullstackopen.com/en/part5')).toBeDefined()
  expect(screen.getByText('likes 10')).toBeDefined()
})