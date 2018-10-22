<?php
/* 建立登入檔案 */
$db_hostname = "localhost"; 
$db_username = "root";
$db_password = ""; 
$db_name = "mentor_program_db"; // database name

$conn = new mysqli($db_hostname, $db_username, $db_password, $db_name); // 建立一個新物件 mysqli
$conn->query("SET NAMES 'UTF8'"); // 設定資料庫編碼
$conn->query("SET time_zone = '+08:00'"); // 設定資料庫時區

if ($conn->connect_error) { //connect_error 是內建函式 回傳錯誤訊息
    die("連接失敗: " . $conn->connect_error); // die 停止執行 PHP 程式
}

/* 確認通行證 */
if (isset($_COOKIE["session_id"])) $session_id = $_COOKIE["session_id"]; 

/* 利用通行證取得 user 資料 */
$read_user = $conn->prepare("SELECT tian_users.id, tian_users.nickname FROM tian_certificates 
LEFT JOIN tian_users ON tian_users.id = tian_certificates.user_id 
WHERE tian_certificates.id =? AND tian_certificates.is_deleted='1' "); 
$read_user->bind_param("s", $session_id);
$read_user->execute();
$read_user_result = $read_user->get_result();
$read_user_row = $read_user_result->fetch_assoc();
?>