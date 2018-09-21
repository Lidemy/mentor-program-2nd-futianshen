/* hw3：反轉字串
給定一個字串，請輸出反轉之後的樣子（不能使用內建的 reverse 函式）
*/
reverse('yoyoyo')
reverse('1abc2')
reverse('1,2,3,2,1')

function reverse(str) {
	var newStr =''
	var i = str.length;
	i =i-1
	while( -1 < i ){
		newStr = newStr+str[i]
		i--;
	}
	console.log(newStr)
}




/*
1.計算有幾個字母
2.從最後一個開始印出來
怎麽做？迴圈
*/

//為什麼會出現 undefined
//什麼時候用 for 迴圈？
//什麼時候用 while 迴圈？
//怎樣不換行列印？
//有沒有可以把字串轉變成陣列的方法？