export type Optional<T> = T | null | undefined
export const exists = <T>(value: T | null | undefined): value is T => {
  return value != null
}