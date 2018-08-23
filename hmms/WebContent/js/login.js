$(document).ready(function() {
	layui.use('layer', function() {
		var layer=layui.layer;
		var app = new Vue({
			el : '#form',
			data : {
				returnData: [],
				loginData: {
					dwbm:'',
					username:'',
					password:''
				}
			},
			methods: {
				select:function(index){
					$(".selValue").text(this.returnData[index].dwmc);
					this.loginData.dwbm=this.returnData[index].dwbm;
				},
				login:function(){
					var _this=this;
					/*if(this.loginData.dwbm==''){
						layer.msg("请选择单位",{icon:5});
						return;
					}*/
					if(this.loginData.username=='' || this.loginData.username==null){
						layer.msg("请填写用户名",{icon:5});
						return;
					}
					if(this.loginData.password.length<6){
						layer.msg("密码不少于6位",{icon:5});
						return;
					}
					/*var parm = {
						username:$("#username").val(),
						pwd:$("#password").val()
					}*/
					$.ajax({
						type: 'post',
						url: "/hmms/service/login/getLogin",
						data: this.loginData,
						success: function(res) {
							if(res.state=="1"){
								layer.msg(res.msg,{icon:2});
								return;
							}else{
								var data=res.data;
								var options={
									expires:90
								}
								_this.cookie("username",app.loginData.username,options);
								window.location.href ="/hmms/index.html";
							}
						}
					});
				},
				cookie:function(key, value, options){
				    /* read 读取 */  
				    // 如果没有传递 value ，则表示根据 key 读取 cookie 值
				    if (typeof value === "undefined") { // 读取
				        // 获取当前域下所有的 cookie，保存到 cookies 数组中
				        var cookies = document.cookie.split("; ");  
				        // 遍历 cookies 数组中的每个元素
				        for (var i = 0, len = cookies.length; i < len; i++) {  
				            // cookies[i] : 当前遍历到的元素，代表的是 "key=value" 意思的字符串，
				            // 将字符串以 = 号分割返回的数组中第一个元素表示 key，
				            // 第二个元素表示 value
				            var cookie = cookies[i].split("=");  
				            // 判断是否是要查找的 key，对查找的 key 、value 都要做解码操作
				            if (decodeURIComponent(cookie[0]) === key) {  
				                return decodeURIComponent(cookie[1]);  
				            }  
				        }  
				        // 没有查找到指定的 key 对应的 value 值，则返回 null
				        return null;  
				    }
				    options = options || {};  
				    // key = value，对象 key，value 编码  
				    var cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);  
				    // 失效时间  
				    if ((typeof options.expires) !== "undefined") { // 有配置失效时间  
				        if (typeof options.expires === "number") { // 失效时间为数字  
				            var days = options.expires,   
				                t = options.expires = new Date();  
				            t.setDate(t.getDate() + days);  
				        }   
				        cookie += ";expires=" + options.expires.toUTCString();  
				    }  
				    if (typeof options.path !== "undefined")  
				        cookie += ";path=" + options.path;  
				    // 域名  
				    if (typeof options.domain !== "undefined")  
				        cookie += ";domain=" + options.domain;  
				    // 安全连接  
				    if (options.secure)  
				        cookie += ";secure";  
				  
				    // 保存  
				    document.cookie = cookie;  
				},
				removeCookie:function(key, options) {  
				    options = options || {};  
				    options.expires = -1; // 将失效时间设置为 1 天前  
				    cookie(key, "", options);  
				}/*,
				getChildrenNodes:function(node) {
				    for (var i = this.returnData.length - 1; i >= 0; i--) {
				        var pnode = this.returnData[i];
				        // 如果是父子关系，为父节点增加子节点，退出for循环
				        if (node.id == pnode.fdwbm) {
				            var childnode = {
				                id: pnode.dwbm,
				                text: pnode.dwmc,
				                pid: pnode.fdwbm,
				                children: []
				            };
				            node.state = "closed";
				            node.children.push(childnode);
				            this.getChildrenNodes2(childnode);
				        }
				    }
				},
				getChildrenNodes2:function(node) {
				    for (var i = this.returnData.length - 1; i >= 0; i--) {
				        var pnode = this.returnData[i];
				        // 如果是父子关系，为父节点增加子节点，退出for循环
				        if (node.id == pnode.fdwbm) {
				            var childnode = {
				                id: pnode.dwbm,
				                text: pnode.dwmc,
				                pid: pnode.fdwbm,
				                children: []
				            };
				            node.state = "closed";
				            node.children.push(childnode);
				        }
				    }
				},*/
			},
			/*mounted:function(){
				var username=this.cookie("username");
				this.loginData.username=username;
				var _this=this;
				$.ajax({
					type: 'post',
					url: "/ywxtdj/service/zzjg/getAllDwxx",
					success: function(res) {
						if(res.state=="1"){
							alert(res.msg);
							return;
						}
						if(res.data==null){
							_this.returnData=[];
						}else{
							_this.returnData=res.data;
							var root = [];
					        if (_this.returnData != null && _this.returnData.length > 0) {
					            for (var i = 0; i < _this.returnData.length; i++) {
					                var info = _this.returnData[i];
					                if (null == info.fdwbm) {
					                    var node = {
					                        id: info.dwbm,
					                        text: info.dwmc,
					                        pid: "",
					                        children: []
					                    }
					                    _this.getChildrenNodes(node);
					                    root.push(node);
					                }
					            }
					        }
					        var dwbm=_this.cookie("dwbm");
					        *//**
							 * 初始化单位下拉框
							 *//*
					        $('#dwbm').combotree({
					            lines: true,
					            animate: true,
					            // multiple:true,
					            // checkbox:true,
					            data: root,
					            value:dwbm,
					            // 判断是否是还有子节点，不运行选择父节点
					            onBeforeSelect: function (node) {
					            	_this.loginData.dwbm = dwbm;
					                if (node.children.length > 0) {
					                    // 展开子节点
					                    $(this).tree("toggle", node.target);
					                    // 让他不选中（但是要报错，目前解决不了）
					                }
					            },
					            // 在用户点击的时候提示
					            onClick: function (node) {
					            	_this.loginData.dwbm = node.id;
					            }
					        })
						}
					}
				});
			}*/
		});
});
  $('.option-box')
    .on('mouseenter', 'div', function() {
      // console.log(this)
      var $this = $(this)
      $this.css({ 'background-color': 'rgb(221,238,248)' })
    })
    .on('mouseleave', 'div', function() {
      var $this = $(this)
      $this.css({ 'background-color': '#fff' })
    })
    .on('click', 'div', function($event) {
      var $this = $(this)
      var value = this.innerHTML
      console.log(value)
      $('.option-box').hide()
      $('.selValue').html(value)
      $('.select').css({ 'border-radius': '21px' })
      $event.stopPropagation()
    })
  $('.select').on('click', function() {
    $this = $(this)
    $('.option-box').show()
    $this.css({ 'border-radius': '21px 21px 21px 21px' })
  })
})
