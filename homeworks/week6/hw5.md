## 適用範圍：以下實際操作只針對 MySQL 資料庫系統 及 PHP 後端程式語言

## 請說明 SQL Injection 的攻擊原理以及防範方法

- 攻擊原理 
攻擊者利用網站開發者對使用者的信任，藉由輸入含有 SQL 特殊字元的字串將輸入字串跟資料庫語法拼接在一起，改變原有的邏輯，成為查詢語句的一部分執行。

- 常見攻擊手法
    - Authorization Bypass（略過權限檢查）
        - 'OR 1=1 --
            - ' 將方塊內容關閉
            - OR 只有其中一個是 True 就是 True
            - 1=1 True
            - -- 利用命令列的註解（ /* -- ) 將後面內容註解掉 

    - Injecting SQL Sub-Statements into SQL Queries（注入 SQL 子語法）
        - ; 在原有指令加上 ; 繼續執行下一行指令。
        - UNION 在原有指令加上 UNION 繼續執行下一行指令。

    - Exploiting Stored Procedures（利用預存程序）
    
- 防範方法 

    - 前端 瀏覽器：防君子不防小人
        - JavaScript 表單驗證
        使用 JavaScript 字串的內建函數 replace() 過濾特殊自元 [1]

    - 後端 伺服器
        - 輸入
            - 檢查輸入資料庫的特殊自元 [1]
                - 加入跳脫字元 
                使用 PHP addslashes()函數會在所有的單引號前加上反斜線
                - 過濾特殊字元
                使用正則表達式 Regular expression 過濾字串
                - 轉換特殊字元
                - 刪除特殊字元
            
            - 檢查輸入資料庫的潛在的指令

            - 密碼加密：將密碼經過 hash function 再存到資料庫
            PHP password_hash

        - 輸出
            - 參數化查詢 Parameterized Query
                不使用使用字串拼接的方式查詢 SQL 指令，改為將欄位名稱改用參數定義代入。
                - PHP Prepared Statements 
                
    - 資料庫
        - 限定輸入框的欄位長度，增加下指令的難度。
        - 設定使用者帳號權限，限制某些管道使用者無法作資料庫存取。

[1]哪些是 SQL 資料庫的特殊自元
- 單引號（'）、雙引號（"）、問號（?）、星號（*）、底線（_）、百分比（%）、Ampersand &、註解、xp_、;

- 參考資料
https://www.slideshare.net/hugolu/sql-injection-61608454
https://zh.wikipedia.org/wiki/%E5%8F%83%E6%95%B8%E5%8C%96%E6%9F%A5%E8%A9%A2#Cold_Fusion
https://zh.wikipedia.org/wiki/SQL%E8%B3%87%E6%96%99%E9%9A%B1%E7%A2%BC%E6%94%BB%E6%93%8A
http://www.codedata.com.tw/book/java-basic-source/ch4-4.htm
https://docs.microsoft.com/zh-tw/previous-versions/sql/sql-server-2008-r2/ms161953(v=sql.105)
https://ithelp.ithome.com.tw/articles/10189201
https://www.acunetix.com/websitesecurity/sql-injection2/
https://forum.gamer.com.tw/Co.php?bsn=60292&sn=11005
http://ccckmit.wikidot.com/regularexpression

## 請說明 XSS 的攻擊原理以及防範方法
Cross-Site Scripting 

- 攻擊原理
攻擊者利用瀏覽器對網站開發者的信任，透過輸入框將帶有惡意的程式（ 通常使用 HTML/JavaScript ）注入到網頁中，讓其他 Client 端遭受攻擊，因為程式不會在 Server 端執行並造成影響，所以被稱為跨站腳本攻擊。

- 依據惡意程式的使用方式分類
    - Reflected XSS (反射型) 
    Reflected 是指不會被儲存在資料庫中，而是由網頁後端直接嵌入由前端使用者所傳送過來的內容造成的，最常見的就是以 GET 方法傳送資料給伺服器時，伺服器未檢查就將內容回應到網頁上所產生的漏洞。
    
    - Stored XSS (儲存型)
    攻擊者事將惡意的語法先保存在伺服器資料庫中，藉此傳送至使用者的瀏覽器，只要 Client 端執行特定的連結(部落格回應、留言板貼文、聊天室、HTML電子郵件...)就會觸發攻擊。因此 Stored 比 Reflected 更加危險。

    - DOM-Based XSS (基於 DOM 的類型)
    網頁上的 JavaScript 在操作 DOM 的過程中代入了惡意指令，跟前兩者最大的不同在於 DOM-Based 的攻擊要防護必須在用戶端。

-  防範方式？
    - 對使用者而言
        - 關閉瀏覽器 JavaScript 的功能
        - 使用會持續更新的瀏覽器
        
    - 對網站開發者而言 
        - 限定輸入框的欄位長度，增加下指令的難度。
        - 輸入時過濾特殊字元 < > % / () &...
        - 輸出時做 Encoding 
            - escape 
            ``` php
            htmlentities()
            htmlspecialchars($variable, ENT_QUOTES, 'utf-8')
            ```
            - 使用HTTP header 指定內容的類型，使得輸出的內容避免被作為HTML解析。如在PHP語言中使用以下程式碼：
            ``` php
                header('Content-Type: text/javascript; charset=utf-8');
            ```
        
- 參考資料
https://www.qa-knowhow.com/?p=2992
https://ithelp.ithome.com.tw/articles/10188646
https://hkitblog.com/%E7%94%9A%E9%BA%BC%E6%98%AF-xss%EF%BC%9F%E7%B0%A1%E4%BB%8B%E9%BB%91%E5%AE%A2%E5%B8%B8%E7%94%A8%E6%94%BB%E6%93%8A%E6%8A%80%E5%80%86/
https://forum.gamer.com.tw/Co.php?bsn=60292&sn=11267

## 請說明 CSRF 的攻擊原理以及防範方法
Cross Site Request Forgery。

攻擊者利用伺服器端對瀏覽器的信任，控制瀏覽器以使用者的名義對自己設定的位址發送 request。

- 原理
瀏覽器只要發送 request 就會把關聯的 cookie 一起發送的機制。

- 防範方法
    - 使用者
        - 不使用服務就登出
        - 不使用記憶帳號密碼功能
        
    - 瀏覽器
        - Same Site cookie

    - 伺服器
        - 檢查 HTTP head 的 Referer 欄位
        在使用的 api 和前端網站同域的前提下，CSRF 的 request 是從任意一個 domain 發出的，本人發出的 Request 是同一個 domain 發出的，只要是同域就通過，不同域就拒絕。

        - 使用驗證碼
            - 圖形
            - 簡訊 

        - CSRF token   
        Server 在傳送敏感資料時，要求 Client Browser 提供沒有儲存在 Cookie 攻擊者也沒辦法偽造亂數資料作為驗證。

### 參考資料
https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0
https://blog.techbridge.cc/2017/02/25/csrf-introduction/
https://www.ibm.com/developerworks/cn/web/1102_niugang_csrf/
https://www.ithome.com.tw/voice/115822

## 請舉出三種不同的雜湊函數

* RIPEMD-160
* SHA-2：加密貨幣比特幣採用的算法
    * SHA-224
    * SHA-256
    * SHA-384
    * SHA-512
* SHA-3 （Keccak）

### 參考資料
https://www.jianshu.com/p/cfdd38e28fa3

## 請去查什麼是 Session，以及 Session 跟 Cookie 的差別

### 什麼是 Session？
一張亂數產生的號碼牌，無法透過比對號碼牌推估其他號碼牌上的號碼，伺服器認牌不認人。

<table>
    <tr>
        <th></th>
        <th>Cookie</th>
        <th>Session</th>
    </tr>
    <tr>
        <th>分類</th>
        <td>具體技術</td>
        <td>抽象機制</td>
    </tr>
    <tr>
        <th>檔案存放位置</th>
        <td>Client</td>
        <td>Server</td>
    </tr>
    <tr>
        <th>佔用伺服器效能</th>
        <td>否</td>
        <td>是</td>
    </tr>
    <tr>
        <th>安全性</th>
        <td>較低</td>
        <td>較高</td>
    </tr>
    <tr>
        <th>可基於 Cookie 技術實現</th>
        <td>是</td>
        <td>是（Cookie-based Session）[1]</td>
    </tr>
    <tr>
        <th>使用 uuid [2]</th>
        <td>否</td>
        <td>是</td>
    </tr>
    <tr>
        <th>平衡效能與安全性的使用方式</th>
        <td>存放公開訊息（喜好）</td>
        <td>存放隱私訊息（密碼）</td>
    </tr>
</table>

[1] 為什麽要使用 Cookie 實踐 Session？

效能和安全之間的權衡就像一把雙刃劍，顧此失彼。當流量提高的伺服器就會產生效能降低的問題，Cookie-based session 藉由加密 Client 端的 Cookie ，在維持一定效能的情況下，增加安全性。

[2] 什麼是 uuid？

通用唯一識別碼，由一組32位數的16進位數字所構成。
 
### 參考資料

https://blog.hellojcc.tw/2016/01/12/introduce-session-and-cookie/
https://www.zhihu.com/question/19786827
http://web.fg.tp.edu.tw/~tcp/PHP/pdf/SESSION%E8%88%87COOKIE.pdf
http://fred-zone.blogspot.com/2014/01/web-session.html

## `include`、`require`、`include_once`、`require_once` 的差別
<table>
    <tr>
        <th></th>
        <th>`include`</th>
        <th>`include_once`</th>
        <th>`require`</th>
        <th>`require_once`</th>
    <tr>
    <tr>
        <th>外部引入檔案引入失敗時</th>
        <td>找尋根目錄下有無檔案並繼續執行</td>
        <td>找尋根目錄下有無檔案並繼續執行</td>
        <td>終止編譯</td>
        <td>終止編譯</td>
    <tr>
    <tr>
        <th>外部檔案已經引入時</th>
        <td>繼續引入</td>
        <td>不再引入</td>
        <td>繼續引入</td>
        <td>不再引入</td>
    <tr>
</table>

