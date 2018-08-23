//点击二级菜单请求数据渲染模版
//点击菜单4
var resultData;
$(function() {
	var app = new Vue({
		el : '#userManagement',
		data : {
			isAdd : true,
			editData : {},
			TypeData : [],
			isGetYgzted : false
		},
		methods : {
		 selectUserInfo: function() {
		     if (this.isGetYgzted) {
		         getYgztUserinfo()
		     } else {
		         loaddata();
		     }
		 }
		}
	})
	selectType();
	//获取员工类型的下拉框
	function selectType(){
		$.post('/hmms/service/login/getSelectType', function(result) {
			app.TypeData = result.data;
			app.$nextTick(function(){
    			layui.use('form', function() {
    				var form=layui.form;
    				form.render();
                })
    		})
		})
	}
	
	$.ajaxSetup({async:false});
	loaddata();
	$.ajaxSetup({async:true});
	function loaddata() {
		selectType();
		layui.use('form', function() {
            var form = layui.form;
            Vue.nextTick(function () {
                form.render();
            })
        })
		var parm = {
			'ygzt' : "N",
			'type' : $("#txtType").val(),
			'username' : $("#txtUsername").val(),
		}
		$.post('/hmms/service/login/getUserInfo', parm, function(result) {
			if (result.state == "0") {
				resultData = result.data;
				//table
				layui.use('table', function() {
					var table = layui.table;
					var height = $(window).height();
					//展示已知数据
					table.render({
						elem : '#userInfo',
						data : resultData,
						count : parseInt(resultData.length),
						cols : [ [ {
							type : 'numbers',
							title : '序号'
						}, {
							field : 'username',
							title : '登录别名'
						},  {
							field : 'type',
							title : '员工类型'
						}, {
							field : 'ygzt',
							title : '是否离职'
							,templet:'#barYgzt'
						},{
							field : 'action',
							title : '操作',
							width : 250,
							align : 'center',
							toolbar : '#barUser01'
						} ] ]
					 	 ,height:'full-170'
                         ,skin: 'row' //表格风格
                         ,even: true
                         ,limit: 20 //每页默认显示的数量
                         ,limits: [20, 50, 80]
                         ,page: true, //是否显示分页
					});

					table.on('tool(userInfo)', function(obj) {
						var curRowData = obj.data;
						var layEvent = obj.event;
						var curTrDom = obj.tr;
						if (layEvent === "del") {
							layer.confirm('确认删除行么', function(index) {
								$.post('/hmms/service/login/deleteUserInfo',curRowData,function(result){
									if (result.state == "0"){
										loaddata();
										layer.msg(result.msg,{icon:1});
									}else{
										layer.msg(result.msg,{icon:2});
									}
								})
								layer.close(index);
							})
						} else if (layEvent === 'edit') {
							//编辑时登录别名无法修改
							$('#tit').html("编辑人员信息");
							document.getElementById('txtUname').disabled='disabled';
							$('#Ygzt').show();
							var obj = curRowData;
							app.isAdd = false;
							app.editData = obj;
							$("#tType").val(app.editData.type);
							Vue.nextTick(function() {
								layui.use([ 'form' ], function() {
									var form = layui.form;
									form.render();
								});
							});
							//密码和确认密码隐藏，保证管理员只能重置密码，而不能修改密码
							$('#pwd').hide();
							$('#rePwd').hide();
							$('.alert_edit').show();
						}else{
							//重置密码按钮实现
							$.post('/hmms/service/login/resetPwd',curRowData,function(result){
								if (result.state == "0"){
									loaddata();
									layer.msg(result.msg,{icon:1});
								}else{
									layer.msg(result.msg,{icon:2});
								}
							})
							layer.close(index);
						}
					})
				});
			}
		});
	}
	
	
	
	//加载layui组件
	layui.use([ 'form', 'layedit', 'laydate', 'laypage', 'layer' ], function() {
		var form = layui.form;
		var layer = layui.layer;
		var layedit = layui.layedit;
		var laydate = layui.laydate;
		var laypage = layui.laypage;
		var laytable = layui.table;
		/*form.on('select(ajlbbm)', function(data) {
			console.log(data);
		});
		//日期控件
		laydate.render({
			elem : '#dateStart'
		});
		laydate.render({
			elem : '#dateEnd',
		});
		//编辑弹框中的日期控件
		laydate.render({
			elem : '#date',
			format : 'yyyy-MM-dd HH:mm:ss'
		});*/

		//根据员工状态查询员工信息
		form.on("submit(formSubmitYgzt)", function(data) {
			//仅仅显示员工状态为离职的，不加其他信息，以防搜索结果数目变少
			$("#txtType").val("");
			$("#txtUsername").val("");
			form.render();
			if (data.field.ygzt === "on") {
				app.isGetYgzted = true;
				getYgztUserinfo()
			} else {
				app.isGetYgzted = false;
				loaddata();
			}
		})

	});

	//点击添加按钮
	$('.addBtn').on('click', function() {
		$('#tit').html("添加人员信息");
		$('.alert_edit').show();
		document.getElementById('txtUname').disabled='';
		$("#tType").val("");
		//添加时员工状态（是否离职）不显示
		$('#Ygzt').hide();
		$('#pwd').show();
		$('#rePwd').show();
		app.editData = {};
		app.isAdd = true;
		//添加时员工状态（是否离职）默认为否
		app.editData.ygzt = 'N';
		//重新渲染编辑页面--渲染开关
		Vue.nextTick(function() {
			layui.use([ 'form' ], function() {
				var form = layui.form;
				form.render();
			});
		});
	})
	//关闭编辑弹框
	$('.editBox_head_close,.btnBox .btnClose').on('click', function() {
		$('.alert_edit').hide();
	})
	//点击保存按钮
	layui.use('form', function() {
		var form = layui.form;
		//监听提交
		form.on('submit(formSubmit)', function(par) {
			var data = par.field;
			if (app.isAdd) {
				//先判断两次的密码是否一致，如果不一致则提醒
				var pwd = $("#txtPassword").val();
				var rePwd = $("#txtRepassword").val();
				if(pwd.length<6){
					layer.msg('密码长度少于6位', {icon : 5});
					return false;
				}if(pwd !== rePwd){
					layer.msg('两次密码不一致', {icon : 5});
					return false;
				}
				if ($('#checkYgzt').next().find("em").text() == "离职" ){
					data.ygzt = 'Y'
				}else{
					data.ygzt = 'N'
				}
				$.post('/hmms/service/login/addUser', data, function(result) {
					if (result.state == "0") {
						layer.msg(result.msg, {icon : 1});
						$('.alert_edit').hide();
						loaddata();
					} else {
						layer.msg(result.msg, {icon : 2});
					}
				});
			} else {
				if (par.field.ygzt != undefined) {
					data.ygzt = "Y";
				} else {
					data.ygzt = "N";
				}
				$.post('/hmms/service/login/updateUserInfo', data,
						function(result) {
							if (result.state == "0") {
								layer.msg(result.msg, {icon : 1});
								$('.alert_edit').hide();
								loaddata();
							} else {
								layer.msg(result.msg, {icon : 2});
							}
						});
			}
			return false;
		});
	});

	$('.white_inner3 .list_title_span1').on('click', function() {
		//展开
		if ($(this).hasClass('jia')) {
			$(this).removeClass('jia');
			$(this).addClass('jian');
			$('.white_inner3 .input_box').show();
			$('.white_inner3 .list_name').show();
			$('.white_inner3 .list_contentBox').show();
			$('#demo').show();
		} else {
			//收起
			$(this).removeClass('jian');
			$(this).addClass('jia');
			$('.white_inner3 .input_box').hide();
			$('.white_inner3 .list_name').hide();
			$('.white_inner3 .list_contentBox').hide();
			$('#demo').hide();
		}
	})
	
})

