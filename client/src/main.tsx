import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from './store/store.ts'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'
import { client } from './graphql/apolloClient.ts'
import { ApolloProvider } from '@apollo/client/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
    <Provider store={store}>
    <App />
    
    </Provider>
    </ApolloProvider>
  </StrictMode>,
)
