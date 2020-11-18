# CRUD機能を実装しよう -Update,Delete編-

## さっそく実装
---

### Update(更新)とDelete(削除)の実装
todoの詳細ページを作り、そこに更新ボタンと削除ボタンを配置したいので  
`home.ejs`に詳細ボタン、  
`detail.ejs`に更新ボタンと削除ボタンをそれぞれ配置しましょう。
`home.ejs`と`detail.ejs`を編集します。
```html
// home.ejs
<li class="list__item">
  <p>id: <%= val.id %></p>
  <p class="list__title">タイトル: <%= val.title %></p>
  <p class="list__content">内容: <%= val.content %></p>
  // ↓以下を追加
  <div class="list__actions">
    <a type="button" href="/todo/<%= val.id %>">詳細</a>
  </div>
</li>
```

```html
// detail.ejs
<form class="editForm" method="POST">
  <label>タイトル:
    <input name="todo-title" value="<%= todo.title %>">
  </label>
  <label>内容:
    <input name="todo-content" value="<%= todo.content %>">
  </label>
  <div class="list__actions">
    <input type="submit" class="edit__button" value="更新">
    <input type="submit" class="delete__button" value="削除">
  </div>
</form>
```

`app.js`の方も、`/todo/:id`にGETリクエストがきたら  
そのIDのレコードのみ取得して返すように変更しましょう。
```js
// app.js
// 詳細のルーティング
app.get('/todo/:id', (req, res, next) => {
  Todo.findByPk(req.params.id).then((todo) => {
    res.render('index.ejs', {
      templateName: 'page/detail.ejs',
      todo,
    });
  });
});
```

ではID:1のtodoを開いてみましょう。  
ちゃんと取得できていますね！  
![image](https://res.cloudinary.com/gizumo-inc/image/upload/v1595899234/curriculums/Node.js%20Lesson/lesson11/1.png)

次に更新ボタンの実装をしたいのですが、HTML5のformは **GET**と**POST** しかサポートしていません。  
今回は **PUT**と**DELETE**も使いたいので、一手間加えてあげる必要があります。  
詳しくは[こちら](http://expressjs.com/en/resources/middleware/method-override.html)  
ざっくり説明すると、**POST**で送信されたデータの中に **`_method=xxx`** の文字列が存在すれば  
**PUT**か**DELETE**として解釈しますよ、ということです。

まずは`method-override`というパッケージをインストールします。
```sh
$ npm i method-override
```

次に`app.js`を編集します。
```js
// app.js
const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override'); // 追加

const { Todo } = require('./database/models');

// viewsの場所を絶対pathで指定
app.set('views', path.join(__dirname, 'views'));

// テンプレートエンジンにejsを指定
app.set('view engine', 'ejs');

// 静的ファイルの読み込み
app.use(express.static(path.join(__dirname, 'public')));

// form送信などをPOSTで受け取る際に
// dataがbodyで送られてくるのでそれで必要な処理
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ******************** ↓追加 *****************
app.use(methodOverride('_method'));
// ...省略

// 詳細のルーティング
app.get('/todo/:id', (req, res, next) => {
  Todo.findByPk(req.params.id).then((todo) => {
    res.render('index.ejs', {
      templateName: 'page/detail.ejs',
      todo,
    });
  });
});

// ******************** ↓追加 *****************
// とりあえず確認のため `ok` を返すだけ
app.put('/todo/:id', (req, res, next) => {
  res.send('ok');
});

// 省略
```

`detail.ejs`を編集します。  
**更新ボタン**のところだけ編集しましょう。
```html
// detail.ejs
// ...省略
<div class="list__actions">
  <input type="submit" class="edit__button" value="更新" formaction="/todo/<%= todo.id %>?_method=PUT">
  <input type="submit" class="delete__button" value="削除">
</div>
// ...省略
```

では実際に更新ボタンを押して表示を確認しましょう！  
![image](https://res.cloudinary.com/gizumo-inc/image/upload/v1595902521/curriculums/Node.js%20Lesson/lesson11/2.png)

ちゃんと表示されてますね！  
URLに `?_method~` が付いて不格好ですが、PUTやDELETEの際は  
他のページへリダイレクトさせればいいので、気にしなくてOKです！

### 課題: 更新と削除を実装してみよう
---

ではようやく処理の実装をしたいと思いますが、**自力**でやってみましょう！  
更新、削除が成功したら `/todo` にリダイレクトさせましょう。  
また、実装が終われば一度レビューを行いましょう！  
#### 確認項目
1. todoの追加が出来るか
2. todoの詳細を取得できるか
3. todoの更新が出来るか
4. todoの削除が出来るか
5. mysql上でレコードの操作が出来るか
```js
// app.js

// ...省略
app.put('/todo/:id', (req, res, next) => {
  // ここを実装
});

app.delete('/todo/:id', (req, res, next) => {
  // ここを実装
});
// ...省略
```
