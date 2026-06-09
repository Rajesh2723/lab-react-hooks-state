import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders successfully', () => {
    render(<App />);
    expect(document.body).toBeTruthy();
  });
});