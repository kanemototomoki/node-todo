# CRUD機能を実装しよう -Create編-

## CRUDって？(前回のおさらい)
---

CRUD(クラッド)機能とは、  
  - Create(作成)
  - Read(読み取り)
  - Update(更新)
  - Delete(削除)

の頭文字を並べた用語です。  
アプリケーションやシステムを作る際の主要機能なのでしっかりと理解しましょう！

## いざ実装
---

### Create(作成)の実装
todoを追加するためのformを用意しましょう。
新しく`components`ディレクトリを作成します。  
```sh
express-todo
├── app
│   ├── app.js
│   ├── views
│   │   ├── index.ejs
│   │   ├── include
│   │   │   └── _head.ejs
│   │   ├── page
│   │   │   ├── home.ejs
│   │   │   └── detail.ejs
│   │   └── components          // 追加
│   │       └── addTodoForm.ejs // 追加
// 省略
```
`addTodoForm.ejs`を編集します。  
```html
// addTodoForm.ejs
<form action="/todo" method="POST" class="addForm">
  <input type="text" name="todo-title" placeholder="タイトルを入力してね">
  <input type="text" name="todo-content" placeholder="内容を入力してね">
  <input type="submit" value="Todoを追加する">
</form>
```

`home.ejs`で呼び出します。  
```html
// home.ejs
<%- include('../components/addTodoForm.ejs') %> // 追加
<ul class="list">
  <% todoList.forEach((val) => { %>
  // 省略
```

では適当に入力して`Todoを追加する`を押してみましょう！  
このとき、`<form action="/todo" method="POST" class="form">`  
となっているので`/todo`に対して`POST`でリクエストを送っています。
![image](https://res.cloudinary.com/gizumo-inc/image/upload/v1595215409/curriculums/Node.js%20Lesson/lesson10/1.png)

するとどうでしょう？  
エラーページに飛ばされたと思います。  
エラーの理由としてはサーバー側で**レスポンスを返していない**のが原因です。  
ですのでサーバー側、つまり`app.js`を編集してレスポンスを返すようにしてみましょう！
![image](https://res.cloudinary.com/gizumo-inc/image/upload/v1595220467/curriculums/Node.js%20Lesson/lesson10/2.png)

`app.js`を編集します。  
```js
// app.js
// 省略
// 静的ファイルの読み込み
app.use(express.static(path.join(__dirname, 'public')));

// form送信などをPOSTで受け取る際に
// dataがbodyで送られてくるのでそれで必要な処理
app.use(express.urlencoded({ extended: true })); // 追加
app.use(express.json());                         // 追加

app.get('/todo', (req, res, next) => {
  Todo.findAll().then((todoList) => {
    res.render('index.ejs', {
      templateName: 'page/home.ejs',
      todoList, // 取得したレコード全件
    });
  });
});

// formから送られてきた内容はreq.bodyにある
app.post('/todo', (req, res, next) => { // 追加
  console.log(req.body);                // 追加
  res.send(req.body);                   // 追加
});
// 省略
```

では画面を更新して、適当に文字を入力して送信してみましょう！  
入力した内容が`[name属性]: inputのvalue`としてオブジェクト形式で確認できますね！  
次はこれをDBに保存する処理を書きましょう！
![image](https://res.cloudinary.com/gizumo-inc/image/upload/v1595221462/curriculums/Node.js%20Lesson/lesson10/3.png)

`app.js`を編集します。  
`app.post('/todo)`の中を編集しましょう！
```js
// app.js
app.post('/todo', (req, res, next) => {
  const param = {
    title: req.body['todo-title'],
    content: req.body['todo-content'],
  };

  Todo.create(param).then(() => {
    // DBに追加成功したら`/todo`にリダイレクト
    res.redirect('/todo');
  }).catch(() => {
    // 何かしらエラーが起きたらこっち
    res.send({ error: 'エラーが起きました。' });
  });
});
```

では先ほどのように内容を入力して、`Todoを追加する`を押してみましょう！  
今度は追加されて画面が更新されたかと思います！  
また、コンソールにこのようなログが流れていると思います。  
```sh
Executing (default): INSERT INTO `Todos` (`id`,`title`,`content`,`createdAt`,`updatedAt`) VALUES (DEFAULT,?,?,?,?);
Executing (default): SELECT `id`, `title`, `content`, `createdAt`, `updatedAt` FROM `Todos` AS `Todo`;
```

`INSERT INTO~`から始まる上の行は`Todo.create(param)`の処理が実行された時に、  
内部で走っているクエリです。  
`SELECT~` の方は`/todo`にリダイレクトされたとき`/todo`にGETでリクエストされるので、  
`Todo.findAll()`のクエリですね！  
**ORM**を使えばクエリを書かずにDBを操作できるので便利ですね！  
ただし**デメリットもある**ので、この辺りは調べてみてください！
次回は更新と削除を実装します！
