// 个人中心导航
	// $(".nav_me .pub").each(function() {
	// 	$(this).click(function() {
	// 		fnSwitchOn($(this));
	//     	$("#userInfo .sec_publish").fadeIn();
	// 	});
	// });
// 直播页导航
	$("#userInfo .sec .fold").hide();
	// console.log($("#userInfo .sec_publish>.wp_uinfo").eq(0));
	// console.log($(".sec>div:first"));
	// $(".sec>div:first").children('.wp_list').show();
	// $("#userInfo .sec_publish>.wp_uinfo").eq(0).children('.wp_list').show();
	// $("#userInfo .sec_publish>.wp_uinfo").eq(0).find('.icon-angle-down').removeClass('icon-angle-down').addClass('icon-angle-up');
	var $lastSlideDown = $("#toggle_acti").next('.wp_list');
	var flagLikeLoaded = 0;
	var flagCommLoaded = 0;
	var flagActiLoaded = 0;
	var flagFocuLoaded = 0;
	$("#toggle_like").click(function() {
		fnUnfoldList($(this).next('.wp_list'));
		if (!flagLikeLoaded) fnLoadLike();
	});
	$("#toggle_comm").click(function() {
		fnUnfoldList($(this).next('.wp_list'));
		if (!flagCommLoaded) fnLoadComm();
	});
	$("#toggle_acti").click(function() {
		fnUnfoldList($(this).next('.wp_list'));
		if (!flagActiLoaded) fnLoadActi();
	});
	$("#toggle_focu").click(function() {
		fnUnfoldList($(this).next('.wp_list'));
		if (!flagFocuLoaded) fnLoadFocu();
	});
	$("#fix_nav_lab").click(function() {
		var headName = '#toggle_'+$(this).attr('data-name');
		fnUnfoldList($(headName).next('.wp_list'));
		// console.log($(headName).offsset().top);
		$(window).scrollTop($(headName).offset().top+70);
		$("#fix_nav_lab").hide();
	});
	$("header>.nav").hide();
	// $("#fix_nav_mes").hide();
	// $("#fix_nav_mes").hide();
// 页面滚动监视
	$(window).on('scroll', function() {
		// console.log($(this).scrollTop());
		if ($(this).scrollTop()>300) {
			if (flagShowHeader) {
				// var opacity = $(this).scrollTop()-300;
				$("#nav_main").slideUp();
				flagShowHeader = 0;
			}
		}else {
			if (flagShowHeader == 0) {
				$("#nav_main").slideDown();
				flagShowHeader = 1;
			}
		}
		if ($("#pag").val()==1) {
			console.log($("#nav_uinfo"));
			console.log($("#nav_uinfo").offset());
			// var dTopScreen = $("#toggle_acti").offset().top-$(window).scrollTop();
			// 直播页
			switch (flagNavUinfo) {
				case 0:
					if ($("#toggle_acti").offset().top-$(window).scrollTop()<70) {
						$("#fix_nav_lab").find('label').text('我的直播');
						$("#fix_nav_lab").attr('data-name', 'acti');
						$("#fix_nav_lab").show();
					}else {
						$("#fix_nav_lab").hide();
					}
					break;
				case 1:
					if ($("#toggle_like").offset().top-$(window).scrollTop()<19) {
						$("#fix_nav_lab").find('label').text('我的喜欢');
						$("#fix_nav_lab").attr('data-name', 'like');
						$("#fix_nav_lab").show();
					}else if ($("#toggle_focu").offset().top-$(window).scrollTop()<19) {
						$("#fix_nav_lab").find('label').text('我的关注');
						$("#fix_nav_lab").attr('data-name', 'focu');
						$("#fix_nav_lab").show();
					}else if ($("#toggle_comm").offset().top-$(window).scrollTop()<19) {
						$("#fix_nav_lab").find('label').text('我的评论');
						$("#fix_nav_lab").attr('data-name', 'comm');
						$("#fix_nav_lab").show();
					}else {
						$("#fix_nav_lab").hide();
					}
					break;
				case 2:
					if ($("#nav_message").offset().top-$(window).scrollTop()<44) {
						$("#fix_nav_mes").show();
					}else {
						$("#fix_nav_mes").hide();
					}
					break;
				default:
					// statements_def
					break;
			}
		}else {
			$("#fix_nav_uinfo").hide();
		}
	});
