console.log(alphaSwap('nick'))
console.log(alphaSwap('Nick'))
console.log(alphaSwap(',HeLLo123'))
// 20180917 Live Broadcast 三元運算子 
function alphaSwap(str) {
	let result =''
	for(var i=0; i<str.length; i++) {
		result += (str[i]<='z' && str[i]>='a') ? //缺點可讀性不佳
		str[i].toUpperCase() : str[i].toLowerCase() //標點符號 toUpperCase toLoserCase 不會影響
	}
	return result
}

// 20180917 Live Broadcast
function alphaSwap(str) {
	let result =''
	for(var i=0; i<str.length; i++) {
		if (str[i]<='z' && str[i]>='a') {
			result += str[i].toUpperCase()
		} else {
			result += str[i].toLowerCase() //標點符號 toUpperCase toLoserCase 不會影響
		} 
		
	}
	return result
}

function alphaSwap(str) {
	let result =''
	for(var i=0; i<str.length; i++) {
		if (str[i]<='Z' && str[i]>='A') {
			result += str[i].toLowerCase() //標點符號 toUpperCase toLoserCase 不會影響
		} else {
			result += str[i].toUpperCase()
		} 
		
	}
	return result
}

module.exports = alphaSwap 



/* 20180917 let forloop practice
function alphaSwap(str) {
	var newStr =''
	for (let i=0; str[i]; i++){  // str[i]不做一件事和做一件事之間有什麽差異？差異條件應該不止一種？
		if (str[i]<='z' && str[i]>='a') newStr += str[i].toUpperCase()
		else if (str[i]<='Z' && str[i]>='A') newStr += str[i].toLowerCase()
		else newStr += str[i]
	}
	return newStr
}
*/
/* 20180915
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
*/



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
