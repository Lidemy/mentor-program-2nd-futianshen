## React Router 背後的原理你猜是怎麼實作的？
重點：改變 URL 不刷新頁面。
- BrowserRouter
使用瀏覽器內建的 HTML5 `history` API 中的 `pushState()` 方法，做到改變 url 時不會刷新頁面。

- HashRouter
利用 # 不會發送 Request 的特性，監聽 `onhashchange` 事件並以 `window.location.hash` 讀取 # 後的值，來更改 Component 的 state 來 render 頁面。

### 參考資料
[单页面应用路由实现原理：以 React-Router 为例](https://github.com/youngwind/blog/issues/109)  
[BrowserRouter](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/BrowserRouter.js)  
[HashRouter.js](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/HashRouter.js)  
[history](https://github.com/ReactTraining/history)  
[Manipulating the browser history](https://developer.mozilla.org/en-US/docs/Web/API/History_API)  
[window.onhashchange](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onhashchange)

## SDK 與 API 的差別是什麼？
SDK 存在的目的是為了協助建立和測試應用程式。（工具箱）
API 存在的目的是為了讓應用程式之間可以做交流。（電話線）

SDK > API
SDK 會包含 API ，而 API 不會包含 SDK。
SDK 包含一些 Library 或 Data，而 API 可能只包含幾個調用資料的 function。

### 參考資料
[Difference between framework vs Library vs IDE vs API vs SDK vs Toolkits?](https://stackoverflow.com/questions/8772746/difference-between-framework-vs-library-vs-ide-vs-api-vs-sdk-vs-toolkits)  
[What is the Difference Between an API and an SDK?](https://nordicapis.com/what-is-the-difference-between-an-api-and-an-sdk/)

## 在用 Ajax 的時候，預設是不會把 Cookie 帶上的，要怎麼樣才能把 Cookie 一起帶上？

應該說 Ajax 預設只會帶上同源的 Cookie，可以在 Ajax 發出 Request 前將 XMLHttpRequest 的 withCredentials 設定為 true。

### 參考資料
[XMLHttpRequest.withCredentials](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials)