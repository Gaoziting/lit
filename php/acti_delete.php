<?php
@session_start();
@include '../init.php';
define('UPLOAD_PATH_ACTI', dirname(dirname(__FILE__))."/upload/activity/");
define('UPLOAD_PATH_CONT', dirname(dirname(__FILE__))."/upload/content/");
define('PATH_ACTI', dirname(dirname(__FILE__))."/activity/");

if (!isset($_POST['aid'])) {
	$arr = array('status'=>'1php未收到直播id');
}else{
	$aid = $_POST['aid'];
	$uid = $_SESSION['uid'];
	$bro = $_SESSION['uname'];
	// 思路：先删除内容图片、封图图片、活动页php，再数据库删除activity，系统自动级联删除content和comment。
	// 删除图文content表中的数据
	$sql = "SELECT content_id FROM content WHERE activity_id = '$aid'";
	$rst = $dbh->query($sql);
	$arr['in'] = '成功连上php';
	// 删除评论comment表中的数据
	while ($row = $rst->fetch()) {
		$cid = $row[0];
		// $sql_com = "SELECT commentID FROM COMMENT WHERE content_id = '$cid'";
		// $rst_com = $dbh->query($sql_com);
		// // 删除回复reply表中的数据
		// while ($row_com = $rst_com->fetch()) {
		// 	$comid = $row[0];
		// 	$del_rpl = "DELETE FROM REPLY WHERE toCommentID = '$comid'";
		// 	$rst_dr = $dbh->exec($del_rpl);
		// 	if ($rst_dr>0) {
		// 		$arr['rst_dr'] = '删除回复成功';
		// 	}else $arr['rst_dr'] = '没有回复需要删除';
		// }
		// $del_com = "DELETE FROM COMMENT WHERE content_id = '$cid'";
		// $rst_dcom = $dbh->exec($del_com);
		// if ($rst_dcom>0) {
		// 	$arr['rst_dcom'] = '删除评论成功';
		// }else $arr['rst_dcom'] = '没有评论需要删除';
		// 删除图文内容中的图
		$del_img = "SELECT img_name FROM cont_img WHERE content_id = '$cid'";
		$rst_di = $dbh->query($del_img);
		$row_di = $rst_di->fetch();
	    while(!empty($row_di)){
	    	$img_name = UPLOAD_PATH_CONT.$row['img_name'];
	    	if (is_file($img_name)) {
	    		if (!unlink($img_name)) {
					$arr['del_cimg'] = '删除内容图片失败';
	    		}else{
	    			$arr['del_cimg'] = '删除内容图片成功';
		    	}
	    	}
			$row_di = $rst_di->fetch();
	    }
	}

	// $del_con = "DELETE FROM content WHERE activity_id = '$aid'";
	// $rst_dc = $dbh->exec($del_con);
	// if ($rst_dc>0) {
	// 	$arr['rst_dc'] = '删除图文成功';
	// }else $arr['rst_dc'] = '没有图文需要删除';

	// 删除直播的封图和直播也
	$del = "SELECT cover,acti_page_name FROM activity WHERE activityId = '$aid'";
	$rst = $dbh->query($del);
	$row = $rst->fetch();
	$arr['准备删除封图'] = 'true';
    if(!empty($row[0])){
    	// $arr['选择封图和直播文件'] = $row;
		$arr['查到封图'] = 'true';
		// $arr['封图名'] = $row['cover'];
    	$img_name = UPLOAD_PATH_ACTI.$row['cover'];
		// $arr['封图路径'] = $img_name;
		$arr['直播文件名'] = $row['acti_page_name'];
    	$acti_page = PATH_ACTI.$row['acti_page_name'];
		$arr['直播文件路径'] = $acti_page;
    	if (is_file($img_name)) {
			$arr['在封图路径中找到图片'] = 'true';
    		if (!unlink($img_name)) {
				$arr['del_limg'] = '删除直播封图失败';
    		}else{
    			$arr['del_limg'] = '删除直播封图成功';
	    	}
    	}
    	if (is_file($acti_page)) {
			$arr['在直播文件路径中找到文件'] = 'true';
    		if (!unlink($acti_page)) {
				$arr['del_acti'] = '删除直播文件失败';
    		}else{
    			$arr['del_acti'] = '删除直播文件成功';
	    	}
    	}
	    // 删除直播
		$sql = "DELETE FROM activity WHERE activityId = '$aid'";
		$rst = $dbh->exec($sql);
		if ($rst>0) {
			$arr['status'] = 200;
		}else $arr['status'] = 0;
    }
}
$str = json_encode($arr);
echo $str;

$dbh = NULL;
?>