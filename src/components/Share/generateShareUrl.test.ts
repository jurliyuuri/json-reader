import { describe, expect, it } from 'vitest';
import generateShareUrl from './generateShareUrl';

describe('filter', () => {
  it('no url', () => {
    expect((
      decodeURIComponent(new URL(generateShareUrl('', { text: '', option: 'forward', range: 'both' })).search)
    )).toStrictEqual('?text=&option=forward&range=both')
  })

  it('url && no text', () => {
    expect((
      decodeURIComponent(new URL(generateShareUrl('http://jurliyuuri.com/ail.ail.json', { text: '', option: 'forward', range: 'both' })).search)
    )).toStrictEqual('?url=http://jurliyuuri.com/ail.ail.json&text=&option=forward&range=both')
  })

  it('url && text', ()=>{
    expect((
      decodeURIComponent(new URL(generateShareUrl('http://jurliyuuri.com/ail.ail.json', { text: 'chuwo', option: 'partial', range: 'word' })).search)
    )).toStrictEqual('?url=http://jurliyuuri.com/ail.ail.json&text=chuwo&option=partial&range=word')
  })
})
