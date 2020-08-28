(function($) {
	
    $(function() {

        var documenter = function(options) {
			var nav = jQuery('.navigation'), obj = [],
			section = $('#documenter-content>section');
					
			section.each(function(i, val) {
				var self = $(this),
				scrollData = parseInt(self.position().top);
				obj.push(scrollData);				
				
			});

			var defaults = {
				duration : 400,
				easing : 'easeOutCirc'
			}

			var o = $.extend({}, defaults , options);

			return {
				events : function() {
					nav.on('click', 'a', function(e) {

						var self = $(this), parent = self.parent(), id = self.attr('href');
						$.scrollTo(id, o.duration, {
							easing : o.easing,
							onAfter : function() {
								parent.siblings().removeClass('current-nav').end().addClass('current-nav');
							}
						});
						e.preventDefault();
					});

					$(window).on('scroll', function() {

						var thisScrollData = $(this).scrollTop(), $id;
						
						for ( var i = 0; i < obj.length; i ++ ) {
																						
							if ( thisScrollData > obj[i] && thisScrollData < obj[i + 1] ) {
								$id = section.eq(i).attr('id');
								$(nav).children('li').removeClass('current-nav');
								$('a[href=#' + $id +']').parent('li').addClass('current-nav');
							}
						}

					});
				}
			}

		};

		var NAV = new documenter({
			duration: 1100
		});
		NAV.events();

		if ( $('.lightbox').length ) {

			var $lightbox = $('.lightbox');

			$lightbox.fancybox({
				helpers: {
					title : {
						type : 'outside'
					},
					overlay : {
						speedOut : 0
					}
				}
			});		
		}

	});

})(jQuery);

	