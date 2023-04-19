import { buildMessage, ValidateBy } from 'class-validator'
import type { ValidationOptions } from 'class-validator'

/** @hidden */
export const IS_BIGINT = 'isBigInt'

/**
 * Checks if the given value is a [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).
 *
 * #### Example
 * ```typescript
 * // Ensure the value is a BigInt.
 * @IsBigInt()
 * hugeNumber: BigInt
 * ```
 *
 * @category Type
 * @param options Generic class-validator options.
 */
export function IsBigInt(options?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_BIGINT,
      validator: {
        validate: (value): boolean => typeof value === 'bigint',
        defaultMessage: buildMessage(eachPrefix => `${eachPrefix}$property must be a BigInt`, options),
      },
    },
    options
  )
}
