# expressを使ってみよう

## expressとは？
---

expressとはNode.jsのフレームワークです！  
軽量で自由度が高いので人気があります。  
詳しく知りたい人は下記公式で調べてみましょう。
[express公式](https://expressjs.com/ja/)  

## 実際に触ってみよう
---

実際に動かすほうが早いので下記コマンドを順に実行していきましょう！

```sh
$ cd 任意のディレクトリ(デスクトップやドキュメントなどあなたが作業しやすいディレクトリ)
$ mkdir express-test (ディレクトリの作成)
$ cd express-test
$ npm init -y (package.jsonの作成)
$ npm i express (expressのインストール)
$ touch app.js (ファイルの作成)
```

次に `app.js` を編集します！  
コードの意味はコメントアウトを参考にしてください。

```js
// expressモジュールを読み込む
// expressをインスタンス化してappに代入
const express = require('express');
const app = express();

// '/'にgetでアクセスすると 'express!' を返す
app.get('/', (req, res, next) => {
  res.send('express!');
});

// '/hello'にgetでアクセスすると 'hello world' を返す
app.get('/hello', (req, res, next) => {
  res.send('hello world!');
})

// 3000番でポートを開く
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

```

ではコードを実行しましょう！  
`Server started...`が表示されればOKです！

```sh
$ node app.js
Server started on port 3000
```

では`http://localhost:3000`にアクセスしてみましょう！  
![image](https://res.cloudinary.com/gizumo-inc/image/upload/v1595213116/curriculums/Node.js%20Lesson/lesson05/express_home.png)  
次に`http://localhost:3000/hello`へアクセス。  
![image](https://res.cloudinary.com/gizumo-inc/image/upload/v1595213116/curriculums/Node.js%20Lesson/lesson05/express_hello.png)  

うまく表示されていればOKです！  
表示は確認できたので、ターミナル上で`control + c` でサーバーを停止しましょう。  
このように先ほどの10行程度のコードで、Webサーバーの立ち上げとルーティングができました。便利ですね！  
この次からexpressを用いて簡単なTODOアプリを作っていきます！
