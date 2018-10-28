<?php
/* 確認通行證 */
session_start();
if (isset($_SESSION['id'])) $session_id = $_SESSION['id']; 

/* 利用通行證取得 user 資料 */
$read_user = $conn->prepare("SELECT tian_users.id, tian_users.nickname FROM tian_certificates 
LEFT JOIN tian_users ON tian_users.id = tian_certificates.user_id 
WHERE tian_certificates.id =?"); 
$read_user->bind_param("s", $session_id);
$read_user->execute();
$read_user_result = $read_user->get_result();
$read_user_row = $read_user_result->fetch_assoc();
?>