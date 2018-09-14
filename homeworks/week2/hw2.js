//console.log(alphaSwap('nick'))
//console.log(alphaSwap('Nick'))
//console.log(alphaSwap(',HeLLo123'))

function alphaSwap(str) {
	var counter = str.length-1 
	var i = 0 // i 是 index 的意思
	var newStr = ''
	while(i<=counter) {
		if (str[i]>='a' && str[i]<='z') newStr += str[i].toUpperCase()  //這種 if else 的用法我還不熟 和 if () {} 有什麼不同？
		else if (str[i]>='A' && str[i]<='Z') newStr += str[i].toLowerCase()
		else newStr += str[i]
		i++
	}
	return newStr
}

module.exports = alphaSwap


/* 解題思路
1 判斷第一個文字是大寫還小寫
如果是大寫 回傳小寫
如果是小寫 回傳大寫
如果都不是 回傳原來的字母

判斷第二個文字是大寫還小寫
如果是大寫 回傳小寫
如果是小寫 回傳大寫
如果都不是 回傳原來的字母

問題：要怎麽知道要判斷幾次文字？

*/

//練習 用 ASCII 寫寫看


