/* 
hw1：印出星星
給定 n（1<=n<=30），依照規律印出正確圖形
*/

printStars(1)
console.log('')
printStars(3)
console.log('')
printStars(6)


function printStars(n) {  
	while (n>0 && n<=30){
		console.log('*')
		n--
	}		
}