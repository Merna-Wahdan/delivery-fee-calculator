import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders calcaultor', () => {
  render(<App />);
  expect(screen.getByText(/Calculate Delivery Price/)).toBeInTheDocument();
});
