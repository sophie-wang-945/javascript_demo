/**
 * @author Administrator
 */
$(function(){
	$("a").click(function(e){
		e.preventDefault();
	})
	$("a.attention,ul.filter-bar>li a").click(function(e){
		e.preventDefault();
		if(!$(this).hasClass("click") && $(this).next().length==0){
			$(this).addClass("click");
		}else{
			$(this).removeClass("click");
		}
	})
	$("ul.category-1-bar li").click(function(e){
		var link=$(this).children("a");
		if(!link.hasClass("click")){
			link.addClass("click");
			$(this).siblings().each(function(){
				var other_link=$(this).children("a");
				if(other_link.hasClass("click")){
					other_link.removeClass("click");
				}
			});
		}
	})
	$("ul.filter-bar>li").hover(function(e){
		$(this).find("ul").show();
	},function(e){
		$(this).find("ul").hide();
	})
	$("ul.filter-bar>li").click(function(e){
		if($(this).find("ul").css("display")=='none'){
			$(this).find("ul").show();
		}else{
			$(this).find("ul").hide();
		}
	})
	$("th.th-zhuzefang").hover(function(e){
		var left=$(this).position().left;
		
		$("ul.table-th-menu-zhuzefang").show();
		$("ul.table-th-menu-zhuzefang").css({
			'left':left
		})
	},function(e){
		$("ul.table-th-menu-zhuzefang").hide();
	})
	//日历控件
	$(".datepicker").datepicker({
	    inline: true,
	    dateFormat: "yy-mm-dd"
	});
	$("#add-sign").click(function(e){
		$("table.table-style-1 tr.detail_tr div.detail_tr_outer_right li.add-tr").show();
		$(".edit-tr").css("left","-500px");
	})
	//主则方
	$(".table-th-menu-zhuzefang li").click(function(){
		if(!$(this).hasClass("click")){
			$(this).addClass("click");
		}
		else{
			$(this).removeClass("click");
		}
	})
	$("#select-all").click(function(){
		var select_all=false;
		$(".table-th-menu-zhuzefang li:not(.btn-list)").each(function(){
			if(!$(this).hasClass("click")){
				select_all=true;
			}
		})
		if(select_all){
			$(".table-th-menu-zhuzefang li").addClass("click");
			select_all=false;
		}		
		else{
			$(".table-th-menu-zhuzefang li").removeClass("click");
		}
	})
	//定位修改行
	$("table.table-style-1 tr.detail_tr div.detail_tr_outer_right .sign-table>li:not(.no-edit)").click(function(){
		var left=$(this).position().left;
		var top=$(this).position().top;
		$("table.table-style-1 tr.detail_tr div.detail_tr_outer_right div.edit-tr").css("left",left);
		$("table.table-style-1 tr.detail_tr div.detail_tr_outer_right div.edit-tr").css("top",top+4);
	})
	//点击一行打开或收起
	$("table.table-style-1>tbody>tr").click(function(){
		if($(this).next(".detail_tr").css("display")=="none"){
			$(".detail_tr").hide();
			$("table.table-style-1>tbody>tr").removeClass("selected");
			$(this).next(".detail_tr").show("slow");
			$(this).addClass("selected");
		}else{
			$(this).next(".detail_tr").hide("slow");
			$(this).removeClass("selected");
		}
	})
	//收起按钮
	$("div.status_section a.close-tr").click(function(){
		$(this).parents(".detail_tr").hide("slow");
	})
	$("a.close-edit-tr").click(function(){
		$(this).parents(".edit-tr").css("left","-500px");
	})
	$("a.close-add-tr").click(function(){
		$(this).parents(".add-tr").hide();
	})
	$("a.leave-message-btn").click(function(){
		console.log($(this).prev("textarea").val());
	})
});
