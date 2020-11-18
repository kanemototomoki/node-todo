# 環境構築

https://dev.classmethod.jp/articles/how-to-install-node-using-nvm/

## 環境構築の流れ
---

Node.jsの環境構築には**nvm**がおすすめです！  
`Node Version Manager` の略で、Node.jsの複数のバージョンを管理できて切り替えも可能です。  
複数のバージョンを使い分けない場合でも、Node.jsのアップデートを簡単に行えるので便利です。
なので今回はnvmを使って環境構築をします！

### Macの流れ
1. Homebrewのインストール
2. nvmのインストール
3. Node.jsのインストール

### Windowsの流れ
1. nvm-windowsのインストール
2. Node.jsのインストール

## Mac

ここからは主にターミナルでの作業になります！

---

### 1. Homebrewのインストール

※ 下記コマンドでバージョンが表示される方は**nvmのインストール**へ！
```sh
$ brew -v
```

[こちら](http://giztech.gizumo-inc.work/categories/8/90)の**Homebrewの導入**を参考に作業してください。


### 2. nvmのインストール

※ 下記コマンドでバージョンが表示される方は**Node.jsのインストール**へ！
```sh
$ nvm -version
```

nvmのインストールをします。

```sh
$ brew install nvm
```

実行後、バージョンの確認をします。
```sh
$ nvm --version
0.35.3
```

### 3. Node.jsのインストール
※ 下記コマンドで**バージョンが表示される**方は、  
[こちら](https://qiita.com/wagi0716/items/94193a80502f9d81a9e0)を参考に一度Node.jsをアンインストールしましょう。


LTSのNode.js一覧を確認します。  
```sh
$ nvm ls-remote --lts | grep Latest
        v4.9.1   (Latest LTS: Argon)
        v6.17.1   (Latest LTS: Boron)
        v8.17.0   (Latest LTS: Carbon)
       v10.21.0   (Latest LTS: Dubnium)
       v12.18.2   (Latest LTS: Erbium)
```

今回はv12を使いたいのでv12をインストールします。
```sh
nvm install v12.18.2
```

使用するNode.jsのバージョンを設定します。
```sh
$ nvm alias default v12.18.2 (defaultで使用するバージョンの指定)
$ nvm use v12.18.2 (使うバージョンの指定)
```

実行後、バージョンの確認をします。  
ついでにnpmのバージョンも確認しましょう。
```sh
$ node -v
12.18.2
$ npm -v
6.13.4
```

## Windows

ここからは主にコマンドプロンプト(cmd)での作業になります！

---

### 1. nvm-windowsのインストール
[こちら](https://github.com/coreybutler/nvm-windows/releases/download/1.1.7/nvm-setup.zip)をクリックしてsetupのzipファイルをダウンロードします。  
ダウンロードが終わったら展開して、中の**nvm-setup.exe**を実行します。  
※ すでにNode.jsが入っている場合はnvmの管理下に置くか聞かれますので、YesでOKです。

nvmのバージョンを確認します。  
```sh
$ nvm v
1.1.5
```

### 2. Node.jsのインストール

# TODO
