<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
include "conn.php";
$result = $conn->query("select * from taobao");
$arr = array();
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i]=$result->fetch_assoc();
}

echo json_encode($arr);