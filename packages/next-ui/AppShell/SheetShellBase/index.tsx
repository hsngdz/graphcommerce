import { usePageContext, usePageRouter } from '@graphcommerce/framer-next-pages'
import {
  ClassKeys,
  Sheet,
  SheetBackdrop,
  SheetContainer,
  SheetPanel,
  SheetProps,
  SnapPoint,
  styles as sheetStyles,
} from '@graphcommerce/framer-sheet'
import { makeStyles, StyleRules, Theme } from '@material-ui/core'
import { useDomEvent } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import responsiveVal from '../../Styles/responsiveVal'
import AppShellProvider from '../AppShellProvider'
import ShellBase, { PageLayoutBaseProps } from '../ShellBase'
import useSheetStyles from './useSheetStyles'

export type SheetShellBaseProps = {
  header?: React.ReactNode
  children?: React.ReactNode
} & Pick<SheetProps, 'size' | 'variant'> &
  PageLayoutBaseProps

const styles = sheetStyles as StyleRules<ClassKeys>

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      ...styles.container,
    },
    containertop: {
      ...styles.containertop,
    },
    containerbottom: {
      ...styles.containerbottom,
      paddingTop: `calc(${theme.headerHeight.sm} / 2 + ${theme.spacings.sm})`,
      [theme.breakpoints.up('md')]: {
        // offset top is x% of the header height, so it slightly overlaps the logo
        paddingTop: `calc(${theme.headerHeight.md} / 2 + ${theme.spacings.sm})`,
      },
    },
    containerleft: {
      ...styles.containerleft,
      paddingRight: responsiveVal(26, 48),
    },
    containerright: {
      ...styles.containerright,
      paddingLeft: responsiveVal(26, 48),
    },
  }),
  { name: 'SheetShellBase' },
)

function SheetShellBase(props: SheetShellBaseProps) {
  const { children, variant, size, name } = props
  const sheetContainerClasses = useStyles()
  const sheetClasses = useSheetStyles(props)
  const router = useRouter()
  const pageRouter = usePageRouter()
  const { depth, closeSteps, active, direction } = usePageContext()
  const open = depth < 0 || router.asPath === pageRouter.asPath
  const initialLocale = useRef(router.locale)
  const [isNavigating, setIsNavigating] = useState<boolean>(false)

  function handleClose() {
    if (!isNavigating) {
      setIsNavigating(true)
      return initialLocale.current !== router.locale
        ? pageRouter.push('/')
        : pageRouter.go(closeSteps * -1)
    }
  }

  function handleSnap(snapPoint: SnapPoint) {
    if (snapPoint !== 'closed') return
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleClose()
  }

  const windowRef = useRef(typeof window !== 'undefined' ? window : null)

  function handleEscapeKey(e: KeyboardEvent | Event) {
    if (active) {
      if ((e as KeyboardEvent)?.key === 'Escape') {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        handleClose()
      }
    }
  }

  useDomEvent(windowRef, 'keyup', handleEscapeKey, { passive: true })

  return (
    <AppShellProvider>
      <ShellBase name={name}>
        <Sheet open={open} onSnap={handleSnap} variant={variant} size={size}>
          <SheetBackdrop onTap={handleClose} classes={sheetClasses} />
          <SheetContainer classes={sheetContainerClasses}>
            <SheetPanel initial={direction === -1 ? 'snapPoint1' : 'closed'} classes={sheetClasses}>
              {/* <FocusLock returnFocus={{ preventScroll: true }} disabled={!isActive}> */}
              {children}
              {/* </FocusLock> */}
            </SheetPanel>
          </SheetContainer>
        </Sheet>
      </ShellBase>
    </AppShellProvider>
  )
}

export default SheetShellBase
