/**
 * @author Sophie
 */
//�������¼���ͬһ������,��д��,bind
//��ʽһ:
function handler(e){
alert('event');
}
jQuery('div').click(handler)
.keydown(handler);
//��ʽ��:
jQuery('div').bind('click keydown', function(e){
alert('event');
});
//You can also apply this behavior to unbind() and one()
/*************************************************************************/
//����¼������ݲ�ͬ,bind
//Here��s an example:
jQuery('#button1').click(function(e){
	jQuery('div.panel').hide();
	jQuery('#panel1').show();
	jQuery('#desc').text('You clicked the red button');
});
jQuery('#button2').click(function(e){
	jQuery('div.panel').hide();
	jQuery('#panel2').show();
	jQuery('#desc').text('You clicked the blue button');
});
jQuery('#button3').click(function(e){
	jQuery('div.panel').hide();
	jQuery('#panel3').show();
	jQuery('#desc').text('You clicked the green button');
});
//���ǲ���Ϊ�����ݲ�ͬ��д���η��������ݣ�ʹ��bind�ĵڶ����������������ݣ�
//Note that this value can be anything...an array, a string, a number, or an object literal.
/*event.data is used to provide precomputed values to a function, which means the values
you will be passing to bind() need to be already available at binding time. To handle
more ��dynamic�� values, there��s another way that we��ll learn about in Recipe 8.5.
The solution to the previous problem could look something like this:*/
function buttonClicked(e){
	jQuery('div.panel').hide();
	jQuery('#panel'+e.data.panel).show();
	jQuery('#desc').text('You clicked the '+e.data.color+' button');
}
jQuery('#button1').bind('click',{panel:1, color:'red'}, buttonClicked);
jQuery('#button2').bind('click',{panel:2, color:'blue'}, buttonClicked);
jQuery('#button3').bind('click',{panel:3, color:'green'}, buttonClicked);

/*Of course, you could make this even shorter by using a loop. This approach is called a
macro by some coders, and it��s a very common approach for jQuery code.
These macros will surely reduce the code length and can sometimes improve code
readability. Some other times, they��ll just make your code completely unreadable, so
use them with caution.
Here��s how you could do it:*/
jQuery.each(['red','blue','green'], function(num, color){
	num++; // it's 0-index based
	jQuery('#button'+num).bind('click',function(e){
	jQuery('div.panel').hide();
	jQuery('#panel'+num).show();
	jQuery('#desc').text('You clicked the '+color+' button');
});
})
/*As you can see, I haven��t used the data argument because we don��t really need it. The
code is now somewhat shorter, but not that much, and it��s not more readable.
The conclusion is that both approaches can be used on this kind of situation. Depending
on the problem, one could be better (shorter, more readable, easier to maintain)
than the other.*/
/*************************************************************************/
//�Ƴ�һ�����¼�,bind
/*Use a unique namespace for each plugin you make. Any handler bound within this
plugin must be added with this namespace.
Later, when cleaning up, you just need to ��unbind the whole namespace,�� and all the
related event handlers will go away with one single line of code.
How to bind with a namespace?
To add a namespace to an event type, you simply add a . followed by the namespace
name.
Since jQuery 1.3, you can add more than one (namespace) per event.
This is how you would bind the click and mousedown functions with a namespace:*/
jQuery.fn.myPlugin = function(){
	return this
			.bind('click.myPlugin', function(){
// [code]
})
.bind('mousedown.myPlugin', function(){
// [code]
});
};
/*How to clean up my plugin?
To dispose the bindings above, you would do:*/
jQuery.fn.disposeMyPlugin = function(){
	return this.unbind('.myPlugin');
};
/********************************************************************************/
//�����ض����¼�,trigger
//������������ռ���¼�
jQuery.fn.runMyPlugin = function(){
	return this.trigger('click.myPlugin');
};
//������ų��������ռ���¼�,��һ����̾��
jQuery('div.panels').trigger('click!');
/**********************************************************************************/
//���ݶ�̬���ݸ��¼�����,trigger
//����ڰ�ʱ��֪�����ݣ���ÿ�ε��������ݻ�ı�
/*There are two ways of solving this problem:
�6�1 Passing extra arguments to trigger()
�6�1 Passing a custom event object to trigger()*/
//solution:1.ͨ��trigger���ģ�����������������࣬��������ܲ����ţ�����I personally wouldn��t go beyond four to five
jQuery('form').trigger('submit', ['John','Doe', 28, {gender:'M'}]);
jQuery('form').bind('submit', function(e, name, surname, age, extra){
// Do something with these arguments
});
//2.�Զ����¼�Ҳ�����
jQuery('#slideshow').bind('add-image', function(e, src){
var $img = jQuery('<img />').attr('src', src);
jQuery(this).append($img);
});
jQuery('#slideshow').trigger('add-image', 'img/dogs4.jpg');
//3.��һ�ִ��ݷ�ʽ���Զ���event object������һ�ֺõĵط����ڲ����ٶ�Ҳ��һ��������
//This means that, no matter how many data you��re passing, the handler will always have only a single argument, the event object.
//�����һ�����ӿ��Ը�д��������ʽ��
jQuery('form').bind('submit', function(e){
	// Do something with e.name, e.surname, etc.
});
jQuery('form').trigger({
	type:'submit',
	name:'John',
	surname:'Doe',
	age: 28,
	gender:'M'
});
//����������ʽ
var e = jQuery.Event('submit'); // the new operator can be omitted
e.name = 'John';
e.surname = 'Doe';
e.age = 28;
e.gender = 'M';
jQuery('form').trigger(e);
//You can, of course, use jQuery.extend instead of setting one attribute at a time.
/*
 * What��s the difference with event.data?
Using event.data is useful for static values that are accessible at the time when the
function was bound. When the data you need to pass must be evaluated later (or each
time), event.data won��t do for you.
 */
