import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ProductList, { sampleProducts } from '../components/ProductList'

describe('ProductList Component', () => {
  const mockOnAddToCart = jest.fn()

  beforeEach(() => {
    mockOnAddToCart.mockClear()
  })

  test('renders product list heading', () => {
    render(<ProductList selectedCategory="all" onAddToCart={mockOnAddToCart} />)
    expect(screen.getByText(/available products/i)).toBeInTheDocument()
  })

  test('renders all products when category is "all"', () => {
    render(<ProductList selectedCategory="all" onAddToCart={mockOnAddToCart} />)

    sampleProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument()
    })
  })

  test('filters products by Fruits category', () => {
    render(
      <ProductList selectedCategory="Fruits" onAddToCart={mockOnAddToCart} />
    )

    expect(screen.getByText(/apple/i)).toBeInTheDocument()
    expect(screen.queryByText(/milk/i)).not.toBeInTheDocument()
  })

  test('filters products by Dairy category', () => {
    render(<ProductList selectedCategory="Dairy" onAddToCart={mockOnAddToCart} />)

    expect(screen.queryByText(/apple/i)).not.toBeInTheDocument()
    expect(screen.getByText(/milk/i)).toBeInTheDocument()
  })

  test('displays "No products available" when no products match filter', () => {
    render(
      <ProductList selectedCategory="NonExistent" onAddToCart={mockOnAddToCart} />
    )

    expect(screen.getByText(/no products available/i)).toBeInTheDocument()
  })

  test('renders Add to Cart buttons for each product', () => {
    render(<ProductList selectedCategory="all" onAddToCart={mockOnAddToCart} />)

    sampleProducts.forEach((product) => {
      expect(screen.getByTestId('product-' + product.id)).toBeInTheDocument()
    })
  })

  test('calls onAddToCart when product button is clicked', () => {
    render(<ProductList selectedCategory="all" onAddToCart={mockOnAddToCart} />)

    const appleBtn = screen.getByTestId(
      'product-' + sampleProducts.find((p) => p.name === 'Apple').id
    )
    fireEvent.click(appleBtn)

    expect(mockOnAddToCart).toHaveBeenCalledTimes(1)
    expect(mockOnAddToCart).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Apple' })
    )
  })
})
