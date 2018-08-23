//点击二级菜单请求数据渲染模版
//点击菜单4
var resultData;
$(function() {
	var app = new Vue({
		el : '#drugAdd',
		data : {
			isAdd : true,
			editData : {},
			UnitData : [],
			pymData	 : [],
			dnData	 : [],
			tempData : [],
			pinyinma : ""
		},
		methods : {
			selectDrugInInfo : function() {
				loaddata();
			}
		}
	})

	selectType();
	// 获取计量单位的下拉框
	function selectType() {
		$.post('/hmms/service/drug/getSelectType', function(result) {
			app.UnitData = result.data;
			app.$nextTick(function() {
				layui.use('form', function() {
					var form = layui.form;
					form.render();
				})
			})
		})
	}
	//获取拼音码下拉框内容
	selectPynType();
	function selectPynType(){
		$.post('/hmms/service/drug/selectPynTYpe', function(result) {
			app.pymData = result.data;
			app.$nextTick(function() {
				layui.use('form', function() {
					var form = layui.form;
					form.render();
				})
			})
		})
	}
	
	//获取药品名称下拉框
	function selectDnTYpe(){
		var pinyinma = $("#txtPy").val();
		layui.use('form', function() {
			if (!pinyinma){
		        layer.msg("请选择拼音码",{icon:2})
		        return false;
		    }
			$.post('/hmms/service/drug/selectDnTYpe',{"pinyinma":pinyinma},function(result){
				app.dnData = result.data;
				Vue.nextTick(function(){
			      	layui.use(['form'], function() {
			      		var form = layui.form;
			      		form.render();
			      		form.render();
			      	});
			    });
			})
		})
		
	}
	
	function getDrugInfo(pinyinma,drugname){
		$.post('/hmms/service/drug/getDrugInfo',{"pinyinma":pinyinma,"drugname":drugname},function(result){
			app.tempData = result.data;
			$("#txtUnit").val(app.tempData[0].unit);
			app.editData.spec= app.tempData[0].spec;
			app.editData.factory = app.tempData[0].csname;
			Vue.nextTick(function(){
		      	layui.use(['form'], function() {
		      		var form = layui.form;
		      		form.render();
		      	});
		    });
		})
	}

	$.ajaxSetup({
		async : false
	});
	loaddata();
	$.ajaxSetup({
		async : true
	});
	function loaddata() {
		var parm = {
			'pinyinma' : $("#txtPym").val(),
			'drugname' : $("#txtYpmc").val(),
			'dateStart' : $("#dateStart").val(),
			'dateEnd' : $("#dateEnd").val()
		}
		if(parm.dateEnd==""||parm.dateStart==""){
			
		}else if(!compareDate(parm.dateEnd,parm.dateStart)){
			layui.use('form', function() {
				layer.msg("开始时间应该早于结束时间", {
					icon : 2
				});
			})
			return false;
		}
		compareDate(parm.dateEnd,parm.dateStart);
		$.post(
						'/hmms/service/drugIn/getDrugInInfo',
						parm,
						function(result) {
							if (result.state == "0") {
								resultData = result.data;
								// table
								layui.use('table',function() {
									var table = layui.table;
									var height = $(window).height();
									// 展示已知数据
									table.render({
										elem : '#drugInInfo',
										data : resultData,
										count : parseInt(resultData.length),
										cols : [ [
										          {type : 'numbers',title : '序号'},
										          {field : 'pinyinma',title : '拼音码'},
										          {field : 'drugname',title : '药品名称'},
										          {field : 'pihao',title : '药品批号'},
										          {field : 'pizhunwenhao',title : '批准文号'},
										          {field : 'spec',title : '药品规格'},
										          {field : 'unit',title : '计量单位'},
										          {field : 'amount',title : '进货数量'},
										          {field : 'intime',title : '入库日期'},
										          {field : 'action',title : '操作',width : 250,
										        	  align : 'center',toolbar : '#barDrugIn01'} ] ],
										        	  height : 'full-170',
										        	  skin : 'row', // 表格风格
										        	  even : true,
										        	  limit : 20 // 每页默认显示的数量
																,
																limits : [ 20,
																		50, 80 ],
																page : true, // 是否显示分页
															});

													table.on('tool(drugInInfo)',function(obj) {
														var curRowData = obj.data;
														var layEvent = obj.event;
														var curTrDom = obj.tr;
														if (layEvent === "del") {
															layer.confirm('确认删除行么',function(index) {
																console.log(curRowData);
																$.post('/hmms/service/drugIn/deleteDrugInInfo',curRowData,function(result) {
																	if (result.state == "0") {
																		loaddata();
																		layer.msg(result.msg,{icon : 1});
																		} else {
																			layer.msg(result.msg,{icon : 2});
																				}
																					})
																	layer.close(index);
																})
																	} else if (layEvent === 'edit') {
																		$('.alert_edit').show();
																		$('#tit').html("编辑入库药品信息");
																		var obj = curRowData;
																		app.isAdd = false;
																		app.editData = obj;
																		$("#tInTime").show();
																		$("#tOperator").show();
																		$("#tAllPrice").show();
																		//编辑时销售单价不能修改
																		document.getElementById('txtSellPrice').disabled = 'disabled';
																		//编辑时药品批号和批准文号作为联合主键无法修改
																		document.getElementById('txtPihao').disabled = 'disabled';
																		document.getElementById('txtPizhunwenhao').disabled = 'disabled';
																		//编辑时属于药品信息（frug表中数据）的不能修改
																		document.getElementById('txtSpec').disabled = 'disabled';
																		document.getElementById('txtUnit').disabled = 'disabled';
																		document.getElementById('txtFactory').disabled = 'disabled';
																		//进货时间就是操作当日，所以无法修改
																		document.getElementById('intime').disabled = 'disabled';
																		//操作员为当前用户，所以不能修改
																		document.getElementById('txtOperator').disabled = 'disabled';
																		//进货总额是计算得到的，所以不能手动修改
																		document.getElementById('txtAllPrice').disabled = 'disabled';
																		$("#producedate").val(obj.producedate);
																		$("#usefuldate").val(obj.usefuldate);
																		//改变进货数量自动计算进货总额
																		$('#txtAmount').blur(function() { 
																			var amount = $('#txtAmount').val();
																			var inprice = $('#txtInPrice').val();
																			var allprice = Number(amount)*Number(inprice);
																			app.editData.allprice = allprice;												
																			Vue.nextTick(function() {
																				layui.use([ 'form' ],
																						function() {
																							var form = layui.form;
																							form.render();
																						});
																			});
																		});
																		//改变进货单价自动计算进货总额
																		$('#txtInPrice').blur(function() { 
																			var amount = $('#txtAmount').val();
																			var inprice = $('#txtInPrice').val();
																			var allprice = Number(amount)*Number(inprice);
																			app.editData.allprice = allprice;
						
																			Vue.nextTick(function() {
																				layui.use([ 'form' ],
																						function() {
																							var form = layui.form;
																							form.render();
																						});
																			});
																		});
																		app.editData.pinyinma = obj.pinyinma;
																		app.editData.drugname = obj.drugname;
																		$("#aa").hide();
																		$("#bb").hide();
																		$("#txtUnit").val(obj.unit);
																		Vue.nextTick(function() {
																			layui.use([ 'form' ],
																					function() {
																						var form = layui.form;
																						form.render();
																					});
																		});
																			
																		}
																	})
												});
							}
						});
	}
	// 加载layui组件
	layui.use([ 'form', 'layedit', 'laydate', 'laypage', 'layer' ], function() {
		var form = layui.form;
		var layer = layui.layer;
		var layedit = layui.layedit;
		var laydate = layui.laydate;
		var laypage = layui.laypage;
		var laytable = layui.table;
		// 日期控件
		laydate.render({
			elem : '#dateStart'
		});
		laydate.render({
			elem : '#dateEnd',
		});
		laydate.render({
			elem : '#producedate',
		});
		laydate.render({
			elem : '#usefuldate',
		});
		
		// 编辑弹框中的日期控件
		laydate.render({
			elem : '#date',
			format : 'yyyy-MM-dd HH:mm:ss'
		});

	});

	// 点击添加按钮
	$('.addBtn').on('click', function() {
		$('#tit').html("入库药品信息");
		$('.alert_edit').show();
		$("#producedate").val("");
		$("#usefuldate").val("");
		$("#txtPy").val("");
		$("#txtDrugName").val("");
		$("#aa").show();
		$("#bb").show();
		//编辑时销售单价可以修改
		document.getElementById('txtSellPrice').disabled = '';
		//添加时不给选择进货时间，确保进货时间是当天，以免错误操作 
		$("#tInTime").hide();
		//操作员就是当前登录的人员
		$("#tOperator").hide();
		//进货总额通过计算可以得到，不需要显示
		$("#tAllPrice").hide();
		document.getElementById('txtPihao').disabled = '';
		document.getElementById('txtPizhunwenhao').disabled = '';
		//属于药品信息（frug表中数据）的不能修改
		document.getElementById('txtSpec').disabled = 'disabled';
		document.getElementById('txtUnit').disabled = 'disabled';
		document.getElementById('txtFactory').disabled = 'disabled';
		// 添加药品信息时
		app.editData = {
			
		};
		app.isAdd = true;
		// 重新渲染编辑页面--渲染开关
		Vue.nextTick(function() {
			layui.use([ 'form' ], function() {
				var form = layui.form;
				form.render();
			});
		});
	})
	// 关闭编辑弹框
	$('.editBox_head_close,.btnBox .btnClose').on('click', function() {
		$('.alert_edit').hide();
	})
	// 点击保存按钮
	layui.use('form', function() {
		var form = layui.form;
		form.on('select(pinyinma)',function(data){
		    app.pinyinma=data.value;
		    selectDnTYpe();
		});
	    form.on('select(drugname)',function(data){
	    	var drugname = data.value;
	    	getDrugInfo(app.pinyinma,drugname);
	    });
		
		// 监听提交
		form.on('submit(formSubmit)', function(par) {
			var data = par.field;
			console.log(data)
			if (app.isAdd) {
				var amount = $('#txtAmount').val();
				if (isNaN(amount)) {
					layer.msg("进货数量应该是数字", {
						icon : 2
					});
					return false;
				}
				var inprice = $('#txtInPrice').val();
				if (isNaN(inprice)) {
					layer.msg("进货单价应该是数字", {
						icon : 2
					});
					return false;
				}
				var sellprice = $('#txtSellPrice').val();
				if (isNaN(sellprice)) {
					layer.msg("销售单价应该是数字", {
						icon : 2
					});
					return false;
				}
				if(!compareDate(data.usefuldate,data.producedate)){
					layui.use('form', function() {
						layer.msg("生产日期应该早于失效日期", {
							icon : 2
						});
					})
					return false;
				}
				//if()
				var allprice = Number(amount)*Number(inprice);
				data.allprice = allprice;
				//console.log(data);
				$.post('/hmms/service/drugIn/addDrugInInfo', data, function(result) {
					if (result.state == "0") {
						layer.msg(result.msg, {
							icon : 1
						});
						$('.alert_edit').hide();
						loaddata();
					} else {
						layer.msg(result.msg, {
							icon : 2
						});
					}
				});
			} else {
				var lowwarning = $('#txtLowwarning').val();
				var amount = $('#txtAmount').val();
				if (isNaN(amount)) {
					layer.msg("进货数量应该是数字", {
						icon : 2
					});
					return false;
				}
				var inprice = $('#txtInPrice').val();
				if (isNaN(inprice)) {
					layer.msg("进货单价应该是数字", {
						icon : 2
					});
					return false;
				}
				if(!compareDate(data.usefuldate,data.producedate)){
					layui.use('form', function() {
						layer.msg("生产日期应该早于失效日期", {
							icon : 2
						});
					})
					return false;
				}
				data.pinyinma = app.editData.pinyinma;
				data.drugname = app.editData.drugname;
				$.post('/hmms/service/drugIn/updateDrugInInfo', data, function(result) {
					if (result.state == "0") {
						layer.msg(result.msg, {
							icon : 1
						});
						$('.alert_edit').hide();
						loaddata();
					} else {
						layer.msg(result.msg, {
							icon : 2
						});
					}
				});
			}
			return false;
		});
	});
	//比较两个时间字符串大小 
	function compareDate(DateOne, DateTwo) {
		var OneMonth = DateOne.substring(5, DateOne.lastIndexOf("-"));
		var OneDay = DateOne.substring(DateOne.length,
				DateOne.lastIndexOf("-") + 1);
		var OneYear = DateOne.substring(0, DateOne.indexOf("-"));
		var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf("-"));
		var TwoDay = DateTwo.substring(DateTwo.length,
				DateTwo.lastIndexOf("-") + 1);
		var TwoYear = DateTwo.substring(0, DateTwo.indexOf("-"));
		if (Date.parse(OneMonth + "/" + OneDay + "/" + OneYear) > Date
				.parse(TwoMonth + "/" + TwoDay + "/" + TwoYear)) {
			return true;
		} else {
				return false;
			//})
			
		}
	}
	
	

	$('.white_inner3 .list_title_span1').on('click', function() {
		// 展开
		if ($(this).hasClass('jia')) {
			$(this).removeClass('jia');
			$(this).addClass('jian');
			$('.white_inner3 .input_box').show();
			$('.white_inner3 .list_name').show();
			$('.white_inner3 .list_contentBox').show();
			$('#demo').show();
		} else {
			// 收起
			$(this).removeClass('jian');
			$(this).addClass('jia');
			$('.white_inner3 .input_box').hide();
			$('.white_inner3 .list_name').hide();
			$('.white_inner3 .list_contentBox').hide();
			$('#demo').hide();
		}
	})

})
