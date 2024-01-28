import React from 'react'
import { render, screen } from '@testing-library/react'
import { IntlProvider } from 'react-intl'
import App from './App'
import en from './locales/en.json'

test('renders calcaultor', () => {
  const useIntlProvider = (component: React.ReactNode): ReturnType<typeof render> => {
    return render(
      <IntlProvider locale="en" messages={en}>
      {component}
      </IntlProvider>
    )
  }
  useIntlProvider(<App />)
  expect(screen.getByText(/Calculate Delivery Price/)).toBeInTheDocument()
})
