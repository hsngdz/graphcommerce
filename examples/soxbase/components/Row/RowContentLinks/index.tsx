import { Link } from '@material-ui/core'
import { ContentLinks } from '@reachdigital/next-ui'
import PageLink from 'next/link'
import React from 'react'
import { RowContentLinksFragment } from './RowContentLinks.gql'

export default function RowContentLinks(props: RowContentLinksFragment) {
  const { title, contentLinks } = props

  return (
    <ContentLinks title={title}>
      {contentLinks.map((contentLink) => (
        <PageLink href={contentLink.url} key={contentLink.url} passHref>
          <Link key={contentLink.url} href={contentLink.url} variant='body1' color='inherit'>
            {contentLink.title}
          </Link>
        </PageLink>
      ))}
    </ContentLinks>
  )
}