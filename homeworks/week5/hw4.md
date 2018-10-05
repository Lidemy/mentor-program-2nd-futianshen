## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼
| 欄位型態  | VARCHAR | TEXT |
|:----------|:-------:|:------:|
| 字串長度 | 變動長度|（不需固定字串長度）|
| 最大長度 | 可以達到 65535byte 但會受制於列的長度  | 65535byte   |
| 最大長度預設值 |可以設定|不能設定|
| 資料庫搜尋效率| 高 | 低 |

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又會以什麼形式帶去 Server？
-  為什麼需要 Cookie？

   讓 Server 端能夠根據使用者的身份提供適當的內容。

- 什麼是 Cookie？

   一個讓 Server 端能夠追蹤使用者的技術，由四個部分組成。
   1. HTTP Response 中的 Cookie 標頭行
   2. HTTP Request 中的 Cookie 標頭行
   3. 保存在 Client 瀏覽器的 Cookie 檔
   4. Server 端的資料庫

- HTTP 怎麼設定 Cookie？

   Server 在收到 Client 第一次的 Request 之後，會建立一個獨一無二的索引編號在資料庫中作為記錄，同時回傳一個加入 Set-cookie: 標頭行的 Response 給 Client。

- 瀏覽器怎麼以什麼形式將 Cookie 帶去 Server？

   承上題，Client 的瀏覽器收到 Server 傳來包含 Set-cookie 標頭行的 Response 之後，會在瀏覽器所管理的 Cookie 檔案裡加上這筆 Response 的主機名稱以及索引編號，之後當瀏覽器向相同 Server 發出 Request 的時候就會先查閱 Cookie 檔案裡的索引編號，將這個索引編號附在 Request 的 cookie 標頭行給伺服器辨識。

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？
1. 相同 username 可以重複註冊
2. 在 HTTP 中 Cookie 是明文傳遞的，會有資安問題。