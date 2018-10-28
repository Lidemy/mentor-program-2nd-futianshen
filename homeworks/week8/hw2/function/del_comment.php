<?php
require_once('conn.php');
$comment_id = $_POST['comment_id'];
echo $comment_id;
$update = $conn->prepare("UPDATE tian_comments SET is_deleted=1 WHERE id=?");
$update->bind_param("s", $comment_id);
$update->execute() or die;
?>