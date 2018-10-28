<?php
require_once('conn.php');
require_once('certificate.php');
$session_id = $_SESSION["id"]; 
$update = $conn->prepare("UPDATE tian_certificates SET is_deleted=0 WHERE id =? "); 
$update->bind_param("s", $session_id);
$update->execute();
session_unset();
session_destroy();

header('Location: ../');

?>

