/* hw4：印出因數
先幫大家複習一下數學，給定一個數字 n
因數就是所有小於等於 n 又可以被 n 整除的數
所以最明顯的例子就是 1 跟 n，這兩個數一定是 n 的因數。現在請寫出一個函式來印出所有的因數
*/
printFactor(7)
console.log('')
printFactor(10)
console.log('')
printFactor(64)

function printFactor(n) {
	var factor = 1;
	while (0<n)
		if (factor>n){
			break;
		}else if (n % factor === 0) {
			console.log(factor)
			factor++;
		} else {
			factor++;
	}
}

/*
怎麼列印出質數？
什麼是整除？
除了之後餘數不等於0
*/