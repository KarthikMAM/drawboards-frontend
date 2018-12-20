import React from 'react'
import ReactDOM from 'react-dom'
import AWSAppSyncClient from 'aws-appsync'
import { ApolloProvider } from 'react-apollo'
import { Rehydrated } from 'aws-appsync-react'

import './styles/index.scss'
import DrawboardsPage from './containers/DrawboardsPage'

const client = new AWSAppSyncClient({
  url: process.env.REACT_APP_GRAPHQL_URL,
  region: process.env.REACT_APP_AWS_REGION,
  auth: {
    type: 'API_KEY',
    apiKey: process.env.REACT_APP_API_KEY,
  },
})

ReactDOM.render((
  <ApolloProvider client={client}>
    <Rehydrated>
      <DrawboardsPage />
    </Rehydrated>
  </ApolloProvider>
), document.getElementById('root'))
