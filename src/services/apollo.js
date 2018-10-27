import React from 'react'
import AWSAppSyncClient, {
  createAppSyncLink,
  createLinkWithCache,
} from 'aws-appsync'
import { ApolloLink } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
import { withClientState } from 'apollo-link-state'
import { defaults, resolvers } from '../graphQL'

const AppSyncConfig = {
  url:
    'https://6if7xu7voveppkkgfgkl6co2hi.appsync-api.eu-west-1.amazonaws.com/graphql',
  region: 'serverless.yml',
  auth: {
    type: 'API_KEY',
    apiKey: 'da2-63j2r5f3cndmlc4lts5c7mlq3e',
  },
  disableOffline: true,
}

const stateLink = createLinkWithCache(cache =>
  withClientState({
    cache,
    defaults,
    resolvers,
  }),
)

const middleWareLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    const omitTypename = (key, value) =>
      key === '__typename' ? undefined : value
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      omitTypename,
    )
  }
  return forward(operation)
})

const appSyncLink = createAppSyncLink(AppSyncConfig)
const link = ApolloLink.from([middleWareLink, stateLink, appSyncLink])
export const client = new AWSAppSyncClient(AppSyncConfig, { link })

export const withProvider = Component => {
  return class extends React.Component {
    static options = Component.options

    render() {
      return (
        <ApolloProvider client={client}>
          <Component {...this.props} />
        </ApolloProvider>
      )
    }
  }
}
