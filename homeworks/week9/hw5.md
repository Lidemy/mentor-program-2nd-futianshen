## CSS 預處理器是什麼？我們可以不用它嗎？
解決什麼問題 ？重複修改相同 CSS 屬性值，以及全域 CSS 命名的問題。
預處理器讓我們可以用結構化的方式寫 CSS ，之後在編譯成可執行的 CSS。

如果不使用 CSS Preprocessor 可以使用 PostCSS 提供的 Plugin cssnext，使用最新的 CSS 語法，當未來瀏覽器支援的時候就可以直接上手使用最新的CSS(前提是未來瀏覽器會支援),好處是不用學習各種 CSS Preprocessor 自行定義的特殊語法。

## 請舉出任何一個跟 HTTP Cache 有關的 Header 並說明其作用。
以使用場景分類

1. 需不需要在 Browser 更新 Cache  
Response Header `cache-control:no-store` （完全不用 Cache）  
Response Header `cache-control:no-cache` 只在 Server 檔案更新的時候才更新 Cache （永遠檢查快取）  
Response Header `cache-control:max-age=0` 搭配 `etag:` 只在 Server 檔案更新的時候才更新 Cache （永遠檢查快取）  

2. Cache 的保存日期 (保存日期未到不發 Request)  
Response Header `cache-control:max-age=時間長度` Cache 的保存時間（權重優先於 Expired）  
Response Header `Expired:日期` Cache 的保存期限

3. Cache 過期之後，透過「檔案內容比對」發 Request 向瀏覽器確認 Cache 還可不可以使用。  
Response Header `etag:` 檔案修改編號  
Requuest Header `if-none-match:` 向瀏覽器傳送檔案編號確認資料還可不可以使用

4. Cache 過期之後，透過「修改日期」發 Request 向瀏覽器確認 Cache 還可不可以使用。  
Response Header `last-Modified:` 最後一次修改的日期  
Requuest Header `if-modified-since:` 用最後一次的修改日期和 Server 要資料

## Stack 跟 Queue 的差別是什麼？
兩者都是串列(List)，串列的開端被稱為 head，串列的結尾被稱為 tail。
<table>
  <tr>
    <th>串列名稱</th>
    <th>Stack</th>
    <th>Queue</th>
  </tr>
  <tr>
    <th>翻譯</th>
    <td>堆疊、栈</th>
    <td>佇列、队列</th>
  </tr>
  <tr>
    <th>特性</td>
    <td>Last-in,first-out 後進先出</td>
    <td>First-in,first-out 先進先出</td>
  </tr>
  <tr>
    <th>行為</td>
    <td>只能從串列頭部移出或新增資料</td>
    <td>串列的頭部負責移出資料，串列的尾部負責新增資料。</td>
  </tr>
  <tr>
    <th>功能</td>
    <td>記得先前的資訊,處理最新的任務 Back-Tracking</td>
    <td>緩衝區、暫存器</td>
  </tr>
  <tr>
    <th>比喻</td>
    <td>疊盤子、書堆</td>
    <td>排隊買票</td>
  </tr>
</table>

## 請去查詢資料並解釋 CSS Selector 的權重是如何計算的（不要複製貼上，請自己思考過一遍再自己寫出來）
CSS 權重依據重要（稀有）->不重要（常用、全域）以 10 倍為一個量級，並依據 CSS 選擇器的組合做加法計算權重。若選擇到相同的元素權重大者優先執行。若權重相同，後寫的指令取代先寫的指令執行。  
寫 CSS 的時候從小量級開始寫，1000 以上的量級若非必要不使用。

- 10000
  - !important （加在 CSS 屬性值的後面）
- 1000
  - inline-style-attribute （寫在 html 的 style 屬性裡面）
- 100
  - #id ( 一個網頁中只有一個 id，不會重複)
- 10 
  - .class  ( 一個網頁中可能有很多組 class )
  - [attribute]
  - :pseudo-class 
  - ::pseudo-element <!-- 需要實驗看看是 10 還是 1 -->
- 1
  - element
- 0
  - 星號（全域）<!-- 需要實驗看看是 0 還是 1 -->
- default (由繼承或各瀏覽器的初始值決定)

### 【延伸閱讀】 哪些 CSS 屬性會繼承？
#### 什麼是繼承?
子節點複製父節點的屬性值。

以下列舉常用屬性大略分類，文字設定會繼承，容器設定不會繼承。

- visibility
- direction
- line-height
- table 系列
- list 系列
- text 系列
- font 系列
- color
- word-spacing
- letter-spacing