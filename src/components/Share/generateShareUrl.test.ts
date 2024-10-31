import { describe, expect, it } from 'vitest';
import generateShareUrl from './generateShareUrl';

describe('filter', () => {
  it('no url', () => {
    expect((generateShareUrl('', {text: '', option: 'forward', range: 'both'}).split('/json-reader/')[1])).toStrictEqual('?text=&option=forward&range=both')
  })
  
  it('url && params', () => {
    expect((generateShareUrl('http://jurliyuuri.com/ail.ail.json', {text: '', option: 'forward', range: 'both'}).split('/json-reader/')[1])).toStrictEqual('?url=http://jurliyuuri.com/ail.ail.json&text=&option=forward&range=both')
  })
})
