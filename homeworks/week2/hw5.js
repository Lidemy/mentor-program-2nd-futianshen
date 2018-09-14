console.log(add('123','456'))
//console.log('1234'+'5678')
console.log(add('12312383813881381381','129018313819319831'))
console.log('2456')
console.log(2456)

function add(a, b) {
	var number1 =parseInt(a,10)
	var number2 =parseInt(b,10)
	var sum = number1 + number2
	return sum.toString()
}

module.exports = add;

/* 
解題思路1
先把字串變成數字，相加之後在變回字串輸出

解題思路2
先對齊 個位對個位、十位對十位，超過10的就進位。
從各自最大的開始相加

取出數值相加


*/

// 字串和字串相加會變成更長的字串
// 字串怎麼變成數字？
// .toSting()
// 數字+空字串 數字+字串會變成字串