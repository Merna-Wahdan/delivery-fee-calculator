import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { IntlProvider } from 'react-intl'
import en from './locales/en.json'

const messages = {
  en
}

const rootElement = document.getElementById('root')
if (rootElement != null) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
      <React.StrictMode>
        <ChakraProvider>
          <IntlProvider locale="en" messages={messages.en}>
            <App />
          </IntlProvider>
        </ChakraProvider>
      </React.StrictMode>
  )
}
