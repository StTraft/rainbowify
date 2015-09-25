        ////////////////////////////////////////////////////////////
       //                                                        //
      // //////   /////  //// ///   // /////    /////  //    // //
     // //   // //   //  //  // /  // //   // //   // //    // //
    // //////  ///////  //  //  / // /////   //   // // // // //
   // //   // //   //  //  //   /// //   // //   // // // // //
  // //   // //   // //// //    // //////   /////    // //  //
 //                                                        //
////////////////////////////////////////////////////////////
// Rainbow ver 0.0.1a
// author: Gordon Yip

(function($){

	var rainbow_index = 0;

	$.fn.rainbow = function(options) {
		// func options
		var defaults = {
			phase: [4.4,2.9,0.3],
			brightness: 128,
			//steps: null,
			animate: false,
			reverse: false,
			duration: 2,	// controll the animation duration
			mode: null
		}
		var settings = $.extend( defaults, options || {} );


		// constant
		var _120deg = _2pi / 3;
		var _2pi = 2 * Math.PI;
		var _mode = function() {
			switch(settings.mode) {
				case 'steppy':
					return 'cubic-bezier(1,0,0,1)';
					break;
				case 'linear':
				default:
					return 'linear';
			}
		}

		var _deg2radian = function(deg){
			// params: deg -- can either be number(radian) or string with number and surfix 'deg' to indicate degree
			if (deg instanceof Array) {
				var radian = [deg.length];
				for (var i=0; i < deg.length; i++) {
					if (typeof deg[i] === "number")
						radian[i] = deg[i];
					else
						radian[i] = (deg[i].indexOf('deg') != -1) ? radian[i] = Math.round(parseInt(deg[i]) * _2pi * 100 / 360) / 100 : parseInt(deg[i]);
				}
			}
			else
				var radian = (deg.indexOf('deg') != -1) ? Math.round(parseInt(deg) * _2pi * 100 / 360) / 100 : deg;
			return radian;
		}

		var _waveFunc = function(freq, x, phase, amp, offset) {
			// main sin function for color rotation
			if (typeof freq == 'undefined')
				freq = 1;
			return Math.round(-1 * amp * Math.sin(freq * x + phase) + offset);
		}

		var _genColorString = function (array) {
			var a = [3];
			for (var i=0; i<3; i++)
				a[i] = _subGenCS(array[i]);
			return '#' + a[0] + a[1] + a[2];		
		}
		var _subGenCS = function(v) {
			return (v.toString(16).length == 1) ? '0' + v.toString(16) : v.toString(16);
		}

		var _hex2dec = function (hexStr) {
			var rgb = [];
			for (var i = 1; i < hexStr.length; i += 2) {
				rgb[(i-1)/2] = parseInt(hexStr.substring(i,i+2), 16);
			}
			return rgb;  // array
		}

		var _rotate = function(a, t, alt) {
			if (typeof t == 'undefined')
				t = 1;
			if (typeof alt == 'undefined')
				alt = false;
			var array = a.slice(0);
			while (t--) {
				var temp = (alt) ? array.pop() : array.shift();
				(alt) ? array.unshift(temp) : array.push(temp);
			}
			return array;
		}

		var _keyframes = function(arr, name, prefix) {
			if (typeof prefix == 'undefined')
				prefix = '';
			var n = arr.length;
			var a = arr;
			var _wk = prefix;
			var kfs = '\@'+_wk+'keyframes '+name+'{';
			for (var i = 0; i < n; i++) {
				kfs += Math.round(i*10000/n)/100 + '%{color:'+ a[i] +';}'
			}
			kfs += '100%{color:'+a[0]+'}}';
			return kfs;
		}

		return this.each(function(index, element){
			// func body goes here
			var ps = _deg2radian(settings.phase);
			var brightness = settings.brightness;
			var amp = Math.min( Math.abs(255 - brightness), Math.abs(0 - brightness) );
			var text = $(this).text().split("");
			var ca = [];
			var colorArray = [];
			var str = '';
			var _class = '<style type="text/css">';
			var frequency = (settings.steps) ? _2pi / settings.steps : _2pi / text.length;
			var duration = (settings.duration > 0) ? settings.duration : 0;

			for (var i = 0; i < text.length; i++) {
				for (var j = 0; j < 3; j++) {
					ca[j] = _waveFunc(frequency, i, ps[j], amp, brightness); 
				}
				colorArray[i] = _genColorString(ca);
				_class += '._r'+ rainbow_index +'_e'+ index + '_c' + i + '{color:'+ _genColorString(ca);
				_class += (settings.animate) ? ';animation:'+'r'+rainbow_index+'_kf_'+index+'c_'+i+' '+ duration + 's '+ _mode() +' infinite;}' : ';}';
				str += '<font class="_r'+ rainbow_index +'_e'+ index + '_c'+ i +'">'+text[i]+'</font>';
			}
			if (settings.animate)
				for (var i = 0; i < text.length; i++ ) 
					_class += _keyframes(_rotate(colorArray, i, settings.reverse), 'r'+rainbow_index+'_kf_'+index+'c_'+i);
					_class += _keyframes(_rotate(colorArray, i, settings.reverse), 'r'+rainbow_index+'_kf_'+index+'c_'+i, '-webkit-');
			_class += '</style>';
			
			$('head').append(_class);
			$(this).html(str);
			rainbow_index++;
		});
	}
}(jQuery));
