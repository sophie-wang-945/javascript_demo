/**
 * @author Sophie
 */
/*******************************************************************************/
//�Զ�����
jQuery.fn.goShop = function() {
	return this.each(function() {
		jQuery('body').append('<div>Purchase: ' + this.innerHTML + '</div>');
	});
};
jQuery('p').goShop();

jQuery.checkout = function() {
	jQuery('body').append('<h1>Checkout Successful</h1>');
};
jQuery.checkout();
/*******************************************************************************/
//���������Զ�����
jQuery.fn.pulse = function(options) {
	// Merge passed options with defaults
	var opts = jQuery.extend({}, jQuery.fn.pulse.defaults, options);
	return this.each(function() {
		// Pulse!
		for(var i = 0;i<opts.pulses;i++) {
			jQuery(this).fadeTo(opts.speed,opts.fadeLow).fadeTo(opts.speed,opts.fadeHigh);
		}
		// Reset to normal
		jQuery(this).fadeTo(opts.speed,1);
	});
};
// Pulse plugin default options
jQuery.fn.pulse.defaults = {
	speed: "slow",
	pulses: 2,
	fadeLow: 0.2,
	fadeHigh: 1
};
// Override only one option
jQuery('p').pulse({pulses: 6});
// Override all options
jQuery('p').pulse({speed: "fast", pulses: 10, fadeLow: 0.3, fadeHigh: 0.8});
// Plugin code included above
// Reset pulse default options
jQuery.fn.pulse.defaults = {
	speed: "fast",
	pulses: 4,
	fadeLow: 0.2,
	fadeHigh: 1
};
// This call will use the new defaults
jQuery('p').pulse();
/*********************************************************************************/
//ʹ�ñ���$
;(function($) {
	$.fn.pulse = function(options) {
		// Merge passed options with defaults
		var opts = $.extend({}, $.fn.pulse.defaults, options);
		return this.each(function() {
			// Pulse!
			for(var i = 0;i<opts.pulses;i++) {
				$(this).fadeTo(opts.speed,opts.fadeLow).fadeTo(opts.speed,opts.fadeHigh);
			}
			// Reset to normal	
			$(this).fadeTo(opts.speed,1);
		});
	};
	// Pulse plugin default options
	$.fn.pulse.defaults = {
		speed: "slow",
		pulses: 2,
		fadeLow: 0.2,
		fadeHigh: 1
	};
})(jQuery);
/**********************************************************************************/
//����private function
;(function($) {
	$.fn.pulse = function(options) {
		// Merge passed options with defaults
		var opts = $.extend({}, $.fn.pulse.defaults, options);
		return this.each(function() {
			doPulse($(this),opts);
		});
	};
	function doPulse($obj,opts) {
		for(var i = 0;i<opts.pulses;i++) {
			$obj.fadeTo(opts.speed,opts.fadeLow).fadeTo(opts.speed,opts.fadeHigh);
		}
		// Reset to normal
		$obj.fadeTo(opts.speed,1);
	}
	// Pulse plugin default options
	$.fn.pulse.defaults = {
		speed: "slow",
		pulses: 2,
		fadeLow: 0.2,
		fadeHigh: 1
	};
})(jQuery);
/*********************************************************************************/
//֧��������Ϣ����Ҫ����һ��meta.js�Ĳ��
<!-- Include the metadata plugin -->
<script type="text/javascript" src="metadata/jquery.metadata.js"></script>
<!-- Example of markup containing metadata -->
<p class="{pulses: 8, speed: 'slow'}">Starship Enterprise</p>
<p>Battlestar Galactica</p>
<p class="{speed: 100}">Serenity</p>
;(function($) {
	$.fn.pulse = function(options) {
		// Merge passed options with defaults
		var opts = $.extend({}, $.fn.pulse.defaults, options);
		return this.each(function() {
		// Merge in the metadata elements for this specific node
			var o = $.metadata ? $.extend({}, opts, $.metadata.get(this)) : opts;
			doPulse($(this),o);
		});
	};
	function doPulse($obj,opts) {
		for(var i = 0;i<opts.pulses;i++) {
			$obj.fadeTo(opts.speed,opts.fadeLow).fadeTo(opts.speed,opts.fadeHigh);
		}
		// Reset to normal
		$obj.fadeTo(opts.speed,1);
	}
	// Pulse plugin default options
	$.fn.pulse.defaults = {
		speed: "slow",
		pulses: 2,
		fadeLow: 0.2,
		fadeHigh: 1
	};
})(jQuery);
/*****************************************************************************************/
//��Ӿ�̬����
;(function($) {
	$.fn.pulse = function(options) {
		// Merge passed options with defaults
		var opts = $.extend({}, $.fn.pulse.defaults, options);
		return this.each(function() {
			// Merge in the metadata elements for this specific node
			var o = $.metadata ? $.extend({}, opts, $.metadata.get(this)) : opts;
			doPulse($(this),o);
		});
	};
	function doPulse($obj,opts) {
		for(var i = 0;i<opts.pulses;i++) {
			$obj.fadeTo(opts.speed,opts.fadeLow).fadeTo(opts.speed,opts.fadeHigh);
		}
		// Reset to normal
		$obj.fadeTo(opts.speed,1);
	}
	
	
	// Define our base to add to
	$.pulse = {};
	// Static Function
	$.pulse.impulse = function($obj) {
		var opts = {
			speed: 2500,
			pulses: 10,
			fadeLow: 0.2,
			fadeHigh: 0.8
		};
		doPulse($obj,opts);
	}
	// Static Function
	$.pulse.warpspeed = function($obj) {
		var opts = {
			speed: 25,
			pulses: 100,
			fadeLow: 0.2,
			fadeHigh: 0.8
		};
		doPulse($obj,opts);
	}
	// Pulse plugin default options
	$.fn.pulse.defaults = {
		speed: "slow",
		pulses: 2,
		fadeLow: 0.2,
		fadeHigh: 1
	};
})(jQuery);
// Call the impulse method on the first element returned
jQuery.pulse.impulse(jQuery('p:first'));
// Call the warpspeed method on the first element returned
jQuery.pulse.warpspeed(jQuery('p:first'));
/********************************************************************************************/
//�������Plugin-QUnit