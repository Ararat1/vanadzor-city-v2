<?php error_reporting(-1);

$name = $_GET['name'];
$email = $_GET['email'];
$message = $_GET['message'];

if (!empty($name) and !empty($email) and !empty($message)) {
    $db = @mysqli_connect('localhost', 'root', '', 'vanadzor_city') or die("Connecting error");
    if (!$db) die(mysqli_connect_error());
    
    mysqli_set_charset($db, 'utf8');

    // adding data to db
    $insert = "INSERT INTO user_messages (name, email, message) VALUES ('$name', '$email', '$message')";

    $res_query = mysqli_query($db, $insert);
}