//点击二级菜单请求数据渲染模版
//点击菜单4
var resultData;
$(function() {
	var app = new Vue({
		el : '#drugAdd',
		data : {
			isAdd : true,
			editData : {},
			UnitData : []
		},
		methods : {
		 selectDrugAddInfo: function() {
			 loaddata();
		 }
		}
	})
	
	selectType();
	//获取计量单位的下拉框
	function selectType(){
		$.post('/hmms/service/drug/getSelectType', function(result) {
			app.UnitData = result.data;
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
		var parm = {
			'pinyinma' : $("#txtPym").val(),
			'drugname' : $("#txtYpmc").val()
		}
		$.post('/hmms/service/drug/getDrugAddInfo', parm, function(result) {
			if (result.state == "0") {
				resultData = result.data;
				//table
				layui.use('table', function() {
					var table = layui.table;
					var height = $(window).height();
					//展示已知数据
					table.render({
						elem : '#drugAddInfo',
						data : resultData,
						count : parseInt(resultData.length),
						cols : [ [ {
							type : 'numbers',
							title : '序号'
						}, {
							field : 'pinyinma',
							title : '拼音码'
						}, {
							field : 'drugname',
							title : '药品名称'
						}, {
							field : 'spec',
							title : '药品规格'
						} ,{
							field : 'unit',
							title : '计量单位'
						} ,{
							field : 'lowwarning',
							title : '库存底限'
						} ,{
							field : 'csname',
							title : '厂商名称'
						}, {
							field : 'action',
							title : '操作',
							width : 250,
							align : 'center',
							toolbar : '#barDrugAdd01'
						} ] ]
					 	 ,height:'full-170'
                         ,skin: 'row' //表格风格
                         ,even: true
                         ,limit: 20 //每页默认显示的数量
                         ,limits: [20, 50, 80]
                         ,page: true, //是否显示分页
					});

					table.on('tool(drugAddInfo)', function(obj) {
						var curRowData = obj.data;
						var layEvent = obj.event;
						var curTrDom = obj.tr;
						if (layEvent === "del") {
							layer.confirm('确认删除行么', function(index) {
								$.post('/hmms/service/drug/deleteDrugAddInfo',curRowData,function(result){
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
							$('#tit').html("编辑药品信息");
							document.getElementById('txtPy').disabled = 'disabled';
							document.getElementById('txtDrugName').disabled = 'disabled';
							var obj = curRowData;
							app.isAdd = false;
							app.editData = obj;
							console.log(app.editData);
							$("#txtUnit").val(app.editData.unit);
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
	});

	//点击添加按钮
	$('.addBtn').on('click', function() {
		$('#tit').html("添加药品信息");
		$('.alert_edit').show();
		document.getElementById('txtPy').disabled = '';
		document.getElementById('txtDrugName').disabled = '';
		//添加药品信息时
		app.editData = {};
		app.isAdd = true;
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
				var lowwarning = $('#txtLowwarning').val();
				 if(lowwarning == null){
					 layer.msg("库存底限应该是数字", {icon : 2});
				        return false;
				    }
				    if(isNaN(lowwarning)){
				    	layer.msg("库存底限应该是数字", {icon : 2});
				        return false;
				    }
				$.post('/hmms/service/drug/addDrugInfo', data, function(result) {
					if (result.state == "0") {
						layer.msg(result.msg, {icon : 1});
						$('.alert_edit').hide();
						loaddata();
					} else {
						layer.msg(result.msg, {icon : 2});
					}
				});
			} else {
				var lowwarning = $('#txtLowwarning').val();
				 if(lowwarning == null){
					 layer.msg("库存底限应该是数字", {icon : 2});
				        return false;
				    }
				    if(isNaN(lowwarning)){
				    	layer.msg("库存底限应该是数字", {icon : 2});
				        return false;
				    }
				$.post('/hmms/service/drug/updateDrugInfo', data,
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

