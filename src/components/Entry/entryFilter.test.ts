import { expect, it } from "vitest";
import entryFilter from "./entryFilter";
import { sampleDictionary } from "@/consts/dictionary";

it('検索フィルター', () => {
  expect(entryFilter(sampleDictionary[0], /OTM/, 'both')).toStrictEqual(true)
})