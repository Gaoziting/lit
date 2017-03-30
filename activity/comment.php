<!DOCTYPE html>
<html lang="zh-CN">

<!-- 连接数据库 -->
<?php
    @session_start();
    @include '../init.php';
    function isLogged(){
        return (isset($_SESSION['uid'])&&$_SESSION['uid']!="")?true:false;
    }
        //头像 评论者 内容 时间 支持数
    function fnShowCom($comid,$uimg,$usr,$say,$tim,$agrN){?>
        <table class="wrap2">
        <input type="hidden" value="<?php echo $comid?>">
          <tr class="r1">
              <td><div class="imgWrap"><img src="<?php echo $uimg?>" alt=""></div></td>
              <td class="commenter"><div><?php echo $usr?></div><div class="time"><?php echo $tim?></div></td>
              <td class="agreeN"><?php echo $agrN?></td>
              <td><i class="icon-thumb_up agree"></i></td>
          </tr>
          <tr class="r2">
            <td></td>
            <!-- <div class="pop_list" id="reply_more">
                <ul>
                    <li>赞</li><li>回复</li><li>举报</li>
                </ul>
            </div> -->
            <td class="say" colspan="2"><?php echo $say?></td>
          </tr>
        </table>
<?php }?>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>评论</title>
    <meta name="Keywords" content="图文直播,校园活动,直播">  
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="../css/index.css">
    <link rel="stylesheet" type="text/css" href="../css/comment.css">
    <link rel="stylesheet" type="text/css" href="../css/style.css">
</head>
<body>
<?php
    if (!isset($_POST['cid'])) {
        echo "<script>alert('服务器不知道显示哪个图文的评论');window.history.go(-1);</script>";
    }else{
        $uid = '';
        if (isLogged()) {
            $uid = $_SESSION['uid'];
            $uname = $_SESSION['uname'];
        }else{?>
<!-- 登录注册弹出框-->
<div class="reg_log" id="sep_reg_log">
    <i class="icon-cross close"></i>
    <div class="inner">
      <div>
        <div class="wrap_input">
          <input type="text" name="uname" autofocus="autofocus" autocapitalize="off" placeholder="用户名">
        </div>
        <div class="wrap_input">
          <input type="password" name="pwd" autocapitalize="off" placeholder="密码">
        </div>
        <div class="prompt log_p"></div>
        <div class="wrap_btn">
          <a class="btn active log">登录</a><a class="btn reg_trigger">注册</a>
        </div>
      </div>
      <div>
        <div class="wrap_input">
          <input type="text" name="rname" placeholder="用户名">
        </div>
        <div class="wrap_input">
          <input type="password" name="rpwd" placeholder="密码">
        </div>
        <div class="wrap_input">
          <input type="text" name="school" placeholder="学校">
        </div>
        <div class="wrap_input">
          <input type="text" name="s_q" placeholder="安全问题">
        </div>
        <div class="wrap_input">
          <input type="text" name="s_a" placeholder="安全问题答案(用于修改密码)">
        </div>
        <div class="wrap_input choose_utype">
          <div><input type="radio" name="rtype" class="rtype" value="1" checked="checked"> 观众</div>
          <div><input type="radio" name="rtype" class="rtype" value="2"> 直播君</div>
        </div>
        <div class="prompt reg_p"></div>
        <div class="wrap_btn">
          <a class="btn log_trigger">登录</a><a class="btn active reg">注册</a>
        </div>
      </div>
    </div>
</div>
                <?php 
            }?>

<input type="hidden" id="usr" value="<?php echo $uid?>">
<input type="hidden" id="cid" value="<?php echo isset($_POST['cid'])?$_POST['cid']:0?>">
<!-- 评论页 -->
    <div class="separate_page" id="commentPage" style="display: block;">
        <!-- 图文Id -->
        <div class="head">
            <i class="icon-navigate_before back"></i>
            评论
            <div class="right">
                <i class="icon-redo refresh"></i>
            </div>
        </div>
        <div class="body">
    <?php
        $cid = $_POST['cid'];
        $sql = "SELECT comment.comment_id AS comid,user.headimg AS uimg,user.uname AS usr,comment.say AS say,comment.add_time AS tim FROM comment LEFT JOIN user ON comment.user_id=user.user_id WHERE content_id='$cid' ORDER BY comment.add_time DESC";
        $rst = $dbh->query($sql);
        $row = $rst->fetch();
        if (empty($row)) {
            echo $cid;
            var_dump($row);
            echo '该图文尚没有评论';
        }else{
            while (!empty($row)) {
                $comid = $row['comid'];
                $uimg = '../upload/user/'.$row['uimg'];
                $usr = $row['usr'];
                $say = $row['say'];
                $tim = strtotime($row['tim']);
                $sql_agr = "SELECT count(*) FROM com_agree WHERE comment_id='$comid'";
                $rst_agr = $dbh->query($sql_agr);
                // var_dump($dbh->errorInfo());
                $row_agr = $rst_agr->fetch();
                if (empty($row_agr)) {
                  $agrN = 0;
                }else{$agrN = $row_agr[0];}
                // n-j|m-d
                if (date('Y',$tim)==date('Y')) {
                  // echo (time()-$tim);
                  if ((time()-$tim)<3600) {
                    $min = date('i',(time()-$tim));
                    if ($min<10) {
                      $min = preg_replace('/^0+/', '', $min);
                    }
                    $tim = $min.'分钟前';
                  }else{
                    $tim = date('n月j日 H:i',$tim);
                  }
                }else{
                  $tim = date('Y年n月j日',$tim);
                }
                fnShowCom($comid,$uimg,$usr,$say,$tim,$agrN);
                $row = $rst->fetch();
            }
        }
            ?>
        </div>
        <div class="add_com">
          <textarea name="" id="" rows="2"></textarea>
          <a class="btn">完成</a>
        </div>
    </div>
    <!-- 选择回复或评论 -->
    <div class="pop_list" id="reply_more">
        <ul>
            <li class="agree">赞</li>
            <li class="reply">回复</li>
            <li class="report">举报</li>
        </ul>
    </div>
    <!-- 举报 -->
    <div class="report_wrap" id="wpReport">
        <a class="close icon-cross"></a>
        <textarea class="reason" rows="3" placeholder="请输入举报原因"></textarea>
        <div class="prompt"></div>
        <a class="btn submitReport">举报</a>
    </div>
    <!-- 评论 -->
    <div class="report_wrap" id="wpComment">
        <a class="close icon-cross"></a>
        <textarea class="say" rows="3" placeholder="回复："></textarea>
        <div class="prompt"></div>
        <a class="btn submitComment">回复</a>
    </div>

                        <!-- 加载中 -->
                        <div id="loading">
                          <div class="imgWrap">
                            <img src="images/loading.jpg" alt="加载中">
                          </div>
                        </div>

<?php
    }
$dbh = NULL;
?>
<script src="../js/jquery-3.1.1.min.js"></script>
<script src="../js/jquery.easing.1.3.js"></script>
<script src="../js/comment.js"></script>
</body>
</html>