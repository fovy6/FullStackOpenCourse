import { render, screen } from '@testing-library/react'
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