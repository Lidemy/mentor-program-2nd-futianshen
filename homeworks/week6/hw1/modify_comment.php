<?php
require_once('conn.php');
$comment_time =$_POST['created_at'];
$read = "SELECT content FROM tian_comments WHERE created_at='$comment_time' ";
$read_result = $conn->query($read);
$read_result_row = $read_result->fetch_assoc();
$comment_content = $read_result_row['content'];

if(isset($_POST['modify_content'])) {
$comment_content = $_POST['modify_content'];
$update ="UPDATE tian_comments SET content='$comment_content' WHERE created_at ='$comment_time' ";
$conn->query($update);
header('Location: forum.php');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/main.css">
    <title>修改迴響</title>
</head>
<body>
    <form class="forum__input" action="modify_comment.php" method="POST">
        <textarea name="modify_content" required="required"><?echo $comment_content?></textarea>
        <input type="hidden" name="created_at" value="<?echo $comment_time?>">
        <input type="submit" value="更新" class="button">
    </form>
</body>
</html>

