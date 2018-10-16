<?php
require_once('conn.php');
$post_id = $_POST['post_id'];
$update = "UPDATE tian_posts SET is_deleted=0 WHERE id='$post_id' "; 
$update_result = $conn->query($update);
header('Location: forum.php');
?>
