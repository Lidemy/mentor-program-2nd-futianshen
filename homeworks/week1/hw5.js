/* hw5：自己的函式自己寫
其實仔細思考的話，你會發現那些陣列內建的函式你其實都寫得出來，因此這一題就是要讓你自己動手實作那些函式！
我們要實作的函式有兩個：join 以及 repeat。
join 會接收兩個參數：一個陣列跟一個字串，會在陣列的每個元素中間插入一個字串，最後合起來。
repeat 的話就是輸出重複 n 次之後的字串。
*/

join([1, 2, 3],'')
join(["a", "b", "c"], "!")
join(["a", 1, "b", 2, "c", 3], ',')

repeat('a',5)
repeat('yoyo',2)

function join(str, concatStr) {
	var i = 0;
	var newStr = ''
	do {
		newStr = newStr + str[i]
		i++
		if (i<str.length) {
			newStr = newStr + concatStr
		}
	} while (i<str.length) 
	console.log(newStr)
}
/*
1.將,刪除
2.再將,改為
*/

function repeat(str, times) {
	var newStr = '' 
	while (times>0) {
		newStr = newStr + str;
		times--
	}
	console.log(newStr)
}




//怎樣不換行列印？
//;哪些地方要加？
//怎麼把陣列變成字串？
//什麼時候用 do while
