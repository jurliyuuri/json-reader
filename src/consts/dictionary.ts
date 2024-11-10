export type Word = {
  readonly entry: {
    readonly id: number,
    readonly form: string,
  },
  readonly translations: {
    readonly title: string,
    readonly forms: string[],
  }[],
  readonly tags: string[],
  readonly contents: {
    readonly title: string,
    readonly text: string,
  }[],
  readonly variations: {
    readonly title: string,
    readonly form: string,
  }[],
  readonly relations: {
    readonly title: string,
    readonly entry: {
      readonly id: number,
      readonly form: string,
    },
  }[],
  [key: string]: unknown
}

export type Dictionary = Word[]

export const isDictionary = (words: Dictionary): words is Dictionary => {
  return (
    typeof words[0] === 'object' &&
    typeof words[0].entry === 'object' &&
    typeof words[0].entry.id === 'number' &&
    typeof words[0].entry.form === 'string' &&
    Array.isArray(words[0].translations) &&
    Array.isArray(words[0].tags) &&
    Array.isArray(words[0].contents) &&
    Array.isArray(words[0].variations) &&
    Array.isArray(words[0].relations)
  )
}

export const sampleDictionary: Dictionary = [
  {
    entry: {
      id: 1,
      form: 'OTM-JSON Online Reader'
    },
    translations: [{
      title: '概要',
      forms: ['OTM-JSON形式のファイルをhuman readableな形式で表示するアプリです']
    }],
    tags: ['説明', 'サンプル'],
    contents: [{
      title: '使い方',
      text: '上の入力欄に読みたいOTM-JSONファイルのあるURLを入れてloadボタンを押してください'
    }, {
      title: '検索方法',
      text: '検索欄に文字列を入れてSearchボタンを押してください'
    }, {
      title: '辞書ページを共有したいときは',
      text: '共有したい辞書ページを読み込んで、入力欄の下の共有アイコンを押すとリンクがコピーされます\nもしくは環境によってはリンクが表示されるので、それをコピーしてください'
    }, {
      title: '問い合わせ先',
      text: 'https://github.com/jurliyuuri/json-reader/issues/'
    }],
    variations: [],
    relations: []
  }
]