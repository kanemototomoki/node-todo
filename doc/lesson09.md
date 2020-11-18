# CRUD機能を実装しよう -Read編-

## レッスンを進める際に参考になる資料
---

- [Sequelize公式](https://sequelize.org/v5/)
- [Sequelizeの使い方をまとめたサイト](https://blog.capilano-fw.com/?p=5546)

## CRUDって？
---

CRUD(クラッド)機能とは、  
  - Create(作成)
  - Read(読み取り)
  - Update(更新)
  - Delete(削除)

の頭文字を並べた用語です。  
アプリケーションやシステムを作る際の主要機能なのでしっかりと理解しましょう！

## 実装する前に
---

実装に入る前に**nodemon**と**mysql2**、そして**Sequelize**を導入します！  
- `nodemon`
  - ソースを監視して、自動でサーバーを再起動してくれるツールです。便利。  
- `mysql2` & `Sequelize`
  - node.jsからMySQLを操作するためのMySQLクライアントです。  
    また、`Sequelize`は **ORM(おーあーるまっぱー)** です。  
    雑に説明するとSQLを書かなくてもDBを触れるようにしてくれるモノです。
    `Sequelize`は今回は5系を使用します。

ではインストールしましょう。  
```sh
$ npm i nodemon mysql2 sequelize@5
```

また、`Sequelize`には、`Sequelize-cli`というコマンドで操作できるパッケージがあるので、  
グローバル(どこからでも使えるように)でインストールします。  
```sh
$ npm i -g sequelize-cli
```

サーバーの起動も`node app.js`で行っていましたが、**npmスクリプト**で行います。  
`package.json`を編集します。
```json
// package.json
// 省略
"scripts": {
  "start": "nodemon" // 編集
},
// 省略
```

`nodemon`の設定ファイル、`nodemon.json`を作成します。  
```sh
express-todo
├── app
// 省略
├── package.json
├── package-lock.json
├── node_modules
└── nodemon.json // 追加
```

```json
// nodemon.json
{
  "watch": ["app"],         // 監視対象のディレクトリ
  "ext": "js ,ejs",         // 監視対象の拡張子
  "exec": "node app/app.js" // nodemon実行時のスクリプト
}
```

実行してみます。  
下記の様にログが出ればOKです！  
`/app`以下の`js, ejs`ファイルを編集した際に自動でサーバーの再起動を行ってくれます！
```sh
$ npm run start
> express-todo@1.0.0 start 自分のディレクトリ/express-todo
> nodemon app/app.js

[nodemon] 2.0.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): app/**/*
[nodemon] watching extensions: js,ejs
[nodemon] starting `node app/app.js`
Server started on port 3000
```

## いざ実装
---

### Sequelize-cliでDBを操作してみよう
前回、**CREATE文**や**INSERT文**などを用いてMySQLを操作したと思います。  
作成したのはテーブル1つだけでしたが、実際のアプリとなると数十テーブル以上は存在するのが一般的です。  
手作業でなんてやってられないのでこの辺りの面倒を**Sequelize**にみてもらいます！  
前回作ったテーブルは一度消してしまいましょう。  
**DROP TABLE文**を使います。  
```sh
mysql> DROP TABLE todos;
Query OK, 1 row affected (0.05 sec)
```

`/app`の下に`database`ディレクトリを作成します。  
`cd`でそこに移動して`sequelize`の初期化をします。
```sh
$ sequelize init
```

下記の様なディレクトリ構成になればOKです。  
```sh
express-todo
└── app
    └── database
        ├── config
        │   └── config.json // dbに接続する際の情報が書かれたファイル
        ├── migrations      // テーブルのスキーマに従ってテーブルを作成するファイル
        ├── models          // テーブルのスキーマファイル置き場
        │   └── index.js
        └── seeders         // テーブルに入れたい初期データ置き場
```

では下記の順番で作成していきます！
1. モデルの作成(スキーマ作成)
2. マイグレーションの実行(テーブル作成)
3. シーディングの実行(データ投入)


#### モデルの作成
下記コマンドを実行します。  
```sh
$ sequelize model:create --name Todo --attributes title:string,content:string
```
コマンド一覧は`sequelize --help`で確認できます。
上で実行したコマンドは`Todoという名前のModelを作成する、titleとcontentカラムを追加する`といった内容です。

下記のようにログが流れればOKです。  
モデルとマイグレーションファイルを作成してくれていますね。
```sh
Sequelize CLI [Node: 12.18.2, CLI: 5.5.1, ORM: 5.22.3]

New model was created at ~/express-todo/app/database/models/todo.js .
New migration was created at ~/express-todo/app/database/migrations/20200720095103-Todo.js .
```

#### マイグレーションの実行
では前回つくったマイグレーションファイルを実行します。  
と、その前にDBへ接続するための情報を記入します。
`/config/config.json`を編集します。  
`development`や`production`などがありますが、今回は開発でしか使用しないので  
`development`のみ設定します。  
ちなみに`development` = **開発用**、`production` = **本番用**です。
```json
{
  "development": {
    "username": "root",
    "password": null,
    "database": "express_todo", // database名を編集
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

編集し終わったら実行しましょう。  
ログが流れたらOKです。
```sh
$ sequelize db:migrate

Loaded configuration file "config/config.json".
Using environment "development".
== 20200720095103-create-todo: migrating =======
== 20200720095103-create-todo: migrated (0.031s)
```

mysqlで確認してみるとしっかり作成されていますね！  
```sql
mysql> show tables;
+------------------------+
| Tables_in_express_todo |
+------------------------+
| SequelizeMeta          |
| Todos                  |
+------------------------+
2 rows in set (0.00 sec)

mysql> show columns from todos;
+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
| title     | varchar(255) | YES  |     | NULL    |                |
| content   | varchar(255) | YES  |     | NULL    |                |
| createdAt | datetime     | NO   |     | NULL    |                |
| updatedAt | datetime     | NO   |     | NULL    |                |
+-----------+--------------+------+-----+---------+----------------+
5 rows in set (0.02 sec)
```

#### シーディングの実行

では最後にテストデータを投入ましょう。  
シーディングファイルを作成します。  
```sh
$ sequelize seed:create --name test-todos
```

`New seed was created~`とログが出ればOKです！  
作成されたファイルを下記のように編集します。
```js
'use strict';

module.exports = {
  // `up`でデータを追加する実装をする
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('Todos', [
      {
        title: 'タイトル1',
        content: 'コンテンツ1',
        createdAt: now,
        updatedAt: now
      },
      {
        title: 'タイトル2',
        content: 'コンテンツ2',
        createdAt: now,
        updatedAt: now
      },
    ], {});
  },

  // `down`には`up`で行った処理を巻き戻す実装をする
  // 今回は全て消去
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {});
  }
};
```
では実行します。  
```sh
$ sequelize db:seed:all
```

ログが流れればOKです。  
mysqlで確認してみましょう。  
```sh
mysql> select * from todos;
+----+---------------+------------------+---------------------+---------------------+
| id | title         | content          | createdAt           | updatedAt           |
+----+---------------+------------------+---------------------+---------------------+
|  1 | タイトル1       | コンテンツ1       | 2020-07-20 13:23:43 | 2020-07-20 13:23:43 |
|  2 | タイトル2       | コンテンツ2       | 2020-07-20 13:23:43 | 2020-07-20 13:23:43 |
+----+---------------+------------------+---------------------+---------------------+
2 rows in set (0.00 sec)
```

ちゃんと追加されていますね！
**モデル**、**マイグレーション**、**シーディング**などはよく使う単語ですので、  
意味をしっかりと理解しておきましょう！

---

### Read(読み取り)の実装

ではデータベースの準備が一通り終わったので、  
データを取得して表示してみましょう！  
`app.js`を編集します。
```js
// app.js
const express = require('express');
const path = require('path');
const app = express();
const { Todo } = require('./database/models'); // 追加

