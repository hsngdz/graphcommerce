import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { IsRequired } from './useGqlDocumentHandler'

export type UseFormValidReturn<TFieldValues> = Partial<Record<Path<TFieldValues>, boolean>>

/**
 * ### useFormValidFields
 *
 * Record field names as key and boolean as value indicating whether the field is valid
 */
export function useFormValidFields<TFieldValues extends FieldValues>(
  form: Pick<UseFormReturn<TFieldValues>, 'watch' | 'formState'>,
  required: IsRequired<TFieldValues>,
): UseFormValidReturn<TFieldValues> {
  const { watch, formState } = form
  const fields: Partial<Record<Path<TFieldValues>, boolean>> = {}

  watch((values) => {
    Object.keys(required).forEach((key) => {
      fields[key] = !formState.errors[key] && values[key]
    })
  })

  return fields
}