// 消息栏
	$("#com").fadeIn();
	$("#messagePage .head").on('click', function(e) {
	    var t = e.target;
	    var $t = $(t);
	    var $this = $(this);
	    if ($t.is('.back')) {
	    	window.history.go(-1);
	    }else if ($t.is('.refresh')) {
	    	window.location.reload();
	    }
	});
	var flagMesComLoaded = 0;
	var flagMesArgLoaded = 0;
	var flagMesSysLoaded = 0;
	$("#navCom").on('click', function(e) {
    	fnSwitchOn($(this));
    	if (!flagMesComLoaded) {fnMesCom();}
    	fnHideSec();
    	$("#com").fadeIn();
	});
	$("#navAgr").on('click', function(e) {
    	fnSwitchOn($(this));
    	if (!flagMesArgLoaded) {fnMesArg();}
    	fnHideSec();
    	$("#agr").fadeIn();
	});
	$("#navSys").on('click', function(e) {
    	fnSwitchOn($(this));
    	if (!flagMesSysLoaded) {fnMesSys();}
    	fnHideSec();
    	$("#sys").fadeIn();
	});
	var flagShowHeader = 1;
	var flagNavUinfo = 0;  //记录当前显示哪个sec
	$(".nav_me .pub").click(function() {
		fnSwitchOn($(".nav_me .pub"));
    	fnHideSec(0);
    	flagNavUinfo = 0;
    	$("#userInfo .sec_publish").fadeIn();
	});
	$(".nav_me .act").click(function() {
		fnSwitchOn($(".nav_me .act"));
    	fnHideSec(0);
    	$("#toggle_comm").click();
    	flagNavUinfo = 1;
    	$("#userInfo .sec_action").fadeIn();
	});
	$(".nav_me .mes").click(function() {
		fnSwitchOn($(".nav_me .mes"));
    	fnHideSec(0);
    	$("#navCom").click();
    	flagNavUinfo = 2;
    	$("#userInfo .sec_message").fadeIn();
	});
	$(".nav_me .about_me").click(function() {
		fnSwitchOn($(".nav_me .about_me"));
    	fnHideSec(0);
    	flagNavUinfo = 3;
    	$("#userInfo .sec_uinfo").fadeIn();
	});
// 固定导航
	$("#fix_nav_mes .nav_com").click(function() {
		fnSwitchOn($(this));
		$("#navCom").click();
	});
	$("#fix_nav_mes .nav_agr").click(function() {
		fnSwitchOn($(this));
		$("#navAgr").click();
	});
	$("#fix_nav_mes .nav_sys").click(function() {
		fnSwitchOn($(this));
		$("#navSys").click();
	});
	function fnSwitchOn(obj){
		obj.closest('tr').find('a').each(function() {
    		$(this).removeClass('on');
    	});
    	obj.addClass('on');
	}
	function fnHideSec (sec=1) {
		switch (sec) {
			case 1:
		    	$("#userInfo>.sec_message>.sec").each(function() {
		    		// console.log($(this));
		    		$(this).hide();
		    	});
				break;
			case 0:
		    	$("#userInfo>.sec").each(function() {
		    		$(this).hide();
		    	});
				$("#fix_nav_lab").hide();
				$("#fix_nav_mes").hide();
				break;
			default:
				$("#fix_nav_lab").hide();
				$("#fix_nav_mes").hide();
				break;
		}
	}
// 左侧菜单滚动
// $("#sideMenu").on('scroll', function(e) {
// 	e.preventDefault();
// 	e.stopPropagation();
// });

