<?php
require_once('conn.php');
session_start();
$user_id = $_SESSION['user_id'];

if (isset($_POST['post_content'])) { 
    if ($user_id<1) { /* 訪客請註冊 */
        header('Location: ../signup.php');
    }
    $post_content = $_POST['post_content'];
    $create_post = $conn->prepare("INSERT INTO tian_posts VALUES(NULL, ?, CURRENT_TIMESTAMP, ?, 0)");/* is_deleted 可以在資料庫設定default為0 */
    $create_post->bind_param("is" ,$user_id , $post_content);
    $create_post->execute() or die('error1'); 
    header('Location: ../forum.php');
}

?>