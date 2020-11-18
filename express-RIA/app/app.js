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

app.use(methodOverride('_method'));

app.get('/todo', (req, res, next) => {
  Todo.findAll().then((todoList) => {
    res.render('index.ejs', {
      templateName: 'page/home.ejs',
      todoList, // 取得したレコード全件
    });
  });
});

app.post('/todo', (req, res, next) => {
  const param = {
    title: req.body['todo-title'],
    content: req.body['todo-content'],
  };

  Todo.create(param).then(() => {
    res.redirect('/todo');
  }).catch(() => {
    res.send({ error: 'エラーが起きました。' });
  });
});

// 詳細のルーティング
app.get('/todo/:id', (req, res, next) => {
  Todo.findByPk(req.params.id).then((todo) => {
    res.render('index.ejs', {
      templateName: 'page/detail.ejs',
      todo,
    });
  });
});

app.put('/todo/:id', (req, res, next) => {
  Todo.update({
      title: req.body['todo-title'],
      content: req.body['todo-content'],
    }, {
      where: {
        id: req.params.id,
      },
    }
  ).then(() => {
    res.redirect('/todo');
  });
});

app.delete('/todo/:id', async (req, res, next) => {
  Todo.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.redirect('/todo');
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
