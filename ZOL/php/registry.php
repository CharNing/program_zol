<?php
include "conn.php"; 
if (isset($_POST['userphone']) || isset($_POST['submit'])) { //获取用户名
    $phone = @$_POST['userphone']; //取值
    $result = $conn->query("select * from registry where phone='$phone'"); //如果能够找到记录，用户名存在的
    if ($result->fetch_assoc()) { 
        echo true;
    } else {
        echo false;
    }
} else {
    exit('非法操作'); 
}

//将表单的值接收，放入数据库。
if (isset($_POST['submit'])) { 
    $phone = $_POST['userphone'];
    $pass = sha1($_POST['password']);
    $conn->query("insert registry values(null,'$phone','$pass',NOW())");
    header('location:http://10.31.155.61/program_zol/ZOL/dist/login.html'); //php的跳转
}