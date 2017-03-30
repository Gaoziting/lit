<?php 
@session_start();
@include '../init.php';

$logname = $_POST['logname'];
$password =  $_POST['password'];
$utype = $_POST['utype'];
$school = $_POST['school'];
$s_q =  $_POST['s_q'];
$s_a = $_POST['s_a'];

$sql = "SELECT user_id FROM user WHERE logname='$logname'";
$rst = $dbh->query($sql);
$row = $rst->fetch();
if (!empty($row[0])) {
	$arr['status'] = $logname.'用户名已存在'.$row[0];
}else{
	$sql_sch = "INSERT INTO school (school_name) VALUES ('$school')";
	$dbh->exec($sql_sch);
	$schid = $dbh->lastInsertId();
	$arr['schid'] = $schid;

	$sql_sq = "INSERT INTO security_question (question) VALUES ('$s_q')";
	$dbh->exec($sql_sq);
	$sqid = $dbh->lastInsertId();
	$arr['sqid'] = $sqid;
	$sql = "INSERT INTO user (logname,uname,password,type,school_id,security_question_id,security_answer) VALUES ('$logname','$logname','$password','$utype','$schid','$sqid','$s_a')";
	$rst = $dbh->exec($sql);
	// 判断影响行数，验证是否插入新用户
	if ($rst>0) {
		$uid = $dbh->lastInsertId();
		$arr['status'] = 200;
		$_SESSION['uid'] = $uid;
		$_SESSION['logname'] = $logname;
		$_SESSION['uname'] = $logname;
		$_SESSION['utype'] = $utype;
		$sql = "INSERT INTO user_log (user_id,detail) VALUES ('$uid','用户注册')";
		$dbh->query($sql);
	}else{
		$arr['status'] = '注册失败';
	}
}
$str = json_encode($arr);
echo $str;

$dbh = NULL;
?>