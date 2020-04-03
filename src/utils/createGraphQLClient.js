import ApolloClient from 'apollo-boost'

const createGraphQLClient = () =>
    new ApolloClient({
        uri: process.env.REACT_APP_GRAPHQL_API,
        request: operation => {
            const token = localStorage.getItem('token')
            operation.setContext({
                headers: {
                    authorization: token ? token : ''
                }
            })
        },
        connectToDevTools: true
    })

export default createGraphQLClient
