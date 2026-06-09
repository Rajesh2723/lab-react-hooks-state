import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, beforeEach } from '@jest/globals'
import App from '../App'
import { sampleProducts } from '../components/ProductList'

describe('App Component', () => {
  describe('Dark Mode Toggle', () => {
    test('toggles dark mode on button click', () => {
      render(<App />)
      const toggleBtn = screen.getByRole('button', { name: /toggle/i })
      expect(toggleBtn).toBeInTheDocument()

      // Initial state should be "Toggle Dark Mode"
      expect(toggleBtn.textContent.toLowerCase()).toMatch(/dark/i)

      // Click to toggle to light mode
      fireEvent.click(toggleBtn)
      expect(toggleBtn.textContent.toLowerCase()).toMatch(/light/i)

      // Click again to toggle back to dark mode
      fireEvent.click(toggleBtn)
      expect(toggleBtn.textContent.toLowerCase()).toMatch(/dark/i)
    })

    test('button text changes from Dark to Light and vice versa', () => {
      render(<App />)
      const toggleBtn = screen.getByRole('button', { name: /toggle/i })

      expect(toggleBtn).toHaveTextContent('Toggle Dark Mode')

      fireEvent.click(toggleBtn)
      expect(toggleBtn).toHaveTextContent('Toggle Light Mode')

      fireEvent.click(toggleBtn)
      expect(toggleBtn).toHaveTextContent('Toggle Dark Mode')
    })
  })

  describe('Category Filtering', () => {
    test('filters products by category', () => {
      render(<App />)
      const dropdown = screen.getByRole('combobox')

      // Initially, all products should be visible
      expect(screen.getByText(/Apple/i)).toBeInTheDocument()
      expect(screen.getByText(/Milk/i)).toBeInTheDocument()

      // Filter by Fruits
      fireEvent.change(dropdown, { target: { value: 'Fruits' } })
      expect(screen.getByText(/Apple/i)).toBeInTheDocument()
      expect(screen.queryByText(/Milk/i)).not.toBeInTheDocument()

      // Filter by Dairy
      fireEvent.change(dropdown, { target: { value: 'Dairy' } })
      expect(screen.queryByText(/Apple/i)).not.toBeInTheDocument()
      expect(screen.getByText(/Milk/i)).toBeInTheDocument()

      // Show all
      fireEvent.change(dropdown, { target: { value: 'all' } })
      expect(screen.getByText(/Apple/i)).toBeInTheDocument()
      expect(screen.getByText(/Milk/i)).toBeInTheDocument()
    })

    test('displays message when no products match filter', () => {
      render(<App />)
      const dropdown = screen.getByRole('combobox')
      fireEvent.change(dropdown, { target: { value: 'NonExistent' } })

      expect(screen.getByText(/no products available/i)).toBeInTheDocument()
    })
  })

  describe('Add to Cart', () => {
    test('adds items to cart', () => {
      render(<App />)

      // Get the Apple product button
      const appleBtn = screen.getByTestId(
        'product-' + sampleProducts.find((i) => i.name === 'Apple').id
      )
      fireEvent.click(appleBtn)

      // Verify cart section exists and Apple is added
      expect(screen.getByText(/shopping cart/i)).toBeInTheDocument()
      expect(screen.getByText(/Apple is in your cart/i)).toBeInTheDocument()

      // Add Milk to cart
      const milkBtn = screen.getByTestId(
        'product-' + sampleProducts.find((i) => i.name === 'Milk').id
      )
      fireEvent.click(milkBtn)

      // Verify both items are in cart
      expect(screen.getByText(/shopping cart/i)).toBeInTheDocument()
      expect(screen.getByText(/Apple is in your cart/i)).toBeInTheDocument()
      expect(screen.getByText(/Milk is in your cart/i)).toBeInTheDocument()
    })

    test('adds multiple of same item to cart', () => {
      render(<App />)

      const appleBtn = screen.getByTestId(
        'product-' + sampleProducts.find((i) => i.name === 'Apple').id
      )

      // Add Apple twice
      fireEvent.click(appleBtn)
      fireEvent.click(appleBtn)

      // Should show two Apple items in cart
      const cartItems = screen.getAllByText(/Apple is in your cart/i)
      expect(cartItems).toHaveLength(2)
    })

    test('displays correct message format for cart items', () => {
      render(<App />)

      const appleBtn = screen.getByTestId(
        'product-' + sampleProducts.find((i) => i.name === 'Apple').id
      )
      fireEvent.click(appleBtn)

      // Check exact message format
      expect(screen.getByText('Apple is in your cart.')).toBeInTheDocument()
    })
  })

  describe('Component Rendering', () => {
    test('renders main heading', () => {
      render(<App />)
      expect(screen.getByText(/shopping app/i)).toBeInTheDocument()
    })

    test('renders welcome message', () => {
      render(<App />)
      expect(screen.getByText(/welcome/i)).toBeInTheDocument()
    })

    test('renders category filter dropdown', () => {
      render(<App />)
      const dropdown = screen.getByRole('combobox')
      expect(dropdown).toBeInTheDocument()
      expect(dropdown).toHaveValue('all')
    })

    test('renders product list heading', () => {
      render(<App />)
      expect(screen.getByText(/available products/i)).toBeInTheDocument()
    })

    test('renders shopping cart heading', () => {
      render(<App />)
      expect(screen.getByText(/shopping cart/i)).toBeInTheDocument()
    })
  })
})
