/********************************************************************************************************************************/

$(document).ready(function(){
	$("#clicky").click(function(){
		var element=this;
		$(element).addClass('clicked');
		setTimeout(function(){
			console.log(this);//������window����
			$(element).removeClass('clicked');	//ʹ�ñհ������this����������		
		},1000);
	})
});
/********************************************************************************************************************************/
//���һ������������¼��õ���������һ������ҳ���Ҫ�õ�,�����ظ�д�������Solution
$(document).ready(function(){
	//��ʽһ
	//�󶨶���¼�
	$("#country").bind('click mouseover',function(){
		alert('aa');
	})
	//ҳ��һ��������õ�
	.trigger('click');
	
	//��ʽ����
	function alertMsg(){
		alert('aaa');
	}
	alertMsg();
	$("#country").bind('click mouseover',alertMsg);
})
/********************************************************************************************************************************/
//chain�ĸ�ʽ��
//1.����ǰ��
//2.��һ��set��Ԫ�ؾ�������
$('#box')
	.addClass('contentBox')
	.children(':header')
		.addClass('contentTitle')
		.click(function() {
			$(this).siblings('.contentBody').toggle();
		})
	.end()
	.children(':not(.contentTitle)')
		.addClass('contentBody')
	.end()
	.append('<div class="contentFooter"></div>')
	.children('.contentFooter')
		.text('generated content');
/********************************************************************************************************************************/
//�����Զ���ķ���
/*
 * The composer Igor Stravinsky is reported to have said, ��Good composers borrow; great
composers steal.�� He apparently stole the quote from T.S. Eliot, who wrote, ��Immature
poets imitate; mature poets steal.��
 */
jQuery.fn.radioClass = function( cls ) {
	return this // Start chain, will return its result
		.siblings() // Select all siblings of selected elements
			.removeClass(cls) // Remove class from those siblings
		.end() // Go back to original selection
		.addClass(cls); // Add class to selected elements
};
/*
 * jQuery.fn is a reference to the same object as jQuery.prototype. When you add a function
to the jQuery.fn object, you��re really adding it to jQuery.prototype.
When you create a jQuery object with jQuery() or $(), you��re actually calling new
jQuery(). (The jQuery code automatically does the new for you.) As with any other
JavaScript constructor, jQuery.prototype provides methods and default properties for
the objects returned by each new jQuery() call. So, what you��re really doing when you
write a jQuery.fn plugin is traditional object-oriented JavaScript programming, adding
a method to an object using the constructor��s prototype.
 */
/********************************************************************************************************************************/
//�����Զ���ĵ�����
/*
 * ��������ԭ����each������ʵ��ԭ������һ�����飬һ��һ��Ԫ��ѭ��һ�飬ѭ���������ǣ�
 * i<array.length,��callback�������ز����Ե���false
 */
jQuery.each = function( object, callback ) {
	for(var i = 0, length = object.length;i < length;++i) {
		var value = object[i];
		if( callback.call( value, i, value ) === false )
			break;
	}
	return object;
};
//��һ��д��,�����
jQuery.each=function(object,callback){
	for(var i=0,value=object[0],length=object.length;i<length && callback(value, i, value)!==false;value=object[++i])
	{}
}

//�Զ���1���������
jQuery.fn.reverseEach=function(callback){
	for(var i=this.length,value;--i>0;){
		value=this[i];
		if( callback.call( value, i, value ) === false )
			break;
	}
	return this;
}
$('a').reverseEach(function(){
	console.log($(this).attr('href'));
})
//�Զ���2���������������֮����һ���
//����js��û��sleep��������
//doSomething();
//sleep( 1000 );
//doSomethingLater();
//����Ҫʹ��setTimeOut(function,interval)����������һ��interval��ʱ��ִ��function
jQuery.slowEach=function(array,interval,callback){
	if(!array.length)return;
	var i=0;
	next();
	function next(){
		//������callback�����ĵ��ô�
		if(callback(array[i],i,array[i])!==false)
			if(++i<array.length)
				setTimeout(next,interval);
	}
	return array;
}
jQuery.fn.slowEach=function(interval,callback){	
	return jQuery.slowEach(this,interval,callback);
};
$('a').slowEach(1000,
                //������callback�����Ķ��崦
                function(item,index){
				    if(index==2){
						return false;
					}
					console.log($(item).attr('href'))
				}
			)

