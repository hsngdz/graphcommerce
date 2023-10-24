import { gql } from '@apollo/client'
import { createRecursiveIntrospectionQuery } from './createRecursiveIntrospectionQuery'

export const fetchGraphQLInterface = (client) => {
  const introspectionQuery = createRecursiveIntrospectionQuery('ProductInterface', 3)

  return client.query({
    query: gql`
        query getSchema {
          ${introspectionQuery}
        }
      `,
  })
}
