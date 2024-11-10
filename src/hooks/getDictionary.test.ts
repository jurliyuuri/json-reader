import { afterEach, describe, expect, it, vi } from "vitest";
import getDictionary from "./getDictionary";
import { sampleDictionary } from "@/consts/dictionary";

describe('normal', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('empty readUrl', async () => {
    expect(getDictionary('')).toStrictEqual(new Promise(() => sampleDictionary))
  })
  it('not OK', async () => {
    vi.spyOn(global, 'fetch').mockImplementationOnce(async () => new Response(null, { status: 404 }));
    expect(getDictionary('fuga')).rejects.toThrowError('not OK')
  })
  it('No words property', async () => {
    vi.spyOn(global, 'fetch').mockImplementationOnce(async () => new Response('{}'));
    expect(getDictionary('fuga')).rejects.toThrowError('No words property')
  })
  it('Invalid dictionary structure', async () => {
    vi.spyOn(global, 'fetch').mockImplementationOnce(async () => new Response(`{"words": ${JSON.stringify([])}}`));
    expect(getDictionary('https://example.com/')).rejects.toThrowError('Invalid dictionary structure')
  })
  it('Valid dictionary', async () => {
    vi.spyOn(global, 'fetch').mockImplementationOnce(async () => new Response(`{"words": ${JSON.stringify(sampleDictionary)}}`));
    expect(getDictionary('https://example.com/')).toStrictEqual(new Promise(() => sampleDictionary))
  })
});