<?php
include "conn.php"; 
if (isset($_POST['xingming']) || isset($_POST['submit'])) { //获取用户名
    $name = @$_POST['xingming']; //取值
    $result = $conn->query("select * from registry where username='$name'"); //如果能够找到记录，用户名存在的
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
    $user = $_POST['username'];
    $pass = sha1($_POST['password']);
    $email = $_POST['email'];
    $conn->query("insert registry values(null,'$user','$pass','$email',NOW())");
    header('http://10.31.155.61/program_zol/ZOL/src/login.html'); //php的跳转
    //echo "<script> location.href='http://localhost/JS1909/Day%2022/loginregistry/src/login.html'; </script>";
}