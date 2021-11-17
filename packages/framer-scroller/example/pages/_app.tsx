/// <reference types="@graphcommerce/next-ui/types" />

import { responsiveVal } from '@graphcommerce/next-ui'
import { createTheme, CssBaseline, MuiThemeProvider } from '@material-ui/core'
import { LazyMotion, domMax } from 'framer-motion'
import { AppPropsType } from 'next/dist/shared/lib/utils'
import { Router } from 'next/router'
import React, { useEffect } from 'react'

const theme = createTheme({
  spacings: {
    xxs: responsiveVal(10, 16),
    xs: responsiveVal(12, 20),
    sm: responsiveVal(14, 30),
    md: responsiveVal(16, 50),
    lg: responsiveVal(24, 80),
    xl: responsiveVal(80, 160),
    xxl: responsiveVal(100, 220),
  },
  page: {
    horizontal: responsiveVal(10, 30),
    vertical: responsiveVal(10, 30),
    headerHeight: {
      sm: `56px`,
      md: `120px`,
    },
  },
})

export default function MyApp({ Component, pageProps }: AppPropsType<Router>) {
  useEffect(() => document.getElementById('jss-server-side')?.remove())
  return (
    <LazyMotion features={domMax} strict>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </MuiThemeProvider>
    </LazyMotion>
  )
}
