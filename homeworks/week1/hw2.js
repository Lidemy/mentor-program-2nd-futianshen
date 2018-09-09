/*hw2：首字母大寫
給定一字串，把第一個字轉成大寫之後回傳，若第一個字不是英文字母則忽略。
*/
capitalize('nick')
capitalize('Nick')
capitalize(',hello')

function capitalize(str) {
	var ASCII = str.charCodeAt(0)
	if ( 96 < ASCII && ASCII < 123 ) {
		var lowercase =String.fromCharCode(ASCII)
		var capitalization =String.fromCharCode(ASCII -32)
		console.log(str.replace(lowercase,capitalization));
	} else {
		console.log(str)
	}
}


/*
1.截取第一個字母
怎麼截取第一個文字?
2.判斷第一個字母是大寫、小寫還是標點符號
3.如果是大寫和標點符號直接印出，如果是小寫轉換第一個字母印出
怎麽只替換第一個文字?
*/

//使用 ASCII Code
//function 裡的 return 和 console.log

