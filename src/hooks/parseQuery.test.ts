import { describe, expect, it } from 'vitest';
import parseQuery from './parseQuery';

describe('parseQuery', () => {
  it('no query', () => {
    expect(parseQuery(new URLSearchParams(''))).toStrictEqual({
      url: '',
      text: '',
      option: '',
      range: ''
    })
  })
  it('url only', () => {
    expect(parseQuery(new URLSearchParams('?url=https://jurliyuuri.com/ail/ail.json'))).toStrictEqual({
      url: 'https://jurliyuuri.com/ail/ail.json',
      text: '',
      option: '',
      range: ''
    })
  })
  it('full query', () => {
    expect(parseQuery(new URLSearchParams('?url=https://jurliyuuri.com/ail/ail.json&text=chuwo&option=partial&range=word'))).toStrictEqual({
      url: 'https://jurliyuuri.com/ail/ail.json',
      text: 'chuwo',
      option: 'partial',
      range: 'word'
    })
  })
})