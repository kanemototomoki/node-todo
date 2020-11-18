# mysqlを導入しよう

## レッスンを進める際に参考になる資料
---

- [mysqlの使い方](https://www.dbonline.jp/mysql/)

## mysqlとは？
---

**mysql**とはデータベース(DB)の一つです！  
アプリケーションを作る際に必ず使うので、これを機に  
どんなものなのか理解しましょう！

## インストールしよう
---

### mysqlがすでに入っているか確認
今回は`mysql@5.7`を使いたいので、すでに入っているかチェックします。  
場所はどこでもいいので下記コマンドを実行しましょう！  
```sh
$ which mysql
```

下記の様に`mysql@5.7`が入ってればOKです！  
**mysqlに接続してみよう**まで飛ばしてください。
```sh
/usr/local/opt/mysql@5.7/bin/mysql
```
[こちら](http://giztech.gizumo-inc.work/categories/8/90)の**MySQLのインストール**を参考に作業します。  

## mysqlに接続してみよう
---

mysqlに接続してみましょう！  
`mysql -uroot`の後に以下が表示されれば接続できています！  
以降はmysqlに接続した状態で作業を行います。
```sh
$ mysql -uroot

Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 462
Server version: 5.7.29 Homebrew

Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> 
```

## mysqlを触ってみよう
---

### データベースを作成しよう

まずは現在のデータベースを確認します。   
`show databases;`を入力します。  
初期から入っているデータベースのみが存在してますね。  


```sh
mysql> show databases;

+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.00 sec)

mysql> 
```

では次に`express_todo`という名前のデータベースを作成します。  
**CREATE DATABASE文**を使います。  
`Query OK...`と出てますね。  
`Query`(クエリ)というのは自分が入力した命令文のことです。  
それが`OK`なのでうまくいったよ！ということですね！
```sql
mysql> CREATE DATABASE express_todo;

Query OK, 1 row affected (0.00 sec)
```

データーベースがちゃんと作成されたか確認します。  
`express_todo`の項目が増えてますね！
```sh
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| express_todo       |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.01 sec)

mysql> 
```

### テーブルを作成しよう

まず使用するデータベースを選択します。
```sql
mysql> use express_todo;
Database changed
```

`todos`テーブルを作成しましょう。  
**CREATE TABLE文**を使います。
```sql
mysql> CREATE TABLE todos (id int not null primary key auto_increment, title varchar(255), content varchar(255));
Query OK, 0 rows affected (0.03 sec)
```

作成した`todos`テーブルのカラムを確認しましょう。  
色々書いていますが、説明は省きます。気になったら調べてみましょう。

```sql
mysql> show columns from todos;
+---------+--------------+------+-----+---------+----------------+
| Field   | Type         | Null | Key | Default | Extra          |
+---------+--------------+------+-----+---------+----------------+
| id      | int(11)      | NO   | PRI | NULL    | auto_increment |
| title   | varchar(255) | YES  |     | NULL    |                |
| content | varchar(255) | YES  |     | NULL    |                |
+---------+--------------+------+-----+---------+----------------+
3 rows in set (0.00 sec)
```

### データを入れてみよう

試しにデータ(レコードとも言います)を入れてみましょう。  
**INSERT文**を使います。  
```sql
mysql> INSERT INTO todos (title, content) VALUES ('タイトル1', 'コンテンツ1'), ('タイトル2', 'コンテンツ2');
Query OK, 2 rows affected (0.01 sec)
Records: 2  Duplicates: 0  Warnings: 0
```

レコードを確認します。  
**SELECT文**を使います。  
ちゃんと2つのレコードが入ってますね！
```sql
mysql> SELECT * FROM todos;
+----+---------------+------------------+
| id | title         | content          |
+----+---------------+------------------+
|  1 | タイトル1      | コンテンツ1        |
|  2 | タイトル2      | コンテンツ2        |
+----+---------------+------------------+
2 rows in set (0.00 sec)
```

## まとめ
以上、基本的なSQL文を紹介しました。  
次回からはexpressから先ほどのSQL文を発行して、  
データの取得や追加を行いたいと思います！
