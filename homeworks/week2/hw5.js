console.log(add('957','456'))
//console.log('1234'+'5678')
//console.log(add('12312383813881381381','129018313819319831'))
//console.log('2456')
//console.log(2456)

//先將自己寫的程式，變成自然語言
//用陣列做做看
//可以補0嗎正著做
//把數字都倒過來從0加到最後加完，再倒回去
//我對內建函式不熟.split() .reverse()形態互換 Math.max Number(arrA[i])
//NaN 的資料型別是什麼
//大量使用 短路原理 哪裡可以使用短路定理？
//作業正確度 coding style

//debug 技巧 每次進入下個區塊 條件數值的變化 找到規律 利用規律
//判斷資料型別的語法
/* 20180920
解題思路
從數字的最後面開始加
超過9就進位
如果沒有數字了補零
如果最後一位有進位也要加
*/
function add(a, b) {
	let aDigit =a.length-1
	let bDigit =b.length-1
	let result = ''
	let answer = ''
	let carry = 0
	while (aDigit>=bDigit) {
		if (0>bDigit) answer = Number(a[aDigit]) + carry
		else answer = Number(a[aDigit]) + Number(b[bDigit]) + carry
		if (answer>9) {
			carry = 1
			answer = answer % 10 
		} else {
			carry = 0
		}
		result += answer
		aDigit--
		bDigit--
		if (0>aDigit) break
	}
	while (bDigit>aDigit) {
		if (0>aDigit) result = Number(b[bDigit]) + carry
		else answer = Number(a[aDigit]) + Number(b[bDigit]) + carry
		if (answer>9) {
			carry = 1
			answer = answer % 10 
		} else {
			carry = 0
		}
		aDigit--
		bDigit--
		result += answer
		if (0>bDigit) break
	}
	if (carry > 0) result += 1
	result = reverse(result)
	return result
}

function reverse(str) {
	let newStr =''
	let i = str.length-1 //debug 檢查邏輯有沒有問題 邏輯沒有問題檢查拼字有沒有問題
	while (0<=i) {
		newStr += str[i]
		i--
	}
	return newStr
}

/* for (let i=str.length-1; 0<=i; i--) {
	newStr += str[i]
}  */

/*
function add(a, b) {
	var num1i=a.length-1
	var num2i=b.length-1
	var newStr =""
	var sum = 0 
	var up = 0 // 不能這樣寫？ var sum = up = 0
	// 下面可以用三元運算子改寫
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
		if (sum>9) { //進位
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
	//這邊 reverse 要怎麼用內建函數？可以用嗎？還是只有陣列
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
*/

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

//return Number(a) + Number(b) +'' //float problem