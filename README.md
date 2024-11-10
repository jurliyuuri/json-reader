# OTM-JSON Online Reader
OTM-JSON形式のファイルをhuman readableな形式で表示するアプリ。

GitHub Pagesで公開されたjsonファイルが読めます。

version1で定義されたプロパティだけを表示しています。

version1で定義されていないプロパティがあっても動作しますが、`entry`, `translations`, `tags`, `variations`, `contents`, `relations`の各プロパティの内部にVersion1で定義されていないプロパティがあると動作しません。

OTM-JSON形式については[こちら](https://conlinguistics.fandom.com/ja/wiki/OTM-JSON)を参照してください。