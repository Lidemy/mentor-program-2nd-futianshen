<?php
/* 建立登入檔案 */
$db_hostname = "localhost"; 
$db_username = "root";
$db_password = ""; 
$db_name = "mentor_program_2nd_db"; // database name

$conn = new mysqli($db_hostname, $db_username, $db_password, $db_name); // 建立一個新物件 mysqli
/* 怎麼測試有沒有鏈接成功? */
if ($conn->connect_error) { //connect_error 是內建函式?
    die("連接失敗: " . $conn->connect_error); // die 什麼意思
}
?>