function getYgztUserinfo() {
	var parm = {
		'ygzt' : "Y",
		'type' : $("#txtType").val(),
		'username' : $("#txtUsername").val()
	}
	$.post('/hmms/service/login/getUserInfo', parm, function(result) {
		if (result.state == "0") {
			resultData = result.data;
			//app.TypeData = result.data;
			layui.use('table', function() {
				var table = layui.table;
				var height = $(window).height();
				//展示已知数据
				table.render({
					elem : '#userInfo',
					data : resultData,
					count : parseInt(resultData.length),
					cols : [ [ {
						type : 'numbers',
						title : '序号'
					}, {
						field : 'username',
						title : '登录别名'
					}, {
						field : 'type',
						title : '员工类型'
					},{
						field : 'ygzt',
						title : '是否离职'
						,templet:'#barYgzt'
					},  {
						field : 'action',
						title : '操作',
						width : 250,
						align : 'center',
						toolbar : '#barUser02'
					}
					] ]
				 	 ,height:'full-170'
                     ,skin: 'row' //表格风格
                     ,even: true
                     ,limit: 20 //每页默认显示的数量
                     ,limits: [20, 50, 80]
                     ,page: true, //是否显示分页
				});

				table.on('tool(userInfo)', function(obj) {
					var curRowData = obj.data;
					var layEvent = obj.event;
					var curTrDom = obj.tr;
					if (layEvent === "hf") {
						layer.confirm('确认恢复行么', function(index) {
							curRowData.ygzt = "N";
							$.post('/hmms/service/login/updateUserInfo',curRowData, function(result) {
										if (result.state == "0") {
											getYgztUserinfo();
											//obj.del();
											layer.close(index);
										} else {
											layer.msg(result.msg, {icon : 2});
										}
									});

						})
					}
				})
			});
		}
	});
}
