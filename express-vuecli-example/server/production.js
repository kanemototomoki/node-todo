// 本番環境のプロセス実行に使用するファイル、参考までに
// 本番環境のプロセスを半永久的にデーモン化するforeverとかと組み合わせて使用

const { resolve } = require('path');
const history = require('connect-history-api-fallback');
const express = require('express');
const configureAPI = require('./config.js');
const app = express();

const { PORT = 3000 } = process.env;

// API
configureAPI(app);

// UI
const publicPath = resolve(__dirname, '../client/dist');
const staticConf = { maxAge: '1y', etag: false };

app.use(express.static(publicPath, staticConf));
app.use('/', history());

// Go
app.listen(PORT, () => console.log(`App running on port ${PORT}!`));