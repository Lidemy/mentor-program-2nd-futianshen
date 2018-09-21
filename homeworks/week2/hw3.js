//用陣列做做看
//用物件做做看

//規律 {} 區塊用於多行程式碼
console.log(isPrime(2))
console.log(isPrime(3))
console.log(isPrime(10))
console.log(isPrime(37))
console.log(isPrime(38))
//質數因數只有兩個
//質數在數學上的定義 小於等於開根號
// 20180917 Live Broacast
function isPrime(n) {
  if (n === 1) return false
  const factor = returnFactor(n)
  return factor.length === 2 //簡化 if else 用於是非對立二元論 灰度認知 黑白決策
}
//
function isPrime(n) {
  if (n === 1) return false
  const factor = returnFactor(n)
  if (factor.length === 2) {
    return true
  } else {
    return false
  }
}
//
function isPrime(n) {
  if (n === 1) return false
  for (var i=2, i<n; i++) {
    if (n%1 === 0) {
      return false
    }
  }
  return true  
}


function returnFactor(n) { // use wk1 hw1 repair
  const result = []  
  for (var i=1; i<=n; i++) {
      if (n % i ===0) {
        result.push(i)
      }
    }
    return result
}

module.exports = isPrime

/* 20180918用字串做 倒著做
function isPrime(n) {
  for (let i=1; i<=n; i++)
}
*/

/*20180917用字串做 正著做
function isPrime(n) {
  const str = n+'1'
  let compareStr =''
  for (let i=n; 1<=i; i--) {
    if (n%i===0) compareStr += i
  }
  return str === compareStr
}
*/

/*20180915
function isPrime(n) {
  
  var newArr =[]
  var counter = 1
  while (counter<=n) {
  	if (n%counter===0) newArr.push(counter) 
  	counter++
  }
  if (newArr.length===2) return true
  else return false
}



*/


 /* 解題思路
質數有什麼「獨有」的特徵？用特徵作為判斷的標準
什麼是質數？
因數只有兩個 一個是1 一個是自己
除了 1 之外 其他小於自己的數都無法整除
什麼是整除？不會有餘數
 判斷一個數是不是有幾個因數
用迴圈
 如果=2個代表他是質數
 用 arr 寫寫看
 ?運算子怎麼用？ ||
*/	
 //新題目 列出小於32的質數 