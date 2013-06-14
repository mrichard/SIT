(function() {
	'use strict';

	var root = this;

	root.define([
		'jquery'
	],

	function( $ ) {

		/* BUTTON PUBLIC CLASS DEFINITION
		* ============================== */

		var Button = function (element, options) {
			this.$element = $(element)
			this.options = $.extend({}, $.fn.button.defaults, options)
		}

		Button.prototype.setState = function (state) {
			var d = 'disabled'
			, $el = this.$element
			, data = $el.data()
			, val = $el.is('input') ? 'val' : 'html'

			state = state + 'Text'
			data.resetText || $el.data('resetText', $el[val]())

			$el[val](data[state] || this.options[state])

			// push to event loop to allow forms to submit
			setTimeout(function () {
				state == 'loadingText' ?
				$el.addClass(d).attr(d, d) :
				$el.removeClass(d).removeAttr(d)
			}, 0)
		}

		Button.prototype.toggle = function () {
			var $parent = this.$element.closest('[data-toggle="buttons-radio"]')

			$parent && $parent
			.find('.active')
			.removeClass('active')

			this.$element.toggleClass('active')
		}


		/* BUTTON PLUGIN DEFINITION
		* ======================== */

		$.fn.buttonTB = function (option) {
			return this.each(function () {
				var $this = $(this)
				, data = $this.data('button')
				, options = typeof option == 'object' && option
				if (!data) $this.data('button', (data = new Button(this, options)))
				if (option == 'toggle') data.toggle()
				else if (option) data.setState(option)
			})
		}

		$.fn.buttonTB.defaults = {
			loadingText: 'loading...'
		}

		$.fn.buttonTB.Constructor = Button


	});
}).call( this );
