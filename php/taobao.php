<?php
//数据渲染
include "conn.php";
$conn->query('SET NAMES UTF8');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
$result = $conn->query("select * from taobao");
$arr = array();
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i]=$result->fetch_assoc();
}

echo json_encode($arr);