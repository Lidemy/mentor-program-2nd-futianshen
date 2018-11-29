## 為什麼我們需要 React？可以不用嗎？  
透過組件化、讓大型網站的 View 好維護、易擴充甚至可以跨平臺做使用。

對於小型的網站就可以不用使用 React，可能用 jQuery 會更加方便，因為不會需要使用太多多重複的組件，用 React 能提升的開發效率有限。

### 參考資料  
[我们为什么选择使用 React 生态](https://juejin.im/entry/5931691ca22b9d0058c70453)

## React 的思考模式跟以前的思考模式有什麼不一樣？  
當 Component 的 state 被改變直接重新 Render，讓資料與畫面保持同步，而不是像過去使用 jQuery 或 Vanilla.js 直接去新增、刪除、修改 DOM 上的資料來更新畫面。

### 參考資料  
[換一種思考方式：React](https://ithelp.ithome.com.tw/articles/10188008)

## state 跟 props 的差別在哪裡？  
state：資料來自所在的 Component  
props：資料來自父節點的 Component  

## 請列出 React 的 lifecycle 以及其代表的意義
1. Mounting ：在 DOM 上載入 Component  
  ``` js
  constructor(props)
  super(props)
  render()
  componentDidMount()
  ```

2. Updating: 改變元件的 state 或經過 props 更新已經載入的 Component  
  ``` js
  getDerivedStateFromProps()
  shouldComponentUpdate()
  render()
  getSnapshotBeforeUpdate()
  componentDidUpdate()
  ```

3. Unmounting：從 DOM 上卸除 Component    
  ``` js
  componentWillUnmount()
  ```

### 參考資料
[Understanding React v16.4+ New Component Lifecycle Methods](https://blog.bitsrc.io/understanding-react-v16-4-new-component-lifecycle-methods-fa7b224efd7d)