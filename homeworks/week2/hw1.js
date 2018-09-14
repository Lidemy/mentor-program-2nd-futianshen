//console.log(stars(1))
//console.log(stars(3))
//console.log(stars(5))

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

module.exports = stars
/* 解題思路
1 跑迴圈將星星加入字串
2 將跑好的字串加入陣列
3 進行下一輪
*/