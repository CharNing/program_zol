<?php
include "conn.php";
if(isset($_GET['id'])){
    $sid=$_GET['id'];
    $result=$conn->query("select * from zolpic where sid=$sid");
    echo json_encode($result->fetch_assoc());
}