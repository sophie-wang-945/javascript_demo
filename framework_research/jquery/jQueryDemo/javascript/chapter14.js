/**
 * @author Sophie
 */
//�����������
//1.����ʹ��Ĭ�ϵģ���������������
//2.ʹ��������������Ĭ�ϵ�
//3.����ܶ������Ҫʹ�������Ϊ�˱����ظ�д���Խ��������ȡ�������磺
$('#msg').dialog({
	height: 300,
	width: 400,
	draggable: false,
	modal: true,
	buttons: {
		'OK': function(event, ui) {
			$(this).dialog('close');
		}
	}
	//...
});
/************************************************************************************/
//��β��ܱ��һ��򵥵�$('#msg').dialog();
//����һ����д�����default
$.extend($.ui.dialog.defaults, {
	height: 300,
	width: 400,
	draggable: false,
	modal: true,
	buttons: {
		'OK': function(event, ui) {
			$(this).dialog('close');
		}
	}
});
//...
$('#msg').dialog();
//...
$('#note').dialog();
//���֮���init����������д�Ĳ�һ������Ȼ�������Զ����������������,override֮ǰ�Ķ�����Ȼ��pluginĬ�ϵ����������ʹ����д���������

//��������������������һ������initʱ����ȥ
var options = {
	height: 300,
	width: 400,
	draggable: false,
	modal: true,
	buttons: {
		'OK': function(event, ui) {
			$(this).dialog('close');
		}
	}
};
$('#msg').dialog(options);
/*******************************************************************************************/
//��ȡ�������ֵ
var active = $('#myDiv').accordion('option', 'active');
//�����������ֵ
$('#myDiv').accordion('option', 'active', 3);
/********************************************************************************************/
//�¼�
// Declaring an event callback option on init
$('#shopping-cart').droppable({
	drop: function(event, ui) {
		addProduct(ui.draggable);
	}
});
// Declaring an event callback after init using the option method
$('#shopping-cart').droppable();
//...
$('#shopping-cart').droppable('option', 'drop', function(event, ui) {
	addProduct(ui.draggable);
});
//Solution 2: Bind to the Custom Event Using the Event Type
//Use the jQuery .bind() method, and bind to the type of the event:
$('#shopping-cart').bind('drop', function(event, ui) {
	addProduct(ui.draggable);
});
//If you want to both destroy and remove a plugin element, you can simply call .remove().