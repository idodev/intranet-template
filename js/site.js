$(function(){
	$bg = $('.modal-backdrop');
	$('.user .settings').click(function(){
		$(this).toggleClass('active');
	});

	$('.core-search-box .type').click(function(){
		$(this).toggleClass('active');
	});
	$('.core-search-box .type .mini-menu a').click(function(e){
		e.preventDefault();
		$('.core-search-box .type em').text($(this).text());
		$(this).parent('.type').removeClass('active');
	});

	$('.help-link').click(function(){
		$help = $('section.help');
		if($help.css('right') == "-400px") {
			$bg.fadeIn(200);
			$help.animate({right:0},500);
		} else {
			$bg.fadeOut(200);
			$help.animate({right:-400},500);
		}
	});
})