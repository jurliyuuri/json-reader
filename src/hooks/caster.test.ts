import { describe, expect, it } from 'vitest'
import { castAsSearchOption, castAsSearchRange } from './caster'

describe('searchOption', () => {
  it('forward', () => {
    expect(castAsSearchOption('forward')).toStrictEqual('forward')
  })
  it('partial', () => {
    expect(castAsSearchOption('partial')).toStrictEqual('partial')
  })
  it('exact', () => {
    expect(castAsSearchOption('exact')).toStrictEqual('exact')
  })
  it('regex', () => {
    expect(castAsSearchOption('regex')).toStrictEqual('regex')
  })
  it('other', () => {
    expect(castAsSearchOption('hoge')).toStrictEqual('forward')
  })
  it('no option', () => {
    expect(castAsSearchOption('')).toStrictEqual('forward')
  })
})

describe('searchRange', () => {
  it('both', () => {
    expect(castAsSearchRange('both')).toStrictEqual('both')
  })
  it('word', () => {
    expect(castAsSearchRange('word')).toStrictEqual('word')
  })
  it('equivalent', () => {
    expect(castAsSearchRange('equivalent')).toStrictEqual('equivalent')
  })
  it('equivalentTag', ()=>{
    expect(castAsSearchRange('equivalentTag')).toStrictEqual('equivalentTag')
  })
  it('tag', () => {
    expect(castAsSearchRange('tag')).toStrictEqual('tag')
  })
  it('full', () => {
    expect(castAsSearchRange('full')).toStrictEqual('full')
  })
  it('other'), () => {
    expect(castAsSearchRange('hoge')).toStrictEqual('both')
  }
  it('no range'), () => {
    expect(castAsSearchRange('')).toStrictEqual('both')
  }
})