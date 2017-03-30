$(function(){
	function fnIsLogged () {
		// console.log($("#userInfo")[0]);
		// console.log($("#usr").val());
		return ($("#usr").val()=='')?false:true;
	}
	function fnPopLog(){
		fnUnscroll($("body"));
		fnShow($("#sep_reg_log"),'fadeIn');
	}
	if (($("#activity").length>0)&&($("#activity").children('input').val()!='')) {fnResizeActiImg();}
	function fnResizeActiImg() {
		// alert("活动长宽自适应");

	    // 使图片长宽自适应
	    fnResizeImg($(".cont-head img"));
	    $("#update").find('.imgWrap img').each(function() {
	    	fnResizeImg($(this));
	    });
	}
//使图片cover显示
	var flagHeadImgResized = false;
	function fnResizeImg(obj) {
	    // alert("fnResizeImg");
	    var imgWrapW = 0,
	        imgWrapH = 0;
	    imgWrapW = obj.parent().width();
	    imgWrapH = obj.parent().height();
	    var wrapWHRatio = imgWrapW / imgWrapH;
	    // console.log(obj.get(0));
	    var img = obj.get(0);
	    if (img.complete) {
	    	loadedImgResize(img,obj);
	    }
	    img.onload = function  () {
	    	loadedImgResize(img,obj);
	    }
	    function loadedImgResize (img,obj) {
		    var imgWHRatio = (img.width) / (img.height);
		    // alert('wrapWHRatio:'+wrapWHRatio+'imgWHRatio:'+imgWHRatio);
		    if (imgWHRatio >= wrapWHRatio) {
		        obj.css({
		            'height': '100%',
		            'width': 'auto'
		        });
		    } else {
		        obj.css({
		            'width': '100%',
		            'height': 'auto'
		        });
		    }
	    }
	}
// 登录注册
	$("#sep_reg_log").on('click', function(e) {
	  t = e.target;
	  $t = $(t);
	  $this = $(this);
	  if ($t.is('.close')) {fnRescroll();$this.fadeOut();}
	  else if ($t.is('.log')) {
	    $u = $this.find("input[name='uname']");
	    $p = $this.find("input[name='pwd']");
	    $prompt = $this.find('.log_p');
	    fnLog($u,$p,$prompt,$t);
	  }
	  else if ($t.is('.reg')) {
	    $u = $this.find("input[name='rname']");
	    $p = $this.find("input[name='rpwd']");
	    $type = $this.find("input[name='rtype']:checked");
	    $prompt = $this.find('.reg_p');
	    fnReg($u,$p,$prompt,$t,$type);
	  }
	  else if ($t.is('.reg_trigger')) {
	  	$t.closest('#sep_reg_log').animate({'left':'-100vw'});
	  	$t.parent().parent().animate({'opacity':0});
	  }
	  else if ($t.is('.log_trigger')) {
	  	$t.closest('#sep_reg_log').animate({'left':'0'});
	  	$t.parent().parent().prev().animate({'opacity':1});
	  }else if ($t.is('.reg_log')) {
	  	fnRescroll();
	  	$this.fadeOut();
	  }
	});
	var gloPath;
	function fnLog ($u,$p,$prompt,$this) {
	  console.log('登录');
	  if ($u.val().length<1||$p.val().length<1) {
	    $prompt.html("请输入用户名和密码");
	  }
	  else {
	    var uname = $u.val();
	    var pwd = $p.val();
	    var data = {
	        "logname":uname,
	        "password":pwd
	      };
	    $.ajax({
	      type: 'POST',
	      url: gloPath+'log.php',
	      dataType: 'json',
	      data: data,
	      timeout: 5000,
	      beforeSend: function() {
	            fnLoading(1);
	        $this.html("登录中...");
	      },
	      success: function(data){
	            fnLoading(0);
	        // alert(data);
	        if (data.status==200) {
	          user = uname;
	          window.location.reload();
	        }
	        else{
	          $prompt.html(data.status);
	          $(".pwd").focus().val('');
	          $this.html("登录");
	        }
	      },
	      error: function (hd,msg) {
	            fnLoading(0);
	        $prompt.html("无法连接网络");
	        $this.html("登录");
	        alert(msg);
	      }
	    });
	  }
	}
	function fnReg ($u,$p,$prompt,$this,$type) {
	  console.log('注册');
	  var uname = $u.val();
	  var pwd = $p.val();
	  var count = $type.length;
	  if (uname.length<1||pwd.length<1) {
	    $prompt.html("请将信息输入完整");
	  }else if (count==0) {
	      $prompt.html("请选择要注册的类型");
	  }else{
	    var type = $type.attr('value');
	    var data = {
	      "logname":uname,
	      "password":pwd,
	      "utype":type
	    };
	    $.ajax({
	      type: 'POST',
	      url: gloPath+'reg.php',
	      dataType: 'json',
	      data: data,
	      timeout: 5000,
	      beforeSend: function() {
	            fnLoading(1);
	        $this.html("注册中...");
	      },
	      success: function(data){
	            fnLoading(0);
	        if (data.status==200) {
	          alert('注册成功');
	          window.location.reload();
	        }else{
	          $prompt.html(data.status);
	          $(".pwd").focus().val('');
	          $this.html("注册");
	        }
	      },
	      error: function (hd,msg) {
	            fnLoading(0);
	        $prompt.html("无法连接网络");
	        $this.html("注册");
	        alert(msg);
	      }
	    });
	  }
	}
// 活动页
	var flagResizeImg = true;
	var $tit,$abs,$typ,$dat;
	$("#activity").on('click', function(e) {
	    var t = e.target;
	    var $t = $(t);
	    var $this = $(this);
	    var is_modify = false;
	    // console.log(t.nodeName=='INPUT')
	    if (t.nodeName!='INPUT'&&t.nodeName!='TEXTAREA') {fnHide();}
	    $tit = $this.find('.top-text');
	    $abs = $this.find('.abs');
	    $typ = $this.find('.type');
	    $dat = $this.find('.date');
	    // console.log($typ);
	    if ($t.is('.leave')) {
	        window.history.back();
	        console.log(t.nodeValue + ' ' + t.nodeType);
	    } else if ($t.is('.moreEdit')) {
	    	fnShow($t.next(),'fadeIn');
	    } else if ($t.is('.logo')) {
	    	console.log('logo');
	    	location.assign("../index.php");
	    } else if ($t.is('.delete')) {
	    	if(confirm('确定删除活动？')){
				gloPath = '../php/';
	    		var aid = $this.children('input').val();
		    	var data = {'aid':aid};
		    	fnDelActi(data,'activity');
		    	// console.log(gloDelActiStatus);
		    	// if (gloDelActiStatus) {
		    	// }else {
		    	// 	alert("活动未完全删除");
		    	// }
	    	}
	    } else if ($t.is('.end')) {
	    	if(confirm('确定关闭活动直播？')){}
	    } else if ($t.is('.edit')) {
	    	var $edi = $("#editActivity");
	    	var tit = $tit.html();
	    	var abs = $abs.html();
	    	var typ = $typ.html();
	    	var dat = $dat.html();
	    	// console.log($typ.html());
	    	var cov = $this.find('.top').css('background-image');
		    // 获取背景url路径
		    if (fnIsPC()) {cov = cov.split('"')[1].split('"')[0];}
		    else cov = cov.split('(')[1].split(')')[0];
		    $edi.find('textarea[name="tit"]').val(tit);
		    var abs_text = abs.replace(/<br>/ig,"\r\n").replace(/&nbsp;/g," ");
		    $edi.find('textarea[name="abs"]').val(abs_text);
		    $edi.find('input[name="typ"]').val(typ);
		    $edi.find('input[name="dat"]').val(dat);

		    $edi.find('img').attr('src', cov);
		    if (flagResizeImg) {console.log('自适应cover'); fnResizeImg($edi.find('img'));flagResizeImg=false;}
			fnUnscroll($("body"));
	    	$edi.fadeIn();
	    } else if ($t.is('.add')) {
	        $("#inputContImg").click();
	    } else if ($t.is('.refresh')) {
	        window.location.reload();
	    } else if ($t.is('.add_focus')) {
	    	if (fnIsLogged()) {
		    	if ($t.is('.on')) {
		    		$t.removeClass('on');
		    		oriFocN = $focN.text()-1;
		    		$focN.text(oriFocN);
			    	$focN.removeClass('on');
			    	$t.children('i').toggleClass('icon-plus');
		    	} else {
		    		var aid = $t.closest('#activity').children('input').val();
		    		$focN = $t.prev('sup');
		    		var data = {'aid':aid};
		    		fnAddFocus(data,$t);
		    	}
	    	}else {
				if (confirm("请先登录")) {
					gloPath = '../php/';
					fnPopLog();
				}
	    	}
	    } else if ($t.is('.more')) {
	    	fnShow($t.next(),'fadeIn');
	    } else if ($t.is('.like')) {
	    	if(fnIsLogged()){
			    $likN = $t.next('sup');
		    	if ($t.is('.on')) {
			    	var cid = $t.closest('.cont-body').children('input').val();
			    	var data = {'cid':cid};
		    		fnCancelLike(data,$t);
		    	} else {
			    	var cid = $t.closest('.cont-body').children('input').val();
			    	var data = {'cid':cid};
		    		fnAddLike(data,$t);
		    	}
	    	}else {
				if (confirm("请先登录")) {
					gloPath = '../php/';
					fnPopLog();
				}
	    	}
	    } else if ($t.is('.comment')) {
	    	if(fnIsLogged()){
		    	// 发表评论：1.跳转并获取全部评论；2.输入评论
		    	// 简化：直接评论
			    $comN = $t.next('sup');
			    $t.closest('.interact-icons').next().find('input').val('');
			    fnShow($t.closest('.interact-icons').next(),'slideDown');
	    	}else {
				if (confirm("请先登录")) {
					gloPath = '../php/';
					fnPopLog();
				}
	    	}
	    } else if ($t.is('.submitCom')) {
	    	var cid = $t.closest('.cont-body').children('input').val();
	    	var say = $t.parent().prev().children('input').val();
	    	say = say.replace(/(\r)*\n/g,"<br>").replace(/\s/g,"&nbsp;");
	    	var data = {'cid':cid,'say':say};
	    	fnAddCom(data,$t.closest('.cont-body'));
	    }else if ($t.text()=='修改') {
	      if (!is_modify) {
	        var cid = $t.closest('.cont-body').children('input').val();
	        console.log('需修改的内容id为：'+cid);
	        var $p = $t.closest('.cont-body').children('.guts').children('p');
	        var h = $p.height()+30;
	        oriCap = $p.html();  //original caption
	        console.log('修改的原内容为：'+oriCap);
	        // var c = content.replace(new RegExp("<br>","g"),"\n")  oninput="this.style.height=this.scrollHeight + \'px\'"
	        var oriCap_text = oriCap.replace(/<br>/ig,"\r")
	        // <a id="cancelModify" href="javascript:void(0);">取消</a>
	        var editCap = '<textarea style="overflow-y:auto;height: '+h+'px;">'+oriCap_text+'</textarea>\
	          <div id="btn-modifyCont"><a href="javascript:void(0);" class="btn">确定</a><div>';
	        $p.html(editCap);
	        $p.children('textarea').focus();
	        var $btn = $('#btn-modifyCont').children('a');
	        //确认更新文字描述
	        $btn.click(function() {
	          var newTex = $btn.parent().prev('textarea').val();
	          var newTex_html = newTex.replace(/(\r)*\n/g,"<br>").replace(/\s/g,"&nbsp;");
	          console.log(newTex);
	          var data = {
	            'cid':cid,
	            'newTex':newTex_html
	          };
	          fnEditCont(data,$p);
	        });
	        is_modify = true;
	      }
	      // 取消更改
	      // $p.html(oriCap);
    } else if ($t.text() == '删除') {
	    	if(confirm('确定删除图文？')){
	    		var cid = $t.closest('.cont-body').children('input').val();
	    		var data = {'cid':cid};
	    		fnDelCont(data,$t);
	    	}
	    } else if ($t.is('.moreCom')) {
	    } else if ($t.is('img')) {
	        // console.log($t.attr('src'));
	        var src = $t.attr('src');
	        $lastEnlargeImg = $t;
		    $prev = $t.parent().prev().children('img');
	    	$next = $t.parent().next().children('img');
	        $('#largeImg>img').attr('src', src);
	        // fnUnscroll($("body"));
	        $('#largeWrap').fadeIn();
    		$("#largeWrap").find('.prev').show();
    		$("#largeWrap").find('.next').show();
	    	if ($prev.length == 0) {
	    		$("#largeWrap").find('.prev').hide();
	    	}
	    	if ($next.length == 0) {
	    		$("#largeWrap").find('.next').hide();
	    	}
	    } else {
	        // console.log(e.target.nodeName);
	    }
	});
	$("#addCont").click(function(e) {
	    var t = e.target;
	    var $t = $(t);
	    var $this = $(this);
	    if ($t.is('.close')) {
	    	fnRescroll();
		    $this.fadeOut();
		}
	});
	$("#editActivity").click(function(e) {
	    var t = e.target;
	    var $t = $(t);
	    var $this = $(this);
	    if ($t.is('.close')) {
	    	fnRescroll();
		    $this.fadeOut();
		}else if ($t.is('.btn')) {
		    var aid = $("#addCont>input[name='aid']").val();
		    var tit = $this.find("textarea[name='tit']").val();
		    var abs = $this.find("textarea[name='abs']").val();
		    var typ = $this.find("input[name='typ']").val();
		    var dat = $this.find("input[name='dat']").val();
		    var abs_html = abs.replace(/(\r)*\n/g,"<br>").replace(/\s/g,"&nbsp;");
		    var data = {
		      'aid':aid,
		      'tit':tit,
		      'abs':abs_html,
		      'typ':typ,
		      'dat':dat
		    };
		    $.ajax({
		      url: '../php/acti_edit.php',
		      type: 'POST',
		      dataType: 'json',
		      data: data,
		      beforeSend: function() {
		            fnLoading(1);
		      },
		      success: function (data) {
		            fnLoading(0);
		        if (data.status == 200) {
		          alert('成功修改直播主题');
		          $tit.text(data.updTit);
		          var updAbs_html = data.updAbs.replace(/(\r)*\n/g,"<br>").replace(/\s/g,"&nbsp;");
		          $abs.html(updAbs_html);
		          $typ.html(data.updTyp);
			       $this.fadeOut();
			       fnRescroll();
		        }else alert(data.status);
		      },
		      error: function (hd,msg) {
		            fnLoading(0);
		        alert(msg);
		      },
		    });
		}
	});
	function fnEditCont (data,$p) {
          $.ajax({
            url: '../php/cont_edit.php',
            type: 'POST',
            dataType: 'json',
            data: data,
            timeout: 5000,
            beforeSend: function() {
            	fnLoading(1);
            },
            success: function (data) {
            	fnLoading(0);
              if (data.status == 200) {
                $p.html(data.updTex);
              }else{data.status};
            },
            error: function (hd,msg) {
            	fnLoading(0);
              alert(msg);
            },
          });
	}
	var $lastEnlargeImg,$prev,$next;
	$("#largeWrap").on('click', function(e) {
	    var t = e.target;
	    var $t = $(t);
	    var $this = $(this);
// console.log($lastEnlargeImg);
	    if ($t.is('.prev')) {
    		var prev = $prev.attr('src');
	    	$this.find('img').animate({opacity: '0'}, 200, function () {
	    		$(this).attr('src', prev);
	    		$(this).animate({opacity: '1'},200);
	    		$lastEnlargeImg = $prev;
	    		fnUpdateChevron();
	    	})
	    }else if ($t.is('.next')) {
    		var next = $next.attr('src');
	    	$this.find('img').animate({opacity: '0'}, 200, function () {
	    		$(this).attr('src', next);
	    		$(this).animate({opacity: '1'},200);
	    		$lastEnlargeImg = $next;
	    		fnUpdateChevron();
	    	})
	    }else{
			fnRescroll();
			$lastEnlargeImg = null;
		    $(this).fadeOut();
	    }
	    function fnUpdateChevron () {
	    	$prev = $lastEnlargeImg.parent().prev().children('img');
	    	$next = $lastEnlargeImg.parent().next().children('img');
    		$this.find('.prev').show();
    		$this.find('.next').show();
	    	if ($prev.length == 0) {
	    		$this.find('.prev').hide();
	    	}
	    	if ($next.length == 0) {
	    		$this.find('.next').hide();
	    	}
	    }
	});
// 限制图文上传数量
	function fnCountFile (form) {
		if (window.File && window.FileList) {
			var count = form["img[]"].files.length;
			if (count > 4) {
				alert("请选择4张图以内，你选择了"+count+"个");
			}
		}else {
			alert("抱歉，你的浏览器不支持FileAPI，请升级浏览器！");
		}
		return false;
	}
// 活动所需函数
	var gloDelActiStatus;
	function fnDelActi(data,page='index',$t=''){
		var path;
		switch (page) {
			case 'index':
				path = 'php/';
				break;
			case 'activity':
				path = '../php/';
				break;
		}
	    $.ajax({
	        url: path+'acti_delete.php',
	        type: 'POST',
	        dataType: 'json',
	        data: data,
	        beforeSend: function() {
	            fnLoading(1);
	        },
	        success: function(data) {
	            fnLoading(0);
	            if (data.status == 200) {
	            	if (page=='activity') {
			    		alert('活动删除成功！');
			    		window.history.back();
	            	}else {
			    		$t.closest('.block').slideUp(function () {
			              $(this).remove();
			            });
	            	}
	            } else {
	                alert(data.status);
	            }
	        },
	      error: function (hd,msg) {
	            fnLoading(0);
	        alert(msg);
	      },
	    });
	}
	function fnAjaxStatus(status){
		console.log('Ajax调用函数')
		return status?gloDelActiStatus = true:gloDelActiStatus = false;
	}
	function fnDelCont (data,$t) {
	    $.ajax({
	        url: '../php/cont_delete.php',
	        type: 'POST',
	        dataType: 'json',
	        data: data,
	        beforeSend: function() {
	            fnLoading(1);
	        },
	        success: function(data) {
	            fnLoading(0);
	            if (data.status == 200) {
		            $t.closest('.cont-body').slideUp(function () {
		              $(this).remove();
		            });
	            } else {
	                alert(data.status);
	            }
	        },
	        error: function (hd,msg) {
	            fnLoading(0);
	        alert(msg);
	        },
	    });
	}
	var $likN;
	function fnAddLike(data, $t) {
	    $.ajax({
	        url: '../php/cont_add_like.php',
	        type: 'POST',
	        dataType: 'json',
	        data: data,
	        beforeSend: function() {
	            fnLoading(1);
	        },
	        success: function(data) {
	            fnLoading(0);
	            if (data.status == 200) {
	                $likN.text(data.likN);
			    	$t.addClass('on');
	            } else {
	                alert(data.status);
	            }
	        },
	      error: function (hd,msg) {
	            fnLoading(0);
	        alert(msg);
	      },
	    });
	}
	function fnCancelLike(data, $t) {
	    $.ajax({
	        url: '../php/cont_cancel_like.php',
	        type: 'POST',
	        dataType: 'json',
	        data: data,
	        beforeSend: function() {
	            fnLoading(1);
	        },
	        success: function(data) {
	            fnLoading(0);
	            if (data.status == 200) {
	                $likN.text(data.likN);
			    	$t.removeClass('on');
	            } else {
	                alert(data.status);
	            }
	        },
	      error: function (hd,msg) {
	            fnLoading(0);
	        alert(msg);
	      },
	    });
	}
	var $focN;
	function fnAddFocus(data, $t){
		$.ajax({
	        url: '../php/acti_add_focus.php',
	        type: 'POST',
	        dataType: 'json',
	        data: data,
	        beforeSend: function() {
	            fnLoading(1);
	        },
	        success: function(data) {
	            fnLoading(0);
	            if (data.status == 200) {
	                $focN.text(data.focN);
			    	$t.addClass('on');
			    	$t.children('i').toggleClass('icon-checkmark');
			    	$focN.addClass('on');
	            } else {
	                alert(data.status);
	            }
	        },
	      error: function (hd,msg) {
	            fnLoading(0);
	        alert(msg);
	      },
	    });
	}
// 公用函数
	var $lastUnscroll = null;
	function fnUnscroll($this=$("body")){
		if ($this.is('body')) $this.css({'position':'fixed','overflow':'hidden'});
		else $this.css('overflow', 'hidden');
		$lastUnscroll = $this;
	}
	function fnRescroll(){
		// console.log('恢复滚动');
		if ($lastUnscroll!=null) {
			// console.log($lastUnscroll[0]);
			if ($lastUnscroll.is('body')) $lastUnscroll.css({'position':'relative','overflow':'auto'});
			else $lastUnscroll.css('overflow', 'auto');
			$lastUnscroll = null;
		}
	}
	var lastShow = {};
	function fnShow($this,action=''){
		switch (action) {
			case 'fadeIn':
				$this.fadeIn();
				break;
			case 'slideDown':
				$this.slideDown();
				break;
			default:
				$this.show();
				break;
		}
		lastShow = {'obj':$this,'action':action};
	}
	function fnHide(){
		if (lastShow['obj']!=null) {
			switch (lastShow['action']) {
				case 'slideDown':
					lastShow['obj'].slideUp();
					break;
				case 'fadeIn':
					lastShow['obj'].fadeOut();
					break;
				default:
					lastShow['obj'].hide();
					break;
			}
			lastShow = {};
		}
	}
	function fnIsPC() {
	    var userAgentInfo = navigator.userAgent;
	    var Agents = ["Android", "iPhone",
	                "SymbianOS", "Windows Phone",
	                "iPad", "iPod"];
	    var flag = true;
	    for (var v = 0; v < Agents.length; v++) {
	        if (userAgentInfo.indexOf(Agents[v]) > 0) {
	            flag = false;
	            break;
	        }
	    }
	    return flag;
	}
	var $comN;
	function fnAddCom(data, $cont) {
	    $.ajax({
	        url: '../php/com_add.php',
	        type: 'POST',
	        dataType: 'json',
	        data: data,
	        beforeSend: function() {
	            fnLoading(1);
	        },
	        success: function(data) {
	            fnLoading(0);
	            if (data.status == 200) {
	                var $comWrap = $cont.children('.guts').children('.interaction-details');
	                var com = '<div class="reply-detail"><input type="hidden" value="' + data.comID + '"><span class="replyer">' + data.usr + '</span> <span class="conmment">' + data.say + '</span></div>';
	                alert('评论成功');
	                $comWrap.prepend(com);
	                $comN.text(data.comN);
	                $cont.find('.addCom').slideUp();
	            } else {
	                alert(data.status);
	            }
	        },
	      error: function (hd,msg) {
	            fnLoading(0);
	        alert(msg);
	      },
	    });
	}
	function fnLoading (on) {
		if(on) $("#loading").fadeIn();
		else $("#loading").fadeOut();
	}
// 添加图文
	$("#inputContImg").click(function() {
		fnUnscroll();
	    $(this).off('change').on('change', function() {
	        fnPreviewImg(this.files,$("#addCont_imgsWrap"));
	    });
	});
})
