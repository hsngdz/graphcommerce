import { capitalize } from '@material-ui/core'
import clsx from 'clsx'

/**
 * This will pick classNames from the classes object based on the given value object.sf
 *
 * Example:
 *
 * ```tsx
 * const classes = makeStyles({
 *   root: {},
 *   rootColorRed: { color: 'red' }
 *   rootFloating: { display: 'inline-block' }
 * })
 *
 * function MyComponent() {
 *   const classes = useStyles(props)
 *   const classNames = pickClasses(classes, { color: 'red', floating: true })
 *
 *   return <div {...className('root')}>Hello</div>
 * }
 * ```
 */
export function classesPicker<K extends string>(
  classes: Record<string, string>,
  values: Record<string, boolean | string | undefined>,
) {
  return (className: K, addClassName?: string) => {
    const mapped: Record<string, string> = Object.fromEntries(
      Object.entries(values)
        .map(([key, value]) =>
          typeof value === 'boolean' || typeof value === 'undefined'
            ? [classes[`${className}${capitalize(key)}`], !!value]
            : [classes[`${className}${capitalize(key)}${capitalize(value)}`], true],
        )
        .filter((v) => !!v[0] && v[1]),
    )

    return { className: clsx(classes[className], mapped, addClassName) }
  }
}