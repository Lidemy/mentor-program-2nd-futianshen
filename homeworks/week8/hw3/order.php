<?php
/* 問題 order.id 的 SQL 指令 rollback 之後，id 不會依照原來的 order.id 順序繼續計算，比如原本的 id 計算到10，在3組訂單（1組五筆訂單）失敗之後，當第四組訂單成功時， id 變成從26開始計算，這樣正常嗎？rollback 是將已經執行的 SQL 執行資料刪除而已？ */
/* 複習：可以將 prepare statement 用 query 改寫 
超賣和購買重複動作可以寫在一起

*/
echo 'UNSIGNED<br><br>';
require_once('conn.php');
if(isset($_GET['reset'])) {
  $reset = $_GET['reset'];

  $order_counter=0;
  $product_counter=0;

  if ($reset==1) {
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
    echo '重設成功<br><br>';
  } 
  if($reset==2) {
    $conn->autocommit(FALSE);
    $conn->begin_transaction();

/*     $order1 = $conn->prepare("INSERT INTO orders(product_id, amount, price) VALUES ('1', '1', '100')");
    $order1->execute();
    $product1 = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 1 AND amount >= 0");//要是>=不能是>，如果是>，SQL雖然有執行，但 amount 不會變負數,就無法判斷有沒有超賣。
    $product1->execute();

    $order2 = $conn->prepare("INSERT INTO orders(product_id, amount, price) VALUES ('2', '1', '200') ");
    $order2->execute();
    $product2 = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 2 AND amount >= 0");
    $product2->execute();

    $order3 = $conn->prepare("INSERT INTO orders(product_id, amount, price) VALUES ('3', '1', '300') ");
    $order3->execute();
    $product3 = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 3 AND amount >= 0");
    $product3->execute();

    $order4 = $conn->prepare("INSERT INTO orders(product_id, amount, price)VALUES ('4', '1', '400') ");
    $order4->execute();
    $product4 = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 4 AND amount >= 0");
    $product4->execute();

    $order5 = $conn->prepare("INSERT INTO orders(product_id, amount, price) VALUES ('5', '1', '500') ");
    $order5->execute();
    $product5 = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 5 AND amount >= 0");
    $product5->execute();

    for ($i=1;$i<=5;$i++) {
      $product = $conn->prepare('SELECT amount FROM products WHERE id = ?');
      $product->bind_param('i', $i);
      $product->execute();
      $result = $product->get_result();
      $row =$result->fetch_assoc();
      if ($row['amount']<0) {
        $i=0;
        break;
      }
    }

    if($i) {
      echo '購買成功<br><br>';
      $conn->commit();
    } 
    else {
      echo "購買失敗<br><br>";
      $conn->rollback();
    }  */
   
    //如果 products.amount 的 Attributes 設為 UNSINGED 可以這樣寫，上一次沒成功阻止超賣是因為沒有 rollback
     
    $order1 = $conn->prepare("INSERT INTO orders(product_id, amount, price) VALUES ('1', '1', '100')");
    if($order1->execute()) $order_counter++;
    $product1 = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 1 ");
    if($product1->execute()) $product_counter++;

    $order2 = $conn->prepare("INSERT INTO orders(product_id, amount, price) VALUES ('2', '1', '200') ");
    if($order2->execute()) $order_counter++;
    $product2 = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 2 ");
    if($product2->execute()) $product_counter++;

    $order3 = $conn->prepare("INSERT INTO orders(product_id, amount, price) VALUES ('3', '1', '300') ");
    if($order3->execute()) $order_counter++;
    $product3 = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 3 ");
    if($product3->execute()) $product_counter++;

    $order4 = $conn->prepare("INSERT INTO orders(product_id, amount, price)VALUES ('4', '1', '400') ");
    if($order4->execute()) $order_counter++;
    $product4 = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 4 ");
    if($product4->execute()) $product_counter++;

    $order5 = $conn->prepare("INSERT INTO orders(product_id, amount, price) VALUES ('5', '1', '500') ");
    if($order5->execute()) $order_counter++;
    $product5 = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 5 ");
    if($product5->execute()) $product_counter++; 

    echo "order:$order_counter<br>"; // PHP 的 " 相當於 JS 的 ` 
    echo 'product:'.$product_counter.'<br>';

    if($order_counter==5 && $product_counter==5) {
      echo '購買成功<br><br>';
      $conn->commit();
    } 
    else {
      echo "購買失敗<br><br>";
      $conn->rollback();
    } 

  } 
  if($reset==3) {
    $conn->autocommit(FALSE);
    $conn->begin_transaction();

    /* 第一項商品超賣 */
/*     $order1 = $conn->prepare("INSERT INTO orders(product_id, amount, price) VALUES ('1', '3', '100')");
    $order1->execute();
    $product1 = $conn->prepare("UPDATE products SET amount = amount-3 WHERE products.id = 1 AND amount >= 0");
    $product1->execute();

    $order2 = $conn->prepare("INSERT INTO orders(product_id, amount, price) VALUES ('2', '1', '200') ");
    $order2->execute();
    $product2 = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 2 AND amount >= 0");
    $product2->execute();

    $order3 = $conn->prepare("INSERT INTO orders(product_id, amount, price) VALUES ('3', '1', '300') ");
    $order3->execute();
    $product3 = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 3 AND amount >= 0");
    $product3->execute();

    $order4 = $conn->prepare("INSERT INTO orders(product_id, amount, price)VALUES ('4', '1', '400') ");
    $order4->execute();
    $product4 = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 4 AND amount >= 0");
    $product4->execute();

    $order5 = $conn->prepare("INSERT INTO orders(product_id, amount, price) VALUES ('5', '1', '500') ");
    $order5->execute();
    $product5 = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 5 AND amount >= 0");
    $product5->execute();

    for ($i=1;$i<=5;$i++) {
      $product = $conn->prepare('SELECT amount FROM products WHERE id = ?');
      $product->bind_param('i', $i);
      $product->execute();
      $result = $product->get_result();
      $row =$result->fetch_assoc();
      if ($row['amount']<0) {
        $i=0;
        break;
      }
    }

    if($i) {
      echo '超賣成功？怎麼可能！<br><br>';
      $conn->commit();
    } 
    else {
      echo "超賣<br><br>";
      $conn->rollback();
    }    */

    //如果 products.amount 的 Attributes 設為 UNSINGED 可以這樣寫，上一次沒成功阻止超賣是因為沒有 rollback
    $order1 = $conn->prepare("INSERT INTO orders(product_id, amount, price) VALUES ('1', '3', '100')");
    if($order1->execute()) $order_counter++;
    $product1 = $conn->prepare("UPDATE products SET amount = amount-3 WHERE products.id = 1");
    if($product1->execute()) $product_counter++;

    $order2 = $conn->prepare("INSERT INTO orders(product_id, amount, price) VALUES ('2', '1', '200') ");
    if($order2->execute()) $order_counter++;
    $product2 = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 2 ");
    if($product2->execute()) $product_counter++;

    $order3 = $conn->prepare("INSERT INTO orders(product_id, amount, price) VALUES ('3', '1', '300') ");
    if($order3->execute()) $order_counter++;
    $product3 = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 3 ");
    if($product3->execute()) $product_counter++;

    $order4 = $conn->prepare("INSERT INTO orders(product_id, amount, price)VALUES ('4', '1', '400') ");
    if($order4->execute()) $order_counter++;
    $product4 = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 4 ");
    if($product4->execute()) $product_counter++;

    $order5 = $conn->prepare("INSERT INTO orders(product_id, amount, price) VALUES ('5', '1', '500') ");
    if($order5->execute()) $order_counter++;
    $product5 = $conn->prepare("UPDATE products SET amount = amount-1 WHERE products.id = 5 ");
    if($product5->execute()) $product_counter++;

    echo "order:$order_counter<br>";
    echo 'product:'. $product_counter.'<br>';

    if($order_counter==5 && $product_counter==5) {
      echo '超賣成功？怎麼可能！<br><br>';
      $conn->commit();
    } 
    else {
      echo "超賣<br><br>";
      $conn->rollback();
    } 

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
    <input type="hidden" name="reset" value='1'>
    <input type="submit">  
  </fieldset>
</form>

<form action="order.php">
  <fieldset>
    <legend>普通購買</legend>
    <input type="hidden" name="reset" value='2'>
    <input type="submit">  
  </fieldset>
</form>

<form action="order.php">
  <fieldset>
    <legend>超賣</legend>
    <input type="hidden" name="reset" value='3'>
    <input type="submit">  
  </fieldset>
</form>
