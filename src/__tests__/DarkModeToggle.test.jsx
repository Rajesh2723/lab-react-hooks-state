import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import DarkModeToggle from '../components/DarkModeToggle'
import '@testing-library/jest-dom'

describe('DarkModeToggle Component', () => {
  test('renders button with initial dark mode text', () => {
    render(<DarkModeToggle darkMode={false} onToggle={() => {}} />)
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Toggle Dark Mode')
  })

  test('renders button with light mode text when darkMode is true', () => {
    render(<DarkModeToggle darkMode={true} onToggle={() => {}} />)
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Toggle Light Mode')
  })

  test('calls onToggle when button is clicked', () => {
    const mockOnToggle = jest.fn()
    render(<DarkModeToggle darkMode={false} onToggle={mockOnToggle} />)
    const button = screen.getByRole('button')

    fireEvent.click(button)
    expect(mockOnToggle).toHaveBeenCalledTimes(1)
  })

  test('button is clickable', () => {
    const mockOnToggle = jest.fn()
    render(<DarkModeToggle darkMode={false} onToggle={mockOnToggle} />)
    const button = screen.getByRole('button')

    expect(button).not.toBeDisabled()
  })
})
