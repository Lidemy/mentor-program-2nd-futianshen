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
$id = $read_row['id'];
if (password_verify($password, $hash)) {
    echo $_SESSION['id'] = uniqid(); 
    $create = $conn->prepare("INSERT INTO tian_certificates VALUES (?, ?)");
    $create->bind_param("si", $_SESSION['id'], $id);
    $create->execute() or die ('error');
    header('Location: ../forum.php');
} else {
    header('Location: ../index.html');
}
?>