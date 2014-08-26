$(function(){
	//index中已有的
	//一定要放在window.load中，不然高度不精确
	$(window).load(function () {
		var sidebar=$("div.sidebar");
		//28px为sidebar的padding-bottom
		var height=$(".main-content").height()-28;
		var self_height=sidebar.height();
		var body_height=$("body").height();
		$("div.sidebar").height(Math.max(body_height,Math.max(height,self_height)));
	});
	// $('.dropdown-toggle').dropdown();
	// $(".tooltip_qa_status").popover({'placement':'bottom','trigger':'hover','html':true,'title':'状态','content':'力美DSP：审核通过<br/>Google AdX：拒绝<br/>InMobi：可投放<br/>芒果：待审'});
	// $(".tooltip_qa_adgroup").popover({'placement':'bottom','trigger':'hover','html':true,'title':'创意详情','content':'所属公司：北京李美广告有限公司<br/>广告系列：万科上海<br/>广告组：万科尚源优酷视频'});
// 	
	
	// $('.select-box .dropdown-menu li').click(function(e){
		// e.preventDefault();
		// var value=$('a',this).text();
		// var input_box=$(this).parents('.dropdown-menu').siblings();
		// var html=value+"<span class='caret'></span>";
		// input_box.empty();
		// input_box.prepend(html);
	// })
//Accordition
	$(".accordion .title").click(function(){
		var nav_item=$(this).next(".nav-item");
		if(nav_item.css("display")=='none'){
			$(this).next(".nav-item").show();
			$(this).addClass('open');
		}else{
			$(this).next(".nav-item").hide();
			$(this).removeClass('open');
		}
	})
	$(".nav-item li").click(function(){
		$(".accordion .nav-item li").removeClass("selected");
		$(this).addClass('selected');
	})
	//时间控件
	$('#month-picker').datepicker({
		format: 'yyyy-m'
	}); 
	$('#date-picker').datepicker({
		format: 'yyyy-mm-dd'
	}); 
	//确认对话框
	$(".reject-btn").click(function(){
		$(".confirm-modal").modal("show"); 
	})
	
	$(".check-btn").click(function(){
		$(".check-modal").modal("show"); 
	})
	$(".filter-btn").click(function(){
		$(".filter-modal").modal("show"); 
	})
	$(".copy-btn").click(function(){
		$(".copy-modal").modal("show"); 
	})
	
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

});