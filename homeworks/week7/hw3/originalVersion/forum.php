<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Record 記錄</title>
    <link rel="stylesheet "href="https://fonts.googleapis.com/css?family=Nunito:300,400,700">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/main.css">
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="js/main.js"></script>
    <style>
        .highlight {
            background: #bfd7ea;
        } 
    </style>
</head>
<body>
    <header id="header">

            <div id="header__logo">
                <h1 id="header__logo--english">Record</h1>
                <h1 id="header__logo--chinese">記錄</h1>
            </div>
            
    </header>
    <main>
        <div class="forum container">

<?php
/* 連接資料庫 */
require_once('conn.php');

$user_id = $read_user_row['id'];
$nickname = $read_user_row['nickname'];
?>
            <!-- create post -->
            <form class="forum__input" action="post.php" method="POST">
                <h1>嗨！ <?echo htmlspecialchars($nickname ,ENT_QUOTES, 'utf-8')?> 有什麼話想說嗎？</h1> 
                <div class="forum__content">
                    <label><textarea name="post_content" required="required" placeholder="快記下你的奇思妙想、靈光乍現！"></textarea></label>
                    <input type="submit" value="分享" class="button">
                </div>
            </form>

<?php
/*  分頁功能準備 */ 
$read_post_quantity = "SELECT * FROM tian_posts";
$read_post_quantity_result = $conn->query($read_post_quantity) or die("Error2"); 

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

            <div class="forum__post" >
   
                <div class="post__info">           
                    <div class="post__nickname"><?echo htmlspecialchars($post_nickname ,ENT_QUOTES, 'utf-8')?></div>
                    <div class="post__time"><?echo $post_time?></div>
                </div>
                <div class="post__content">
                    <div class="post__content--main">
                        <?echo htmlspecialchars($post_content ,ENT_QUOTES, 'utf-8')?>
                    </div>
                    <div class="post__content--modify">

<?php 
        if($post_user_id===$user_id) { /* 只有自己才能修改、刪除留言 */
?>
                        
                        <form action="del_post.php" method="POST">
                            <input type="hidden" checked="checked" name="post_id" value="<?echo $post_id?>">  
                            <input type="submit" value="刪除" class='button'>
                        </form>
                        <form action="modify_post.php" method="POST"> 
                            <input type="hidden" checked="checked" name="post_id" value="<?echo $post_id?>" >
                            <input type="submit" value="修改" class='button'> 
                        </form>
                    
<?php   
            }
?>
                    </div>
                </div>
                
                <!-- create comment -->
                <form class="forum__comment--input comment" action="comment.php" method="POST">
                    <div class="forum__comment--content">
                        <label><textarea name="comment_content" required="required" placeholder="讓我們的思緒互相連接"></textarea></label>
                        <input type="hidden" checked="checked" name="post_id" value="<?echo $post_id?>">
                        <input type="submit" value="連接" class="button">
                    </div>
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
        
                <div class="forum__comment--output <?if($comment_user_id===$post_user_id) echo'highlight'?>"> 
                    <div class="comment__info">
                        <div class="comment__nickname"><?echo htmlspecialchars($comment_nickname ,ENT_QUOTES, 'utf-8') ?></div>
                        <div class="comment__time"><?echo $comment_time ?></div>
                    </div>
                    <div class="comment__content">
                        <div class="comment__content--main">
                            <?echo htmlspecialchars($comment_content ,ENT_QUOTES, 'utf-8') ?>
                        </div>
                        <div class="comment__content--modify">

<?php 
        if($comment_user_id===$user_id) { /* 只有自己才能修改迴響 */
?>    

                            <form action="del_comment.php" method="POST"> 
                                <input type="hidden" checked="checked" name="comment_id" value="<?echo $comment_id?>" > 
                                <input type="submit" value="刪除" class='button'> 
                            </form>
                            <form action="modify_comment.php" method="POST"> 
                                <input type="hidden" checked="checked" name="comment_id" value="<?echo $comment_id?>" >
                                <input type="submit" value="修改" class='button'>
                            </form>

<?php
            }
?>          
                        </div>
                    
                    </div>    
                </div>

<?php
        }
    }
?>
            </div>
<?php
    }
} 
?> 
    </main>

    <div class="float">
        <a href="forum.php?page=1" class="button"><<</a>
        <a href="logout.php" class="button">登出</a>

<?php /* 換頁功能 */ 
for( $i=1 ; $i<$page_quantity ; $i++ ) {/* 好像有點異常 比較多頁 要再重新測試 SQL 指令 */
    if ( $page-1 <= $i && $i <= $page+1 ) {
        echo "<a href=?page=".$i." class=button>".$i."</a> "; 
    }
} 
?>

        <a href="forum.php?page=<?echo$page_quantity?>" class="button">>></a>
    </div>

    <footer id="footer">
        <div id="footer__copy">Copyright &copy; 2018 Futian Shen</div>
    </footer>
    
</body>
</html>