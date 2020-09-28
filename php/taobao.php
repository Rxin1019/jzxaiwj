<?php
header('content-type:text/html;charset=utf-8');
define('HOST','localhost');
define('USERNAME','root');
define('PASSWORD','root');
define('DBNAME','jzx');
$conn = @new mysqli(HOST,USERNAME,PASSWORD,DBNAME);
if($conn->connect_error){
    die('数据库连接失败'.$conn->connect_error);
}
//详情页
if(isset($_GET['sid'])){
    $sid = $_GET['sid'];
    $result = $conn->query("select * from taobao where sid=$sid");
    echo json_encode($result->fetch_assoc());
}
//数据渲染
$conn->query('SET NAMES UTF8');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
$result = $conn->query("select * from taobao");
$arr = array();
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i]=$result->fetch_assoc();
}

echo json_encode($arr);