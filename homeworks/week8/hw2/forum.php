<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>week8 Record 記錄</title>
    <link rel="stylesheet" href="https://bootswatch.com/4/darkly/bootstrap.min.css">
    <link rel="stylesheet" href="css/bootstrap.css">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <script src="js/main.js"></script>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Record 記錄</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor02">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="btn btn-secondary" href="function/logout.php">登出<span class="sr-only">(current)</span></a>
                </li>
            </ul>
        </div>
    </nav>
    <main class="forum container">

<?php
/* 連接資料庫 */
require_once('function/conn.php');
/* 取得 Session id */
require_once('function/certificate.php');
$user_id = $read_user_row['id'];
$nickname = $read_user_row['nickname'];
?>
        <div class="post__create jumbotron">
            <div>
                <h1>嗨！<?echo htmlspecialchars($nickname ,ENT_QUOTES, 'utf-8')?> 有什麼話想說嗎？</h1> 
            </div>
            <hr class="my-4">
            <!-- create post -->
            <form action="function/post.php" method="POST">
                <label><textarea name="post_content" required="required" placeholder="快記下你的奇思妙想、靈光乍現！"></textarea></label>
                <input type="submit" value="分享" class="btn btn-primary btn-lg">
            </form>
        </div>  
            
<?php
/*  分頁功能準備 */ 
$read_post_quantity = $conn->prepare("SELECT is_deleted FROM tian_posts WHERE is_deleted=1 ");
$read_post_quantity->execute() or die("Error2"); 
$read_post_quantity_result = $read_post_quantity->get_result();

$post_quantity = $read_post_quantity_result->num_rows;
$per_page = 10;
$page_quantity = ceil($post_quantity/$per_page);

if (!isset($_GET['page'])) $page =1; 
else $page = intval($_GET["page"]); 
$skip = ($page-1)*$per_page; 

/* read post 分頁功能 *//* 如果沒有插入使用者輸入的變數是否還有 SQL injection 的風險？ 防止已經儲存在資料庫的程式碼？ */
$read_post =$conn->prepare("SELECT tian_posts.id, tian_posts.created_at, tian_posts.user_id, tian_posts.content, tian_users.nickname FROM tian_posts 
LEFT JOIN tian_users ON tian_posts.user_id = tian_users.id 
WHERE tian_posts.is_deleted=1 ORDER BY created_at DESC 
LIMIT ?, ? ");
$read_post->bind_param("ii", $skip, $per_page);
$read_post->execute();
$read_post_result = $read_post->get_result() or die("Error3");

if ($read_post_result->num_rows >0) {
    while ($read_post_row = $read_post_result->fetch_array()) {
        $post_nickname = $read_post_row['nickname'];
        $post_time = $read_post_row['created_at'];
        $post_content = $read_post_row['content'];
        $post_id = $read_post_row['id']; 
        $post_user_id = $read_post_row['user_id']; 

?>

        <div class="post__read card border-dark">
            <div class="post__read--header card-header">
                <div class="post__read--info">
                    <div><?echo htmlspecialchars($post_nickname ,ENT_QUOTES, 'utf-8')?></div>
                    <div><?echo $post_time?></div>
                </div>
                <div class="post__modify">
<?php 
        if($post_user_id===$user_id) { /* 只有自己才能修改、刪除留言 */
?>                   
                    <form action="function/del_post.php" method="POST">
                        <input type="hidden" checked="checked" name="post_id" value="<?echo $post_id?>">  
                        <input type="submit" value="刪除" class='btn btn-danger'>
                    </form>
                    <form action="function/modify_post.php" method="POST"> 
                        <input type="hidden" checked="checked" name="post_id" value="<?echo $post_id?>" >
                        <input type="submit" value="修改" class='btn btn-warning'> 
                    </form>    
<?php   
            }
?>
                </div>
            </div>
            <div class="post__read--main card-body">
                <p class="post__read--content card-text"><?echo htmlspecialchars($post_content ,ENT_QUOTES, 'utf-8')?></p>
                <!-- create comment -->
                <form class="comment__create" action="function/comment.php" method="POST">
                    <label><textarea name="comment_content" required="required" placeholder="讓我們的思緒互相連接"></textarea></label>
                    <input type="hidden" checked="checked" name="post_id" value="<?echo $post_id?>">
                    <input type="submit" value="連接" class="btn btn-success">
                </form>
                    
                    
<?php
/* read comment */
$read_comment = $conn->prepare("SELECT tian_comments.id, tian_comments.created_at, tian_users.nickname, tian_comments.post_id, tian_comments.user_id, tian_comments.content FROM tian_comments 
LEFT JOIN tian_users ON tian_comments.user_id = tian_users.id 
WHERE post_id=? AND tian_comments.is_deleted=1 
ORDER BY created_at DESC");
$read_comment->bind_param('i', $post_id); 
$read_comment->execute() or die("Error4");
$read_comment_result = $read_comment->get_result(); 

if ($read_comment_result->num_rows >0) {
    while ($read_comment_row = $read_comment_result->fetch_assoc()) { 
        $comment_time = $read_comment_row['created_at'];
        $comment_nickname = $read_comment_row['nickname'];
        $comment_content = $read_comment_row['content'];
        $comment_user_id = $read_comment_row['user_id'];
        $comment_id = $read_comment_row['id'];
?>


                <div class="comment__read <?if($comment_user_id===$post_user_id) echo'card text-white bg-danger mb-3'?> card border-primary mb-3">
                    <div class="comment__read--header card-header">
                        <div class="comment__read--info">
                            <div><?echo htmlspecialchars($comment_nickname ,ENT_QUOTES, 'utf-8') ?></div>
                            <div><?echo $comment_time ?></div>
                        </div>
                        <div class="comment__modify">

<?php 
        if($comment_user_id===$user_id) { /* 只有自己才能修改迴響 */
?>    
                            <form action="function/del_comment.php" method="POST"> 
                                <input type="hidden" checked="checked" name="comment_id" value="<?echo $comment_id?>" > 
                                <input type="submit" value="刪除" class='btn btn-danger'> 
                            </form>
                            <form action="function/modify_comment.php" method="POST"> 
                                <input type="hidden" checked="checked" name="comment_id" value="<?echo $comment_id?>" >
                                <input type="submit" value="修改" class='btn btn-warning'>
                            </form>

                        
<?php
            }
?>                      
                        </div>
                    </div>
                    <div class="comment__read--main card-body">
                        <p class="comment__read--content card-text"><?echo htmlspecialchars($comment_content ,ENT_QUOTES, 'utf-8') ?></p>    
                    </div>
                </div>

<?php
        }
    }
?>
            </div>
        </div>
<?php
    }
} 
?> 
    <main>

    <div class="float">
        <ul class="btn-toolbar btn-group">
            <li>
                <a class="btn btn-secondary" href="forum.php?page=1">&laquo;</a>
            </li>

<?php /* 換頁功能 */ 
for( $i=1 ; $i<$page_quantity ; $i++ ) {
    if ( $page-1 <= $i && $i <= $page+1 ) {
        echo "<li><a href=?page=".$i." class='btn btn-secondary'>".$i."</a></li> "; 
    }
} 
?>         
             <li>
                <a class="btn btn-secondary" href="forum.php?page=<?echo$page_quantity?>">&raquo;</a>
            </li>
        </ul>
    </div>
    <footer id="footer">
        <div id="footer__copy">Copyright &copy; 2018 Futian Shen</div>
    </footer>
    
</body>
</html>