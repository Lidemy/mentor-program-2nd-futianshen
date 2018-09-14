//console.log(isPalindromes('abcba'))
//console.log(isPalindromes('apple'))
 function isPalindromes(str) {
  
	var newStr =''
	var i = str.length-1
	while (0<=i) {
		newStr += str[i]
		i--
	}  
	if (newStr===str) return true
	else return false
}

module.exports = isPalindromes

 /* 
1 先將字串翻過來
迴圈
2 判斷新字串和舊的字串相不相等
===
 問題：哪些變數儲存的是記憶位置？哪些是儲存數值？
*/