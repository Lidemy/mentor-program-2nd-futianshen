//console.log(isPrime(2))
//console.log(isPrime(3))
//console.log(isPrime(10))
//console.log(isPrime(37))
//console.log(isPrime(38))

function isPrime(n) {
  var newArr =[]
  var counter = 1
  while (counter<=n) {
  	if (n%counter===0) newArr.push(counter) 
  	counter++
  }
  if(newArr.length===2)return true
  else return false
}

module.exports = isPrime

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