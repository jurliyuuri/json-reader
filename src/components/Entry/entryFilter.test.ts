import { describe, expect, it } from 'vitest'
import entryFilter from './entryFilter'

describe('filter', () => {
  it('empty string', () => {
    expect(entryFilter(dummy[0], /(?:)/, 'both')).toStrictEqual(true)
  })

  it('full text search', () => {
    expect(entryFilter(dummy[1], /バート/, 'full')).toStrictEqual(true)
    expect(entryFilter(dummy[1], /^名詞/, 'full')).toStrictEqual(false)
    expect(entryFilter(dummy[1], /名詞/, 'full')).toStrictEqual(true)
    expect(entryFilter(dummy[1], /形/, 'full')).toStrictEqual(true)
    expect(entryFilter(dummy[1], /辞/, 'full')).toStrictEqual(false)
    expect(entryFilter(dummy[1], /\*/, 'full')).toStrictEqual(true)
  })

  it('option', () => {
    expect(entryFilter(dummy[3], /^ul/, 'full')).toStrictEqual(false)
    expect(entryFilter(dummy[3], /ul/, 'full')).toStrictEqual(true)
  })

  it('unicode', () => {
    expect(entryFilter(dummy[1], /an/, 'full')).toStrictEqual(false)
    expect(entryFilter(dummy[1], /án/, 'full')).toStrictEqual(true)
  })
})

describe('specific lang', () => {
  it('bhátán', () => {
    expect(entryFilter(dummy[1], /bhát/, 'word')).toStrictEqual(true)
    expect(entryFilter(dummy[1], /bhát/, 'both')).toStrictEqual(true)
    expect(entryFilter(dummy[1], /bhát/, 'tag')).toStrictEqual(false)
    expect(entryFilter(dummy[1], /bhát/, 'equivalent')).toStrictEqual(false)
  })

  it('taftat', () => {
    expect(entryFilter(dummy[4], /rl/, 'full')).toStrictEqual(true)
    expect(entryFilter(dummy[4], /c/, 'full')).toStrictEqual(false)
  })

  it('ail', () => {
    expect(entryFilter(dummy[0], /\^/, 'word')).toStrictEqual(true)
    expect(entryFilter(dummy[0], /^\^/, 'word')).toStrictEqual(false)
  })

  it('pai2 ge', () => {
    expect(entryFilter(dummy[2], /[0-9]/, 'word')).toStrictEqual(true)
    expect(entryFilter(dummy[2], /pai2/, 'full')).toStrictEqual(true)
  })
})

const dummy = [
  {
    "entry": {
      "id": 50830,
      "form": "t^es'aiai"
    },
    "translations": [{
      "title": "",
      "forms": ["［自］爆竹を鳴らす"]
    }],
    "tags": ["真理設定", "リパライン語ソース"],
    "contents": [],
    "variations": [],
    "relations": []
  }, {
    "entry": {
      "id": 74,
      "form": "bhát"
    },
    "translations": [{
      "title": "子音幹名詞",
      "forms": ["バート人", "バート語"]
    }],
    "tags": [],
    "contents": [{
      "title": "同根語",
      "text": "牌huet,藍phedu"
    }, {
      "title": "ラネーメ祖語形",
      "text": "*phed"
    }],
    "variations": [],
    "relations": [{
      "title": "派生関係",
      "entry": {
        "id": 296,
        "form": "bhátán rásit"
      }
    }, {
      "title": "派生関係",
      "entry": {
        "id": 320,
        "form": "bhátán zepha"
      }
    }, {
      "title": "派生関係",
      "entry": {
        "id": 321,
        "form": "wát"
      }
    }]
  }, {
    "entry": {
      "id": 3,
      "form": "aim2"
    },
    "translations": [{
      "title": "概念",
      "forms": ["存在"]
    }, {
      "title": "名詞",
      "forms": ["存在"]
    }, {
      "title": "動詞",
      "forms": ["～がある", "～をあらせる"]
    }, {
      "title": "叫詞",
      "forms": ["はい"]
    }, {
      "title": "漢字転写",
      "forms": ["在"]
    }, {
      "title": "定詞",
      "forms": ["～している"]
    }],
    "tags": [],
    "contents": [{
      "title": "例文",
      "text": "pai2 aim2 a.　（私は居る。）"
    }, {
      "title": "同根語",
      "text": "aima.ar, hemúḷ.bt, hem.bt"
    }],
    "variations": [],
    "relations": [{
      "title": "対義語",
      "entry": {
        "id": 4,
        "form": "mun1"
      }
    }]
  }, {
    "entry": {
      "id": 2142,
      "form": "julo"
    },
    "translations": [{
      "title": "farteven",
      "forms": ["iulo"]
    }, {
      "title": "kante",
      "forms": ["iulo", "-o"]
    }, {
      "title": "linzklar",
      "forms": ["件"]
    }],
    "tags": ["ftlexest"],
    "contents": [],
    "variations": [],
    "relations": []
  }, {
    "entry": {
      "id": 37,
      "form": "rasnirl"
    },
    "translations": [{
      "title": "名詞",
      "forms": ["誰"]
    }],
    "tags": [],
    "contents": [{
      "title": "例文",
      "text": "rasnirls fijurlnan rhoshma?　子供がいるのは誰？"
    }, {
      "title": "語源",
      "text": "[< rast + nirl ]"
    }],
    "variations": [],
    "relations": []
  }
]