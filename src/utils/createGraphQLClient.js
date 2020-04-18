import ApolloClient from 'apollo-boost'

const createGraphQLClient = (token) =>
    new ApolloClient({
        uri: process.env.REACT_APP_GRAPHQL_API,
        request: (operation) => {
            operation.setContext({
                headers: {
                    authorization: token ? token : ''
                }
            })
        },
        connectToDevTools: true
    })

export default createGraphQLClient
