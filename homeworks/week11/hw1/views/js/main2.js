$(document).ready(function (e) {
/* 文章 */
  // 文章修改 ok
  $('.post__modify > .post__update').click(function (e) { /* 直接給定 classname 選定 */
    e.preventDefault()
    const postContent = $(this).closest('.post__read').find('.post__read--content')[0].innerText
    const postId = $(e.target).parent().find('input[name=post_id]').val()
    let div = document.createElement('div')
    let form = document.createElement('form')
    let textarea = document.createElement('textarea')
    let input = document.createElement('input')
    let submit = document.createElement('input')
    $(div).addClass('modify')
    $(form).addClass('post-modify').attr('action', '/postUpdate').attr('method', 'POST')
    $(textarea).attr('name', 'modify_content').attr('required', 'required').text(postContent)
    $(input).attr('type', 'hidden').attr('name', 'post_id').attr('value', postId)
    $(submit).addClass('btn btn-info').attr('type', 'submit')
    $(div).append($(form).append(textarea).append(input).append(submit))
    $(e.target).closest('.post__read').find('.post__read--content')[0].replaceWith(div)
  })
  $(document).on('submit', '.post-modify', function (e) {
    const postId = $(e.target.parentNode).find('input[name=post_id]').val()
    const postUpdate = $(e.target.parentNode).find('textarea[name=modify_content]').val()
    $(this).parent().parent().find('.modify').replaceWith(`<p class="post__read--content card-text">${postUpdate}</p>`)

    $.ajax({
      type: 'POST',
      url: '/postUpdate',
      data: {
        post_id: postId,
        post_update: postUpdate
      },
      success: function (res) { /* 不回傳 res 會怎麼樣嘛 ？ */
        console.log(res.result)
      }
    })
  })
  /* 文章刪除 ok */
  $('.post__modify > .post__delete').submit(function (e) {
    e.preventDefault()
    const postId = $(e.target).find('input[name=post_id]').val()
    $(this).closest('.post__read')[0].remove()
    $.ajax({
      type: 'POST',
      url: '/postDelete',
      data: {
        post_id: postId
      },
      success: function (res) { 
        if (res.result==='success') $(this).closest('.post__read')[0].remove()
      }
    })
  })
  /* 迴響（子留言） */
  /* 迴響發文 ok */
  $(document).on('submit', '.comment__create', function (e) {
    e.preventDefault()
    const commentContent = $(e.target).find('textarea[name=comment_content]').val()
    const postId = $(e.target).find('input[name=post_id]').val()
    $.ajax({
      type: 'POST',
      url: '/commentCreate',
      data: {
        comment_content: commentContent,
        post_id: postId
      },
      success: function (response) {
        if (response.result === 'success') { /* 發文之後的視窗顯示有問題 因為沒有回傳 response ？怎麼回傳 response ？ */
          if (response.highlight) {
            $(e.currentTarget).after(`
            <div class="comment__read card mb-3 text-white bg-danger ">
              <div class="comment__read--header card-header">
                <div class="comment__read--info">
                    <div>${response.comment_nickname}</div>
                    <div>${response.comment_time}</div>
                </div>
                <div class="comment__modify">
                    <form class="comment__delete" action="/commentDelete" method="POST"> 
                        <input type="hidden" checked="checked" name="comment_id" value="${response.comment_id}" > 
                        <input type="submit" value="刪除" class='btn btn-danger'> 
                    </form>
                    <form class="comment__update" action="/commentUpdate" method="POST"> 
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
                        <form class="comment__delete" action="/commentDelete" method="POST"> 
                            <input type="hidden" checked="checked" name="comment_id" value="${response.comment_id}" > 
                            <input type="submit" value="刪除" class='btn btn-danger'> 
                        </form>
                        <form class="comment__update" action="/commentUpdate" method="POST"> 
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
          let textarea = document.createElement('textarea')
          $(textarea).addClass('comment__textarea').attr('name', 'comment_content').attr('required', 'required').attr('placeholder', '讓我們的思緒互相連接')
          $(e.target).closest('.comment__create').find('.comment__textarea').replaceWith(textarea)
        } else if (response.result === 'signup') {
          document.location.href = 'index.html'/* 這邊的後端還沒做 */
        }
      }
    })
  })
  /* 迴響修改 */
  $(document).on('click', '.comment__modify > .comment__update', function (e) {
    e.preventDefault()
    let commentContent = $(e.target.parentNode.parentNode.parentNode.parentNode).find('.comment__read--content')[0].innerText
    const commentId = $(e.target.parentNode).find('input[name=comment_id]').val()
    /* 新增一個表單輸入框 */
    let div = document.createElement('div')
    let form = document.createElement('form')
    let textarea = document.createElement('textarea')
    let input = document.createElement('input')
    let submit = document.createElement('input')

    $(div).addClass('modify')
    $(form).addClass('comment-modify').attr('method', 'POST').attr('action', '/commentUpdate')
    $(textarea).attr('name', 'modify_content').attr('required', 'required').text(commentContent)
    $(input).attr('type', 'hidden').attr('name', 'comment_id').attr('value', commentId)
    $(submit).addClass('btn btn-info').attr('type', 'submit')
    $(div).append($(form).append(textarea).append(input).append(submit))
    $(e.target).closest('.comment__read').find('.comment__read--content')[0].replaceWith(div)

  })
  $(document).on('submit', '.modify > .comment-modify ', function (e) {
    e.preventDefault()
    const commentId = $(e.target.parentNode).find('input[name=comment_id]').val()
    const commentUpdate = $(e.target.parentNode).find('textarea[name=modify_content]').val()
    $.ajax({
      type: 'POST',
      url: '/commentUpdate',
      data: {
        comment_id: commentId,
        comment_update: commentUpdate
      },
      success: function (res) {
        if (res.result === 'success') {
          $(e.currentTarget.parentNode).replaceWith(`<p class="comment__read--content card-text">${commentUpdate}</p>`)
        }
      }
    })
  })
  /* 刪除迴響 ok */
  $(document).on('submit', '.comment__modify > .comment__delete', function (e) {
    e.preventDefault()
    const commentId = $(e.target).find('input[name=comment_id]').val()
    console.log(commentId)
    $.ajax({
      type: 'POST',
      url: '/commentDelete',
      data: {
        comment_id: commentId
      },
      success: function (res) {
        if(res.result==='success') $(e.target).closest('.comment__read')[0].remove() /* e.target 和 this 有什麼不同 ？ */
      }
    })
  })
})
