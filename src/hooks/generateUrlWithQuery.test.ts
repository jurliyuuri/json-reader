import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import generateUrlWithQuery from './generateUrlWithQuery'

describe('filter', () => {
  const mockOrigin = 'https://example.com/'
  const originalLocation = location

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      value: {
        ...originalLocation,
        assign: vi.fn(),
        search: '',
        origin: mockOrigin
      },
      writable: true
    })
  })

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      value: { ...originalLocation }
    })
  })

  it('no url', () => {
    expect((
      generateUrlWithQuery(
        '',
        { text: '', option: 'forward', range: 'both' }
      ))
    ).toStrictEqual(`${mockOrigin}/json-reader/?option=forward&range=both&text=&url=`)
  })

  it('url && no text', () => {
    expect((
      generateUrlWithQuery(
        'https://jurliyuuri.com/ail/ail.json',
        { text: '', option: 'forward', range: 'both' }
      )
    )).toStrictEqual(`${mockOrigin}/json-reader/?option=forward&range=both&text=&url=https%3A%2F%2Fjurliyuuri.com%2Fail%2Fail.json`)
  })

  it('url && text', () => {
    expect((
      generateUrlWithQuery(
        'https://jurliyuuri.com/takan_cen/皇言集書.json',
        { text: 'lu', option: 'partial', range: 'word' }
      )
    )).toStrictEqual(`${mockOrigin}/json-reader/?option=partial&range=word&text=lu&url=https%3A%2F%2Fjurliyuuri.com%2Ftakan_cen%2F%E7%9A%87%E8%A8%80%E9%9B%86%E6%9B%B8.json`)
  })
})
