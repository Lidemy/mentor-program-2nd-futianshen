<?php
require_once('conn.php');
$user_id = $read_user_row['id'];

if (isset($_POST['post_content'])) { 
    if ($user_id<1) { /* 訪客請註冊 */
        header('Location: signup.php');
    }
    $post_content = $_POST['post_content'];
    $create_post = $conn->prepare("INSERT INTO tian_posts VALUES(NULL, ?, CURRENT_TIMESTAMP, ?, 1)");
    $create_post->bind_param("is" ,$user_id , $post_content);
    $create_post->execute() or die('error1'); 
    header('Location: forum.php');
}

?>