import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import { ApolloLink } from 'apollo-link'

const JWT_EXPIRED = 'jwt expired'

const createGraphQLClient = (token, logout) => {
    const client = new ApolloClient({
        link: ApolloLink.from([
            setContext((_, { headers }) => {
                const token = localStorage.getItem('token')
                return {
                    headers: {
                        ...headers,
                        authorization: token ? token : ''
                    }
                }
            }),
            onError(({ graphQLErrors, networkError }) => {
                if (graphQLErrors)
                    graphQLErrors.forEach(({ message, locations, path }) => {
                        console.log(message)
                        if (message === JWT_EXPIRED) {
                            logout()
                        } else {
                            console.log('GraphQL Error: ' + message)
                        }
                    })

                if (networkError) {
                    console.log(`Network error: ${networkError}`)
                }
            }),
            new HttpLink({
                uri: process.env.REACT_APP_GRAPHQL_API,
                credentials: 'same-origin'
            })
        ]),
        cache: new InMemoryCache(),
        connectToDevTools: true
    })

    return client
}

export default createGraphQLClient
