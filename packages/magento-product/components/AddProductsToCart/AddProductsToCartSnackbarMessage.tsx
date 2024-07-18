import { ApolloError } from '@graphcommerce/graphql'
import { CartUserInputErrorType, CheckoutUserInputErrorCodes } from '@graphcommerce/graphql-mesh'
import { ApolloCartErrorSnackbar } from '@graphcommerce/magento-cart'
import {
  Button,
  ErrorSnackbar,
  ErrorSnackbarProps,
  IconSvg,
  ListFormat,
  MessageSnackbar,
  MessageSnackbarProps,
  iconChevronRight,
} from '@graphcommerce/next-ui'
import { Plural, Trans } from '@lingui/macro'

export type AddProductsToCartSnackbarMessageProps = {
  errorSnackbar?: Omit<ErrorSnackbarProps, 'open'>
  successSnackbar?: Omit<MessageSnackbarProps, 'open' | 'action'>
  error?: ApolloError
  userErrors?: { code: CartUserInputErrorType | CheckoutUserInputErrorCodes; message: string }[]
  showSuccess: boolean
  addedItems: string[]
}

export function AddProductsToCartSnackbarMessage(props: AddProductsToCartSnackbarMessageProps) {
  const { errorSnackbar, successSnackbar, error, userErrors, showSuccess, addedItems } = props

  const showErrorSnackbar = !!userErrors?.length

  return (
    <>
      {error && <ApolloCartErrorSnackbar error={error} />}

      {showErrorSnackbar && (
        <ErrorSnackbar variant='pill' severity='error' {...errorSnackbar} open={showErrorSnackbar}>
          <>{userErrors.map((e) => e?.message).join(', ')}</>
        </ErrorSnackbar>
      )}

      {showSuccess && (
        <MessageSnackbar
          variant='pill'
          severity='success'
          {...successSnackbar}
          open={showSuccess}
          action={
            <Button
              href='/cart'
              id='view-shopping-cart-button'
              size='medium'
              variant='pill'
              color='secondary'
              endIcon={<IconSvg src={iconChevronRight} />}
              sx={{ display: 'flex' }}
            >
              <Trans>View shopping cart</Trans>
            </Button>
          }
        >
          <Plural
            value={addedItems.length}
            one={
              <Trans>
                <ListFormat listStyle='long' type='conjunction'>
                  {addedItems.map((item) => item)}
                </ListFormat>{' '}
                has been added to your shopping cart
              </Trans>
            }
            two={
              <Trans>
                <ListFormat listStyle='long' type='conjunction'>
                  {addedItems.map((item) => item)}
                </ListFormat>{' '}
                have been added to your shopping cart!
              </Trans>
            }
            other={<Trans># products have been added to your shopping cart!</Trans>}
          />
        </MessageSnackbar>
      )}
    </>
  )
}
