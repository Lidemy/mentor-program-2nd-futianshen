<?php
require_once('conn.php');
$session_id = $_COOKIE["session_id"]; 
$update = $conn->prepare("UPDATE tian_certificates SET is_deleted=0 WHERE id =? "); 
$update->bind_param("s", $session_id);
$update->execute();
setcookie("session_id", "");
header('Location: index.html');
?>

