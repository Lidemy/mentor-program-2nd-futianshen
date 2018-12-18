## 為什麼我們需要 Redux？
由於 React 的資料流是單向的，目的是為了解決大型應用程式交互太過複雜的問題，但這樣的設計也產生了新的問題，React 只提供 props 讓父與子 Component 傳輸資料， Component 之間無法任意的傳遞資料，當資料傳送需要經過太多 Component 來傳送的時候就會變得很麻煩，使用 Redux 不僅讓我們可以讓跨 Component 傳送資料，還可以透過 middleware 解決非同步問題，並將各 Component 常用的 state 匯聚在一處，一起處理，不用儲存在共同的父 Component 中。

### 參考資料
[4 张动图解释为什么（什么时候）使用 Redux](https://segmentfault.com/a/1190000012142449)

## Redux 是什麼？
基於 Flux 單向資料流設計模式的實作。藉由將資料儲存到 Store 的過程對資料進行加工再傳送到需要該資料的 Component。
·
### 參考資料
[深入淺出 Redux](https://medium.com/4cats-io/%E6%B7%B1%E5%85%A5%E6%B7%BA%E5%87%BA-redux-7b08403c4957)
[深入淺出 Flux](https://medium.com/4cats-io/%E6%B7%B1%E5%85%A5%E6%B7%BA%E5%87%BA-flux-44a48c320e11)

## Single Page Application 是什麼？有哪些頁面一定要用這個架構去設計嗎？
- SPA 是什麼 ？
對使用者而言：可以不換頁獲取所需資料，大幅增加使用者體驗。
對開發者而言：透過 AJAX 技術讓前後段分離，前端負責 Render，後段只負責傳資料。

### 參考資料
[你走你的陽關道，我走我的獨木橋：前後端分離](https://ithelp.ithome.com.tw/articles/10187675)

- 那些頁面一定要用 SPA 架構來設計 ？
不能中斷體驗的網頁服務：影音串流網站（Youtube, Twitch, StreetVoice...)

## Redux 如何解決非同步（例如說 call API 拿資料）的問題
使用 middleware(如：redux-thunk, redux-promise) 發送 Action 並依據回應的狀態自動更新 Store 的資料，再回傳給使用該資料的 Component。