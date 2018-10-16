<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/normalize.css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:300,400,700" rel="stylesheet">
    <link rel="stylesheet" href="css/main.css">
    <title>Sign Up</title>
</head>
<body>
    <header id="header">
        <div id="header__logo">
            <h1 id="header__logo--english">Record</h1>
            <h1 id="header__logo--chinese">記錄</h1>
        </div>
    </header>
    <main>
        
<?php 
require_once ('conn.php');
if (isset($_POST['username'])) {
$username =$_POST['username'];
$nickname =$_POST['nickname'];
$password =password_hash($_POST['password'], PASSWORD_DEFAULT); // 用 hash function 將 密碼變成亂碼，相同字串每次變成的亂碼都不一樣。

$sql = "INSERT INTO tian_users VALUES (NULL, '$username', '$password', '$nickname', 1)"; // 如果是字串要用''包住 數字的話就可以不用
$conn->query($sql) or die('error1');
header('Location: index.html');
}

?>
        <div class="box">    
            <form action="signup.php" method="POST">
                <label>username: <input type="text" name="username" required="required"></label>
                <label>nickname: <input type="text" name="nickname"  required="required"></label>
                <label>password: <input type="password" name="password" required="required"></label>
                <!-- 待補功能:輸入兩次密碼驗證密碼是否相同 DOM-->
                <div class="box__button">
                    <input type="submit" value="註冊" class="button">
                </div>
            </form>
        </div>
    </main>
    <footer id="footer" class="absolute">
        <div id="footer__copy">Copyright &copy; 2018 Futian Shen</div>
    </footer>
</body>
</html>