<?php
require_once('conn.php');
$username = $_POST['username'];
$password = $_POST['password'];

$read = "SELECT * FROM `tian_users` WHERE username='" . $username ."' and password='" . $password ."' "; //字串拼接 // sql 是什麼意思
//echo $sql; // debug 跟 console.log 功能一樣 將變數先列印出來
$result = $conn->query($read); // 執行 sql
$row = $result->fetch_assoc();
$id = $row["id"];
echo $id;

if ($result->num_rows > 0) { //判斷資料庫裡面有沒有資料
    echo '登入成功';
    setcookie("id", $id, time()+3600*24); 
    header('Location: forum.php');
} else {
    header('Location: index.html');
}


?>