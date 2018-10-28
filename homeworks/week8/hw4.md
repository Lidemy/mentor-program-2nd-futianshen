## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
- 什麼是 DNS? Domain Name Service (Domain Name Server)   
將一般大眾易於理解語義化、好記憶的域名對應網站的 IP 位置的資料庫。  
以旅遊景點來比喻，域名是地標，DNS 是當地導遊，IP 位置是地標的地址。  
使用者在使用域名上網的時候，需要先找到 DNS 查詢 IP 位置，在經由 IP 位置找到網站的所在的伺服器位置獲取資料。

- Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？  
對 Google 的好處，透過蒐集使用者的搜尋數據，能夠提供使用者需要的廣告，增加廣告投放的效果。  
對 一般大眾 的好處，透過 GOOGLE 累積的大量查詢數據，快速找到域名對應的 IP 位置,增加網站的瀏覽速度。  

## NoSQL 跟 SQL 的差別在哪裡？
<table>
  <tr>
    <th></th>
    <th>Not Only SQL</th>
    <th>Structured Query Language</th>
  </tr>
  <tr>
    <td>資料結構</td>
    <td>動態結構</td>
    <td>預定義結構</td>
  </tr>
  <tr>
    <td>資料儲存方式</td>
    <td>Key-Value(物件)</td>
    <td>固定結構的數據(表格)</td>
  </tr>
  <tr>
    <td>資料查詢方式</td>
    <td>自訂API查詢</td>
    <td>結構化查詢（CRUD）</td>
  </tr>
  <tr>
    <td>適用範圍</td>
    <td>儲存非結構化的大數據</td>
    <td>儲存結構化的數據</td>
  </tr>
  <tr>
    <td>常見的資料庫</td>
    <td>SQL Server,MySQL...</td>
    <td>MongoDB,Cassandra...</td>
  </tr>
  <tr>
    <td>優點</td>
    <td>擴充易、讀寫快、成本低</td>
    <td>事務處理(保持數據的一致性ACID)</td>
  </tr>
  <tr>
    <td>缺點</td>
    <td>不同的NoSQL資料庫之間轉換不易</td>
    <td>擴充難、讀寫慢、成本高</td>
  </tr>  
</table>

#### 參考資料
[全面梳理SQL和NoSQL資料庫的技術差別](https://kknews.cc/zh-tw/tech/g8jk8rl.html)  
[閃開！讓專業的來：SQL 與 NoSQL](https://ithelp.ithome.com.tw/articles/10187443)  
[關於NoSQL與SQL的區別](https://read01.com/GPnEx.html#.W9EabBP7RTY)  
[了解NoSQL不可不知的5項觀念](https://www.ithome.com.tw/news/92506)  
[MongoDB 學習筆記之一 - 從 NoSQL 談起](http://garyliutw.blogspot.com/2014/05/mongodb-nosql.html)

## 資料庫的 ACID 是什麼？
Transaction 的構成要件。

- Atomicity（原子性）事務內的多個指令像原子一樣不能被分割，如果其中一個指令執行失敗就全部失敗。  
  實現原子性的方式，在執行指令之前儲存備份。
- Consistency（一致性）封閉資料庫系統內資料總數不變。

- Isolation（隔離性）每一筆對資料庫的請求(交易)之間相互獨立，各自執行，不會互相影響。  
  實現方式隔離性的方式：lock

- Durability（持久性）交易完成之後，所有的交易記錄都會完整的保留下來。

#### 參考資料  
[数据库事务的四大特性（ACID）以及事务的隔离级别](https://blog.csdn.net/qq_25448409/article/details/78110430)   
[MySQL 交易功能 Transaction 整理](https://xyz.cinc.biz/2013/05/mysql-transaction.html)  
[如何理解数据库事务中的一致性的概念？](https://www.zhihu.com/question/31346392)  

## 什麼是資料庫的 lock？為什麼我們需要 lock？
同一時間只處理一個請求。
網路有即時、非同步的特性,所以對同一筆資料的請求有可能同時發生，為了防止請求之間互相干擾，實踐 Isolation（隔離性）,當兩筆以上資料同時讀取造成衝突的時候，只會讓其中一筆請求先完成，再進行下一筆請求，雖然會降低效能，但卻能確保資料的完整性。

