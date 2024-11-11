# OTM-JSON Online Reader
OTM-JSON形式のファイルをhuman readableな形式で表示するアプリ。

HTTPS形式で公開されているjsonファイルが読めます。

version1で定義されたプロパティだけを表示しています。（version1で定義されていないプロパティは動作に影響しません）

OTM-JSON形式については[こちら](https://wiki.conlinguistics.jp/OTM-JSON)を参照してください。

## Getting Started
Tool Manager [Volta](https://volta.sh/) を利用する．

Windowsの人はWSLを使用すること。
- 環境構築
```
# install Volta
$ curl https://get.volta.sh | bash

# install pnpm
$ volta install pnpm

# install dependencies
$ pnpm install
```

- サイトの確認
```
$ pnpm dev
```
で`http://localhost:5173`にサーバーが立ち上がる。