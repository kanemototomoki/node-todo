# 大事な情報はgit管理から外そう

## 大事な情報って？？
---

大事な情報と言われても漠然としてますよね！  
ここでいう大事な情報とは**コネクション情報**や**アクセスキー、シークレットキー**などのことです。  
雑に言うと**鍵**や**接続情報**とかその辺ですね。  
この辺りはプロジェクトによって変わるので臨機応変に対応しましょう！  
今回のレッスンではアクセスキーは使ってませんが、コネクション情報は`/database/config/config.json`に記載してますね！
```json
// config.json
{
  "development": {
    "username": "root",         // DBへアクセスするユーザ名
    "password": null,           // そのユーザのパスワード
    "database": "express_todo", // DBの名前
    "host": "127.0.0.1",        // DBが置かれているサーバのアドレス
    "dialect": "mysql"          // DBの種類
  }
}
```

MySQLへアクセスするためのユーザ名や、DBサーバの場所も書かれているので  
もし外部へ漏れてしまったら、悪意を持ったユーザによってデータが抜かれてしまう可能性があります。  
その可能性を少しでも減らすために今回は以下のものを使用します！
- **.gitignoreファイル** ...git管理したくないものを記述するファイル
- **.envファイル** ... 大事な情報を記述するファイル

ではさっそく追加しましょう！  
拡張子は必要ありません。
```sh
express-todo
├── app
├── ...省略
├── package.json
├── .gitignore // 追加
└── .env       // 追加
```

まず **.gitignore** を編集しましょう。  
`.env`と`/node_modules`を記入します。  
```sh
// .gitignore
.env
/node_modules
```

`.env`は大事な情報が書いてあるのでgit管理外に、  
`node_modules`はサイズが大きく、各自環境構築の際に`npm i`すればいいだけなのでgit管理外にします。  
自分で一から書くのは面倒なので、[こちらのサイト](https://www.toptal.com/developers/gitignore)などを使用して自動で生成することが多いです。


次に`.env`を編集します。  
```sh
// .env
DB_HOST = 127.0.0.1
DB_USERNAME = root
DB_PASSWORD = ""
DB_NAME = express_todo
DB_TYPE = mysql
```

次に **`dotenv`** と **`cross-env`** をインストールします。  
- `dotenv` ... `.env`ファイルからデータを読み込めるようにする。詳しくは[こちら](https://www.npmjs.com/package/dotenv)
- `cross-env` ... OS間での差異を無くしてくれる。詳しくは[こちら](https://www.npmjs.com/package/cross-env)

```sh
$ npm i dotenv cross-env
```



`/database/config/`にある`config.json`の拡張子を **`config.js`** に変更します。  
内容も書き換えます。
```js
// config.js
require('dotenv').config();

const host = process.env.DB_HOST;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const dialect = process.env.DB_TYPE;

module.exports = {
  development: {
    host,
    username,
    password,
    database,
    dialect,
  },
}
```

`/database/models/index.js`を編集します。  
```js
// index.js
// ...省略
const config = require(__dirname + '/../config/config.json')[env];
// ↓拡張子を js にする
const config = require(__dirname + '/../config/config.js')[env];
// ...省略
```

最後に`package.json`のスクリプトを編集します。  
```json
// package.json
// ...省略
"scripts": {
  "start": "cross-env NODE_ENV=development nodemon"
},
// ...省略
```
