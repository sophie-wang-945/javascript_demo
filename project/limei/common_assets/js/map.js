//map
// function initMap() {
    // maplet = new Maplet("mapbar");
    // maplet.centerAndZoom(new MPoint(121.4753,31.22541), 8);
    // maplet.addControl(new MStandardControl());  
    // maplet.showOverview(false);
    // //新建menu并绑定click事件
    // var menu = new MContextMenu();
    // var set_point_menu_item=new MContextMenuItem("设置为定向中心",function(){
	    	// maplet.setMode("bookmark");  
    // });
    // menu.addItem(set_point_menu_item);
    // maplet.setContextMenu(menu);
    // MEvent.addListener(maplet, "click", function() { 
	    // maplet.getContextMenu();
	// }); 
	// //为标记事件添加处理函数
	// MEvent.addListener(maplet,"bookmark",bookmark_done);  
    // }
	// function bookmark_done(data) {  
	    // data.point.name='';
		// addMarker(data);
		// maplet.setMode("pan");  
	// }  
  // //画圈
// function addMEllipse(){  
    // if(ellipse!=null){  
        // maplet.hideBubble();  
        // maplet.removeOverlay(ellipse);  
    // }  
    // var circle_radius=radius*1000;
    // circle_radius = parseInt(circle_radius);  
    // if(isNaN(circle_radius)){  
        // alert("半径数值不正确。");  
        // return;  
    // }  
  	// console.log("circle_radius="+circle_radius)
    // var ctr = marker.pt;  
    // var brush = new MBrush();  
    // brush.color = "#B7D3E9";  
    // brush.bgcolor = "grey";  
    // brush.fill = true;  
    // brush.transparency = 80;  
    // brush.bgtransparency = 30;  
    // ellipse = new MEllipse(ctr, circle_radius, circle_radius, brush, new MInfoWindow("Ellipse","test"));  
    // maplet.addOverlay(ellipse);  
// } 
// 
// //添加标记
// function addMarker(data) {
    // if (marker != null)return;
    // if(data==null){
    	// data.point.lon=121.4753;
    	// data.point.lat=31.22541;
    // }
    // marker = new MMarker(
	    // new MPoint(data.point.lon,data.point.lat),
	    // new MIcon("common_assets/img/mark.png", 20, 36),
	    // null,
	   // null
    // );
    // maplet.addOverlay(marker);
    // marker.setEditable(true);
    // addMEllipse();
    // //添加已选标注框的内容
    // if(data.point.name!=''){
    	// data.point.name=data.point.name+"/";
    // }
    // var li="<li>"+data.point.name+"北纬N"+data.point.lat+" 东经E"+data.point.lon+"<button type='button' class='close'>×</button></li>";
    // $(".selected-circles ul").append(li);
    // //点删除按钮删除标记
    // $(".selected-circles ul button.close").click(function(){
    	// removeMarker();
    	// $(this).parent("li").remove();
    	// //checkbox勾选的状态去掉
    	// console.log($(".hot_circle_list input[type=checkbox].last").attr("checked"))
    	// $(".hot_circle_list input[type=checkbox].last").attr("checked",false);
    // })
// }
// 
// function addMenuItems() {
    // var menu = marker.contextmenu;
    // menu.addItem(new MContextMenuItem("设置为定向中心"));
// }
// function removeMarker() {
    // maplet.removeOverlay(marker);
    // maplet.removeOverlay(ellipse);
    // ellipse=null;
    // marker = null;
// }

var mapObj,toolBar,contextMenu,circle,marker,radius=1;  

//slider
var circle_slider=$('#circle-slider').slider({
	formater: function(value) {
		return value+'km';
	}
}).on('slide', function(slideEvt) {
	radius=slideEvt.value;
}).slider('setValue', 1);
$('.slider').css('width','676px');


