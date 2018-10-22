<?php
require_once('conn.php');

$post_id=$_POST['post_id'];
$modify_content=$_POST['modify_content'];
$update = $conn->prepare("UPDATE tian_posts SET content=? WHERE id=? ");
$update->bind_param("si", $modify_content, $post_id);
$update->execute() or die;
$arr = array( 
  'result' => 'success'
);
echo json_encode($arr);
?>