//console.log(add('957','456'))
//console.log('1234'+'5678')
//console.log(add('12312383813881381381','129018313819319831'))
//console.log('2456')
//console.log(2456)

function add(a, b) {
	var num1i=a.length-1
	var num2i=b.length-1
	var newStr =""
	var sum = up = 0
	if (num1i>=num2i) { // 用於兩個數字不同位數，判斷 a 和 b 那一個位數大，要做最大位數數字的次數 
		var counter = num1i
	} else {
		var counter = num2i
	}
	while (counter>=0) {
		if (num1i>=0 && num2i>=0) { //用於兩個數字不同位數
			sum = up + Number(a[num1i])+ Number(b[num2i]) //Number 的 N 要大寫
		} else if (num1i<0) {
			sum = up + Number(b[num2i])
		} else if (num2i<0) {
			sum = up + Number(a[num1i])
		} 
		if (sum>10) { //進位
			sum = sum % 10
			up = 1
		} else {
			up = 0
		}
		counter--
		num1i--
		num2i--
		newStr += sum
		if (counter<0 && up===1) {
			newStr += up //最高位數進位
		}
	} 
	return reverse(newStr) // newStr的數字是反的 要將數字反轉回來
}

//function reverse
function reverse (str) {
	var reverse =''
	var i=str.length-1
	while (0<=i) {
		reverse += str[i]
		i--
	}
	return reverse
}

module.exports = add;

 /* 
解題思路1 行不通 parseInt有誤差
先把字串變成數字，相加之後在變回字串輸出

function add(a, b) {
  
	var number1 =parseInt(a,10)
	var number2 =parseInt(b,10)
	var sum = number1 + number2
	return sum.toString()
}

解題思路2
先對齊 個位對個位、十位對十位，超過10的就進位。
從各自最小的開始相加 取出數值相加

 */
// 字串和字串相加會變成更長的字串
// 字串怎麼變成數字？parseInt Number
// .toSting()
// 數字+空字串 數字+字串會變成字串 