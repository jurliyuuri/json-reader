import queryString from 'query-string';
import { describe, expect, it } from 'vitest';
import parseQuery from './parseQuery';

describe('parseQuery', () => {
  it('no query', () => {
    expect(parseQuery(queryString.parse(''))).toStrictEqual({
      url: '',
      param: {
        text: '',
        option: 'forward',
        range: 'both'
      }
    })
  })
  it('url only', () => {
    expect(parseQuery(queryString.parse('?url=https://jurliyuuri.com/ail/ail.json'))).toStrictEqual({
      url: 'https://jurliyuuri.com/ail/ail.json',
      param: {
        text: '',
        option: 'forward',
        range: 'both'
      }
    })
  })
  it('full query', () => {
    expect(parseQuery(queryString.parse('?option=partial&range=word&text=chuwo&url=https://jurliyuuri.com/ail/ail.json'))).toStrictEqual({
      url: 'https://jurliyuuri.com/ail/ail.json',
      param: {
        text: 'chuwo',
        option: 'partial',
        range: 'word'
      }
    })
  })
  it('extra query', () => {
    expect(parseQuery(queryString.parse('?alpha=&beta=&option=exact&range=tag&text=&url='))).toStrictEqual({
      url: '',
      param: {
        text: '',
        option: 'exact',
        range: 'tag'
      }
    })
  })
  it('nonsense query', () => {
    expect(parseQuery(queryString.parse('?option=foo&range=bar&text=&url='))).toStrictEqual({
      url: '',
      param: {
        text: '',
        option: 'forward',
        range: 'both'
      }
    })
  })
})