function fnUnfoldList(obj){
	// console.log($lastSlideDown!=null&&$lastSlideDown['prevObject'][0]==obj['prevObject'][0]);
	if (obj.is('.unfold')) {
		obj.slideUp();
		obj.prev('.wp_head').find('.icon-angle-up').removeClass('icon-angle-up').addClass('icon-angle-down');
		obj.removeClass('unfold').addClass('fold');
	} else {
		// console.log('展开');
		fnFoldList();
		obj.slideDown();
		obj.prev('.wp_head').find('.icon-angle-down').removeClass('icon-angle-down').addClass('icon-angle-up');
		obj.removeClass('fold').addClass('unfold');
		$lastSlideDown = obj;
		// console.log($lastSlideDown);
		// console.log($lastSlideDown['prevObject'][0]);
	}
}
function fnFoldList(){
	// if ($lastSlideDown!=null) {
	// 	$lastSlideDown.slideUp();
	// 	$lastSlideDown.removeClass('unfold').addClass('fold');
	// 	$lastSlideDown.prev('.wp_head').find('.icon-angle-up').removeClass('icon-angle-up').addClass('icon-angle-down');
	// 	$lastSlideDown = null;
	// }
	// $("#fix_nav_lab").hide();
}
// 局部刷新函数
if (fnIsLogged()) {fnLoadActi ();}
	function fnLoadActi () {
	    $.ajax({
	      url: 'php/my_acti.php',
	      type: 'POST',
	      dataType: 'json',
	      beforeSend: function() {
	            fnLoading(1);
	      },
	      success: function (data) {
	            fnLoading(0);
	            // console.log(data);
	            // console.log(data.length);
	            data.forEach( function(element, i) {
	            	// console.log(data[i]);
	            	var list_acti = 
		            	'<div class="list_acti">\
							<div><div class="imgWrap"><img src="'+data[i]["csrc"]+'" alt=""></div></div>\
							<a href="'+data[i]["page"]+'" class="tit_abs"><div>'+data[i]["title"]+'</div><div>'+data[i]["abstract"]+'</div></a>\
							<div class="tim"><div>'+data[i]["ctime"]+'</div><i class="icon-bin del_acti"></i></div>\
						</div>';
					$("#toggle_acti").next(".wp_list").prepend(list_acti);
	            });
			    flagActiLoaded = 1;
	      },
	      error: function (hd,msg) {
	            fnLoading(0);
		        alert(msg);
	      },
	    });
	}
	function fnLoadComm () {
	    $.ajax({
	      url: 'php/my_comm.php',
	      type: 'POST',
	      dataType: 'json',
	      beforeSend: function() {
	            fnLoading(1);
	      },
	      success: function (data) {
	            fnLoading(0);
	            data.forEach( function(element, i) {
	            	var list_comm = 
					    '<div class="wp_message">\
		      		        <div class="comment"><div>'+data[i]["say"]+'</div><span class="time">'+data[i]["tim"]+'</span></div>';
		      		if (data[i]["tar"]=='user') {
		      			list_comm += '<div class="who"><div class="imgWrap uimg"><img src="'+data[i]["img"]+'" alt=""></div><div>';
		      		}else {
		      			list_comm += '<div class="who acti"><div class="imgWrap uimg"><img src="'+data[i]["img"]+'" alt=""></div><div>';
		      		}
		      		list_comm += '<div class="name">'+data[i]["tit"]+'</div><div class="say">'+data[i]["des"]+'</div></div>\
		      		        </div>\
		      		    </div>';
					$("#toggle_comm").next(".wp_list").prepend(list_comm);
	            });
			    flagCommLoaded = 1;
	      },
	      error: function (hd,msg) {
	            fnLoading(0);
		        alert(msg);
	      },
	    });
	}
	function fnLoadLike () {
	    $.ajax({
	      url: 'php/my_like.php',
	      type: 'POST',
	      dataType: 'json',
	      beforeSend: function() {
	            fnLoading(1);
	      },
	      success: function (data) {
	            fnLoading(0);
	            console.log(data);
	            console.log(data.length);
	            data.forEach( function(element, i) {
	            	console.log(data[i]);
	            	var list_like = 
					    '<div class="wp_message like">\
		      		        <div class="who acti">\
			      		        <div class="imgWrap"><img src="'+data[i]["img"]+'" alt=""></div>\
			      		        <div><div class="name">'+data[i]["tit"]+'</div><div class="say">'+data[i]["des"]+'</div></div>\
			      		        <span class="time">'+data[i]["tim"]+'</span>\
		      		        </div>\
		      		    </div>';
					$("#toggle_like").next(".wp_list").prepend(list_like);
	            });
			    flagLikeLoaded = 1;
	      },
	      error: function (hd,msg) {
	            fnLoading(0);
		        alert(msg);
	      },
	    });
	}
	function fnLoadFocu () {
	    $.ajax({
	      url: 'php/my_focu.php',
	      type: 'POST',
	      dataType: 'json',
	      beforeSend: function() {
	            fnLoading(1);
	      },
	      success: function (data) {
	            fnLoading(0);
	            data.forEach( function(element, i) {
	            	var list_focu = 
		            	'<div class="list_acti">\
							<div><div class="imgWrap"><img src="'+data[i]["img"]+'" alt=""></div></div>\
							<a href="'+data[i]["pag"]+'" class="tit_abs"><div>'+data[i]["tit"]+'</div><div>'+data[i]["des"]+'</div></a>\
							<div class="tim"><div>'+data[i]["tim"]+'</div><i class="icon-bin del_acti"></i></div>\
						</div>';
					$("#toggle_focu").next(".wp_list").prepend(list_focu);
	            });
			    flagFocuLoaded = 1;
	      },
	      error: function (hd,msg) {
	            fnLoading(0);
		        alert(msg);
	      },
	    });
	}
	function fnMesCom () {
	    $.ajax({
	      url: 'php/mes_com.php',
	      type: 'POST',
	      dataType: 'json',
	      beforeSend: function() {
	            fnLoading(1);
	      },
	      success: function (data) {
	            fnLoading(0);
	            data.forEach( function(element, i) {
	            	var mes = 
					    '<div class="wp_message">\
				            <div class="who">\
				                <div class="imgWrap"><img src="'+data[i]['img']+'" alt=""></div>\
					                <div><div class="name">'+data[i]['nam']+'</div><span class="time">'+data[i]['tim']+'</span>评论了你</div>\
					                <a class="btn btn_reply">回复</a>\
						            </div>\
					            <div class="comment">'+data[i]['com']+'</div>\
				            <div class="say">'+data[i]['say']+'</div>\
			            </div>';
					$("#com").prepend(mes);
	            });
			    flagMesComLoaded = 1;
	      },
	      error: function (hd,msg) {
	            fnLoading(0);
		        alert(msg);
	      },
	    });
	}
	function fnMesArg () {
	    $.ajax({
	      url: 'php/mes_agr.php',
	      type: 'POST',
	      dataType: 'json',
	      beforeSend: function() {
	            fnLoading(1);
	      },
	      success: function (data) {
	            fnLoading(0);
	            data.forEach( function(element, i) {
	            	// console.log(data[i]['said']);
	            	var mes = 
					    '<div class="wp_message">\
				            <div class="who">\
				                <div class="imgWrap"><img src="'+data[i]['img']+'" alt=""></div>\
				                <div><div class="name">'+data[i]['nam']+'</div><span class="time">'+data[i]['tim']+'</span>赞了你</div>\
				            </div>\
				            <div class="say">'+data[i]['said']+'</div>\
			            </div>';
					$("#agr").prepend(mes);
	            });
			    flagMesArgLoaded = 1;
	      },
	      error: function (hd,msg) {
	            fnLoading(0);
		        alert(msg);
	      },
	    });
	}
	function fnMesSys () {
	    $.ajax({
	      url: 'php/mes_sys.php',
	      type: 'POST',
	      dataType: 'json',
	      beforeSend: function() {
	            fnLoading(1);
	      },
	      success: function (data) {
	            fnLoading(0);
	            data.forEach( function(element, i) {
	            	var mes = 
					    '<div class="wp_message">\
				            <div class="who">\
				                <div class="imgWrap"><img src="'+data[i]['img']+'" alt=""></div>\
				                <div><div class="name">'+data[i]['nam']+'</div><span class="time">'+data[i]['tim']+'</span>'+data[i]['beh']+'</div>\
				            </div>\
				            <div class="say">'+data[i]['rea']+'</div>\
			            </div>';
					$("#sys").prepend(mes);
	            });
			    flagMesSysLoaded = 1;
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
	function fnIsLogged () {
		// console.log($("#userInfo")[0]);
		// console.log($("#usr").val());
		return ($("#usr").val()=='')?false:true;
	}
	function fnPopLog(){
		fnUnscroll($("body"));
		fnShow($("#sep_reg_log"),'fadeIn');
	}