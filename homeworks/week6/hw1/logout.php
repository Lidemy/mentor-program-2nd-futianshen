<?php
require_once('conn.php');
$session_id = $_COOKIE["session_id"]; 
$update ="UPDATE tian_certificates SET is_deleted=0 WHERE id ='$session_id' "; 
$conn->query($update);
setcookie("session_id", "");
header('Location: index.html');
?>

