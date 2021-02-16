import { Container, NoSsr } from '@material-ui/core'
import { ArrowForwardIos } from '@material-ui/icons'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import CheckoutStepper from '@reachdigital/magento-cart/cart/CheckoutStepper'
import {
  CountryRegionsDocument,
  CountryRegionsQuery,
} from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import EmailForm from '@reachdigital/magento-cart/email/EmailForm'
import ShippingMethodForm from '@reachdigital/magento-cart/shipping-method/ShippingMethodForm'
import ShippingAddressForm from '@reachdigital/magento-cart/shipping/ShippingAddressForm'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import OverlayUi from '@reachdigital/next-ui/AppShell/OverlayUi'
import Button from '@reachdigital/next-ui/Button'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import IconTitle from '@reachdigital/next-ui/IconTitle'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import Footer from '../../components/Footer'
import { FooterDocument, FooterQuery } from '../../components/Footer/Footer.gql'
import apolloClient from '../../lib/apolloClient'

type Props = CountryRegionsQuery & FooterQuery
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props>

function ShippingPage({ countries, footer }: Props) {
  const classes = useFormStyles()
  const router = useRouter()
  const addressForm = useRef<() => Promise<boolean>>()
  const methodForm = useRef<() => Promise<boolean>>()

  const forceSubmit = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      if (!addressForm.current || !methodForm.current) return
      await Promise.all([addressForm.current(), methodForm.current()])
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push('checkout/payment')
    })()
  }

  return (
    <OverlayUi
      variant='bottom'
      backFallbackHref='/cart'
      backFallbackTitle='Cart'
      title='Shipping'
      fullHeight
    >
      <PageMeta title='Checkout' metaDescription='Cart Items' metaRobots='NOINDEX, FOLLOW' />
      <Container maxWidth='md'>
        <CheckoutStepper steps={3} currentStep={2} />

        <IconTitle iconSrc='/icons/box.svg' title='Shipping' alt='box' />

        <NoSsr>
          <EmailForm />
          <ShippingAddressForm countries={countries} doSubmit={addressForm} />
          <ShippingMethodForm doSubmit={methodForm} />
          <div className={classes.actions}>
            <Button
              type='submit'
              color='secondary'
              variant='pill'
              size='large'
              onClick={forceSubmit}
            >
              Next <ArrowForwardIos fontSize='inherit' />
            </Button>
          </div>
        </NoSsr>
      </Container>
      <Footer footer={footer} />
    </OverlayUi>
  )
}

ShippingPage.Layout = PageLayout

registerRouteUi('/checkout', OverlayUi)

export default ShippingPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(localeToStore(locale))
  const staticClient = apolloClient(localeToStore(locale))

  const config = client.query({ query: StoreConfigDocument })
  const pageLayout = staticClient.query({ query: PageLayoutDocument })
  const countryRegions = staticClient.query({ query: CountryRegionsDocument })
  const footer = staticClient.query({ query: FooterDocument })

  await config
  return {
    props: {
      ...(await pageLayout).data,
      ...(await countryRegions).data,
      ...(await footer).data,
      apolloState: client.cache.extract(),
    },
  }
}
