<?php
$id = $_COOKIE["id"];
setcookie("id", '') ; 
header('Location: index.html');
?>

