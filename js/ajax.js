jQuery(document).ready(function($){
	$('body').click(function(e){
		if ( $(e.target).hasClass('page-link') || $(e.target).hasClass('category-link') || $(e.target).hasClass('site-title') || $(e.target).hasClass('post-link') ) {
			e.preventDefault();
			$('#main').load(e.target.href + ' #main > *', function(responseText, status){
				if ( status === 'success' ) {
					history.pushState({}, '', e.target.href);
					$(window).scrollTop(0);
				} else {
					$('#main').html('<div class="wrapper"><div class="post"><header class="post-header"><h1 class="post-title">Oops&hellip;</h1></header><article class="post-content"><p>Something went wrong. Please refresh the page.</p></article></div></div>')
				}
			});
		}
	})
});
