<?php
require_once('conn.php');
$comment_time = $_POST['created_at'];
$update = "UPDATE tian_comments SET is_deleted=0 WHERE created_at='$comment_time' ";
$update_result = $conn->query($update);
header('Location: forum.php');
?>