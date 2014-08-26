$(function(){
	//一定要放在window.load中，不然高度不精确
	$(window).load(function () {
		var sidebar=$("div.sidebar");
		//28px为sidebar的padding-bottom
		var height=$(".main-content").height()-28;
		var self_height=sidebar.height();
		var body_height=$("body").height();
		$("div.sidebar").height(Math.max(body_height,Math.max(height,self_height)));
	});
	
	//nav
	$("ul.top-nav li a").click(function(){
		var obj=$(this);
		var others=$("ul.top-nav li a.selected");
		if(obj.text()!=others.text()){
			obj.addClass("selected");
			others.removeClass("selected");
		}
	})
	$(".user-name a").dropdown();
	//sidebar
	$(".close-btn").click(function(){
		$(".sidebar").css("left","-310px");
		$(".mask").hide();
		// $(".sidebar-opener").show();
		// $(".main-content").addClass("expanded");
	})
	$(".sidebar-opener").click(function(){
		//$(".sidebar").show();
		$(".sidebar").css("left","0px");
		$(".mask").show();
		// $(".sidebar-opener").hide();
		// $(".main-content").removeClass("expanded");
	})
	//tab switch
    $('#diagram-tab a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	})
	//report sidebar 
	$('.sidebar.report ul li').click(function(){
		var obj=$(this);
		var top=obj.offset().top-24;
		console.log(top)
		var others=obj.siblings().filter('.selected');
		var arrow=$('.sidebar-arrow');
		console.log(others);
		if(!obj.hasClass('selected')){
			obj.addClass("selected");
			others.removeClass("selected");
			arrow.css('top',top);
		}
	})
	
	$(".btn").click(function(){
		$("#mymodal").modal("show"); 
	})
	//----------------------------------------创建报表页面-----------------------------------------------
	//报表类型切换
	  $('.type input').click(function(){
	  	//标准
	  	var standard_control={'show':['choice-range'],'hide':['compare-range','compare-date']};
	  	//同级
	  	var period_compare_control={'show':['compare-range'],'hide':['choice-range','compare-date']}
	  	//时间
	  	var same_level_compare_control={'show':['choice-range','compare-date'],'hide':['compare-range']}
	  	function show_and_hide(typeName){
	  		var hideElement=typeName.hide;
	  		var showElement=typeName.show;
	  		$.each(hideElement,function(index,element){
	  			$('.'+element).hide();
	  		})
	  		$.each(showElement,function(index,element){
	  			$('.'+element).show();
	  		})
	  	}
	  	if(this.id=='standard'){
	  		show_and_hide(standard_control);
	  	}else if(this.id=='period-compare'){
	  		show_and_hide(same_level_compare_control);
	  	}else if(this.id=='same-level-compare'){
	  		show_and_hide(period_compare_control);
	  	}
	  })
	//select-box
	$('.dropdown-toggle').dropdown();
	// $('.select-box input').click(function(){
		// $(this).siblings().children(".dropdown-menu").show()
// 		
	// })
	$('.select-box .dropdown-menu li').click(function(e){
		e.preventDefault();
		var value=$('a',this).text();
		var input_box=$(this).parents('.dropdown-menu').siblings();
		var html=value+"<span class='caret'></span>";
		input_box.empty();
		input_box.prepend(html);
	})
	$(".table.table-striped tr:nth-child(odd)").addClass('odd');
	$(".table.table-striped tr:nth-child(even)").addClass('even');
	//打开自定义窗口
	$('#customrize-item').click(function(){
		$('#customrize-modal').modal("show"); 
	})
	//打开创意比较窗口
	$('#creative-item').click(function(){
		$('#creative-modal').modal("show"); 
	})
	$('#audience_targeting_setting').click(function(){
		$('#audience_targeting_modal').modal("show"); 
	})
	/*****************************************商圈定向**********************************/
	$('#business_circle_setting').click(function(){
		mapInit();
		$('#business_area_modal').modal("show"); 
		//initMap();
		
	})
	//------------勾选后添加定点
	$(".hot_circle").change(function() {
    	var data={'lng':'121.45412','lat':'31.26954','name':'虹口龙之梦'}
    	if($(this).is(':checked')==true){
    		//选中的话添加点
    		addMarker(data);
    		var center=new AMap.LngLat(121.94,31.18);
			mapObj.setCenter(center);
			//mapObj.setZoom(8);
    	}else{
    		removeMarker(data);
    		//已选框的内容去掉
    		$(".selected-circles ul li").remove();
    	}
	});
	
	/*end of 商圈定向*/
	$('#os_setting').click(function(){
		$('#os_modal').modal("show"); 
	})
	$('#time-period-setting').click(function(){
		$('#time-period-modal').modal("show"); 
	})
	$('#history-creative-setting').click(function(){
		$('#history-creative-modal').modal("show"); 
	})
	
	$(".dashboard table td.name").hover(function(){
		var edit_btn=$("a.edit-btn",this);
		var vis=edit_btn.css("visibility");
		if(vis=="hidden"){
			edit_btn.css("visibility","visible");
		}else{
			edit_btn.css("visibility","hidden");
		}
	})
	//QA
	$(".tooltip_qa").popover({'placement':'right','trigger':'hover','html':true,'title':'aaaaaa','content':'说明文档'});
	$(".tooltip_qa_status").popover({'placement':'right','trigger':'hover','html':true,'title':'aaaaaa','content':'说明文档'});
	$("#username").popover({'placement':'right','trigger':'hover','html':true,'content':'曾小贱'});
	$(".share-link").popover({'placement':'left','trigger':'click','html':true,'content':'<p>您可将当前报表进行分享</p><input type="text" value="http://j.map.baidu.com/......." style="width:200px"/><div class="clearfix"><button type="button" class="btn btn-default right">复制</button></div>'});
	
	$(".icon-hd.size-300-250").popover({'placement':'right','trigger':'hover','html':true,'content':'高清尺寸 600X500<br/>文件大小 150KB'});
	$(".icon-hd.size-320-50").popover({'placement':'right','trigger':'hover','html':true,'content':'高清尺寸 640X100<br/>文件大小 40KB'});
	$(".icon-hd.size-468-60").popover({'placement':'right','trigger':'hover','html':true,'content':'高清尺寸 736X120<br/>文件大小 150KB'});
	$(".icon-hd.size-728-90").popover({'placement':'right','trigger':'hover','html':true,'content':'高清尺寸 1456X180<br/>文件大小 150KB'});
	$(".icon-hd.size-320-48").popover({'placement':'right','trigger':'hover','html':true,'content':'高清尺寸 640X96<br/>文件大小 80KB'});
	$(".icon-hd.size-320-480").popover({'placement':'right','trigger':'hover','html':true,'content':'高清尺寸 640X960<br/>文件大小 200KB'});
	//时间控件
	// $('.reportrange').each(function(index,element){
		// var control=$(this);
		// control.daterangepicker({
		    // startDate: moment().subtract('days', 29),
		    // endDate: moment(),
		    // showDropdowns: true,
		    // ranges: {
		       // '今天': [moment(), moment()],
		       // '昨天': [moment().subtract('days', 1), moment().subtract('days', 1)],
		       // '最近7天': [moment().subtract('days', 6), moment()],
		       // '最近30天': [moment().subtract('days', 29), moment()],
		       // '本月': [moment().startOf('month'), moment().endOf('month')],
		       // '上月': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')],
		       // '最近一年': [moment().subtract('year', 1), moment()],
		    // },
		    // opens: 'left',
		    // buttonClasses: ['btn btn-default'],
		    // applyClass: 'btn-small btn-primary',
		    // cancelClass: 'btn-small btn-cancel',
		    // format: 'MM/DD/YYYY',
		    // separator: ' to ',
		    // locale: {
		        // applyLabel: '提交',
		        // cancelLabel:'取消',
		        // daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr','Sa'],
		        // monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
		        // firstDay: 1
		    // }
		 // },
		 	// function(start, end) {
		  		// $('span',control).html(start.format('YYYY/MM/D') + ' 至  ' + end.format('YYYY/MM/D'));
		     // }
		// );
		// //Set the initial state of the picker label
	  	// $('span',control).html(moment().subtract('days', 29).format('YYYY/MM/D') + ' 至  ' + moment().format('YYYY/MM/D'));
	// })
	//第二种时间范围控件
	$('.reportrange2').each(function(index,element){
		var control=$(this);
		control.daterangepicker({
		    startDate: moment().subtract('days', 3),//这里换成从数据库读出的创建时间
		    endDate: moment(),
		    showDropdowns: true,
		    ranges: {
		       '今天': [moment(), moment()],
		       '昨天': [moment().subtract('days', 1), moment().subtract('days', 1)],
		       '最近7天': [moment().subtract('days', 6), moment()],
		       '最近30天': [moment().subtract('days', 29), moment()],
		       '本月': [moment().startOf('month'), moment().endOf('month')],
		       '上月': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')],
		       '所有时间': [moment().subtract('year', 1)/*这里换成从数据库读出的创建时间*/, moment()]
		    },
		    opens: 'left',
		    buttonClasses: ['btn btn-default'],
		    applyClass: 'btn-small btn-primary',
		    cancelClass: 'btn-small btn-cancel',
		    format: 'MM/DD/YYYY',
		    separator: ' to ',
		    locale: {
		        applyLabel: '提交',
		        cancelLabel:'取消',
		        daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr','Sa'],
		        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
		        firstDay: 1
		    }
		 },
		 	function(start, end) {
		 		var text=$(".ranges ul li.active").text().substring(5);
		 		if(text==""){
		 			text="自定义";
		 		}
		 		
		  		$('span.word',control).html(text+':     '+start.format('YYYY/MM/D') + ' 至  ' + end.format('YYYY/MM/D'));
		     }
		);
		//Set the initial state of the picker label
	  	$('span.word',control).html("今天: "+moment().format('YYYY/MM/D') + ' 至  ' + moment().format('YYYY/MM/D'));
	})
	
	//开始结束日期选择控件
	 var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
	//开始日期控件
	// var checkin = $('.start-date-picker').datepicker({
		// onRender: function(date) {
			// return date.valueOf() < now.valueOf() ? 'disabled' : '';
		// }
	// }).on('changeDate', function(ev) {
		// //当选择的日期大于结束日期时，改变结束日期的值，使结束日期等于开始日期
		// if (ev.date.valueOf() > checkout.date.valueOf()) {
			// var newDate = new Date(ev.date)
			// //newDate.setDate(newDate.getDate());
			// checkout.setValue(newDate);
		// }else if(ev.date.valueOf() < checkout.date.valueOf()){
			// console.log(checkout.picker)
			// checkout.update();								
		// }
		// checkin.hide();
		// $('.end-date-picker')[0].focus();
	// }).data('datepicker');
// 	
	// //结束日期控件
	// var checkout = $('.end-date-picker').datepicker({
		// onRender: function(date) {
			// return date.valueOf() < checkin.date.valueOf() ? 'disabled' : '';
		// }
	// }).on('changeDate', function(ev) {
		// checkout.hide();
	// }).data('datepicker');  
// 	
	/*****************************************人口定向拖拽 start**************************/
	// var modal_body=$("#audience_targeting_modal .modal-body");
	// $("#audience_targeting_modal .item-list li a").draggable({ 'helper':"clone"});
	// var outter=$("#audience_targeting_modal .right-part>ul");
	// outter.droppable({
			// drop: function( event, ui ) {
				// var text=$("#audience_targeting_modal ul.nav-tabs li.active a").text()+"/"+ui.draggable.parent().parent().prev().text()+"/"+ui.draggable.text();
				// //解决第一次加也有“并且符合以下条件”
				// if($(this).children('li.condition').length==0){
					// var add_content=$('<li class="condition clearfix ui-droppable"><ul><li>'+text+'<button  class="close" type="button">×</button></li></ul><div>或</div></li>');
				// }else{
					// var add_content=$('<li>并且符合以下条件</li><li class="condition clearfix ui-droppable"><ul><li>'+text+'<button  class="close" type="button">×</button></li></ul><div>或</div></li>');
				// }
				// if(!$(this).children('li.condition').hasClass("over")){
					// $(this).append(add_content);
				// }
				// //给新的加上droppable功能
				// $("li.condition:last-child",this).droppable({
					// drop: function( event, ui ) {
						// event.stopPropagation();
						// var text=$("#audience_targeting_modal ul.nav-tabs li.active a").text()+"/"+ui.draggable.parent().parent().prev().text()+"/"+ui.draggable.text();
						// var add_content=$('<li>'+text+'<button  class="close" type="button">×</button></li>');
						// $("ul",this).append(add_content);
					// },
					// activate:function(event,ui){
						// $( this ).addClass("activate");
					// },
					// over:function(event,ui){
						// $( this ).removeClass("activate");
						// $( this ).addClass("over");
						// outter.removeClass("over");
						// outter.addClass("activate");
					// },
					// out:function(event,ui){
						// $( this ).addClass("activate");
						// $( this ).removeClass("over");
						// outter.addClass("over");
						// outter.removeClass("activate");
					// },
					// deactivate:function(event,ui){
						// //这里也影响outter的deactivate事件，所以deactivate事件里的remove就不用写了
						// $( this ).removeClass("activate");
						// $( this ).removeClass("over");
						// outter.removeClass("activate");
						// outter.removeClass("over");
					// }
			// });
			// },
			// activate:function(event,ui){
				// $( this ).addClass("activate");
			// },
			// over:function(event,ui){
				// $( this ).removeClass("activate");
				// $( this ).addClass("over");
			// },
			// out:function(event,ui){
				// $( this ).addClass("activate");
				// $( this ).removeClass("over");
			// },
			// deactivate:function(event,ui){
				// //第一次没有li.condition时需要自己清除
				// $( this ).removeClass("activate");
				// $( this ).removeClass("over");
			// }
	// });
	// $("li.condition",outter).droppable({
			// drop: function( event, ui ) {
				// event.stopPropagation();
				// var text=$("#audience_targeting_modal ul.nav-tabs li.active a").text()+"/"+ui.draggable.parent().parent().prev().text()+"/"+ui.draggable.text();
				// var add_content=$('<li>'+text+'<button  class="close" type="button">×</button></li>');
				// $("ul",this).append(add_content);
			// },
			// activate:function(event,ui){
				// $( this ).addClass("activate");
			// },
			// over:function(event,ui){
				// $( this ).removeClass("activate");
				// $( this ).addClass("over");
				// outter.removeClass("over");
				// outter.addClass("activate");
			// },
			// out:function(event,ui){
				// $( this ).addClass("activate");
				// $( this ).removeClass("over");
				// outter.addClass("over");
				// outter.removeClass("activate");
			// },
			// deactivate:function(event,ui){
				// //这里也影响outter的deactivate事件，所以deactivate事件里的remove就不用写了
				// $( this ).removeClass("activate");
				// $( this ).removeClass("over");
				// outter.removeClass("activate");
				// outter.removeClass("over");
			// }
	// });
	// $( "#audience_targeting_modal" ).delegate( ".condition .close", "click", function() {
		// //一整块条件被移除
		// if($(this).parent().siblings().length==0){
			// var parent=$(this).parents('.condition');
			// //移除附带的“并且。。。。。”那段文字
			// parent.prev().remove();
			// //移除那一整块
			// parent.remove();
			// //当条件移除只剩下一个时，且第一个条件已被移除，将“并且。。。。。”那段文字移掉
			// var rest_li=$('ul.ui-droppable>li:first-child');
			// if(rest_li.text()=="并且符合以下条件"){
				// rest_li.remove();
			// }
		// }else{
			// //条件内部被移除
			// $(this).parent().remove();
		// }
	// });
	
	/********************************************end of 人口定向拖拽********************************/
	
	//radio插件
	$(".radio-box li i").click(function(){
		$(this).parent().siblings(".pointer").children().css("left",Math.floor($(this).position().left));
	})
	
	$(".paste-btn").click(function(){
		$(".paste-modal").modal("show"); 
	})
	$(".filter-btn").click(function(){
		$(".filter-modal").modal("show"); 
	})
	$(".filter-creative-btn").click(function(){
		$(".filter-modal-creative").modal("show"); 
	})
	$("#change-pwd-btn").click(function(){
		$(".change-pwd-modal").modal("show"); 
	})
	$(".delete-btn").click(function(){
		$(".confirm-modal").modal("show"); 
	})
 
 
	 //共享库
	 $('.share_library .type input').click(function(){
	  	//标准
	  	var idfa_control={'show':['upload_file','idfa_msg'],'hide':['selecte_project','mac_msg','redirect_msg']};
	  	//同级
	  	var mac_control={'show':['upload_file','mac_msg'],'hide':['selecte_project','idfa_msg','redirect_msg']}
	  	//时间
	  	var redirect_control={'show':['selecte_project','redirect_msg'],'hide':['upload_file','idfa_msg','mac_msg']}
	  	function show_and_hide(typeName){
	  		var hideElement=typeName.hide;
	  		var showElement=typeName.show;
	  		$.each(hideElement,function(index,element){
	  			$('.'+element).hide();
	  		})
	  		$.each(showElement,function(index,element){
	  			$('.'+element).show();
	  		})
	  	}
	  	if(this.id=='type_idfa'){
	  		show_and_hide(idfa_control);
	  	}else if(this.id=='type_mac'){
	  		show_and_hide(mac_control);
	  	}else if(this.id=='type_redirect'){
	  		show_and_hide(redirect_control);
	  	}
	  })
	  
	   $('.share_library.create .type input').click(function(){
	  	//标准
	  	var input_control={'show':['input_type'],'hide':['file_type','select_type']};
	  	//同级
	  	var file_control={'show':['file_type'],'hide':['input_type','select_type']}
	  	//时间
	  	var select_control={'show':['select_type'],'hide':['input_type','file_type']}
	  	function show_and_hide(typeName){
	  		var hideElement=typeName.hide;
	  		var showElement=typeName.show;
	  		$.each(hideElement,function(index,element){
	  			$('.'+element).hide();
	  		})
	  		$.each(showElement,function(index,element){
	  			$('.'+element).show();
	  		})
	  	}
	  	if(this.id=='type_input'){
	  		show_and_hide(input_control);
	  	}else if(this.id=='type_file'){
	  		show_and_hide(file_control);
	  	}else if(this.id=='type_select'){
	  		show_and_hide(select_control);
	  	}
	  })
	  
	 //共享库
	 $('.upload-creative .type input').click(function(){
	 	console.log("sss")
	  	//图片
	  	var picture_control={'show':['picture-type'],'hide':['mraid-type','video-type']};
	  	//mraid
	  	var mraid_control={'show':['mraid-type'],'hide':['picture-type',,'video-type']}
	  	//视频
	  	var video_control={'show':['video-type'],'hide':['picture-type','mraid-type']}
	  	function show_and_hide(typeName){
	  		var hideElement=typeName.hide;
	  		var showElement=typeName.show;
	  		$.each(hideElement,function(index,element){
	  			$('.'+element).hide();
	  		})
	  		$.each(showElement,function(index,element){
	  			$('.'+element).show();
	  		})
	  	}
	  	if(this.id=='type_picture'){
	  		show_and_hide(picture_control);
	  	}else if(this.id=='type_mraid'){
	  		show_and_hide(mraid_control);
	  	}else if(this.id=='type_video'){
	  		show_and_hide(video_control);
	  	}
	  })	  
	  
	  // $('.fancybox').fancybox({
	  	// 'autoWidth':true,
	  	// 'autoWidth':true,
	  	// 'autoResize':true
	  // });
	  
	  $(".flow-limit .checkbox.first-level input[type=checkbox]").change(function(){
	  	var children=$(this).parent().next().children().children();
	  	if($(this).is(':checked')==true){
	  		children.attr("disabled",false); 
	  		if($(this).hasClass("idfa")){
	  			children.prop("checked",true); 
	  		}else{
	  			children.filter(".no").prop("checked",true); 
	  		}
	  	}else{
	  		children.attr("disabled",true); 
 	  }
 	  });
	 $(".flow-limit  .second-level input[type=checkbox]").change(function(){
	 	var checkbox=$(".flow-limit  .second-level input[type=checkbox]");
	 	var flag=false;
	 	checkbox.each(function(index,element){
	 		if($(element).is(':checked')==true){
	 			flag=true;
	 		}
	 	})
	 	if(flag==false){
	 		$("input.idfa").prop("checked",false); 
	 	}
	 	if(flag==true){
	 		$("input.idfa").prop("checked",true); 
	 	}
	 })
});