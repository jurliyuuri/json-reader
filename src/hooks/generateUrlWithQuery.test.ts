import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import generateUrlWithQuery from './generateUrlWithQuery'

describe('filter', () => {
  const originalLocation = location

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      value: {
        ...originalLocation,
        assign: vi.fn(),
        search: '',
        origin: 'https://mock.com/'
      },
      writable: true
    })
  })

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      value: {...originalLocation}
    })
  })

  it('no url', () => {
    location.search = '?text=&option=forward&range=both'
    expect((
      decodeURIComponent(new URL(generateUrlWithQuery()).search)
    )).toStrictEqual('?url=&text=&option=forward&range=both')
  })

  it('url && no text', () => {
    location.search = '?url=http://jurliyuuri.com/ail.ail.json&text=&option=forward&range=both'
    expect((
      decodeURIComponent(new URL(generateUrlWithQuery()).search)
    )).toStrictEqual('?url=http://jurliyuuri.com/ail.ail.json&text=&option=forward&range=both')
  })

  it('url && text', () => {
    location.search = '?url=http://jurliyuuri.com/ail.ail.json&text=chuwo&option=partial&range=word'
    expect((
      decodeURIComponent(new URL(generateUrlWithQuery()).search)
    )).toStrictEqual('?url=http://jurliyuuri.com/ail.ail.json&text=chuwo&option=partial&range=word')
  })
})