/**********************************************************************************************/
//��onReady֮ǰ��Ԫ�ؽ��в���
//���һ����������һ��Ԫ�أ�����������ʽ�ϵĲ�����
/*So, your problem is directly related to styling, you want to apply a conditional styling
to an element, and this condition needs to be evaluated by JavaScript.
The right way to go about this is adding a specific CSS class to an element that is quickly
accessible, like the <html> element, and then style the element accordingly.
Do something like this:*/
//���ģ����������Styling�йأ������һ����ʽ�ӵ�Ԫ���ϣ�����Ҫͨ��JS���ӡ�
//��ȷ�ķ����ǣ���ȷ�ķ����Ǽ�һ���ض���CSS����Ѹ�ٻ�õ�Ԫ�أ�����<html>,Ȼ����Ӧ�ظ���ЩԪ�ؼ�����ʽ��
/*<!DOCTYPE html>
	<html>
		<head>
			<style type="text/css">
				//�����htmlԪ�ؼ���һ����
				html.no-message #message{ display:none; }
			</style>
			<script src="assets/jquery-latest.js"></script>
			<script type="text/javascript">
				//�������������ǲ��õ�
				// Bad
				jQuery(document).ready(function($){
					$('#message').hide();
				});
				//����������������ȷ�ģ�ֱ�Ӹ�htmlԪ�ؼ���no-message�࣬�����Ϳ���ʹ��style�ж������ʽ��
				// Correct
				jQuery('html').addClass('no-message');
				// or...
				document.documentElement.className = 'no-message';
</script>
</head>
<body>
<p id="message">I should not be visible</p>
<!--
Many more html elements
-->
</body>
</html>*/

//��������������page load��֮ǰ�ͻ�ȡ��ĳ��Ԫ�أ������¼�������event delegation ��live

//���������
//����һ��һ����һ���¼�����ExtJS����afterrender,��jQuery���������load����ȡ��ĳ��Ԫ�أ�����load��֮���ڶԴ�Ԫ�ؽ��л�ȡ
//д��λ�ã���������ִ���д��document.ready���ʵҲ��û���õģ�Ҳ��Ҫ�ȵ�����DOM���������С�
//�������ַ������д��Ԫ�ص����棬����ֱ��д��JS�ļ�����������document.ready��
//���������Զ���λ�ã������ַ���һ����д��ĳ��Ԫ�ص����棬�������¼���
//Here is an example:
/*
<!DOCTYPE html>
<html>
	<head>
		<script src="assets/jquery-latest.js"></script>
	</head>
	<body>
		<p>The time is <span id="time">&nbsp;</span></p>
		<script type="text/javascript">
			jQuery('#time').text( new Date().toString() );
		</script>
		<!-- Many more html elements -->
	</body>
</html>*/
//��������Polling��ʹ������setInterval������
/*
 * Polling can be implemented with a simple interval (setInterval) that checks 
 * for an element, and once found, a certain function is run, and the interval needs to be
cleared.
There are two plugins that can aid you with this. One is LiveQuery,�� which has an option
to register a function to be run for each newly found element that matches a selector.
This approach is pretty slow but supports the whole set of selectors.
There��s another plugin called ElementReady# that will also handle this situation
properly.
It lets you register pairs of id/function, and it will poll the DOM. Once an id is found,
the function will be called, and the id is removed from the queue.
This plugin implements, probably, the fastest approach to detect elements, that is,
using document.getElementById. This plugin is pretty fast but only supports ids.
 */
