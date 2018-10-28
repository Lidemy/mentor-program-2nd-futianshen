$(document).ready(function(e){
    /* 處理文章 */
        /* 文章修改 */
        $('.post__modify > [action="function/modify_post.php"]').click(function(e) {
            e.preventDefault();
            const postContent =$(e.target.parentNode.parentNode.parentNode.parentNode).find('.post__read--content')[0].innerText
            const postId = $(e.target.parentNode).find("input[name=post_id]").val()
    
            /* 新增一個表單輸入框 */
            div =document.createElement('div')
            div.setAttribute("class", "modify")
    
            form = document.createElement('form')
            form.setAttribute("action", "function/modify_post.php")
            form.setAttribute("method", "POST")
    
            textarea = document.createElement('textarea')
            textarea.setAttribute("name", "modify_content")
            textarea.setAttribute("required", "required")
            textarea.innerText=postContent
    
            input = document.createElement('input')
            input.setAttribute("type", "hidden" )
            input.setAttribute("name", "post_id")
            input.setAttribute("value", postId)
    
            submit = document.createElement('input')
            submit.setAttribute("type", "submit")
            submit.setAttribute("class", "btn btn-info")

            form.appendChild(textarea)
            form.appendChild(input)
            form.appendChild(submit)

            div.appendChild(form)

            $(e.target.parentNode.parentNode.parentNode.parentNode).find('.post__read--content')[0].replaceWith(div) /* 這個代替的動作和我想的不太一樣 */    
        })
        $(document).on("submit",'.modify > [action="function/modify_post.php"]', function(e) {
            e.preventDefault();
            const postId = $(e.target.parentNode).find("input[name=post_id]").val()
            const modifyContent = $(e.target.parentNode).find("textarea[name=modify_content]").val()
            
        })
        /* 文章刪除 */
        $('.post__modify > [action="function/del_post.php"]').submit(function(e) {
            e.preventDefault();
            const post_id = $(e.target).find("input[name=post_id]").val()
            console.log(post_id)
            $.ajax({
                type: "POST",
                url: 'function/del_post.php',
                data: {
                    post_id: post_id,
                }, 
                success: function(){ 
                    e.currentTarget.parentNode.parentNode.parentNode.remove()
                }
            }) 
        })
    /* 處理迴響 */
        /* 迴響發文 */ 
        $(document).on("submit",'.comment__create', function(e) {
            e.preventDefault();
            const commentContent = $(e.target).find("textarea[name=comment_content]").val()
            const postId = $(e.target).find("input[name=post_id]").val()
            $.ajax({
                type: "POST",
                url: 'function/comment.php',
                data: {
                    comment_content: commentContent,/* 會不會有 XSS 的問題？ */
                    post_id: postId,
                }, 
                success: function(resp){
                    console.log(resp)
                    let response = JSON.parse(resp) 
                    if (response.result === 'success') { 
                        if (response.highlight) {
                            $(e.currentTarget).after(`
                            <div class="comment__read card text-white bg-danger mb-3">
                                <div class="comment__read--header card-header">
                                    <div class="comment__read--info">
                                        <div>${response.comment_nickname}</div>
                                        <div>${response.comment_time}</div>
                                    </div>
                                    <div class="comment__modify">
                                        <form action="function/del_comment.php" method="POST"> 
                                            <input type="hidden" checked="checked" name="comment_id" value="${response.comment_id}" > 
                                            <input type="submit" value="刪除" class='btn btn-danger'> 
                                        </form>
                                        <form action="function/modify_comment.php" method="POST"> 
                                            <input type="hidden" checked="checked" name="comment_id" value="${response.comment_id}"" >
                                            <input type="submit" value="修改" class='btn btn-warning'>
                                        </form>
                                    </div>
                                </div>
                                <div class="comment__read--main card-body">
                                    <p class="comment__read--content card-text">${commentContent}</p>
                                </div>
                            </div>
                        `)
                        } else {
                             $(e.currentTarget).after(`
                             <div class="comment__read card border-primary mb-3">
                                <div class="comment__read--header card-header">
                                    <div class="comment__read--info">
                                        <div>${response.comment_nickname}</div>
                                        <div>${response.comment_time}</div>
                                    </div>
                                    <div class="comment__modify">
                                        <form action="function/del_comment.php" method="POST"> 
                                            <input type="hidden" checked="checked" name="comment_id" value="${response.comment_id}" > 
                                            <input type="submit" value="刪除" class='btn btn-danger'> 
                                        </form>
                                        <form action="function/modify_comment.php" method="POST"> 
                                            <input type="hidden" checked="checked" name="comment_id" value="${response.comment_id}"" >
                                            <input type="submit" value="修改" class='btn btn-warning'>
                                        </form>
                                    </div>
                                </div>
                                <div class="comment__read--main card-body">
                                    <p class="comment__read--content card-text">${commentContent}</p>
                                </div>
                            </div>
                           
                        `)
                        } 
                        /* 將輸入框清空 */
                        textarea = document.createElement('textarea')
                        textarea.setAttribute("name", "comment_content")
                        textarea.setAttribute("required", "required")
                        textarea.setAttribute("placeholder", "讓我們的思緒互相連接")
                        $(e.currentTarget.firstElementChild.firstElementChild).replaceWith(textarea)
                    }
                }
    
            })
        })
        /* 迴響修改 */
        $(document).on("click",'.comment__modify > [action="function/modify_comment.php"]', function(e) {
            e.preventDefault();
            /* 取得迴響目前的內容 */
            let commentContent =$(e.target.parentNode.parentNode.parentNode.parentNode).find('.comment__read--content')[0].innerText
            const commentId = $(e.target.parentNode).find("input[name=comment_id]").val()

            /* 新增一個表單輸入框 */
            div = document.createElement('div')
            div.setAttribute("class", "modify")
    
            form = document.createElement('form')
            form.setAttribute("method", "POST")
            form.setAttribute("action", "function/modify_comment.php")
    
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
            submit.setAttribute("class", "btn btn-info")
    
            form.appendChild(textarea)
            form.appendChild(input)
            form.appendChild(submit)
    
            div.appendChild(form)

            $(e.target.parentNode.parentNode.parentNode.parentNode).find('.comment__read--content')[0].replaceWith(div)
        })
        /* 停止表單送出 */
        $(document).on("submit",'.modify > [action="function/modify_comment.php"]', function(e) {
            e.preventDefault()
            const commentId = $(e.target.parentNode).find("input[name=comment_id]").val()
            const modifyContent = $(e.target.parentNode).find("textarea[name=modify_content]").val()
            console.log(modifyContent)
            $.ajax({
                type: "POST",
                url: 'function/modify_comment.php',
                data: {
                    comment_id: commentId,
                    modify_content: modifyContent
                }, 
                success: function(resp){
                    console.log(resp)
                    let response = JSON.parse(resp)
                    console.log(response)
                    if(response.result==='success') {
                        console.log(e.currentTarget.parentNode.parentNode)
                        $(e.currentTarget.parentNode).replaceWith(`
                            <p class="comment__read--content">${modifyContent}</p>
                        `) 
                    }
                }
            })
        }) 
        /* 刪除迴響 */
        $(document).on("submit",'.comment__modify > [action="function/del_comment.php"]', function(e) {
            e.preventDefault();
            const commentId = $(e.target).find("input[name=comment_id]").val()
            $.ajax({
                type: "POST",
                url: 'function/del_comment.php',
                data: {
                    comment_id: commentId,
                }, 
                success: function(){ 
                    e.currentTarget.parentNode.parentNode.parentNode.remove()
                }
            }) 
        })
    }) 
    