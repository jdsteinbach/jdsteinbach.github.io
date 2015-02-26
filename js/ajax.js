jQuery(document).ready(function($){
	$('body').click(function(e){
		// e.preventDefault();
		// console.log($(e.target).hasClass('page-link'));
		// console.log($(e.target).hasClass('category-link'));
		// console.log($(e.target).hasClass('site-title'));
		// console.log($(e.target).hasClass('post-link'));
		if (
			$(e.target).hasClass('page-link') ||
			$(e.target).hasClass('category-link') ||
			$(e.target).hasClass('site-title') ||
			$(e.target).hasClass('post-link')
		) {
			e.preventDefault();
			$('#main').load(e.target.href + ' #main > *');
			history.pushState({}, '', e.target.href);
		}
	})
});