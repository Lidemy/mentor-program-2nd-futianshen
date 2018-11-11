## gulp 跟 webpack 有什麼不一樣？我們可以不用它們嗎？
|前端工具|Gulp|Webpack|
|---|:----:|:------:|
|著重解決什麼問題？|工作流程自動化|資源模組化|
|工具定位|Task Runner|Module Bundler|
|重疊的功能|CSS，JS 壓縮、CSS 預處理器編譯|

gulp 是自動化工具，可以把需要的任務排程寫入腳本，使用一個指令執行安排好的工作流。
webpack 是資源打包工具，可以透過 JavaScript 整合各種不同形式的資源（如：CSS，IMG...），

webpack 可以透過 gulp-webpack Plugin 成為 gulp 自動化的工作流程的一部分。

如果只是要編譯 Stylus, Pug 、壓縮 CSS, JS 可以直接用 Prepros，Codekit 這類 APP 來代替, 不過就不能依據自己專案的需求打造自己的工作流程，自由度沒那麽高。

### 參考資料
[gulp与webpack的区别](https://www.cnblogs.com/lovesong/p/6413546.html)  
[What's the benefit using Gulp over Prepros?](https://stackoverflow.com/questions/31419963/whats-the-benefit-using-gulp-over-prepros)

## hw3 把 todo list 這樣改寫，可能會有什麼問題？
每一次更新都要重新渲染構建 DOM 樹，會消耗瀏覽器的效能。

## CSS Sprites 與 Data URI 的優缺點是什麼？
- CSS Sprites
  - 優點：透過將多張小圖片集合成一張大圖片，大幅降低 HTTP 的請求次數，減少使用者等待的時間與伺服器的負擔，加快網頁載入的速度。
  - 缺點：大張圖片經過截取等比放大之後解析度不夠

- Data URL
  - 優點：透過 inline-code 的方式來避免引入外部的文件，降低 HTTP 的請求次數，減少使用者等待的時間與伺服器的負擔，加快網頁載入的速度。
  - 缺點:
    - 與原始圖片相比，資料大小增加。
    - Data URL 的圖片 不會存在快取，每次都要重新載入。

### 參考資料
http://css.spritegen.com/
[從 CSS sprite 進化到 SVG sprite](http://muki.tw/tech/css-to-svg-sprite/)  
[Data URL和图片](http://www.webhek.com/post/data-url.html)  
[前端-Data URI Scheme](https://www.jianshu.com/p/ea49397fcd13)  