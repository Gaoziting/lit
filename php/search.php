<?php
@session_start();
@include '../init.php';

$stype = $_POST['stype'];
switch ($stype) {
	case 'type':
		// $name = '摄影';
		$name = $_POST['tname'];
		$rst = $dbh->query("SELECT type_id FROM acti_type WHERE type = '$name'");
		$tid = $rst->fetchColumn();

		$rst = $dbh->query("SELECT title,cover,abstract FROM activity WHERE acti_type_id = '$tid'");
		$arr['acti'] = $rst->fetchAll();
		// var_dump($arr['acti']);
		foreach ($arr['acti'] as $k => $v) {
			$arr['acti'][$k]['cover'] = 'upload/activity/'.$arr['acti'][$k]['cover'];
			$arr['acti'][$k]['pag'] = 'activity/activity.php?aid='.$arr['acti'][$k]['aid'];
		}
		$str = json_encode($arr);
		echo $str;
		break;
	case 'keyword':
		$name = $_POST['kw'];
		$rst = $dbh->query("SELECT title,cover,abstract FROM activity WHERE title like '%$name%'");
		$arr['acti'] = $rst->fetchAll();
		// var_dump($arr['acti']);
		foreach ($arr['acti'] as $k => $v) {
			$arr['acti'][$k]['cover'] = 'upload/activity/'.$arr['acti'][$k]['cover'];
			$arr['acti'][$k]['pag'] = 'activity/activity.php?aid='.$arr['acti'][$k]['aid'];
		}
		$rst = $dbh->query("SELECT content.content_id AS cid,count(distinct content.content_id),content.description AS des,activity.title AS tit,cont_img.img_name AS img FROM content JOIN activity ON content.activity_id=activity.activity_id JOIN cont_img ON content.content_id=cont_img.content_id WHERE description like '%$name%' GROUP BY content.content_id");
		// var_dump($dbh->errorInfo());
		$arr['cont'] = $rst->fetchAll();
		// var_dump($arr['acti']);
		foreach ($arr['cont'] as $k => $v) {
			$arr['cont'][$k]['img'] = 'upload/content/'.$arr['cont'][$k]['img'];
			$arr['cont'][$k]['pag'] = 'activity/activity.php?aid='.$arr['cont'][$k]['aid'].'#cont'.$arr['cont'][$k]['cid'];
		}
		$str = json_encode($arr);
		echo $str;
		break;
	
	default:
		break;
}



$dbh = NULL;
?>