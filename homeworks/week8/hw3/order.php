<?php
require_once('conn.php');
if(isset($_GET['reset'])) {
  $reset = $_GET['reset'];
  if ($reset==1) {
    echo 'reset<br>';
    $stmt = $conn->prepare("UPDATE products SET amount=1 WHERE id=1");
    $stmt->execute();
    $stmt = $conn->prepare("UPDATE products SET amount=1 WHERE id=2");
    $stmt->execute();
    $stmt = $conn->prepare("UPDATE products SET amount=1 WHERE id=3");
    $stmt->execute();
    $stmt = $conn->prepare("UPDATE products SET amount=1 WHERE id=4");
    $stmt->execute();
    $stmt = $conn->prepare("UPDATE products SET amount=1 WHERE id=5");
    $stmt->execute();
  } 
  if($reset==2) {
    echo '搶購<br>';
    $conn->autocommit(FALSE);
    $conn->begin_transaction();
    $stmt = $conn->prepare("INSERT INTO orders(product_id, amount, price) VALUES ('1', '1', '100')");
    $stmt->execute();
    $stmt = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 1 ");
    $stmt->execute();
    $stmt2 = $conn->prepare("INSERT INTO orders(product_id, amount, price) VALUES ('2', '1', '200') ");
    $stmt2->execute();
    $stmt2 = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 2 ");
    $stmt2->execute();

    $stmt3 = $conn->prepare("INSERT INTO orders(product_id, amount, price) VALUES ('3', '1', '300') ");
    $stmt3->execute();
    $stmt3 = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 3 ");
    $stmt3->execute();
    $stmt4 = $conn->prepare("INSERT INTO orders(product_id, amount, price)VALUES ('4', '1', '400') ");
    $stmt4->execute();
    $stmt4 = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 4 ");
    $stmt4->execute();
    $stmt5 = $conn->prepare("INSERT INTO orders(product_id, amount, price) VALUES ('5', '1', '500') ");
    $stmt5->execute();
    $stmt5 = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 5 ");
    $stmt5->execute();
    $conn->commit();
  } 
  if($reset==3) {
    echo "超賣交易失敗";
    $conn->autocommit(FALSE);
    $conn->begin_transaction();
    $stmt = $conn->prepare("INSERT INTO orders(product_id, amount, price) VALUES ('1', '3', '600')");
    $stmt->execute();
    $stmt = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 1 ");
    $stmt->execute();
    $stmt2 = $conn->prepare("INSERT INTO orders(product_id, amount, price) VALUES ('2', '1', '600') ");
    $stmt2->execute();
    $stmt2 = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 2 ");
    $stmt2->execute();

    $stmt3 = $conn->prepare("INSERT INTO orders(product_id, amount, price) VALUES ('3', '1', '600') ");
    $stmt3->execute();
    $stmt3 = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 3 ");
    $stmt3->execute();
    $stmt4 = $conn->prepare("INSERT INTO orders(product_id, amount, price)VALUES ('4', '1', '600') ");
    $stmt4->execute();
    $stmt4 = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 4 ");
    $stmt4->execute();
    $stmt5 = $conn->prepare("INSERT INTO orders(product_id, amount, price) VALUES ('5', '1', '600') ");
    $stmt5->execute();
    $stmt5 = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 5 ");
    $stmt5->execute();
    $conn->commit();

  }
  echo '顯示庫存<br>';
  $stmt = $conn->prepare("SELECT * FROM products");
  $stmt->execute();
  $result = $stmt->get_result();
  if ($result->num_rows){
    while($row=$result->fetch_assoc()){
      echo "id: " . $row["id"] . ", amount:" . $row['amount'] . "<br>"; 
    }
  }
}

?>
<form action="order.php">
  <fieldset>
    <legend>顯示庫存</legend>
    <input type="hidden" name="reset" value='0'>
    <input type="submit">  
  </fieldset>
</form>

<form action="order.php">
  <fieldset>
    <legend>reset</legend>
    <input type="hidden" name="reset" value='0'>
    <input type="hidden" name="reset" value='1'>
    <input type="submit">  
  </fieldset>
</form>

<form action="order.php">
  <fieldset>
    <legend>搶購</legend>
    <input type="hidden" name="reset" value='0'>
    <input type="hidden" name="reset" value='2'>
    <input type="submit">  
  </fieldset>
</form>
