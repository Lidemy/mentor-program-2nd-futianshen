<?php
require_once('conn.php');
$post_id = $_POST['post_id'];
$update = $conn->prepare("UPDATE tian_posts SET is_deleted=1 WHERE id=? "); 
$update->bind_param("i", $post_id);
$update->execute() or die;
?>
