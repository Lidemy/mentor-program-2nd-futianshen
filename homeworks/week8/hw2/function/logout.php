<?php
require_once('conn.php');
session_start();
$user_id = $_SESSION['user_id'];
session_unset(); /* unset 和 destroy 的差別？ */
session_destroy();

header('Location: ../');

?>

