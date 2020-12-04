// Do not edit this file: autogenerated by graphql-code-generator
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as Types from '@reachdigital/magento-graphql'

export const CustomerAddressFormDocument: DocumentNode<
  CustomerAddressFormMutation,
  CustomerAddressFormMutationVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CustomerAddressForm' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'cartId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'addressId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'setShippingAddressesOnCart' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'cart_id' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'cartId' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'shipping_addresses' },
                      value: {
                        kind: 'ListValue',
                        values: [
                          {
                            kind: 'ObjectValue',
                            fields: [
                              {
                                kind: 'ObjectField',
                                name: { kind: 'Name', value: 'customer_address_id' },
                                value: {
                                  kind: 'Variable',
                                  name: { kind: 'Name', value: 'addressId' },
                                },
                              },
                            ],
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'cart' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'total_quantity' } },
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
export type CustomerAddressFormMutationVariables = Types.Exact<{
  cartId: Types.Scalars['String']
  addressId: Types.Scalars['Int']
}>

export type CustomerAddressFormMutation = {
  setShippingAddressesOnCart?: Types.Maybe<{ cart: Pick<Types.Cart, 'total_quantity'> }>
}
