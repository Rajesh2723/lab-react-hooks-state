import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, test, expect } from '@jest/globals'
import Cart from '../components/Cart'

describe('Cart Component', () => {
  test('renders cart heading', () => {
    render(<Cart cartItems={[]} />)
    expect(screen.getByText(/shopping cart/i)).toBeInTheDocument()
  })

  test('renders empty cart with no items', () => {
    render(<Cart cartItems={[]} />)
    const listItems = screen.queryAllByRole('listitem')
    expect(listItems).toHaveLength(0)
  })

  test('renders single item in cart', () => {
    const mockProduct = {
      id: 1,
      name: 'Apple',
      price: '$1.00',
      category: 'Fruits',
      inStock: true,
    }

    render(<Cart cartItems={[mockProduct]} />)
    expect(screen.getByText(/Apple is in your cart/i)).toBeInTheDocument()
  })

  test('renders multiple items in cart', () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Apple',
        price: '$1.00',
        category: 'Fruits',
        inStock: true,
      },
      {
        id: 2,
        name: 'Milk',
        price: '$2.50',
        category: 'Dairy',
        inStock: false,
      },
    ]

    render(<Cart cartItems={mockProducts} />)
    expect(screen.getByText(/Apple is in your cart/i)).toBeInTheDocument()
    expect(screen.getByText(/Milk is in your cart/i)).toBeInTheDocument()
  })

  test('renders correct message format for each item', () => {
    const mockProduct = {
      id: 1,
      name: 'Apple',
      price: '$1.00',
      category: 'Fruits',
      inStock: true,
    }

    render(<Cart cartItems={[mockProduct]} />)
    expect(screen.getByText('Apple is in your cart.')).toBeInTheDocument()
  })

  test('renders duplicate items if added multiple times', () => {
    const mockProduct = {
      id: 1,
      name: 'Apple',
      price: '$1.00',
      category: 'Fruits',
      inStock: true,
    }

    render(<Cart cartItems={[mockProduct, mockProduct, mockProduct]} />)
    const listItems = screen.getAllByText(/Apple is in your cart/i)
    expect(listItems).toHaveLength(3)
  })

  test('renders items in list items', () => {
    const mockProduct = {
      id: 1,
      name: 'Apple',
      price: '$1.00',
      category: 'Fruits',
      inStock: true,
    }

    render(<Cart cartItems={[mockProduct]} />)
    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(1)
  })
})
