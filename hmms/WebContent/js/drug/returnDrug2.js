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
			pinyinma : "",
		},
		methods : {
			selectDrugInInfo : function() {
				loaddata();
			}
		}
	})
	
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
			'dateEnd' : $("#dateEnd").val(),
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
						'/hmms/service/returnDrug/getReturnDrugInfo',
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
										          {field : 'inprice',title : '进货单价'},
										          {field : 'ramount',title : '退货数量'},
										          {field : 'reason',title : '退货原因'},
										          {field : 'rtime',title : '退货日期'},
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
														if (layEvent === 'edit') {
															$('.alert_edit').show();
															$('#tit').html("再次退货");
															//库存剩余是通过计算得到的，不能修改
															document.getElementById('restNum').disabled = 'disabled';
															//进货单价不能修改
															document.getElementById('txtInPrice').disabled = 'disabled';
															//退货总额是计算得到的，所以不能手动修改
															document.getElementById('txtAllprice').disabled = 'disabled';
															var obj = curRowData;
															app.isAdd = false;
															app.editData = obj;															
															//进货总额
															var amount = obj.amount;
															//改变退货数量自动计算退货总额
															$('#txtrAmount').blur(function() { 
																var rAmount = $('#txtrAmount').val();
																var inprice = $('#txtInPrice').val();
																var allprice = Number(rAmount)*Number(inprice);
																$('#txtAllprice').val(allprice);
																Vue.nextTick(function() {
																	layui.use([ 'form' ],
																			function() {
																				var form = layui.form;
																				form.render();
																			});
																});
															});
															//获取销售表中的销售量
															$.post('/hmms/service/returnDrug/getSellAmount',
															 {"pinyinma":obj.pinyinma,"drugname":obj.drugname,
															 "pihao":obj.pihao,"pizhunwenhao":obj.pizhunwenhao},
															 function(result) {
																var samount = result.total;//销售总额														
																$.post('/hmms/service/returnDrug/getRukuAmount',
																 {"pinyinma":obj.pinyinma,"drugname":obj.drugname,
																 "pihao":obj.pihao,"pizhunwenhao":obj.pizhunwenhao},
																 function(result) {
																	 var rukuAmount = result.total;//入库总额																	
																	 $.post('/hmms/service/returnDrug/getReturAmount',
																			 {"pinyinma":obj.pinyinma,"drugname":obj.drugname,
																			 "pihao":obj.pihao,"pizhunwenhao":obj.pizhunwenhao},
																			 function(result) {
																				 var returAmount = result.total;//已退货总额																			 
																				 var restAmount = Number(rukuAmount)-Number(samount)-Number(returAmount);
																				 $('#restNum').val(restAmount);
																			 })
																 })
																 
																 
															 })
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
	});

	// 关闭编辑弹框
	$('.editBox_head_close,.btnBox .btnClose').on('click', function() {
		$('.alert_edit').hide();
	})
	// 点击保存按钮
	layui.use('form', function() {
		var form = layui.form;
		// 监听提交
		form.on('submit(formSubmit)', function(par) {
			var rAmount = $('#txtrAmount').val();	//退货数量
			var restAmount = $('#restNum').val();	//库存剩余
			if(Number(rAmount)>Number(restAmount)){
				layer.msg("退货数量超过库存剩余！", {
					icon : 2
				});
				return false;
			}
			var data = par.field;
				var ramount = $('#txtrAmount').val();
				if (isNaN(ramount)) {
					layer.msg("退货数量应该是数字", {
						icon : 2
					});
					return false;
				}
				data.pinyinma = app.editData.pinyinma;
				data.drugname = app.editData.drugname;
				data.pihao = app.editData.pihao;
				data.pizhunwenhao = app.editData.pizhunwenhao;
				data.operator = app.editData.operator;
				$.post('/hmms/service/returnDrug/addReturnDrug2', data, function(result) {
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
				app.editData = {};
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
