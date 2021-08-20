import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { UseStyles } from '../../Styles'
import Title, { TitleProps } from '../../Title'
import useAppShellHeaderContext from '../AppShellHeader/useAppShellHeaderContext'

type AppShellTitleProps = {
  children: React.ReactNode
  bare?: boolean
} & Pick<TitleProps, 'icon'> &
  UseStyles<typeof useStyles>

const useStyles = makeStyles(
  (theme: Theme) => ({
    margin: {
      marginTop: theme.spacings.lg,
      marginBottom: theme.spacings.lg,
    },
    title: {},
  }),
  {
    name: 'AppShellTitle',
  },
)

export default function AppShellTitle(props: AppShellTitleProps) {
  const { children, icon, bare } = props
  const { titleRef } = useAppShellHeaderContext()
  const classes = useStyles(props)

  return (
    <Title
      ref={titleRef}
      component='h2'
      size='medium'
      icon={icon ?? undefined}
      classes={{ container: clsx(classes.title, !bare && classes.margin) }}
    >
      {children}
    </Title>
  )
}
