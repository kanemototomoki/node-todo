# expressでTODOアプリを作ってみよう

## 概要説明

---
みんな大好きTODOアプリを作りましょう！  
TODOアプリには、アプリケーションの基本となる**CRUD機能**を取り入れやすいので  
新しい言語、新しいFWを触る際にはTODOアプリを作ることをオススメします！

### 学べること
- expressの使い方
- mysqlの使い方
- SQL文の書き方
- MVCモデル
- RESTFul API

### アーキテクチャ 

|| version |
|:-:|:-:|
| Node.js | 12.x |
| MySQL | 5.7 |
| express | 4.x |

### 実装する機能
1. CRUD機能
   - Create(作成)
   - Read(読み取り)
   - Update(更新)
   - Delete(削除)
2. セキュリティ関連
   - CSRF対策
   - SQLインジェクション対策

### 画面構成

| 画面名 | URI |
|:-:|:-:|
| 一覧 | /todo |
| 詳細 | /todo/:id |

### API

| API名 | method | URI |
|:-:|:-:|:-:|
| todo作成 | post | /todo |
| todo取得(全件) | get | /todo |
| todo取得(1件) | get | /todo/:id |
| todo更新 | put | /todo/:id |
| todo削除 | delete | /todo/:id |

では次のセクションから実際にコードを書いていきましょう！
