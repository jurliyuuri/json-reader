export type Language = keyof DictionaryData
export type DictionaryData = {
  ail: { url: string },
  takan: { url: string }
  bhat: { url: string }
  pmcf: { url: string }
  calass: { url: string }
  vic: { url: string }
  "ʁa:v": { url: string }
}

export const dictionaryData: DictionaryData = {
  ail: {
    url: "http://jurliyuuri.com/ail/ail_compressed.json"
  },
  takan: {
    url: "http://jurliyuuri.com/takan_cen/皇言集書.json"
  },
  bhat: {
    url: "http://jurliyuuri.com/bhaataan/bhat.json"
  },
  pmcf: {
    url: "http://jurliyuuri.com/pmcp_dictionary/pmcf_dict.json"
  },
  calass: {
    url: "https://raw.githubusercontent.com/jurliyuuri/dyin_settings/master/lang/dictionaries/calass.json"
  },
  vic: {
    url: "https://raw.githubusercontent.com/jurliyuuri/dyin_settings/master/lang/dictionaries/viccenstanz.json"
  },
  "ʁa:v": {
    url: "https://skurlavenijamavija.github.io/classical_rkhavanur/d%CA%8A%CB%90b%C9%91d%C9%A2%C9%91%C9%A2%C9%91%CB%90b.json"
  }
}