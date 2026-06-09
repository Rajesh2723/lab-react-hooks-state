import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ProductCard from '../components/ProductCard'
import '@testing-library/jest-dom'

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    name: 'Apple',
    price: '$1.00',
    category: 'Fruits',
    inStock: true,
  }

  const mockOnAddToCart = jest.fn()

  beforeEach(() => {
    mockOnAddToCart.mockClear()
  })

  test('renders product name', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />)
    expect(screen.getByText('Apple')).toBeInTheDocument()
  })

  test('renders product price', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />)
    expect(screen.getByText(/price: \$1.00/i)).toBeInTheDocument()
  })

  test('renders in stock status for available products', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />)
    expect(screen.getByText(/status: in stock/i)).toBeInTheDocument()
  })

  test('renders out of stock status for unavailable products', () => {
    const outOfStockProduct = { ...mockProduct, inStock: false }
    render(
      <ProductCard product={outOfStockProduct} onAddToCart={mockOnAddToCart} />
    )
    expect(screen.getByText(/status: out of stock/i)).toBeInTheDocument()
  })

  test('renders Add to Cart button', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />)
    const button = screen.getByRole('button', { name: /add to cart/i })
    expect(button).toBeInTheDocument()
  })

  test('button has correct test id', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />)
    const button = screen.getByTestId('product-1')
    expect(button).toBeInTheDocument()
  })

  test('calls onAddToCart with product when button is clicked', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />)
    const button = screen.getByRole('button', { name: /add to cart/i })

    fireEvent.click(button)

    expect(mockOnAddToCart).toHaveBeenCalledTimes(1)
    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct)
  })

  test('button can be clicked multiple times', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />)
    const button = screen.getByRole('button', { name: /add to cart/i })

    fireEvent.click(button)
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockOnAddToCart).toHaveBeenCalledTimes(3)
  })
})