// 省略

app.get('/todo', (req, res, next) => {
  Todo.findAll().then((todoList) => {
    res.render('index.ejs', {
      templateName: 'page/home.ejs',
      todoList, // 取得したレコード全件
    });
  });
});
// 省略
```

次に`home.ejs`を編集します。  
`JSON.stringify()`で文字列にしている理由は[こちら](https://qiita.com/camomile_cafe/items/d4e8ea250bf0ac521c2d)。
```html
// home.ejs
<h1>home</h1>
<%= JSON.stringify(todoList) %> // 追加
```

画面を更新して確認しましょう！  
レコードがちゃんと画面に表示されていますね！  
![image](https://res.cloudinary.com/gizumo-inc/image/upload/v1595213116/curriculums/Node.js%20Lesson/lesson09/1.png)

配列のまま表示されて見辛いので、`forEach`で繰り返し処理させて  
`ul`と`li`で整形しましょう！
```js
// home.ejs
<h1>home</h1>
// ここから編集
<ul>
  <% todoList.forEach((val) => { %>
    <li>
        <p>id: <%= val.id %></p>
        <p>タイトル: <%= val.title %></p>
        <p>内容: <%= val.content %></p>
    </li>
  <% }); %>
</ul>
// ここまで
```
変な書き方ですが、`<% todoList.forEach((val) => { %>`のように、  
`<% ~ %>`で囲むことでその中はJavaScriptワールドになるのでメソッドなどが使える様になります！


では画面を更新して確認しましょう！  
少しみやすくなりましたね！  
![image](https://res.cloudinary.com/gizumo-inc/image/upload/v1595213116/curriculums/Node.js%20Lesson/lesson09/2.png)

ですがまだ味気ないのでスタイルを当てましょう！  
`public`ディレクトリを作成します。  
```sh
express-todo
├── app
│   ├── app.js
│   ├── views
│   │   ├── index.ejs
│   │   ├── include
│   │   │   └── _head.ejs
│   │   └── page
│   │       ├── home.ejs
│   │       └── detail.ejs
│   └── public            // 追加
│       └── css           // 追加
│           ├── style.css // 追加
│           └── reset.css // 追加
```

`public`は静的なファイルを配置するためのディレクトリです。  
詳しくは[express公式](https://expressjs.com/ja/starter/static-files.html)に書いています。  
`app.js`を編集します。
```js
// app.js
// 省略
// viewsの場所を絶対pathで指定
app.set('views', path.join(__dirname, 'views'));

// テンプレートエンジンにejsを指定
app.set('view engine', 'ejs');

// 静的ファイルの読み込み
app.use(express.static(path.join(__dirname, 'public'))); // 追加
// 省略
```

次にcssを読み込ませたいので`_head.ejs`を編集します。
```html
// _head.ejs
<% const META_DATA = {
  title: "express-todo",
  viewport: "width=device-width, initial-scale=1.0",
  description: "このページはejsで構成されています。",
  keywords: "node.js, express, ejs",
  resetCss: '/css/reset.css', // 追加
  styleCss: '/css/style.css', // 追加
}; %>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="<%= META_DATA.viewport %>">
  <meta name="description" content="<%= META_DATA.description %>">
  <meta name="keywords" content="<%= META_DATA.keywords %>">
  <title><%= META_DATA.title %></title>
  <link rel="stylesheet" href="<%= META_DATA.resetCss %>"> // 追加
  <link rel="stylesheet" href="<%= META_DATA.styleCss %>"> // 追加
</head>
```

次に`reset.css`と`style.css`の編集です。  
```css
// reset.css
/*
html5doctor.com Reset Stylesheet
v1.6.1
Last Updated: 2010-09-17
Author: Richard Clark - http://richclarkdesign.com
Twitter: @rich_clark
*/

html, body, div, span, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
abbr, address, cite, code,
del, dfn, em, img, ins, kbd, q, samp,
small, strong, sub, sup, var,
b, i,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, figcaption, figure,
footer, header, hgroup, menu, nav, section, summary,
time, mark, audio, video {
  margin:0;
  padding:0;
  border:0;
  outline:0;
  font-size:100%;
  vertical-align:baseline;
  background:transparent;
}

body {
  line-height:1;
}

article,aside,details,figcaption,figure,
footer,header,hgroup,menu,nav,section {
  display:block;
}

nav ul {
  list-style:none;
}

blockquote, q {
  quotes:none;
}

blockquote:before, blockquote:after,
q:before, q:after {
  content:'';
  content:none;
}

a {
  margin:0;
  padding:0;
  font-size:100%;
  vertical-align:baseline;
  background:transparent;
}

/* change colours to suit your needs */
ins {
  background-color:#ff9;
  color:#000;
  text-decoration:none;
}

/* change colours to suit your needs */
mark {
  background-color:#ff9;
  color:#000;
  font-style:italic;
  font-weight:bold;
}

del {
  text-decoration: line-through;
}

abbr[title], dfn[title] {
  border-bottom:1px dotted;
  cursor:help;
}

table {
  border-collapse:collapse;
  border-spacing:0;
}

/* change border colour to suit your needs */
hr {
  display:block;
  height:1px;
  border:0;
  border-top:1px solid #cccccc;
  margin:1em 0;
  padding:0;
}

input, select {
  vertical-align:middle;
}
```

```css
// style.css
@charset "UTF-8";

.wrapper {
  padding: 20px;
  min-height: 100vh;
  box-sizing: border-box;
}

.list {
  padding: 20px;
  text-align: center;
  list-style: none;
  display: grid;
  grid-gap: 10px;
}

.list__item {
  border: dashed 2px #c0c0c0;
  padding: 10px;
  min-width: 30vw;
  justify-self: center;
}

.list__item p + p,
.list__actions {
  margin-top: 10px;
}

.addForm {
  text-align: center;
}
```

`index.ejs`と`home.ejs`も編集します。  
```html
// index.ejs
<!DOCTYPE html>
<html lang="ja">
<%- include('include/_head.ejs') %>
<body>
  <div class="wrapper"> // 追加
    <%- include(templateName) %>
  </div>
</body>
</html>
```
```html
// home.ejs
<ul class="list"> // 編集
  <% todoList.forEach((val) => { %>
    <li class="list__item"> // 編集
        <p>id: <%= val.id %></p>
        <p class="list__title">タイトル: <%= val.title %></p> // 編集
        <p class="list__content">内容: <%= val.content %></p> // 編集
    </li>
  <% }); %>
</ul>
```

では画面を更新して表示を確認します。  
見やすくなりましたね！  
次はCreate(作成)機能を作成しましょう！
![image](https://res.cloudinary.com/gizumo-inc/image/upload/v1595213116/curriculums/Node.js%20Lesson/lesson09/3.png)
