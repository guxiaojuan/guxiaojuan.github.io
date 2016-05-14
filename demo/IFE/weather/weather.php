<?php
header("content-type:text/html;charset=utf-8");
  //$arr = $_POST; //若以$.get()方式发送数据，则要改成$_GET.或者干脆:$_REQUEST
 // $arr = $_REQUEST;
  
 // $arr['append'] = '测试字符串-KKKMMM-BB';//'测试字符串';

  //print_r($arr);
  
//$arr= $_REQUEST;
$arr=$_POST;
$city=$_POST['city'];
$curl = curl_init();
curl_setopt($curl,CURLOPT_URL,"http://api.map.baidu.com/telematics/v3/weather?location=".$city."&output=json&ak=hlVHc2IPsUQX47M2NjeS01D2");
$rtn = curl_exec($curl);
return $rtn;


?>