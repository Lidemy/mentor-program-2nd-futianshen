<?php
$servername="localhost";
$username="root";
$password="";
$dbname="week8hw3v2";

$conn = new mysqli($servername, $username, $password, $dbname );

if($conn->connect_error) {
  die ("Connection failed: " . $conn->connect_error);
}
$conn->query("SET NAMES 'UTF8'");

?>