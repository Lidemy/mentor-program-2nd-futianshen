<?php
require_once('conn.php');
$username = $_POST['username'];
$password = $_POST['password'];

$read = $conn->prepare( "SELECT * FROM tian_users WHERE username=? ");
$read->bind_param("s" ,$username); 
$read->execute();
$read_result = $read->get_result();
$read_row = $read_result->fetch_assoc();
$hash = $read_row['password'];
$id = $read_row['id'];

if (password_verify($password, $hash)) {
    $session_id = uniqid(); 
    $create = $conn->prepare("INSERT INTO tian_certificates VALUES (?, ?, 1)");
    $create->bind_param("si", $session_id, $id);
    $create->execute() or die ('error');
    setcookie("session_id", $session_id, time()+3600*24); 
    //header('Location: forum.php');
} else {
    header('Location: index.html');
}
?>