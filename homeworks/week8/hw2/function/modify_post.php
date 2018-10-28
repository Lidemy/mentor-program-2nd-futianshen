<?php
require_once('conn.php');

$post_id=$_POST['post_id']; /* 這裡接收到的資料格式是什麽？ */
$modify_content=$_POST['modify_content'];
$update = $conn->prepare("UPDATE tian_posts SET content=? WHERE id=? ");
$update->bind_param("si", $modify_content, $post_id);
$update->execute() or die;
$arr = array( 
  'result' => 'success'
);
echo json_encode($arr);
?>