// Do not edit this file: autogenerated by graphql-code-generator
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as Types from '../../generated/types'

export const BlogListDocument: DocumentNode<BlogListQuery, BlogListQueryVariables> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'BlogList' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'currentUrl' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'BlogPosts' },
            name: { kind: 'Name', value: 'pages' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'url_starts_with' },
                      value: { kind: 'StringValue', value: 'blog', block: false },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'url_not_in' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'currentUrl' } },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: { kind: 'EnumValue', value: 'publishedAt_DESC' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'asset' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'height' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'mimeType' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'size' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
}
export type BlogListQueryVariables = Types.Exact<{
  currentUrl?: Types.Maybe<Array<Types.Scalars['String']>>
}>

export type BlogListQuery = {
  BlogPosts: Array<
    Pick<Types.Page, 'title' | 'url' | 'date'> & {
      asset?: Types.Maybe<Pick<Types.Asset, 'url' | 'width' | 'height' | 'mimeType' | 'size'>>
    }
  >
}
