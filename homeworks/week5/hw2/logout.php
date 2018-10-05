<!-- 
html,php 怎麼混著寫?
沒有 HTML 的地方默認是 PHP

如果改 .php 附檔名為 .html 完全沒有影響


怎麼做到一進到頁面直接 focus 輸入框? 

表單的用法不熟 
input 的運行機制是什麼? 將輸入資料傳到name 參數 password?

JavaScript 和 PHP 語法比較表
-->
<?php
$id = $_COOKIE["id"];
setcookie("id", '') ; 
header('Location: index.html');
?>

