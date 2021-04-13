import { SheetBackdropClassKeys } from './components/SheetBackdrop'
import { SheetContainerClassKeys } from './components/SheetContainer'
import { SheetDragIndicatorClassKeys } from './components/SheetDragIndicator'
import { SheetPanelClasskey } from './components/SheetPanel'
import { Styles } from './utils/styled'

export type ClassKeys =
  | SheetDragIndicatorClassKeys
  | SheetBackdropClassKeys
  | SheetContainerClassKeys
  | SheetPanelClasskey

const styles: Styles<ClassKeys> = {
  // SheetDragIndicatorClassKeys
  indicatorRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorRoottop: {
    height: 40,
  },
  indicatorRootbottom: {
    height: 40,
  },
  indicatorRootright: {
    width: 40,
    flexDirection: 'column-reverse',
    height: '100%',
  },
  indicatorRootleft: {
    width: 40,
    flexDirection: 'column-reverse',
    height: '100%',
  },
  indicator: { borderRadius: 99, backgroundColor: '#ddd' },
  indicatorleft: { width: 4, height: 18 },
  indicatorright: { width: 4, height: 18 },
  indicatortop: { width: 18, height: 4 },
  indicatorbottom: { width: 18, height: 4 },

  // SheetBackdropClassKeys
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
    touchAction: 'none', // Disable iOS body scrolling
    willChange: 'opacity',
    border: 0,
    padding: 0,
  },

  // SheetContainerClassKeys
  container: {
    position: 'absolute',
    maxWidth: '100%',
    boxSizing: 'border-box',
    maxHeight: '100%',
    display: 'flex',
  },
  containertop: {
    width: '100%',
    left: 0,
    top: 0,
    paddingBottom: 24,
    flexDirection: 'column-reverse',
  },
  containerbottom: {
    width: '100%',
    left: 0,
    bottom: 0,
    paddingTop: 24,
    flexDirection: 'column',
  },
  containerleft: {
    height: '100%',
    top: 0,
    left: 0,
    paddingRight: 24,
    flexDirection: 'row-reverse',
  },
  containerright: {
    height: '100%',
    top: 0,
    right: 0,
    paddingLeft: 24,
    flexDirection: 'row',
  },

  // SheetPanelClasskey
  header: {
    backgroundColor: '#fff',
    boxShadow: '0px -2px 16px rgba(0, 0, 0, 0.3)',
    willChange: `transform`,
  },
  headertop: {
    borderBottomRightRadius: '8px',
    borderBottomLeftRadius: '8px',

    /** There sometimes is a very small gap (<1px) between the header and the content */
    marginTop: -1,
    borderTop: '1px solid transparent',
  },
  headerbottom: {
    borderTopRightRadius: '8px',
    borderTopLeftRadius: '8px',

    /** There sometimes is a very small gap (<1px) between the header and the content */
    marginBottom: -1,
    borderBottom: '1px solid transparent',
  },
  headerleft: {
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px',

    /** There sometimes is a very small gap (<1px) between the header and the content */
    marginLeft: -1,
    borderLeft: '1px solid transparent',
  },
  headerright: {
    borderTopLeftRadius: '8px',
    borderBottomLeftRadius: '8px',
    /** There sometimes is a very small gap (<1px) between the header and the content */
    marginRight: -1,
    borderRight: '1px solid transparent',
  },
  content: {
    backgroundColor: '#fff',
    willChange: `transform`,
    overflowY: 'auto',
  },
  contenttop: {},
  contentbottom: {},
  contentleft: {},
  contentright: {},
}
export default styles
