<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="css/normalize.css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:300,400,700" rel="stylesheet">
    <link rel="stylesheet" href="css/main.css">
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
        <!-- create post -->
<?php
require_once('conn.php');
$id = $_COOKIE["id"]; //確定登入 id
$readnick ="SELECT nickname FROM tian_users WHERE id=$id";
$nickresult = $conn->query($readnick);
$nicknamerow = $nickresult->fetch_assoc();
$nickname = $nicknamerow['nickname'];

if (isset($_POST['post_content'])) { 
    $post_content = $_POST['post_content'];
    $create_post = "INSERT INTO tian_posts VALUES(NULL,'$id', CURRENT_TIMESTAMP, '$post_content')"; // sql
    $conn->query($create_post) ;
}
?>
            <form class="forum__input" action="forum.php" method="POST">
                <h1>嗨！ <?echo $nickname?> 有什麼話想說嗎？</h1>
                <div class="forum__content">
                    <label><textarea name="post_content" required="required" placeholder="快記下你的奇思妙想、靈光乍現！"></textarea></label>
                    <input type="submit" value="分享" class="button">
                </div>
            </form>

        <!-- read post -->
<?php
$readpost = "SELECT tian_users.nickname ,tian_posts.post_id, tian_posts.created_at, tian_posts.content FROM tian_users LEFT JOIN tian_posts ON tian_users.id = tian_posts.id ORDER BY `tian_posts`.`created_at` DESC";
$postresult = $conn->query($readpost) or die("Error1"); 
$post_quantity = $postresult->num_rows;
/*  分頁功能 */
$per_page_quantity = 10;
$page_quantity = ceil($post_quantity/$per_page_quantity);
if (!isset($_GET['page'])) {
    $page =1;
} else {
    $page = intval($_GET["page"]);
}
$start = ($page-1)*$per_page_quantity;
$postresult = $conn->query($readpost . ' LIMIT '. $start . ', ' . $per_page_quantity) or die("Error2");
/* ^分頁功能^ */   
if ($post_quantity >0) {
    while(true) {
        $postrow = $postresult->fetch_assoc();
        if ($postrow['post_id'] === NULL) { 
            break;
        } 
?>
            <div class="forum__post">
                <div class="post__info">           
                    <div class="post__nickname"><?echo $postrow["nickname"]?></div>
                    <div class="post__time"><?echo $postrow["created_at"]?></div>
                </div>
                    
                    <div class="post__content"><?echo $postrow["content"]?></div>

                    <!-- create comment -->
<?php
$post_id = $postrow["post_id"];

if (isset($_POST['msg']) && isset($_POST['comment_content'])) {
$comment_content = $_POST['comment_content'];
$msg = $_POST['msg'];
$create_comment = "INSERT INTO tian_comments VALUES(CURRENT_TIMESTAMP, '$nickname', $msg, '$comment_content')"; //記錄留言的人是誰 而不是發文的人是誰
$conn->query($create_comment) or die("Error3");
$comment_content = '';
$_POST['msg'] =NULL; // 不做會有 bug 瀏覽器 好像會將重新整理前的數值保存
} 
?> 
                    <form class="forum__comment--input" action="forum.php" class="comment" method="POST">
                        <div class="forum__comment--content">
                            <label><textarea name="comment_content" required="required" placeholder="讓我們的思緒互相連接"></textarea></label>
                            <input type="radio" checked="checked" name="msg" value="<?echo $post_id?>"> <!-- 用來發訊號讓 $msg 知道現在是那一個 $post_id 的 po文留言, 之後用 CSS 隱藏-->
                            <input type="submit" value="連接" class="button">
                        </div>
                    </form>

                    <!-- read comment -->
<?php
$readcomment = "SELECT tian_comments.post_id ,tian_comments.created_at, tian_comments.nickname, tian_comments.content FROM tian_posts LEFT JOIN tian_comments ON tian_posts.post_id = tian_comments.post_id AND tian_posts.post_id=$post_id ORDER BY `tian_comments`.`created_at` DESC";
$commentresult = $conn->query($readcomment) or die("Error4");
while ($commentrow = $commentresult->fetch_assoc()) {
    if ($commentrow["post_id"]!=NULL) {
?>
                        <div class="forum__comment--output">
                            <div class="comment__info">
                                <div class="comment__nickname"><?echo $commentrow["nickname"]?></div>
                                <div class="comment__time"><?echo $commentrow["created_at"]?></div>
                            </div>
                            <div class="comment__content"><?echo $commentrow["content"]?></div>
                            
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
        </div>   
    </main>
<div class="float">
    <a href="logout.php" class="button">登出</a>
    <a href="forum.php?page=1" class="button"><<</a>
<?php /* 換頁功能 */
for( $i=1 ; $i<$page_quantity ; $i++ ) {
    if ( $page-3 < $i && $i < $page+3 ) {
        echo "<a href=?page=".$i." class=button>".$i."</a> ";
    }
} 
?>
    <a href="forum.php?page=<?echo$page_quantity-1?>" class="button">>></a>
</div>
    

<footer id="footer">
    <div id="footer__copy">Copyright &copy; 2018 Futian Shen</div>
</footer>
    
</body>
</html>