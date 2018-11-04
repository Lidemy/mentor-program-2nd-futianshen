### 輸出結果
> 1  
> 3  
> 5  
> 2  
> 4  
 
### 執行步驟
JavaScript 身為腳本語言在瀏覽器中的運行機制可以分為兩種任務三個步驟執行。
同步任務永遠優先於非同步任務執行。

#### 同步任務：
1. CallStack （執行任務 以 Chrome 瀏覽器為例，是由V8引擎執行 ）

#### 非同步任務：  
2. Web API（事件監聽）
3. Callback Queue ( 觸發的事件排隊等待在 CallStack 執行)
- Event Loop （串聯 Call Stack 與 Callback Queue，將非同步任務轉換為同步任務的關鍵元素)  
若 Call Stack 執行完成所有任務，則從 Callback Queue 裡面提取非同步任務執行。

### 範例程式執行步驟
1. 在 `Call Stack` 執行 `console.log(1)`
2. 將 `setTimeout(() => {console.log(2)}, 0)` 從 `Call Stack`  移動到 `Web API` 等待事件觸發 
3. 在 `Call Stack` 執行 `console.log(3)`。`setTimeout` 事件在 `Web API` 被觸發，將任務 `console.log(2)` 移動到 `Callback Queue` 等待執行。
4. 將 `setTimeout(() => {console.log(4)}, 0)` 從 `Call Stack`  移動到 `Web API` 等待事件觸發
5. 在 `Call Stack` 執行 `console.log(5)`，`setTimeout`事件在 `Web API` 被觸發，將任務 `console.log(4)` 移動到 `Callback Queue` 等待執行。
6. `Event Loop` 將 `console.log(2)` 從 `Callback Queue` 移動到 `Call Stack` 執行。
7. `Event Loop` 將 `console.log(4)` 從 `Callback Queue` 移動到 `Call Stack` 執行。