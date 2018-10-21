<?php
require_once('conn.php');
$comment_id =$_POST['comment_id'];
$comment_content = $_POST['modify_content'];
$update = $conn->prepare("UPDATE tian_comments SET content=? WHERE id=? ");
$update->bind_param("si", $comment_content, $comment_id);
$update->execute();
$arr = array( 
    'result' => 'success'
);
echo json_encode($arr);
?>
