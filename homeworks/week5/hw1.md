資料庫名稱：mentor_program_db

表格名稱：會員名單
| 欄位名稱 | 欄位型態 | 說明 |
|----------|----------|------|
|  id  |    integer      | 會員編號     |
| username   | varchar| 會員帳號  |
| password   | varchar| 會員密碼  |
| nickname  | varchar| 會員暱稱  |

<hr>

表格名稱：文章清單
| 欄位名稱 | 欄位型態 | 說明 |
|----------|----------|------|
| post_id  |    integer      | 文章編號     |
| id   | integer | 會員編號  |
| creahte_at   | datetime | 發文時間  |
| content   | text | 文章內容  |

<hr>

表格名稱：迴響清單
| 欄位名稱 | 欄位型態 | 說明 |
|----------|----------|------|
|  create_at |    datetime     | 迴響時間     |
| nickname   | varchar | 迴響者暱稱  |
| post_id   | int | 迴響者回應的文章編號  |
| content   | text | 迴響內容  |
