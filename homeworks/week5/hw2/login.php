<?php
require_once('conn.php');
$username = $_POST['username']; // 對應下面的 name
$password = $_POST['password']; // 對應下面的 name []

$read = "SELECT * FROM `tian_users` WHERE username='" . $username ."' and password='" . $password ."' "; //字串拼接 // sql 是什麼意思
//echo $sql; // debug 跟 console.log 功能一樣 將變數先列印出來
$result = $conn->query($read); // 這段程式碼是什麼意思
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
/*

php 裡 " 和 ' 有什麽差別? 在這邊先繼續用 ' 字串拼接 
_POST 是什麼意思?

bug 將 html 送入伺服器 他不會自己跑 php 但我從書上看說明明可以

我剛剛犯了什麼錯讓我沒辦法登入?


*/

?>