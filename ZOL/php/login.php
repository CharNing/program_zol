<?php
include "conn.php";
if(isset($_POST['tel']) && isset($_POST['password'])){
    $phone=$_POST['tel'];
    $pass=sha1($_POST['password']);

    $result=$conn->query("select * from registry where phone='$phone' and password='$pass' ");

    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }

}else{
    exit('非法操作');
}