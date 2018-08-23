var username;
(function(){
	getLeftMenu();//根据登录人员的类型展示相对应的操作菜单 
    add_dataUrl();
    init_styleAndClick();
    click_loadPage()
    $.fn.treeTable = function(opts){
        var t           = this,
            i           = ["&#xe623;", "&#xe625;"],
            w           = ['table-row','none'],
            d           = $.extend({
                column: 0,// 伸缩图标出现在第几列
                retract: 16// 伸缩图标缩进多少个像素
            }, opts),
            init        = function(){
                t.find("tbody tr").each(function(){
                    var i_s = $(this).attr("data-tb-pid") == '0' ? 0 : 1,
                        icon = $("tbody tr[data-tb-pid='"+($(this).attr("data-tb-id"))+"']").length ? i[0] : '';
                    // 显示pid为0的根目录，隐藏子目录
                    $(this).css('display',w[i_s]);
                    // 添加伸缩图标（最后一级不需要）
                    $(this).find("td").eq(d.column).prepend('<i class="layui-icon">'+icon+'</i>');
                })
                // 伸缩图标缩进
                retract();
            },
            retract     = function(){
                t.find("tbody tr").each(function(){
                    var id = $(this).attr("data-tb-id"),
                        px = $(this).find("i").css("margin-left");
                    // 子级缩进
                    t.find("tbody tr[data-tb-pid='"+id+"']").find("i").css("margin-left",(parseInt(px)+d.retract)+'px')
                })
            },
            click       = function(){
                var c_t = $(this),
                    c_i = c_t.hasClass("sopen") ? 0 : 1,
                    id  = c_t.parents("tr").attr("data-tb-id");
                c_t.html(i[c_i]).toggleClass("sopen");
                tree(id,c_i ? 0 : 1);
            },
            tree        = function(id,c_i){
                t.find("tr[data-tb-pid='"+id+"']").each(function(){
                    $(this).css("display",w[c_i]);
                    tree($(this).attr("data-tb-id"),w[c_i]);
                })
            };
        // 点击触发伸缩图标下拉
        t.on("click","i",click);
        // 初始化table
        init();
    }
})(window.jQuery)

//样式及绑定点击事件
function init_styleAndClick(){
    //下拉菜单---------------------------------------------------
    $('.selectList div:first-child').on('click', function() {
        var $this_ul = $(this).next('ul');
        if($this_ul.css('display') == "none"){
            $('.selectList ul').slideUp();
            $this_ul.slideDown();
        }else{
            $('.selectList ul').slideUp();
        }
    })
//-----------------------------------------------------------------

//系统主页
    $('.selectList .xtzhuye').on('click', function() {
        $('.selectList div').removeClass(
            'listBg hover_listColor arrow_hover peizhiBg songanBg shouanBg zuzhiBg');
        $(this).addClass('listBg hover_listColor arrow_hover');
        //修改图标
        $('.selectList span').removeClass('peizhiBg xtBg songanBg shouanBg zuzhiBg');
        console.log(this.children[0]);
        console.log($(this.children[0]))
        $(this.children[0]).addClass('xtBg');
    });
//收案配置
    $('.selectList .shouan').on('click', function() {
        $('.selectList div').removeClass('listBg hover_listColor arrow_hover');
        $(this).addClass('listBg hover_listColor arrow_hover');
        $('.selectList span').removeClass('peizhiBg xtBg songanBg shouanBg zuzhiBg');
        $(this.children[0]).addClass('shouanBg');
    });
// 送案配置
    $('.selectList .songan').on('click', function() {
        $('.selectList div').removeClass('listBg hover_listColor arrow_hover');
        $(this).addClass('listBg hover_listColor arrow_hover');
        $('.selectList span').removeClass('peizhiBg xtBg songanBg shouanBg zuzhiBg');
        $(this.children[0]).addClass('songanBg');
    });
//组织机构
    $('.selectList .zuzhi').on('click', function() {
        $('.selectList div').removeClass('listBg hover_listColor arrow_hover');
        $(this).addClass('listBg hover_listColor arrow_hover');
        $('.selectList span').removeClass('peizhiBg xtBg songanBg shouanBg zuzhiBg');
        $(this.children[0]).addClass('zuzhiBg');
    });
//系统配置
    $('.selectList .peizhi').on('click', function() {
        $('.selectList div').removeClass('listBg');
        $(this).addClass('listBg');
        // 改变字体颜色
        $('.selectList div').removeClass('hover_listColor');
        $(this).addClass('hover_listColor');
        //改变箭头图片
        $('.selectList div').removeClass('arrow_hover');
        $(this).addClass('arrow_hover');
        //修改图标
        $('.selectList span').removeClass('peizhiBg xtBg songanBg shouanBg zuzhiBg');
        $(this.children[0]).addClass('peizhiBg');
    });

//点击下拉菜单首选性去掉二级菜单背景色
    $('.selectList div').on('click', function(){
        $('.selectList li').removeClass('liClick');
    });

// 改变二级菜单点击时候的样式
    $('.selectList li').on('click', function() {
        $('.selectList li').removeClass('liClick');
        $(this).addClass('liClick');
    })

//左侧菜单滑动效果
//展开
    $('.ico_zhankai').on('click', function() {

        //去掉展开时候二级菜单的背景色
        $('.selectList li').removeClass('liClick');
        $('.selectList ul').hide();
        $('.selectList div').removeClass('listBg hover_listColor arrow_hover');
        $('.selectList span').removeClass('peizhiBg songanBg shouanBg zuzhiBg xtBg');
        $('.left_ico').hide();
        var openWidth = $(window).width() - 166;
        $(".inner_right").animate({'width':openWidth + 'px'},200,"linear");
        $('.inner_left').show();
        $('.inner_left').animate({left:"0",width:"164px"},200,"linear",function () {

        })
        // $('.whiteBg').animate({width:'99%'},200,"linear");
        // $('.whiteBg').removeClass('width107');

    });
//收缩
    $('.left_extend_shoufang').on('click', function() {
        $('.inner_left').animate({left:"-164px",width:"47px"},200,"linear",function () {
            $('.inner_left').hide();
            $('.left_ico').fadeIn();
        })
        var closeWidth = $(window).width() - 50;
        $(".inner_right").animate({'width':closeWidth + 'px'},200,"linear");
        // $('.whiteBg').addClass('width107');
        // $('.whiteBg').animate({width:'104.85%'},200,"linear");
    });

//菜单收起之后鼠标上动画
$('.ico').hover(function(){
	var index = $(this).index();
	$('.ico').eq(index-1).addClass('liClick')
	$('.ico .ico_child').removeClass('zindex').eq(index-1).addClass('zindex');
	
},function(){
	$('.ico_child li').removeClass('liClick');
	$('.ico').removeClass('liClick');
	var index = $(this).index();
	$('.ico .ico_child').removeClass('zindex');
});

//二级菜单li的点击效果
    $('.ico_child li').on('click', function(){
        $('.ico_child li').removeClass('liClick');
        $(this).addClass('liClick');

    })
}
//根据登录人员的类型展示相对应的操作菜单 
function getLeftMenu(){
	$.ajax({
		type : 'post',
		url : "/hmms/service/login/getUser",
		data:{},
		success : function(res) {
			data = res.data;
			if(data.type=='管理员'){
				$("#shouan").hide();
				$("#songan").hide();
				$("#zuzhi").hide();
				//$("#xitong").hide();
			}else if(data.type=='药品录入人员'){
				$("#xtzhuye").hide();
				$("#songan").hide();
				//$("#xitong").hide();
			}else{
				$("#xtzhuye").hide();
				$("#shouan").hide();
				$("#zuzhi").hide();
				//$("#xitong").hide();
			}
			username =  data.username;
			$(".left_extend_name").text(data.username);
		}
  })
}
//循环给二级菜单添加data-url自定义属性
function add_dataUrl(){
	var menuArr = $(".menu");
	var menu_iconArr = $(".menu_icon");
	var dataUrlArr = [
		//main
		"views/manager/userManagement.html",
		"views/manager/zdTranslate.html",
		//"chart.html",
        //shouan
		"views/drug/drugAdd.html",
        "views/drug/drugIn.html",
        /*"views/drug/returnDrug.html",*/
        //zuzhi
        /*"views/zuzhi/dwlb.html",*/
        "views/drug/returnDrug.html",
        "views/drug/returnDrug2.html",
        /*"views/seller/drugInfo.html",*/
        //songan
        "views/seller/drugInfo.html",
        "views/seller/sellDrug.html",
        "views/seller/sellDrug2.html",
       
        //xitong
        "views/drug/lessDrug.html",
        "chart.html",
        "views/xitong/wsjg.html",
        "views/xitong/yzpz.html",
        "views/xitong/jkpz.html"
	]
	for(var i = 0;i < menuArr.length;i++ ){
		$(menuArr[i]).attr('data-url',dataUrlArr[i]);
		$(menu_iconArr[i]).attr('data-url',dataUrlArr[i]);
	}
}

