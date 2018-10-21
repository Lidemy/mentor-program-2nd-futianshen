 $(document).ready(function(e){
/* 處理文章 */
    /* 文章修改 ok */
    $(document).on("click",'.post__content--modify > [action="modify_post.php"]', function(e) {
        e.preventDefault();
        
        const commentContent =e.target.parentNode.parentNode.parentNode.firstElementChild.innerText
        const post_id = $(e.target.parentNode).find("input[name=post_id]").val()

        /* 新增一個表單輸入框 */
        div =document.createElement('div')
        div.setAttribute("class", "post__modify")

        form = document.createElement('form')
        form.setAttribute("action", "modify_post.php")
        form.setAttribute("method", "POST")

        textarea = document.createElement('textarea')
        textarea.setAttribute("name", "modify_content")
        textarea.setAttribute("required", "required")

        input = document.createElement('input')
        input.setAttribute("type", "hidden" )
        input.setAttribute("name", "post_id")
        input.setAttribute("value", post_id)

        /* 將原來內容放到 textarea 輸入框 */
        textarea.innerText=commentContent
        submit = document.createElement('input')
        submit.setAttribute("type", "submit")
        submit.setAttribute("class", "btn btn-info")
        form.appendChild(textarea)
        form.appendChild(input)
        form.appendChild(submit)
        div.appendChild(form)
        console.log(e.currentTarget.parentNode.parentNode)
        e.target.parentNode.parentNode.parentNode.replaceWith(div) /* 這個代替的動作和我想的不太一樣 */    
    })
    $(document).on("submit",'.post__modify > [action="modify_post.php"]', function(e) {
        e.preventDefault();
        const postId = $(e.target.parentNode).find("input[name=post_id]").val()
        const modifyContent = $(e.target.parentNode).find("textarea[name=modify_content]").val()
        $.ajax({
            type: "POST",
            url: 'modify_post.php',
            data: {
                post_id: postId,
                modify_content: modifyContent
            }, 
            success: function(resp){
                console.log(resp)
                let response = JSON.parse(resp) 
                console.log(response.result)
                if (response.result==='success') {
                    console.log(e.currentTarget.parentNode)
                    $(e.currentTarget.parentNode).replaceWith(`
                    <div class="post__content">
                        <div class="post__content--main">
                            ${modifyContent}
                        </div>
                        <div class="post__content--modify">
                            <form action="del_post.php" method="POST">
                                <input type="hidden" checked="checked" name="post_id" value="<?echo $post_id?>">  
                                <input type="submit" value="刪除" class='button'>
                            </form>
                            <form action="modify_post.php" method="POST"> 
                                <input type="hidden" checked="checked" name="post_id" value="<?echo $post_id?>" >
                                <input type="submit" value="修改" class='button'> 
                            </form>
                        </div>
                    </div>
                    `)
                }
            }
        })
    })
    /* 文章刪除 ok*/ /* bug 新增的留言無法刪除 */  
    $('.post__content--modify > [action="del_post.php"]').submit(function(e) {
        e.preventDefault();
        const post_id = $(e.target).find("input[name=post_id]").val()
        console.log(post_id)
        $.ajax({
            type: "POST",
            url: 'del_post.php',
            data: {
                post_id: post_id,
            }, 
            success: function(){ 
                e.currentTarget.parentNode.parentNode.parentNode.remove()
            }
        }) 
    })
/* 處理迴響 */
    /* 迴響發文 ok */ 
    $(document).on("submit",'.forum__comment--input', function(e) {
        e.preventDefault();
        const comment_content = $(e.target).find("textarea[name=comment_content]").val()
        const post_id = $(e.target).find("input[name=post_id]").val()  
        $.ajax({
            type: "POST",
            url: 'comment.php',
            data: {
                comment_content: comment_content,/* 會不會有 XSS 的問題？ */
                post_id: post_id,
            }, 
            success: function(resp){
                console.log(resp)
                let response = JSON.parse(resp) 
                if (response.result === 'success') { 
                    if (response.highlight) {
                        $(e.currentTarget).after(`
                        <div class="forum__comment--output highlight"> 
                            <div class="comment__info">
                                <div class="comment__nickname">${response.comment_nickname}</div>
                                <div class="comment__time">${response.comment_time}</div>
                            </div>
                            <div class="comment__content">
                                <div class="comment__content--main">
                                    ${comment_content}
                                </div>
                                <div class="comment__content--modify">
                                    <form action="del_comment.php" method="POST"> 
                                        <input type="hidden" checked="chec
                                        ked" name="comment_id" value="${response.comment_id}" > 
                                        <input type="submit" value="刪除" class='button'> 
                                    </form>
                                    <form action="modify_comment.php" method="POST"> 
                                        <input type="hidden" checked="checked" name="comment_id" value="${response.comment_id}" >
                                        <input type="submit" value="修改" class='button'>
                                    </form>
                                </div>    
                            </div>
                    `)
                    } else {
                        $(e.currentTarget).after(`
                        <div class="forum__comment--output"> 
                            <div class="comment__info">
                                <div class="comment__nickname">${response.comment_nickname}</div>
                                <div class="comment__time">${response.comment_time}</div>
                            </div>
                            <div class="comment__content"> 
                                <div class="comment__content--main">
                                    ${comment_content}
                                </div>
                                <div class="comment__content--modify">
                                    <form action="del_comment.php" method="POST"> 
                                        <input type="hidden" checked="chec
                                        ked" name="comment_id" value="${response.comment_id}" > 
                                        <input type="submit" value="刪除" class='button'> 
                                    </form>
                                    <form action="modify_comment.php" method="POST"> 
                                        <input type="hidden" checked="checked" name="comment_id" value="${response.comment_id}" >
                                        <input type="submit" value="修改" class='button'>
                                    </form>
                                </div>    
                            </div>
                            
                        </div>
                        `)
                    }
                    /* 將輸入框清空 */
                    textarea = document.createElement('textarea')
                    textarea.setAttribute("name", "comment_content")
                    textarea.setAttribute("required", "required")
                    textarea.setAttribute("placeholder", "讓我們的思緒互相連接")
                    $(e.currentTarget.firstElementChild.firstElementChild.firstElementChild).replaceWith(textarea)
                }
            }

        })
    })
    /* 迴響修改 ok */
    $(document).on("click",'.comment__content--modify > [action="modify_comment.php"]', function(e) {
        e.preventDefault();
        /* 取得迴響目前的內容 */
        let commentContent =e.currentTarget.parentNode.parentNode.innerText
        const commentId = $(e.target.parentNode).find("input[name=comment_id]").val()

        /* 新增一個表單輸入框 */
        div = document.createElement('div')
        div.setAttribute("class", "comment__modify")

        form = document.createElement('form')
        form.setAttribute("method", "POST")
        form.setAttribute("action", "modify_comment.php")

        textarea = document.createElement('textarea')
        textarea.setAttribute("name", "modify_content")
        textarea.setAttribute("required", "required")
        textarea.innerText=commentContent

        input = document.createElement('input')
        input.setAttribute("type", "hidden" )
        input.setAttribute("name", "comment_id")
        input.setAttribute("value", commentId)

        submit = document.createElement('input')
        submit.setAttribute("type", "submit")
        submit.setAttribute("class", "button")

        form.appendChild(textarea)
        form.appendChild(input)
        form.appendChild(submit)

        div.appendChild(form)
        
        e.currentTarget.parentNode.replaceWith(div) 
    })
    /* 停止表單送出 */
    $(document).on("submit",'.comment__modify > [action="modify_comment.php"]', function(e) {
        e.preventDefault()
        const commentId = $(e.target.parentNode).find("input[name=comment_id]").val()
        const modifyContent = $(e.target.parentNode).find("textarea[name=modify_content]").val()
        $.ajax({
            type: "POST",
            url: 'modify_comment.php',
            data: {
                comment_id: commentId,
                modify_content: modifyContent
            }, 
            success: function(resp){
                console.log(resp)
                let response = JSON.parse(resp)
                console.log(response)
                if(response.result==='success') {
                    $(e.currentTarget.parentNode.parentNode).replaceWith(`
                    <div class="comment__content">
                        <div class="comment__content--main">
                        ${modifyContent}
                        </div>
                        <div class="comment__content--modify">
                            <form action="del_comment.php" method="POST"> 
                                <input type="hidden" checked="checked" name="comment_id" value=${commentId}> 
                                <input type="submit" value="刪除" class="button"> 
                            </form>
                            <form action="modify_comment.php" method="POST"> 
                                <input type="hidden" checked="checked" name="comment_id" value=${commentId}>
                                <input type="submit" value="修改" class="button">
                            </form>
                        </div>
                    </div>
                    `)
                    
                }
            }
        })
    }) 
    /* 刪除迴響 ok*/
    $(document).on("submit",'.comment__content--modify > [action="del_comment.php"]', function(e) {
        e.preventDefault();
        const comment_id = $(e.target).find("input[name=comment_id]").val()
        $.ajax({
            type: "POST",
            url: 'del_comment.php',
            data: {
                comment_id: comment_id,
            }, 
            success: function(){ 
                e.currentTarget.parentNode.parentNode.parentNode.remove()
            }
        }) 
    })
}) 
