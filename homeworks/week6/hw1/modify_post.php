<?php
require_once('conn.php');

$post_id=$_POST['post_id'];
$read = "SELECT tian_posts.content FROM tian_posts WHERE tian_posts.id=$post_id ";
$read_result = $conn->query($read);
$read_result_row = $read_result->fetch_assoc();
$post_content = $read_result_row['content'];

if(isset($_POST['modify_content']))  {
$modify_content=$_POST['modify_content'];
$update ="UPDATE tian_posts SET content='$modify_content' WHERE id=$post_id ";
echo $update;
$conn->query($update);
header("Location: forum.php"); 
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/main.css">
    <title>修改留言</title>
</head>
<body>
<form class="forum__input" action="modify_post.php" method='POST'>
    <textarea name="modify_content" required="required"><?echo $post_content?></textarea>
    <input type="hidden" name="post_id" value='<?echo $post_id?>'>
    <input type="submit" class="button" value='更新'> 
</form>
</body>
</html>