/**************************************************************************************/
//ֹͣ�¼���ִ��loop,event����
/**************************************************************************************/
//ʹ��event.target����¼���ǰ����event����
/**************************************************************************************/
//�����¼����ظ�ʹ�ã�����hover,����������úܿ죬��ô����ķ���������һ�λ�ûִ���꣬��һ���ͱ�������
//��������ǣ�kill��ǰһ��δִ������¼���Ȼ���ٴ�����һ���¼�
//���嵽�¼��Ĵ��룬stop()����������Զ�֮ǰ�Ķ���kill��
jQuery('#something').hover(
	function(){
		jQuery(this).stop().animate({opacity:1}, 1000);
	},
	function(){
		jQuery(this).stop().animate({opacity:0.8}, 1000);
	}
);
//This also works for custom jQuery animations, like slideUp(), slideDown(),fadeIn(), etc.
//This is the former example using the fade methods:
jQuery('#something').hover(
	function(){
		jQuery(this).stop().fadeTo( 1, 1000 );
	},
	function(){
		jQuery(this).stop().fadeTo( 0.8, 1000 );
	}
);
//���������������������������в�ͨ��
jQuery('#something').hover(
function(){
jQuery(this).stop()
.fadeTo( 1, 1000 )
.animate( {height:500}, 1000 );
},
function(){
jQuery(this).stop()
.fadeTo( 0.8, 1000 )
.animate( {height:200}, 1000 );
}
);
//�ᷢ�ֵ�һ��������û���ˣ����Ǹ߶Ȼ᲻ͣ�ر仯����Ϊ�������ųɶ���ִ�еģ�stopֻ��ͣ��һ������������ļ���ִ��
/*
 * The reason is simple; jQuery animations get queued by default. This means that if you
add several animations, they��ll get executed in sequence.
stop() by default only stops (and removes) the current animation. In our last example,
only the opacity animation will be removed each time, leaving the height animation in
the queue, ready to run.
Ϊ�˽��������⣬ֻ��Ҫ��true��stop����������ȡ�����еĶ���
To work around this, you have to either call stop() one more time or pass true as the
first argument. This will make stop() clean all the queued animations as well. Our
hover code should look like this:
 */
jQuery('#something').hover(
	function(){
		jQuery(this).stop(true)
			.fadeTo( 1, 1000 )
			.animate( {height:500}, 1000 );
	},
	function(){
		jQuery(this).stop(true)
			.fadeTo( 0.8, 1000 )
			.animate( {height:200}, 1000 );
	}
);
/************************************************************************************/
//ʹevent handler�����¼ӵ�Ԫ��Ҳ�����ã�delegation
//����js�ǽ���ִ�еģ����Զ��ں�ӵ�Ԫ�أ����������¼����磺
function handler(){
	alert('got clicked');
}
jQuery('.clickable').bind('click', handler);
//������δ��������������£�
/*
 * 1. Look for all elements with a CSS class ��clickable�� and save it to the collection.
   2. Bind the ��handler�� function to the click event of each element in the collection.
 */
//����JS��ִ�����Զ������������ԣ����Զ���֮ǰ��.clickable���class�Ķ������¼�����ȥ�����Ƕ���֮���.clickable
//�����û������¼���
//���������
//1.���ں����ӵ�Ԫ�����°󶨣�Ϊ�˷�ֹ�������࣬���Խ�handler����һ��named function,Ȼ���ڰ��ʱ��ֻ��Ҫдһ���������Ϳ�����
//2.�¼�ί��:Delegation,live()
//Ҫע����ǣ�event delegation cannot be used with events that don��t bubble, such as focus and
//blur. For these events, there��s a workaround that works cross-browser, using the
//focusin and focusout events in some browsers.