//点击二级菜单实现页面加载
function click_loadPage(){
	$('.menu').click(function(){
		var curUrl = $(this).attr('data-url');
        $(".index_iframe_box").attr('src',curUrl);
	});
    $('.menu_icon').click(function(){
        var curUrl = $(this).attr('data-url');
        $(".index_iframe_box").attr('src',curUrl);
    });
}

//ajax方法
function getData(ele, url) {
	$.ajax({
		type: 'get',
		url: url,
		async: false,
		cache: false,
		success: function(res) {
			$(ele).html(res);
		}
	})
}

$('.left_extend_logout').on('click', function() {
	$.ajax({
		type : 'post',
		url : "/hmms/service/login/loginOut",
		data:{},
		success : function(res) {
			if (res.state == "1") {
				layer.msg(res.msg, {icon: 2});
				return false;
			}else{
				location.href ="/hmms/login.html";
			}
		}
  })
})
	// 关闭编辑弹框
	$('.editBox_head_close,.btnBox .btnClose').on('click', function() {
		$('.alert_edit').hide();
	})

	$('.left_extend_name').on('click', function() {
		$('#txtUsername').val(username);
		document.getElementById('txtUsername').disabled = 'disabled';
		$('.alert_edit').show();
	})
	// 点击保存按钮
	layui.use('form', function() {
		var form = layui.form;
		// 监听提交
		form.on('submit(formSubmit)', function(par) {
			var data = par.field;
			var newPwd = $('#txtNewPwd').val();		//新密码
			var rePwd = $('#txtRePwd').val();		//确认密码
			if(newPwd.length<6){
				layer.msg("新密码不能少于6位", {icon: 2});
				return false;
			}else if(rePwd.length<6){
				layer.msg("确认密码不能少于6位", {icon: 2});
				return false;
			}else if(newPwd!==rePwd){
				layer.msg("两次密码不一致", {icon: 2});
				return false;
			}else{
				$.ajax({
					type : 'post',
					url : "/hmms/service/login/moPwd",
					data:{"username":username,"password":data.password,"newpassword":newPwd},
					success : function(res) {
						if (res.state == "1") {
							layer.msg(res.msg, {icon: 2});
							return false;
						}else{
							location.href ="/hmms/login.html";
						}
					}
			  })
			}
		})
	})	
	
		