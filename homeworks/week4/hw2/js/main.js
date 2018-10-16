document.addEventListener('DOMContentLoaded', function () { /* Content Loaded 要大寫 */
    document.querySelector('form').addEventListener('submit' , e => { /* 為什麼需要使用 e 還是搞不懂 */
        let checker = 0
        /* 取得文字題答案 */
        let ipt = document.querySelectorAll('.important') // array
        let questions = ipt.length
        console.log(ipt)
        for (let i=0; i<questions ; i++) {
            if (ipt[i].value==='') {  
                alertOn(ipt[i])
            } else {
                alertOff(ipt[i])
                checker += 1
            }
        }
        
        /* 取得選擇題答案 */
        let classType = document.querySelectorAll('[name=classType]') 
        questions += 1
        console.log(classType)
        if (classType[0].checked===classType[1].checked) {
            alertOn(classType[0])
        } else {
            alertOff(classType[0])
            checker += 1
        }
        /* stop default action */
        if (checker!==questions) e.preventDefault()
        
        /* 繳交成功輸出結果 */
        let unipt = document.querySelector('.unimportant')
        if (checker===questions) {
            /* '' 用ES6語法改寫  `` */
            console.log('電子郵件：' + ipt[0].value)
            console.log('暱稱：' + ipt[1].value)
            
            if (classType[0].checked===true) console.log('報名類型：工程師培養班')
            else console.log('報名類型：業餘班')

            console.log('現在的職業：' + ipt[2].value)
            console.log('相關背景：' + ipt[3].value)
            console.log('其他：' + unipt.value) 
            alert('success')
        }
    })
    function alertOn(a) {
        a.parentNode.querySelector('.alert').innerText ='這是必填問題'
        a.style.borderBottom = '1px solid rgb(216, 66, 56)'
        a.style.background = '#ffebee'
        a.parentNode.style.backgroundColor ='#ffebee'
    }
    function alertOff(a) {
        a.parentNode.querySelector('.alert').innerText =''
        a.style.borderBottom = '1px solid #ddd'
        a.style.background = 'white'
        a.parentNode.style.backgroundColor = 'white'
    }
})