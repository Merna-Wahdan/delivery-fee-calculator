import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { IntlProvider } from 'react-intl'
import en from './locales/en.json'
import reactAxe from '@axe-core/react'
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

if (process.env.NODE_ENV !== 'production') {
  const axe = reactAxe
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  axe(React, ReactDOM, 1000)
}
