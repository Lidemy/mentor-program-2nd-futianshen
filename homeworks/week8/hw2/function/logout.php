<?php
require_once('conn.php');
require_once('certificate.php');
$session_id = $_SESSION["id"]; 
$update = $conn->prepare("DELETE FROM tian_certificates WHERE tian_certificates.id=? "); 
$update->bind_param("s", $session_id);
$update->execute();
session_unset();
session_destroy();

header('Location: ../');

?>

