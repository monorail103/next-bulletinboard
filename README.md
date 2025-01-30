# next-bulletinboard
next.jsを使った掲示板アプリです。

## 機能
- 一般的な書き込み機能
すべての操作は、ユーザー登録無しで実行できます。スレッドを立てて、それぞれに対して書き込みをすることができます。
スレッドを立てる際は、タイトルと最初の書き込みを行います。
- 書き込みの表示
スレッドに対して書き込みを行うことができます。書き込みは、投稿日時、ユーザー名、内容を持っています。
- スレッドと書き込みの保存形式
それぞれの書き込みは、スレッドとの直接的な関連性はありません。書き込みは、スレッドのIDを持っています。スレッドは、書き込みのIDを持っています。これにより、スレッドを削除しても書き込みは残ります。また、書き込みを削除してもスレッドは残ります。

## API一覧
| メソッド | エンドポイント          | 説明                     |
|----------|-------------------------|--------------------------|
| GET      | /api/threads            | すべてのスレッドを取得   |
| GET      | /api/posts/:id          | 特定のスレッドの書き込みを取得 |
| POST     | /api/posts/:id/new  | 特定のスレッドに書き込みを作成 |
| POST     | /api/threads/new        | 新しいスレッドを作成     |