//初始化地图对象，加载地图  
function mapInit(){  
	//初始化地图
    mapObj = new AMap.Map("iCenter",{  
        center:new AMap.LngLat(121.902644,31.131706), //地图中心点  
        level:11  //地图显示的缩放级别  
    });   
    mapObj.plugin(["AMap.ToolBar"],function(){        
        toolBar = new AMap.ToolBar();  
        mapObj.addControl(toolBar);       
    }); 
    //创建右键菜单  
    contextMenu = new AMap.ContextMenu(); 
    //右键添加Marker标记  
    contextMenu.addItem("设置为定向中心",function(e){  
        marker = new AMap.Marker({  
	        map:mapObj,  
	        position:contextMenuPositon, //基点位置  
	        icon:"http://webapi.amap.com/images/marker_sprite.png", //marker图标，直接传递地址url  
	        offset:{x:-8,y:-34} //相对于基点的位置  
        });  
        addCircle(contextMenuPositon);
        var li="<li>"+"北纬N"+contextMenuPositon.lat+" 东经E"+contextMenuPositon.lng+"<button type='button' class='close'>×</button></li>";
	    $(".selected-circles ul").append(li);
	    //点删除按钮删除标记
	    $(".selected-circles ul button.close").click(function(){
	    	removeMarker();
	    	$(this).parent("li").remove();
	    	//checkbox勾选的状态去掉
	    	console.log($(".hot_circle_list input[type=checkbox].last").attr("checked"))
	    	$(".hot_circle_list input[type=checkbox].last").attr("checked",false);
	    })
    },3);  
     AMap.event.addListener(mapObj,'rightclick',function(e){  
        contextMenu.open(mapObj,e.lnglat);  
        contextMenuPositon = e.lnglat;  
    });  
}  
	    
//添加圆覆盖物  
function addCircle(contextMenuPositon) {
	 var circle_radius=radius*1000;
    circle_radius = parseInt(circle_radius);  
    if(isNaN(circle_radius)){  
        alert("半径数值不正确。");  
        return;  
    }  
  	console.log("circle_radius="+circle_radius)  
  	if(circle!=null){
  		circle.setMap(mapObj);  
  	}else{
  		circle = new AMap.Circle({  
  		   map:mapObj,   
		   center:new AMap.LngLat(contextMenuPositon.lng,contextMenuPositon.lat),// 圆心位置  
		   radius:circle_radius, //半径  
		   strokeColor: "#F33", //线颜色  
		   strokeOpacity: 1, //线透明度  
		   strokeWeight: 3, //线粗细度  
		   fillColor: "#ee2200", //填充颜色  
		   fillOpacity: 0.35//填充透明度  
	   });   
  	}
}  

function removeMarker() {
	if(circle!=null){
		circle.setMap(null);
	}
    if(marker!=null){
    	marker.setMap(null);
    }
}
		
//添加标记
function addMarker(data) {
    if (marker != null){
    	marker.setMap(mapObj);
    }else{
    	marker = new AMap.Marker({  
	        map:mapObj,  
	        position:new AMap.LngLat(data.lng,data.lat)  , //基点位置  
	        icon:"http://webapi.amap.com/images/marker_sprite.png", //marker图标，直接传递地址url  
	        offset:{x:-8,y:-34} //相对于基点的位置  
	    }); 
    }
    if(data==null){
    	data.lng=121.4753;
    	data.lat=31.22541;
    }
    addCircle(data);
    //添加已选标注框的内容
    if(data.name!=''){
    	data.name=data.name+"/";
    }
    var li="<li>"+data.name+"北纬N"+data.lat+" 东经E"+data.lng+"<button type='button' class='close'>×</button></li>";
    $(".selected-circles ul").append(li);
    //点删除按钮删除标记
    $(".selected-circles ul button.close").click(function(){
    	removeMarker();
    	$(this).parent("li").remove();
    	//checkbox勾选的状态去掉
    	console.log($(".hot_circle_list input[type=checkbox].last").attr("checked"))
    	$(".hot_circle_list input[type=checkbox].last").attr("checked",false);
    })
}

