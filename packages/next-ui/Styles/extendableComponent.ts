import { capitalize, Interpolation, Theme } from '@mui/material'
import React from 'react'

export type ExtendableComponent<StyleProps extends Record<string, unknown>> = {
  defaultProps?: Partial<StyleProps>
  variants?: { props: Partial<StyleProps>; style: Interpolation<{ theme: Theme }> }[]
}

export function slotClasses<Name extends string, ClassNames extends ReadonlyArray<string>>(
  name: Name,
  slotNames: ClassNames,
) {
  return Object.fromEntries(slotNames.map((slot) => [slot, `${name}-${slot}`])) as {
    [P in ClassNames[number]]: `${Name}-${P}`
  }
}

/** Maps incoming classes to a selectors that can be used to extend the component */
export const slotSelectorsMap = <O extends Record<string, string>>(
  obj: O,
): {
  [P in keyof O]: `& .${O[P]}`
} => {
  const mapped = Object.entries(obj).map(([target, className]) => [target, `& .${className}`])
  return Object.fromEntries(mapped)
}

/**
 * Utility function to:
 *
 * - Define slots
 * - Generate state css classes.
 */
export function extendableComponent<
  ComponentStyleProps extends Record<string, boolean | string | undefined>,
  Name extends string = string,
  ClassNames extends ReadonlyArray<string> = ReadonlyArray<string>,
>(componentName: Name, slotNames: ClassNames) {
  const classes = slotClasses(componentName, slotNames)
  const slotSelectors = slotSelectorsMap(classes)

  const withState = (state: ComponentStyleProps) => {
    const stateClas = Object.fromEntries(
      Object.entries(classes).map(([slot, className]) => {
        const mapped = Object.entries(state)
          .map(([key, value]) => {
            if (typeof value === 'boolean' && value === true) return key
            if (typeof value === 'string' && value.length > 0) return `${key}${capitalize(value)}`
            return ''
          })
          .filter(Boolean)

        return [slot, `${className} ${mapped.join(' ')}`]
      }),
    ) as {
      [P in ClassNames[number]]: `${Name}-${P} ${string}`
    }

    return stateClas
  }

  return {
    componentName,
    classes,
    selectors: {
      // ...stateSelectors,
      ...slotSelectors,
    },
    withState,
  }
}
