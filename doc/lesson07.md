# 画面を表示しよう

## レッスンを進める際に参考になる資料
- [ejsの構文一覧](https://qiita.com/y_hokkey/items/31f1daa6cecb5f4ea4c9)
- [ejsの使い方](https://haniwaman.com/ejs/)

## ディレクトリの準備
---

コマンドを叩いてディレクトリを作っていきましょう。  
作業する場所はデスクトップやドキュメントなどアクセスしやすい場所にしましょう！  
```sh
$ mkdir express-todo && cd express-todo
$ mkdir app && touch app/app.js
$ npm init -y
$ npm i express
```

このような構成になってればOKです！
```sh
express-todo
├── app
│   └── app.js
├── package.json
├── package-lock.json
└── node_modules
```

次にルーティングを行います！  
今回表示する画面としては`/todo`と`/todo/:id`の2画面ですね！  
ちなみにこの`/:id`という書き方は**動的ルートマッチング**と言います。  
よく使われるので覚えておきましょう！  
詳しくは[こちら](https://expressjs.com/ja/guide/routing.html)に載っています。  

`app.js`を編集します。

```js
// app.js
const express = require('express');
const app = express();

// 一覧のルーティング
app.get('/todo', (req, res, next) => {
  res.send('/todoにアクセス！');
});

// 詳細のルーティング
app.get('/todo/:id', (req, res, next) =>{
  // req.paramsに動的なパラメータが入ってくる
  res.send(`/todo/${req.params.id}にアクセス！`);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
```

`$ node app.js`で動作確認が取れたらOKです！  
`control + c`でプロセスを停止させましょう。

## ejsを使ってみよう
---

では次に`ejs`を導入しましょう！  
`ejs`とは、**テンプレートエンジン**のことです。  
`ejs` も `テンプレートエンジン` も聞いたことがないと思います。  
分かりやすく説明すると、HTML内にプログラムのロジックを書けるものです。  
ページのタイトルだけ変数にしてそのほかは使い回す、といった使い方が可能になります。  
実際に触ってみましょう！

まずは`ejs`をインストールします。
```sh
$ npm i ejs
```

次にapp.jsを編集します。

```js
// app.js
const express = require('express');
const path = require('path'); // 追加
const app = express();

// viewsの場所を絶対pathで指定
app.set('views', path.join(__dirname, 'views')); // 追加

// テンプレートエンジンにejsを指定
app.set('view engine', 'ejs'); // 追加

// 一覧のルーティング
app.get('/todo', (req, res, next) => {
  // renderメソッドでリクエストが来たらindex.ejsを表示させる
  // 第二引数を設定することでindex.ejsに値を渡せる
  res.render('index.ejs', { title: 'ejs!' }); // 編集
});
// 省略
```

`views`ディレクトリとその下に`index.ejs`を作成します。
```html
// index.ejs
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= title %></title>
</head>
<body>
  <h1><%= title %></h1>
</body>
</html>
```

```sh
express-todo
├── app
│   ├── app.js
│   └── views // 追加
│       └── index.ejs // 追加
├── package.json
├── package-lock.json
└── node_modules
```

ここまで来たら一度ブラウザで確認しましょう！  
`/todo`にアクセスした際下記のようになっていればOKです！  
ページのタイトル(タブのところ)とh1タグの部分が`ejs!`になっていることが確認できますね！  
![image](https://res.cloudinary.com/gizumo-inc/image/upload/v1595213117/curriculums/Node.js%20Lesson/lesson07/1.png)

次は`/todo/1`にアクセスしてみましょう。  
こちらは特に何もしていないので、タイトルがURLのままになっています。  
見栄えが悪いので、タイトルなどの`head`部分を共通化しましょう！
![image](https://res.cloudinary.com/gizumo-inc/image/upload/v1595213116/curriculums/Node.js%20Lesson/lesson07/2.png)

### 共通化しよう
---

`include`ディレクトリと`_head.ejs`を作成します。  
共通ファイルには`_`(アンダーバー)を先頭につけます。
```shell
express-todo
├── app
│   ├── app.js
│   └── views
│       ├── index.ejs
│       └── include // 追加
│           └── _head.ejs // 追加
├── package.json
├── package-lock.json
└── node_modules
```

```html
// _head.ejs
<% const META_DATA = {
  title: "express-todo",
  viewport: "width=device-width, initial-scale=1.0",
  description: "このページはejsで構成されています。",
  keywords: "node.js, express, ejs",
}; %>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="<%= META_DATA.viewport %>">
  <meta name="description" content="<%= META_DATA.description %>">
  <meta name="keywords" content="<%= META_DATA.keywords %>">
  <title><%= META_DATA.title %></title>
</head>
```

次に`index.ejs`を編集します。  

```html
// index.ejs
<!DOCTYPE html>
<html lang="ja">
<%- include('include/_head.ejs') %> // 編集
<body>
</body>
</html>
```

次にapp.jsを編集します。
```js
// app.js
// 省略

// 一覧のルーティング
app.get('/todo', (req, res, next) => {
  res.render('index.ejs'); // 編集
});

// 詳細のルーティング
app.get('/todo/:id', (req, res, next) =>{
  res.render('index.ejs'); // 編集
});

// 省略
```

ではサーバーを再起動して表示を確認してみましょう！  
`/todo`にアクセスしてデベロッパーツールの`source`を確認すると  
`head`部分に`include/_head.ejs`で記入した内容が適用されていますね！  
`/todo/:id`も同様の状態になっています。  
![image](https://res.cloudinary.com/gizumo-inc/image/upload/v1595213116/curriculums/Node.js%20Lesson/lesson07/3.png)

### pageごとのejsも用意しよう
---

今回は`/todo`と`/todo:id`の2画面が存在していますね！  
この2画面もそれぞれejsで用意してあげましょう！
`/views`の下に`page`ディレクトリを追加します。  
その下に`home.ejs`と`detail.ejs`を追加します。  
```sh
express-todo
├── app
│   ├── app.js
│   └── views
│       ├── index.ejs
│       ├── include
│       │   └── _head.ejs
│       └── page // 追加
│           ├── home.ejs // 追加
│           └── detail.ejs // 追加
├── package.json
├── package-lock.json
└── node_modules
```

index.ejsを編集します。
```html
// index.ejs
<!DOCTYPE html>
<html lang="ja">
<%- include('include/_head.ejs') %>
<body>
  <%- include(templateName) %> // 追加
</body>
</html>
```

app.jsを編集します。  
`render()`の第二引数で表示したいejsのパスを渡しています。
```js
// app.js
// 省略
// 一覧のルーティング
app.get('/todo', (req, res, next) => {
  res.render('index.ejs', { templateName: 'page/home.ejs' });
});

// 詳細のルーティング
app.get('/todo/:id', (req, res, next) =>{
  res.render('index.ejs', { templateName: 'page/detail.ejs' });
});
// 省略
```

`home.ejs`と`page.ejs`を編集します。
```html
// home.ejs
<h1>home</h1>
```
```html
// detail.ejs
<h1>detail</h1>
```

ではサーバーを再起動して表示を確認しましょう！  
エラーが出ず、ちゃんと表示できればOKです！


### まとめ
---

このように複数ページある場合などで共通で使いたいものは、  
**includeディレクトリ**の中に`_xxx.ejs`で登録。  
呼び出すときは`<%- include(呼び出したいファイルの相対パス) %>`で呼び出せます！  
