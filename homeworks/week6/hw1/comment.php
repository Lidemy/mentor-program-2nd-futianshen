<?php
/* connect to database */
require_once('conn.php');

/* create comment */
$session_id = $_COOKIE["session_id"];

$read_user = $conn->prepare("SELECT tian_users.id FROM tian_users 
LEFT JOIN tian_certificates ON tian_users.id = tian_certificates.user_id 
WHERE tian_certificates.id =? ");
$read_user->bind_param("s", $session_id );
$read_user->execute();
$read_user_result = $read_user->get_result();
$read_user_row = $read_user_result->fetch_assoc();

$id = $read_user_row['id'];

if (isset($_POST['msg']) && isset($_POST['comment_content'])) {
$comment_content = $_POST['comment_content'];
$post_id = $_POST['msg'];
$create_comment = "INSERT INTO tian_comments VALUES(CURRENT_TIMESTAMP, $id, $post_id, '$comment_content', 1)";
$conn->query($create_comment) or die(header('Location: signup.php')); 
header('Location: forum.php');
} 
?> 