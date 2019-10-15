<?php
    include "conn.php";
    $result=$conn->query("select * from zolpic where title = 'buy'");
    $zoldata=array();
    for($i=0;$i<$result->num_rows;$i++){
        $zolpic[$i]=$result->fetch_assoc();
    }

    echo json_encode($zolpic);