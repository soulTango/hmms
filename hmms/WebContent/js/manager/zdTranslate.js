//点击二级菜单请求数据渲染模版
//点击菜单4
var resultData;
$(function() {
	var app = new Vue({
		el : '#zdTranslate',
		data : {
			isAdd : true,
			editData : {},
			isGetSfxsed : false
		},
		methods : {
		 selectZdTraInfo: function() {
		     if (this.isGetSfxsed) {
		         getSfxsZdfyinfo()
		     } else {
		         loaddata();
		     }
		 }
		}
	})
	
	$.ajaxSetup({async:false});
	loaddata();
	$.ajaxSetup({async:true});
	function loaddata() {
		var parm = {
			'sfxs' : "Y",
			'zdz' : $("#txtZdz").val()
		}
		$.post('/hmms/service/zdTra/getZdtraInfo', parm, function(result) {
			if (result.state == "0") {
				resultData = result.data;
				//table
				layui.use('table', function() {
					var table = layui.table;
					var height = $(window).height();
					//展示已知数据
					table.render({
						elem : '#zdtraInfo',
						data : resultData,
						count : parseInt(resultData.length),
						cols : [ [ {
							type : 'numbers',
							title : '序号'
						}, {
							field : 'zdmc',
							title : '字段名称'
						}, {
							field : 'zdz',
							title : '字段内容'
						}, {
							field : 'zdsm',
							title : '字段说明'
						},{
							field : 'sfxs',
							title : '是否显示'
							,templet:'#barSfxs'
						},  {
							field : 'action',
							title : '操作',
							width : 250,
							align : 'center',
							toolbar : '#barZdTra01'
						} ] ]
					 	 ,height:'full-170'
                         ,skin: 'row' //表格风格
                         ,even: true
                         ,limit: 20 //每页默认显示的数量
                         ,limits: [20, 50, 80]
                         ,page: true, //是否显示分页
					});

					table.on('tool(zdtraInfo)', function(obj) {
						var curRowData = obj.data;
						var layEvent = obj.event;
						var curTrDom = obj.tr;
						if (layEvent === "del") {
							layer.confirm('确认删除行么', function(index) {
								$.post('/hmms/service/zdTra/deleteZdtraInfo',curRowData,function(result){
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
							$('#tit').html("编辑字段翻译");
							$('#Sfxs').show();
							document.getElementById('txtZdmc').disabled = 'disabled';
							document.getElementById('txtZdz').disabled = 'disabled';
							var obj = curRowData;
							app.isAdd = false;
							app.editData = obj;
							Vue.nextTick(function() {
								layui.use([ 'form' ], function() {
									var form = layui.form;
									form.render();
								});
							});
							$('.alert_edit').show();
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

		//根据员工状态查询员工信息
		form.on("submit(formSubmitSfxs)", function(data) {
			//仅仅显示"是否显示"为是的，不加其他信息，以防搜索结果数目变少
			$("#txtZdz").val("");
			form.render();
			if (data.field.sfxs == undefined) {
				app.isGetSfxsed = true;
				getSfxsZdfyinfo();
			} else {
				app.isGetSfxsed = false;
				loaddata();
			}
		})

	});

	//点击添加按钮
	$('.addBtn').on('click', function() {
		$('#tit').html("添加字段翻译");
		$('.alert_edit').show();
		document.getElementById('txtZdmc').disabled = '';
		document.getElementById('txtZdz').disabled = '';
		//添加字段翻译时，是否显示不展示，数据库默认为显示
		$('#Sfxs').hide();
		app.editData = {};
		app.isAdd = true;
		//添加字段翻译时，是否显示，默认为是
		app.editData.sfxs = 'Y';
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
				if ($('#checkSfxs').next().find("em").text() == "是" ){
					data.sfxs = 'Y'
				}else{
					data.sfxs = 'N'
				}
				$.post('/hmms/service/zdTra/addZdtra', data, function(result) {
					if (result.state == "0") {
						layer.msg(result.msg, {icon : 1});
						$('.alert_edit').hide();
						loaddata();
					} else {
						layer.msg(result.msg, {icon : 2});
					}
				});
			} else {
				if (par.field.sfxs != undefined) {
					data.sfxs = "Y";
				} else {
					data.sfxs = "N";
				}
				$.post('/hmms/service/zdTra/updateZdtraInfo', data,
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

function getSfxsZdfyinfo() {
	var parm = {
		'sfxs' : "N",
		'zdz' : $("#txtZdz").val()
	}
	$.post('/hmms/service/zdTra/getZdtraInfo', parm, function(result) {
		if (result.state == "0") {
			resultData = result.data;
			//table
			layui.use('table', function() {
				var table = layui.table;
				var height = $(window).height();
				//展示已知数据
				table.render({
					elem : '#zdtraInfo',
					data : resultData,
					count : parseInt(resultData.length),
					cols : [ [ {
						type : 'numbers',
						title : '序号'
					}, {
						field : 'zdmc',
						title : '字段名称'
					}, {
						field : 'zdz',
						title : '字段内容'
					}, {
						field : 'zdsm',
						title : '字段说明'
					},{
						field : 'sfxs',
						title : '是否显示'
						,templet:'#barSfxs'
					},  {
						field : 'action',
						title : '操作',
						width : 250,
						align : 'center',
						toolbar : '#barZdTra02'
					} ] ]
				 	 ,height:'full-170'
                     ,skin: 'row' //表格风格
                     ,even: true
                     ,limit: 20 //每页默认显示的数量
                     ,limits: [20, 50, 80]
                     ,page: true, //是否显示分页
				});


				table.on('tool(zdtraInfo)', function(obj) {
					var curRowData = obj.data;
					var layEvent = obj.event;
					var curTrDom = obj.tr;
					if (layEvent === "hf") {
						layer.confirm('确认恢复行么', function(index) {
							curRowData.sfxs = "Y";
							$.post('/hmms/service/zdTra/updateZdtraInfo',curRowData, function(result) {
										if (result.state == "0") {
											getSfxsZdfyinfo();
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
