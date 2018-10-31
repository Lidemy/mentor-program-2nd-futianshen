<?php
$servername="localhost";
$username="tian";
$password="zUUM9nku=FkKwtyX";
$dbname="week8hw3UNSIGNED";

$conn = new mysqli($servername, $username, $password, $dbname );

if($conn->connect_error) {
  die ("Connection failed: " . $conn->connect_error);
}
$conn->query("SET NAMES 'UTF8'");

?>