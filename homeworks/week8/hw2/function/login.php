<?php
require_once('conn.php');
session_start();
$username = $_POST['username'];
$password = $_POST['password'];

$read = $conn->prepare( "SELECT * FROM tian_users WHERE username=? ");
$read->bind_param("s" ,$username); 
$read->execute();
$read_result = $read->get_result();
$read_row = $read_result->fetch_assoc();
$hash = $read_row['password'];
$user_id = $read_row['id'];
echo $user_nick = $read_row['nickname'];
if (password_verify($password, $hash)) {
    $_SESSION['user_id'] = $user_id; /* 比較用 cookie 實做的差別 */
    echo $_SESSION['user_nick'] = $user_nick; 
    header('Location: ../forum.php');
} else {
    header('Location: ../index.html');
}
?>