console.log(isPalindromes('abcba'))
console.log(isPalindromes('apple'))
/*
解題的第一步
先觀察有什麽特徵
動作前動作後有什麽變化？
*/
/*解題思路 1
頭尾比
倒數第二和第二個比
*/

/* 解題思路1 v1
function isPalindromes(str) {
	for (let i=str.length-1; 0<=i; i--) {
		j = 0
		return (str[i]===str[j])? true:false
		j++
	}
}
*/
// 解題思路1 v2
function isPalindromes(str) {
	return str === str.split('').reverse().join('')
}

/* v1
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
*/

module.exports = isPalindromes

 /* 
1 先將字串翻過來
迴圈
2 判斷新字串和舊的字串相不相等
===
 問題：哪些變數儲存的是記憶位置？哪些是儲存數值？
*/