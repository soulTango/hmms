$(function(){
	$.ajaxSetup({
		complete:function(res){
			if (res.responseJSON.state == "2") {
				parent.window.location.href ="/ywxtdj/login.html";
			}
		}
	})

    $(document).click(function (event) {
    	if(event.toElement.className.search("layui-table-cell") != -1){
			return false;
		}else {
            $(".layui-layer.layui-layer-tips.layui-table-tips").hide();
		}
    });
})