/********************************************************************************************************************************/			
//toggle attribute:����checkbox,ԭ�����ϵ�ȥ������ԭ��û���ϵĹ��ϡ�Ҳ�����Լ�����ֵ
//Ҫ���ǣ����on��ֵ���úã���ôֱ�Ӹ���on��ֵ�����ã����û�����úã���ô��ȡ��ǰ������ֵ����ȡ������ص��������ϡ�
//eg:toggle check
jQuery.fn.toggleCheck=function(on){
	return (on!==undefined)?this.attr('checked',on):this.each(function(i,item){
		var $element=$(item);
		console.log($element)
		$element.attr('checked',!(($element.attr('checked')===undefined)?false:$element.attr('checked')));
	})
}
$('input[type="checkbox"]').toggleCheck();

//������ø�ͨ��һ�㣺
jQuery.fn.toggleAttr = function( name, onValue, offValue, on ) {
	function set( $element, on ) {
		//on�Ĵ�ֵ��
		//��Դһ��ֱ�Ӵ���
		//��Դ����ͨ����ǰֵ��onValue�ıȽϽ��������Ȼ��ǲ��ȣ�������һ����true/false		
		var value = on ? onValue : offValue;
		//���value��Ϊ��null,���Ƴ������ԣ����������������
		return value == null ?
			$element.removeAttr( name ) :
			$element.attr( name, value );
	}
	console.log(on !== undefined);
	return on !== undefined ?
		//on�����ֵ������set������on��ֵ����Ԫ��
		set( this, on ) :
		//on���Ϊundefined,Ҳ�ǵ���set������ֵ����ֵ�������ǣ���Ŀǰ����ֵ��onValue���񶨵�asset�ж�
		//���������onValue,���ж������Ľ����:true,��ô��ֵΪtrue;
		//�������onValue,���ж������Ľ����false,��ô��Ϊfalse
			this.each( function( i, element ) {
				var $element = $(element);
				set( $element, $element.attr(name) !== onValue );
		});
	};
//Ӧ����check:
jQuery.fn.toggleCheck = function( check ) {	
	return this.toggleAttr( 'checked', 'checked', false, check );
};
$('input[type="checkbox"]').toggleCheck(true);
$('input[type="checkbox"]').toggleCheck(false);
$('input[type="checkbox"]').toggleCheck();
$('input[type="checkbox"]').each(function(i,item){
	console.log($(item).attr('checked'));
})
//Ӧ����disabled
jQuery.fn.toggleEnable = function( enable ) {
	return this.toggleAttr( 'disabled', false, true, enable );
};
//Ӧ����һ������
jQuery.fn.toggleFoo = function( add ) {
	return this.toggleAttr( 'foo', 'bar', null, add );
};
//���fooΪbar,��ȥ���������Ϊbar����û��fooֵ���������ֵ
//$('input[type="checkbox"]').toggleFoo();

$('input[type="checkbox"]').toggleFoo(null);
$('input[type="checkbox"]').each(function(i,item){
	console.log($(item).attr('foo'));
})

