import { PageOptions } from '@graphcommerce/framer-next-pages'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, Row, LayoutTitle, LayoutHeader } from '@graphcommerce/next-ui'
import { GetStaticPaths } from 'next'
import React from 'react'
import BlogList from '../../../components/Blog'
import BlogAuthor from '../../../components/Blog/BlogAuthor'
import BlogHeader from '../../../components/Blog/BlogHeader'
import {
  BlogListTaggedDocument,
  BlogListTaggedQuery,
} from '../../../components/Blog/BlogListTagged.gql'
import { BlogPostTaggedPathsDocument } from '../../../components/Blog/BlogPostTaggedPaths.gql'
import BlogTags from '../../../components/Blog/BlogTags'
import BlogTitle from '../../../components/Blog/BlogTitle'
import { DefaultPageDocument, DefaultPageQuery } from '../../../components/GraphQL/DefaultPage.gql'
import { LayoutFull, LayoutFullProps } from '../../../components/Layout'
import RowRenderer from '../../../components/Row/RowRenderer'
import { graphqlSsrClient, graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

export const config = { unstable_JsPreload: false }

type Props = DefaultPageQuery & BlogListTaggedQuery
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutFullProps, Props, RouteProps>

function BlogPage(props: Props) {
  const { pages, blogPosts } = props
  const page = pages[0]
  const title = page.title ?? ''

  return (
    <>
      <LayoutHeader floatingMd>
        <LayoutTitle size='small'>{title}</LayoutTitle>
      </LayoutHeader>
      <Row>
        <PageMeta title={title} metaDescription={title} canonical={page.url} />

        <BlogTitle title={`Tagged in: ${title}`} />

        {page.author ? <BlogAuthor author={page.author} date={page.date} /> : null}
        {page.asset ? <BlogHeader asset={page.asset} /> : null}
        <RowRenderer {...page} />
        <BlogTags relatedPages={page.relatedPages} />
      </Row>
      <BlogList blogPosts={blogPosts} />
    </>
  )
}

BlogPage.pageOptions = {
  Layout: LayoutFull,
} as PageOptions

export default BlogPage

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.VERCEL_ENV !== 'production') return { paths: [], fallback: 'blocking' }

  const responses = locales.map(async (locale) => {
    const staticClient = graphqlSsrClient(locale)
    const BlogPostPaths = staticClient.query({ query: BlogPostTaggedPathsDocument })
    const { pages } = (await BlogPostPaths).data
    return (
      pages.map((page) => ({
        params: { url: `${page?.url}`.replace('blog/tagged/', '') },
        locale,
      })) ?? []
    )
  })
  const paths = (await Promise.all(responses)).flat(1)
  return {
    paths: process.env.VERCEL_ENV !== 'production' ? paths.slice(0, 1) : paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetPageStaticProps = async ({ locale, params }) => {
  const urlKey = params?.url ?? '??'
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)
  const limit = 99
  const conf = client.query({ query: StoreConfigDocument })
  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: `blog/tagged/${urlKey}`,
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })

  const blogPosts = staticClient.query({
    query: BlogListTaggedDocument,
    variables: { currentUrl: [`blog/tagged/${urlKey}`], first: limit, tagged: params?.url },
  })
  if (!(await page).data.pages?.[0]) return { notFound: true }

  return {
    props: {
      ...(await page).data,
      ...(await blogPosts).data,
      up: { href: '/blog', title: 'Blog' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
