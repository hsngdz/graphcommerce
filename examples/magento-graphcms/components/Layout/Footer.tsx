import { Image } from '@graphcommerce/image'
import { StoreSwitcherButton } from '@graphcommerce/magento-store'
import { Footer as FooterBase } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Button, IconButton, Link } from '@mui/material'
import PageLink from 'next/link'
import { FooterQueryFragment } from './FooterQueryFragment.gql'

export type FooterProps = FooterQueryFragment

export function Footer(props: FooterProps) {
  const { footer } = props

  return (
    <FooterBase
      socialLinks={
        <>
          {footer?.socialLinks?.map((link) => (
            <PageLink key={link.title} href={link.url} passHref>
              <IconButton
                color='inherit'
                size='small'
                disableRipple
                disableFocusRipple
                edge='start'
              >
                {link.asset ? (
                  <Image src={link.asset.url} width={24} height={24} alt={link.title} />
                ) : (
                  link.title
                )}
              </IconButton>
            </PageLink>
          ))}
        </>
      }
      storeSwitcher={<StoreSwitcherButton />}
      customerService={
        <PageLink href='/service' passHref>
          <Button variant='pill'>
            <Trans>Customer Service</Trans>
          </Button>
        </PageLink>
      }
      copyright={
        <>
          <span>{footer?.copyright}</span>
          {footer?.legalLinks?.map((link) => (
            <PageLink key={link.title} href={link.url} passHref>
              <Link color='textPrimary' underline='always'>
                {link.title}
              </Link>
            </PageLink>
          ))}
        </>
      }
    />
  )
}
