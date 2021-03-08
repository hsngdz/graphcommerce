// Do not edit this file: autogenerated by graphql-code-generator
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as Types from '../../generated/types'

export const RowProductReviewsFragmentDoc: DocumentNode<RowProductReviewsFragment, unknown> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'RowProductReviews' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'RowProductReviews' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'title' } }],
      },
    },
  ],
}
export type RowProductReviewsFragment = Pick<Types.RowProductReviews, 'title'>