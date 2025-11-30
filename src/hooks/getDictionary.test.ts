import { afterEach, describe, expect, it, vi } from 'vitest'
import getDictionary from './getDictionary'
import { sampleDictionary } from '@/consts/dictionary'

describe('Error check', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('empty readUrl', async () => {
     await expect(getDictionary('')).resolves.toStrictEqual(sampleDictionary)
  })
  it('not OK', async () => {
    vi.spyOn(global, 'fetch').mockImplementationOnce(async () => new Response(null, { status: 404 }))
    await expect(getDictionary('fuga')).rejects.toThrowError('not OK')
  })
  it('No words property', async () => {
    vi.spyOn(global, 'fetch').mockImplementationOnce(async () => new Response(JSON.stringify({'property': []})))
    await expect(getDictionary('fuga')).rejects.toThrowError('No words property')
  })
  it('Empty words property', async () => {
    vi.spyOn(global, 'fetch').mockImplementationOnce(async () => new Response(JSON.stringify({'words': []})))
    await expect(getDictionary('fuga')).rejects.toThrowError('Empty words property')  
  })
  it('Invalid dictionary structure', async () => {
    vi.spyOn(global, 'fetch').mockImplementationOnce(async () => new Response(JSON.stringify({'words': ['']})))
    await expect(getDictionary('https://example.com/')).rejects.toThrowError('Invalid dictionary structure')
  })
  it('Valid dictionary', async () => {
    vi.spyOn(global, 'fetch').mockImplementationOnce(async () => new Response(JSON.stringify({'words': sampleDictionary})))
    await expect(getDictionary('https://example.com/')).resolves.toStrictEqual(sampleDictionary)
  })
})

describe('OTM-JSON version', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  const expectedResult = {
    entry: { id: 0, form: 'form' },
    translations: [{ title: 'title', forms: ['']}],
    tags: ['tag'],
    contents: ['content'],
    variations: [{ title: 'title', forms: '' }],
    relations: [{ title: 'title', entry: { id: 0, form: 'form' }}],
  }
  const mockDict = {
    'version1': {
      'words': [{
        entry: { id: 0, form: 'form' },
        translations: [{ title: 'title', forms: ['']}],
        tags: ['tag'],
        contents: ['content'],
        variations: [{ title: 'title', forms: '' }],
        relations: [{ title: 'title', entry: { id: 0, form: 'form' }}],
      }],
      'version': 1,
    },
    'version2': {
      'words': [{
        entry: { id: 0, form: 'form', other: 'other' },
        translations: [{ title: 'title', forms: [''], other: 'other' }],
        tags: ['tag'],
        contents: ['content'],
        variations: [{ title: 'title', forms: '', other: 'other' }],
        relations: [{ title: 'title', entry: { id: 0, form: 'form', other: 'other' }, other: 'other' }],
      }],
      'version': 2,
      'other': 'other'
    },
    'ZpDIC': {
      'words': [{
        entry: { id: 0, form: 'form', other: 'other' },
        translations: [{ title: 'title', forms: [''], other: 'other' }],
        tags: ['tag'],
        contents: ['content'],
        variations: [{ title: 'title', forms: '', other: 'other' }],
        relations: [{ title: 'title', entry: { id: 0, form: 'form', other: 'other' }, other: 'other' }],
      }],
      'version': 2,
      'ZpDIC': {
        "alphabetOrder" : 'string',                
        "plainInformationTitles" : ['string'],     
        "informationTitleOrder" : null,
        "defaultWord" : {
          entry: { id: 0, form: 'form', other: 'other' },
          translations: [{ title: 'title', forms: [''], other: 'other' }],
          tags: ['tag'],
          contents: ['content'],
          variations: [{ title: 'title', forms: '', other: 'other' }],
          relations: [{ title: 'title', entry: { id: 0, form: 'form', other: 'other' }, other: 'other' }],
        }
      }
    },
  }
  it('version1', () => {
    const sample = mockDict.version1
    vi.spyOn(global, 'fetch').mockImplementationOnce(async () => new Response(JSON.stringify(sample)))
    expect(getDictionary('https://example.com/')).toStrictEqual(new Promise(() => expectedResult))
  })
  it('version2', () => {
    const sample = mockDict.version2
    vi.spyOn(global, 'fetch').mockImplementationOnce(async () => new Response(JSON.stringify(sample)))
    expect(getDictionary('https://example.com/')).toStrictEqual(new Promise(() => expectedResult))
  })
  it('ZpDIC', () => {
    const sample = mockDict.ZpDIC
    vi.spyOn(global, 'fetch').mockImplementationOnce(async () => new Response(JSON.stringify(sample)))
    expect(getDictionary('https://example.com/')).toStrictEqual(new Promise(() => expectedResult))
  })
})