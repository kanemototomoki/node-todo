# MVCに切り分けよう

## MVCとは？
---

[こちら](http://giztech.gizumo-inc.work/categories/14/103)を読んでください！  
現状のコードはほとんどの処理を **`app.js`** に記述しています。  
まだページ数が少ないのでそこまで辛くはないですが、ページ数やDBのテーブル数が増えると  
とても大きなファイルになって編集が大変になります。  
ですのでMVCのように処理を分ける手法はよく使用されます。  
詳しい説明はネットに山ほどあるので調べてください。  
これを機に覚えましょう！

### M ...Model
データ関連を担当します。  
DBへのCRUD処理などを実装します。

### V ...View
表示を担当します。  
ユーザーからの入力を受け取ったり、ユーザーの求めた情報を表示したりなど、  
ユーザーと直接やりとりをするのはここだけです。

### C ...controller
司令塔です。  
あれしてこれしてという指示のみを実装します。  

---

`view` はすでに存在するので、 `models` と `controllers` 、そして `routes` ディレクトリを、  
その下にそれぞれの`js`ファイルを配置します。  
※基本的にモデルやコントローラーは複数存在するのでディレクトリ名を複数形にします。
```sh
app
├── database
├── public
├── views
├── app.js
├── models                 // 追加
│   └── Todo.js            // 追加
├── controllers            // 追加
│   └── TodoController.js  // 追加
└── routes                 // 追加
    └── todo.js            // 追加
```

`models`と`controllers`については上のリンクで説明しているので割愛します。  
`routes`に関してですが **`app.get~`** や **`app.post~`** といったような[ルーティング](https://expressjs.com/ja/guide/routing.html)もフォルダで分けた方が管理しやすいので分けましょう。

ではそれぞれのファイルを編集していきます。

`Todo.js`を編集します。  
**データベースとのやりとり**は全てここに集約させます。
```js
// Todo.js
const { Todo } = require('../database/models');

const TodoModel = {
  getAllTodo: () => {
    return Todo.findAll().then((todoList) => {
      return todoList;
    });
  },
  getTodoById: (id) => {
    // ここを実装してね
  },
  addTodo: (params) => {
    // ここを実装してね
  },
  updateTodoById: (id, params) => {
    // ここを実装してね
  },
  deleteTodoById: (id) => {
    // ここを実装してね
  },
};

module.exports = TodoModel;
```

`TodoController.js`を編集します。  
モデルでの処理が全て非同期なので`async`を使用します。  
参考: [非同期処理とは？](http://giztech.gizumo-inc.work/categories/12/132)

```js
// TodoController.js
const Todo = require('../model/Todo');

module.exports = {
  getAllTodo: async (req, res, next) => {
    const todoList = await Todo.getAllTodo();
    res.render('index.ejs', {
      templateName: 'page/home.ejs',
      todoList,
    });
  },
  getTodoById: async (req, res, next) => {
    // ここを実装してね
  },
  addTodo: async (req, res, next) => {
    // ここを実装してね
  },
  updateTodoById: async (req, res, next) => {
    // ここを実装してね
  },
  deleteTodoById: async (req, res, next) => {
    // ここを実装してね
  },
}

```

`route.js`を編集します。  
`router.get()`の第一引数で対応するpathを、  
第二引数で実行するメソッドを呼んでいます。
```js
// route.js
const express = require('express');
const router = express.Router();
const todoController = require('../controller/TodoController');

// メソッドチェーン！
// 一覧のルーティング
router
  .get('/todo', todoController.getAllTodo)
  .post('/todo', todoController.addTodo);

// 詳細のルーティング
router
  .get('/todo/:id', todoController.getTodoById)
  .put('/todo/:id', todoController.updateTodoById)
  .delete('/todo/:id', todoController.deleteTodoById);

// `app.js` で使うためにモジュール化する
module.exports = router;
```

`app.js`を編集します。  
ルーティング関連とCRUD処理を他のファイルに分けたのですっきりしました！
```js
// app.js
const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const router = require('./routes/route'); // 追加

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

// 第一引数の`/`は暗黙的に先頭部分に `http://localhost:3000` が追加される 
// 上記のurlにアクセスがきたら第二引数のrouteが呼ばれる
app.use('/', router); // 追加

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
```

ではここまで実装できたら`/todo`にアクセスしてちゃんと画面が表示されるか確認しましょう！  
うまく表示されたら、他の機能もそれぞれのファイルに実装していきましょう！  
また、たまに出てくる **`module.exports`** が何をしているか理解して欲しい(フワッとでいい)ので、  
[こちら](https://www.webdesignleaves.com/pr/jquery/node-js-module-exports.html) や自分で調べたりして理解を深めてください！
