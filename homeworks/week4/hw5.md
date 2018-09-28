## hw5：簡答題

1. 什麼是 DOM？
---
>Document Object Model<br>
>一種瀏覽器提供的 Web API [1] ，透過 JavaScript 可以在用戶端重構（添加、移出、更改） HTML 上的樹狀結構，使原來靜態的網頁可以產生動態效果，在增加使用者體驗的同時，減輕伺服器的負擔。
> 
解決問題：
- 對伺服器而言：減少瀏覽器對伺服器的資料傳輸。
- 對使用者而言：增加體驗。

---
2. 什麼是 Ajax？ 
---
>*Asynchronous* JavaScript and XML<br>
>一種應用於 DOM 的技術，藉由非同步的方式 [2]，讓瀏覽器不用透過表單發出 Request 向 server 傳送資料，減少伺服器與瀏覽器之間的資料交換，降低伺服器的負荷。

解決問題：
- 對伺服器而言：減輕伺服器的負擔，不用像過去每次發出 Request 都要重新整理頁面。
- 對使用者而言：不用刷新網頁就可以獲得新的訊息，增加體驗。

使用 Ajax 步驟
1. 取得 想串接的 Web API, API 文件
2. 發送 使用瀏覽器提供的 API 發送 Request
3. 接收 Response
4. 瞭解 回傳資料的的資料格式、參數、網址（API 文件）
5. 處理 資料
6. 呈現 在網頁上

---
3. HTTP method 有哪幾個？有什麼不一樣？<!-- 表格比較 -->
---
HTTP method   | 功能
--------------|------------------------
`GET`     | 取得資料
`HEAD`    | 測試 (`GET` 去除 `response body`只取`response header`)
`POST`   |  新增 (client 傳資料給 server 改變伺服器的狀態)
`PATCH`   | 更改資料 (client 傳資料給 server 改變伺服器的狀態)
`PUT`     | 覆蓋資料 (client 傳資料給 server 改變伺服器的狀態)
`DELETE`  | 刪除資料 (client 傳資料給 server 改變伺服器的狀態)
`OPTIONS` | 查詢 server 支援哪些 HTTP method

---
4. `GET` 跟 `POST` 有哪些區別，可以試著舉幾個例子嗎？<!-- 表格比較 -->
---
HTTP method |`GET` |`POST`  
---|---|---
對伺服器 | 只會取得伺服器上的資料 | 可以改變伺服器上的資料
對使用者 |取得的是公開資料不需要加密 | 傳送的是不公開的資料需要加密

---
5. 什麼是 RESTful API？
---
> Resource Representational State Transfer<br>
> 一種建立在 HTTP 協定下的架構設計風格(不是標準),用於實踐 CRUD 

使用的 HTTP 協定   | 功能
---|---
`POST` | Create
`GET` | Read
`PUT` | Update
`DELETE` | Delete

---
6. JSON 是什麼？
---
>JavaScript Object Notation<br>
>JSON 是一種以物件和陣列為型別的傳輸格式，用於瀏覽器與伺服器之間的資料交換。

---
7. JSONP 是什麼？
---
>使用 JSON 的一種方式，可以讓網頁從別的網域取得資料

解決問題：為了避免同源政策 [3] 的方法之一，讓網頁從別的網域要資料

---
8. 要如何存取跨網域的 API？
---
- JSONP
- CORS
---
> [1] API
> 什麼是API？ 
> application Programming *Interface*
> 和伺服器交流的一個界面,可以想象是一個功能
>
>[2] Asynchronous
> - 什麼是非同步？<br>
> 不用一件事做完再做下一件事,再等待的時間可以先做其他事情
>
> - 為什麼要用非同步的方式？<br>
> 因為網路服務需要即時回應，按照原來程式碼同步的執行方式，程式碼送出 Request 之後，必須取得 Response 才繼續下一行，為了節省這一來一回所耗費的時間，所以我們要利用非同步的方式來實現效能最佳化。
>
> - 怎麼實踐非同步？<br>
> Callback function<br>
> 因為非同步的 function 不能直接透過 return 將結果回傳，所以會透過 Callback Function 來回傳資料。也就是在接到一件任務的時候，先把 request 發出去，繼續處理其他事情，直到資訊回傳再回來繼續執行任務。
>
> [3] 同源政策 same-origin policy
>
> - 什麼是同源?
>   1. 同 domain
>   2. 同 協定
>   3. 同 port (預設 port 80)
>
> - 什麼是同源政策 ?
> 同源的資源才可相互存取，跨來源的資源則須在特定情況才允許存取。
>
> - 為什麼要有同源政策？
> 防範駭客的攻擊