/*************************************************************************************************/
//����profiler��Ч��\������������������ƿ��
//Firebug has one,
//and others are built into IE 8 and Safari 4. These are all function profilers: you start
//profiling, interact with your page, and stop profiling, and then you get a report showing
//how much time was spent in each function.
//����˵��һЩ�Ǻ��������profiler
//����һЩ����������selector��profiler
//����ϸ�ڵ�profiler������Ҫ�Լ���ʵ��
var t1=+new Date;
//do some stuff...
var t2=+new Date;
����+new Date,new Date�Ǵ���Date����+�ǽ�Date����ת��Ϊnumber���ͣ�The
way JavaScript converts an object to a number is by calling the object��s
.valueOf() method. And the .valueOf() method for a Date
object happens to be the same thing as .getTime(), giving the time in
milliseconds.
����˼·��ȡ�õ�ǰʱ�䣬secondsΪ��ǰʱ���ȥsince(�������sinceֵ������last(û�д�������Ĭ��Ϊ�ϴε������������ʱ�䣩֮��ó���������
�������log�����У�����¼����ʱ���last���ڵ���time.done��ʱ���丳ֵ�������selector��HTMLԪ����
(function() {
	var log = [], first, last;
	time = function( message, since ) {
		var now = +new Date;
		var seconds = ( now - ( since || last ) ) / 1000;
		log.push( seconds.toFixed(3) + ': ' + message + '<br />' );
		return last = +new Date;
	};
	
	time.done = function( selector ) {
	time( 'total', first );
	$(selector).html( log.join('') );
	};
	//�����￪ʼ�Ѿ���ʱ��time.done�е�first���������¼�µ�ʱ�䣬����Ҳ�ǵ�һ��last��ʱ��
	first = last = +new Date;	
	//����ʱ�Ѿ�ִ����һ�Σ�ΪʲôҪ��ô���أ�
    //��Ϊ�������԰���Щ��������������������ȫ�ֱ������������ִ�еĻ���
	//��ô��һ����Ҫ�����������ʱ��Щ��ֵ�ſ���ִ�У���Ȼһ��ʼ��Щ�����Ͳ���ֵ��������Ҫ����һ�������������ִ��һ��
})();

// do stuff
//��������һЩ������֮���time��¼����֮���ʱ�䣬Ҳ����time( 'first' )
time( 'first' );
$("a");
time( 'second' );//�����ǵڶ��ε�ʱ��
// and more
time( 'third' );
time.done( '#log' );

//Firebug������ʱ��Ӱ�������ٶȣ����磺
//JavaScript��s eval()
/*function, which jQuery 1.3.2 and earlier use to evaluate downloaded
JSON data, is affected to an extreme degree: an array of 10,000 names
and addresses in the format from Recipe 5.11 takes 0.2 seconds in Firefox
normally, but 55 seconds with Firebug��s Script panel enabled. Later
versions of jQuery use Function() for this, which isn��t affected by
Firebug.*/
//���firebugӰ��ҳ���ٶȣ���Ҳ�Ҳ���ʲô�����������������ʾ�û���firebug���ر�
$(document).ready( function() {
if( window.console && console.firebug )
$('#firebugWarning').show();
});

/***********************************************************************************************/
//������ѭ���ж�Ҫʹ��ѡ��������ѡ����ѡ������Ķ�����������
//��������ѭ��֮ǰ��ѡ����������ݱ����ڱ�����
//eg��
var
	$clientX = $('.clientX'),
	$clientY = $('.clientY'),
	$pageX = $('.pageX'),
	$pageY = $('.pageY'),
	$screenX = $('.screenX'),
	$screenY = $('.screenY');
//�����mousemove�൱��һ��ѭ���������$()����д������ͻᵼ�´������ظ�ѡ��
$('html').mousemove( function( event ) {
	$clientX.html( event.clientX );
	$clientY.html( event.clientY );
	$pageX.html( event.pageX );
	$pageY.html( event.pageY );
	$screenX.html( event.screenX );
	$screenY.html( event.screenY );
});
/*һ���Ż�����ķ����ǣ�
One of the classic ways to optimize code is to ��hoist�� repeated calculations out of a
loop so you have to do them only once.Any values that don��t change inside the loop
should be calculated one time, before the loop starts. If those are expensive calculations,
the loop will then be much faster.*/
//���ظ��ļ�����ȡ��ѭ��֮��
/*when the ��loop�� is a series of frequently fired events such as
mousemove and the ��calculation�� is a jQuery selector. Hoisting the selector out of the
event handler makes the event handler respond faster.
 */
//��Ȼ���ѭ����ָһ�������������¼�������mousemove��������ָjQuery��selector,���ԭ��Ҳͬ�����á�
/********************************************************************************************/
//д�����selector
//1.ID��class��
//2.���һ��Ҫʹ��class,��ô�;�����ָ��������·������ID��ָ��parent,���磺
/*<table id="log">
<tr><td>Client X:</td><td id="clientX"></td></tr>
...
</table>
you could use this:
$('.clientX') // Slower
$('td.clientX') // May be faster
$('#log .clientX') // May be much faster
$('#log td.clientX') // Possibly faster in some browsers*/
//�ڼ򵥵�ҳ�棬Ҳ�������Ż����ֲ������������ȼ򵥵�selector��������Ϊ����selectorҲ��Ҫ��ʱ�䣬Խ�Ǹ��ӵ�ʱ��Խ����
//�����ڸ��ӵ�ҳ��������ֳ�����
/*
class selectors are slow in IE 7 when you have a complex page.
If you can use it, selecting by ID as in $('#myid') is generally very fast in all browsers,
because it simply uses a single call to the getElementById() API.
It also helps to narrow down the number of elements that need to be searched, either
by specifying a parent element, by making the class selector more specific with a tag
name, or by combining those and other tricks.
 */

	
	

/******************************************************************************************/
//����ز���������
function esc( text ) {
	return text
	.replace( '&', '&amp;' )
	.replace( '<', '&lt;' )
	.replace( '>', '&gt;' );
}
$(document).ready( function() {
	function fillTable( names ) {
		$.each( names, function() {
			$('<tr>')
				.append( $('<td>').addClass('name').html(
					esc(this.first) + ' ' + esc(this.last)
				) )
				.append( $('<td>').addClass('address').html(
					esc(this.street) + '<br />' +
					esc(this.city) + ', ' +
					esc(this.state) + ' ' + esc(this.zip)
				) )
				.appendTo('#nameTable');
		});
	}
	$.getJSON( 'names-1000.json', function( json ) {
		fillTable( json.names );
	});
});
//��δ���û�����⣬����ִ��̫����
/*���������Combine several optimizations:
�6�1 Insert a single <table> or <tbody> instead of multiple <tr> elements
�6�1 Use .innerHTML or .html() instead of DOM manipulation
�6�1 Build an array with a[++i] and .join() it instead of string concatenation
�6�1 Use a bare-metal for loop instead of $.each
�6�1 Reduce name lookups*/

$(document).ready( function() {
	function fillTable( names ) {
		// Reduce name lookups with local function name
		var e = esc;
		//
		var html = [], h = -1;
		html[++h] = '<table id="nameTable">';
		html[++h] = '<tbody>';
		for( var name, i = -1; name = names[++i]; ) {
		html[++h] = '<tr><td class="name">';
		html[++h] = e(name.first);
		html[++h] = ' ';
		html[++h] = e(name.last);
		html[++h] = '</td><td class="address">';
		html[++h] = e(name.street);
		html[++h] = '<br />';
		html[++h] = e(name.city);
		html[++h] = ', ';
		html[++h] = e(name.state);
		html[++h] = ' ';
		html[++h] = e(name.zip);
		html[++h] = '</td></tr>';
		}
		html[++h] = '</tbody>';
		html[++h] = '</table>';
		$('#container')[0].innerHTML = html.join('');
	}
	$.getJSON( 'names-1000.json', function( json ) {
		fillTable( json.names );
	});
});

/******************************************************************************************/
//����eachѭ��
//for array
$.each( array, function() {
// do stuff with this
});
//for objects
$('.lotsOfElements').each( function() {
// do stuff with this or $(this)
});
/******************************************************************************************/
//дforѭ��������eachѭ��
//����eachѭ������������ܴ�Ļ������������ʱ��forѭ����ӿ��ٶ�
//1.for array
for(var item, i = -1; item = array[++i];)
{
	// do stuff with item
}
//ע�⣺ʹ��ʱÿ��item������has  ��false�� elements, that is,elements whose value is undefined, null, false, 0, or "".
//��Ϊֻ�е��������ʽ��item = array[++i]����ֵΪ true ʱ���Ž��� for ѭ��

//2.for objects,�������û��һ��Ԫ����null,Just be sure to cache the object in a variable:
var $items = $('.lotsOfElements');
for( var item, i = -1; item = $item[++i];){
	// do stuff with item (a DOM node)
}
//3.�Ƚ�ͨ�õ�forѭ��д��
for( var i = 0; i < array.length; i++ ) {
	var item = array[i];
	// do stuff with item
}
/*�������ϵ�ѭ���������������
 * But you can improve that loop in three ways:
�6�1 Cache the array length.��array length������ʱ����
�6�1 Use ++i, which is faster than i++ in some browsers.//ʹ��++i
�6�1 Combine the test and increment of the loop variable to remove one name lookup.//��������ȽϽ����һ���Լ���һ��name lookup
 */
for( var i = -1, n = array.length; ++i < n; ) {
	var item = array[i];
	// do stuff with item
}
//4.����object��ѭ������������for inѭ����array�����ԣ�
//for-in ������ϸ�ĵ�����䣬����ö�ٶ�������ԡ�
//���磺
for (sProp in window) {
  alert(sProp);
}
//���for-in ���������ʾ window ������������ԡ�PropertyIsEnumerable() �� ECMAScript ��ר������˵�������Ƿ������ for-in �����ʵķ�����
//������������������ͨ����ʽ������ָ����JSON����
for( var key in object ) {
	var item = object[key];
	// do stuff with item
}
//ע�⣺��Զ��Ҫ����һ��jQuery Object����һ�����飬ԭ����������£�
/*Never use a for..in loop to iterate over a jQuery object or an array of any type. 
 * If the array has any custom properties or methods, those will be iterated along with the numeric
array elements.
For example, this code enumerates a single DOM element, the
document body (with i = 0):
$('body').each( function( i ) { console.log( i ); });
This code may look like it would do the same thing, but it enumerates all of the jQuery
methods such as show and css along with the [0] element:
for( var i in $('body') ) console.log( i ); // BAD
Instead, use one of the array loops listed previously.
Even the ��safe�� use of a for..in loop to iterate over an object can get in trouble if any
code on your page has modified Object.prototype to extend all objects with additional
methods or properties. The loop will enumerate those methods or properties along
with the ones you want.*/
/*
 * $(selector).each(fn) is the customary way to create a jQuery object and iterate over
it, but it��s not the only way. The jQuery object is an ��array-like�� object with .length
and [0], [1], ..., [length-1] properties. Therefore, you can use any of the looping
techniques you would use with any other array. And because the jQuery object never
contains ��false�� elements, you can use the fastest for loop listed at the beginning of the
solution.
 */
/*******************************************************************************************/
//������������
//ȫ�ֱ�����ȫ�ַ���������������㷽�������丳��local����
//����ԭ��The inner loop calls several global functions, 
//and it references some variables defined in the outer functions or globally.
//Each of these references is triggering several name lookups because of the nested functions.
//Remember that JavaScript looks up a name first in the local scope (function), and if the
//name isn��t found there, it works its way up through the parent nested functions and
//finally the global scope.
(function() {
// Find the largest absolute value in an array of numbers
	function maxMagnitude( array ) {
		var largest = -Infinity;
		$.each( array, function() {
			largest = Math.max( largest, Math.abs(this) );
		});
		return largest;
	}// Other code here calls maxMagnitude on a large array
})();
/*So, if this block of code is in the global scope, the each() callback does the following
name lookups in every iteration:
1. largest in local scope [fail]
2. largest in MaxMagnitude() [success]
3. Math in local scope [fail]
4. Math in MaxMagnitude() [fail]
5. Math in anonymous wrapper function [fail]
6. Math in global scope [success]
7. abs in Math object [success]
8. Math in local scope [fail]
9. Math in MaxMagnitude() [fail]
10. Math in anonymous wrapper function [fail]
11. Math in global scope [success]
12. max in Math object [success]
13. largest in local scope [fail]
14. largest in MaxMagnitude() [success]
Now rewrite the code as follows:*/
// A typical wrapper to get a local scope
(function() {
// Find the largest absolute value in an array of numbers
	function maxMagnitude( array ) {
		var abs = Math.abs, max = Math.max;
		var largest = -Infinity;
		for( var i = -1, n = array.length; ++i < n; ) {
			largest = max( largest, abs(array[i]) );
		}
		return largest;
	}
// Other code here calls maxMagnitude on a large array
})();
/*This not only eliminates the callback function call in every iteration, it also reduces the
number of name lookups per iteration by 10 or more. The loop body in this version
does these name lookups:
1. largest in local scope [success]
2. abs in local scope [success]
3. max in local scope [success]
4. largest in local scope [success]
That��s more than a 70 percent improvement over the first version.*/
//filltable�����ӣ�ԭ��6��ʹ��esc����*1000��name*4��nest=24,000��lookup
//���º�:6��ʹ��esc����*1000��name*1��nest(һ����Ϊʹ���˾ֲ�������������Ϊʹ����forѭ��ֻ��һ��Ƕ��)=6000��lookup
//��������ܿ϶����кܴ�������
/******************************************************************************************/
//����ظ���DOM
//html()��ʱ��Ƚ�����innerHTML�����Чһ��
//html()��.innerHTML�Ĳ�֮ͬ��,html()������clean()���������Զ����Ƶ���ǣ���ȥ��֮ǰ���е��¼�������
$('#mydiv').html(myhtml);
$('#mydiv')[0].innerHTML = myhtml;
/*
 * If there are any event handlers in the content being replaced,
you should stick with .html(), or if you just need this event handler cleanup but don��t
need the other HTML cleanup, you could possibly use $('#test').empty()
[0].innerHTML = myhtml; to get the event cleanup only.
 */

/**********************************************************************************/
/*
The easiest way to find most methods in the jQuery source code is to
search for the method name with a : after it; e.g., to find the .clean()
method, search for clean: in the uncompressed jQuery source.*/

///**************************************************************************************/
////��������setTimeout,�������ƺ�û�еõ�
//function delayLog( text ) {
//setTimeout( "alert(text)", 1000 );
//}
///*Indeed, the problem here is that when a string argument is passed to setTimeout(), it
//is executed in the global scope, i.e., as if the code were located outside of any function.
//The easiest way to fix it is to use a local function for the callback instead of a text string:*/
////ԭ����������Ǵ��ַ����Ļ�����ô��δ�������ȫ�ַ�Χ��ִ�еģ�ֻҪ����ŵ�function�У��Ϳ��Ա�ɾֲ���
////������,�����Ϳ��Դ��ⲿ������ô���Ĳ���
//function delayLog( text ) {
//	setTimeout( function() {
//		alert(text);
//	}, 1000 );
//}
///******************************************************************************************/
////���ȷ��������jQuery��ɵ�
////eg:
//function delayLog( text ) {
//setTimeout( "$('#log').show().html(text)", 1000 );
//}
//// ... and somewhere else in the code ...
//delayLog( 'Hello' );
////�����������������,��jQuery�����滻�ɴ� JS
//function delayLog( text ) {
//setTimeout( "alert(text)", 1000 );
//}
////���������Ȼ���ڣ�˵��������ⲻ��jQuery��ɵ�

/******************************************************************************************/
//����jQuery����ʽ����
//ʹ��jQueryʱ����������һ�����Ĵ��룬������̫������Դ�����ô���أ���ÿһ�������жϣ�һ��һ��ص��Լ���
