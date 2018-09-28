console.log(stars(1))
console.log(stars(3))
console.log(stars(5))
//js101有其他解法 
//解題技巧 將一個問題拆解成很多函式
//比較解題方法之間的差異 對比
//程式碼原則 簡短、易懂 那一個比較重要？

// 20180917 Live broadcast 
function stars(n) {
	const result = []
	for (var i=1; i<=n; i++) {
		result.push('*'.repeat(i)) //用 repeat 函式 可以自己寫和用內建
	}
	return result
}

function stars(n) {
	const result = []
	for (var i=1; i<=n; i++) {
		result.push(repeat('*', i)) //用 repeat 函式 可以自己寫和用內建
	}
	return result
}

function repeat(str,times) {
	var result =''
	for (var i=1; i<=times; i++) {
		result += str
	}
	return result
}

/* 20180917 let for loop
function stars(n) {
	let newArr =[]
	let newStr ='' 
	for (let i=1; i<=n; i++) {
		newStr += '*'
		newArr.push(newStr)
	}
	return newArr
}
*/
/* 20180915
function stars(n) {
	var newArr = []
	var newStr = ''
	var star = n
	while (0<star) {
		newStr += '*'
		star--
		newArr.push(newStr) //在 array 加資料要用 push()		
	}
	return newArr
}
*/

module.exports = stars

 /* 解題思路
1 跑迴圈將星星加入字串
2 將跑好的字串加入陣列
3 進行下一輪
*/ 


