import { describe, expect, it } from 'vitest'
import convertQueryToSearchRegex from './convertQueryToSearchRegex'

describe('convert query to search regex', () => {
  it('normal', () => {
    expect(convertQueryToSearchRegex('cetkaik', 'forward')).toStrictEqual(/^cetkaik/)
    expect(convertQueryToSearchRegex('cetkaik', 'partial')).toStrictEqual(/cetkaik/)
    expect(convertQueryToSearchRegex('cetkaik', 'regex')).toStrictEqual(/cetkaik/)
  })

  it('regex', () => {
    expect(convertQueryToSearchRegex('[0-9]*.+[^a-z]$', 'partial')).toStrictEqual(/\[0\-9\]\*\.\+\[\^a\-z\]\$/) // eslint-disable-line
    expect(convertQueryToSearchRegex('[0-9]*.+[^a-z]$', 'regex')).toStrictEqual(/[0-9]*.+[^a-z]$/)
  })

  it('empty string', () => {
    expect(convertQueryToSearchRegex('', 'forward')).toStrictEqual(/(?:)/)
    expect(convertQueryToSearchRegex('', 'partial')).toStrictEqual(/(?:)/)
    expect(convertQueryToSearchRegex('', 'regex')).toStrictEqual(/(?:)/)
  })

  it('ail', () => {
    expect(convertQueryToSearchRegex("^'", 'partial')).toStrictEqual(/\^'/)
  })

  it('bhat', () => {
    expect(convertQueryToSearchRegex('bhát', 'forward')).toStrictEqual(/^bhát/)
  })
})