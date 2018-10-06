資料庫名稱：mentor_program_db

表格名稱：會員名單 tian_users
| 欄位名稱 | 欄位型態 | 說明 |
|----------|----------|------|
|  id  |    integer      | 會員編號 (primary)     | 
| username   | varchar| 會員帳號 (unique)  | 
| password   | varchar| 會員密碼  |
| nickname  | varchar| 會員暱稱  |

<hr>

表格名稱：文章清單 tian_posts
| 欄位名稱 | 欄位型態 | 說明 |
|----------|----------|------|
| post_id  |    integer      | 文章編號 (primary)  | 
| id   | integer | 會員編號  |
| creahte_at   | datetime | 發文時間  |
| content   | text | 文章內容  |

<hr>

表格名稱：迴響清單 tian_comments
| 欄位名稱 | 欄位型態 | 說明 |
|----------|----------|------|
|  create_at |    datetime     | 迴響時間 (primary)     |
| nickname   | varchar | 迴響者暱稱  |
| post_id   | int | 迴響者回應的文章編號  |
| content   | text | 迴響內容  |

<hr>

實做後檢討:
1. 會員清單中的 username 在資料庫中要設定為 unique 防止帳號重疊。
2. 文章清單中的 id 欄位應該改為 user_id 、post_id 欄位改為 id ，會更加直觀。
3. 迴響清單的儲存的 nickname 應該改存會員名單的 id，之後如果有會員修改暱稱，在留言版上才會同步更新。（目前還沒有修改暱稱功能） 



