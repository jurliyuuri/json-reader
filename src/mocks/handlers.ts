import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('http://jurliyuuri.com/ail/ail.json', () => {
    return HttpResponse.json({
      words: [{
        entry: {
          id: 1,
          form: 'data'
        },
        translations: [{
          title: '訳',
          forms: ['訳1', '訳2']
        }],
        tags: ['テストケース'],
        contents: [{
          title: '内容',
          text: '内容がここに記述される'
        }],
        variations: [{
          title: '複数形',
          forms: 'datas'
        }],
        relations: [{
          title: '単数形',
          entry: {
            id: 2,
            forms: 'datum'
          }
        }]
      }, {
        entry: {
          id: 2,
          form: 'datum'
        },
        translations: [{
          title: '訳',
          forms: ['訳1', '訳2']
        }],
        tags: ['テストケース'],
        contents: [{
          title: '内容',
          text: '内容がここに記述される'
        }],
        variations: [{
          title: '複数形',
          forms: 'data'
        }, {
          title: '複数形',
          forms: 'datas'
        }],
        relations: [{
          title: '複数形',
          entry: {
            id: 1,
            forms: 'data'
          }
        }]
      }]
    })
  })
]