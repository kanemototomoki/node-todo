# Node.jsについて学ぼう

## Node.jsとは？
---

簡単に説明すると**サーバーサイドのJavaScript実行環境**のことです。
`GoogleChrome`や`FireFox`などのブラウザの中には**JavaScriptエンジン**という**JavaScriptの実行環境**が入っています。(`V8`や`SpiderMonkey`など)  
そのJavaScriptエンジン単体を抜き出して、サーバーサイド用にカスタマイズしたものが**Node.js**です！


## Node.jsの特徴
---

Node.jsの特徴を以下に羅列しますが、よく分からないと思います！  
なので頭の片隅に置いといておく感じで覚えておいてください！  
**必要になったタイミングで深く調べればOK**です！

### ノンブロッキングI/O
  - 非同期I/O(input/output)
  - 大量のアクセスに強い
  - C10K問題に対応できる
### イベントループモデル
  - 対義語はスレッドモデル
### イベントドリブン
  - デフォルトは待機状態でプログラムが待っており、  
    ユーザーが何かしらの操作(アクション)をしたときに初めて実行される。
### シングルスレッド
  - 複数のアクセスがあってもCPUのスレッド数が増えない


## クライアントサイドのJavaScriptと何が違うの？
---

分かりやすいもので言えば`Node.js`にはファイルを操作するAPIが存在します！  
実際に試してみましょう！
下記の構成でディレクトリを用意してください。
```sh
node-test
├── main.js
└── test.json
```

ファイルの中身は下記を書いてください。

```js
// main.js
const fs = require('fs');

const result = fs.readFileSync('./test.json', 'utf-8');

console.log(JSON.parse(result).title);
```

```json
// test.json
{
  "title": "node.js 最高!!"
}
```

そしてターミナルで `/node-test` に移動して  
```sh
$ node main.js
```
で実行してみましょう！
すると、 **`node.js 最高!!`** がターミナルに表示されると思います。  
ではコードの解説をしたいと思います！

```js 
const fs = require('fs');
const result = fs.readFileSync('./test.json', 'utf-8');
console.log(JSON.parse(result).title);
```

1行目は`require()`で`fsモジュール`を読み込んでいます。fileSystemの略です。  
`fs`使います！って宣言みたいなものですね！  
モジュールについては後述で詳しく解説します！

2行目は`fs`の`readFileSync()`で同階層の`test.json`を`utf-8`形式で読み込んで、  
変数`result`に代入しています。

3行目は`json.parse()`でJSONオブジェクトにしてtitleを表示しています。  
JSONのままだとJavaScriptで扱えないので、面倒ですがこういう記述になっています！

## Node.jsでよく使う(出てくる)単語

### nvm
Node Version Managerの略。開発においてNodeのバージョンを切り替えることが多いので、必須です。

### npm
Node Package Managerの略。node.jsと一緒についてきます。  
後述する`node_modules`を管理するためのツールです。  
`npm install` や `npm run start` などコマンドでよく使います。


### node_modules
後述するモジュールが集められたフォルダのこと。  
サイズがめちゃくちゃでかいのでgit管理しないこと！！

### express
フレームワーク。よく使われています。  
拡張性がある = 大した機能がないので、いろいろ自分で実装してあげないといけない。

### モジュール
node.jsではモジュールという単位で各機能を分割して管理しています。  
よく使うものが **`module.exports`** と **`require()`** です。  
`module.exports = test`で`test`という名前のモジュールを作成。  
`require('test')`でモジュールを読み込んでいます。

### LTS
Long Term Supportの略。長い期間サポートしますよーってことですね。  
偶数バージョンがLTSに選ばれます。  
実務で使う際はLTSのものをしっかり選びましょう！！  
[node.js公式](https://nodejs.org/ja/download/)

これより詳しいことは公式ドキュメントを見るのが早いので気になった人は調べてみましょう！  
次のセクションでは環境構築に入ります！
