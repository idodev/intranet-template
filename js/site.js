$(function(){
	$bg = $('.modal-backdrop');
	$help = $('section.help');

	$('.user .settings').click(function(){
		$(this).toggleClass('active');
	});

	$('.user .name').click(function(){
		$(this).toggleClass('active');
	});

	$('.user .signout a').click(function(e){
		e.preventDefault();
		var logoutUrl = $(this).prop('href');
		$.fn.msgBox({
			text:'Are you sure you wish to sign out?',
			buttons:{
				'Sign Out': {
					type: 'deny',
					action: function(){
						document.location = logoutUrl;
					}
				},
				'cancel': {}
			}
		});
	})
	$('.user .name a').click(function(e){
		e.preventDefault();
		$c = $(this).parents('.name');
		$i = $('i',this);
		newClass="";
		if($i.hasClass('online')) newClass = 'online';
		if($i.hasClass('busy')) newClass = 'busy';
		if($i.hasClass('away')) newClass = 'away';

		$(this).parents('.name').children('i')
		.removeClass('online')
		.removeClass('busy')
		.removeClass('away')
		.addClass(newClass);
		
		
	})

	$('.user .switch-user a').click(function(e){
		e.preventDefault();
		//get list of all users
		$select = $('<select name="SwitchToEmployeeID">');
		$.getJSON('users-list.json',function(list){
			$.each(list,function(id,name){
				$select.append($('<option>').val(id).text(name));
			});
			$.fn.msgBox({
				text:'Log in as: '+$select[0].outerHTML,
				buttons:{
					'Switch User': {
						type: 'accept',
						action: function(){
							alert($("select[name=SwitchToEmployeeID]").val());
						}
					},
					'cancel': {}
				}
			});
		})
	})


	$('.core-search-box .type').click(function(){
		$(this).toggleClass('active');
	});
	
	$('.core-search-box .type .mini-menu a').click(function(e){
		e.preventDefault();
		$('.core-search-box .type em').text($(this).text());
		$(this).parent('.type').removeClass('active');
	});

	$('.help-link').click(function(){
		if($help.css('right') == "-400px") {
			$bg.fadeIn(200);
			$help.animate({right:0},500);
		} else {
			$bg.fadeOut(200);
			$help.animate({right:-400},500);
		}
	});


	$(window).scroll(function(){
		if ($(this).scrollTop() > 10) {
			$('.scroll-to-top').fadeIn();
		} else {
			$('.scroll-to-top').fadeOut();
		}
	});
	$('.scroll-to-top').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});


	// Escape dialogs when clicking outside them 
	$(document).click(function(event){
		if (!$(event.target).closest(".user .settings").length)
			$(".user .settings").removeClass('active');

		if (!$(event.target).closest(".user .name").length)
			$(".user .name").removeClass('active');

		if (!$(event.target).closest(".core-search-box .type").length)
			$(".core-search-box .type").removeClass('active');

		if (!$(event.target).closest("section.help").length && $help.css('right') == "0px") {
			$help.animate({right:-400},500);
			$bg.fadeOut(200);
		}
	});

	// TABS Loader
	$('.tabs').each(function(){
		$('.tab',this).hide();
		var activeTab = $('.nav li.active a',this);
		if(activeTab.length == 0)
			activeTab = $('.nav li:first a',this);
		$('.tab[rel=' + activeTab.attr('href').replace('#','') + ']').show();
		$('.nav li a',this).removeClass('active');
		activeTab.addClass('active');

		$('.nav li a').on('click', function(e) {
			e.preventDefault()
			var $c = $(this).closest('.tabs');
			var $t = $('.tab[rel=' + $(this).attr('href').replace('#','') + ']');
			$('.tab', $c).hide();
			$t.show();

			$('.nav li a',$c).removeClass('active');
			$(this).addClass('active');

		});
	});
})






$.fn.msgBox = function(opts) {
	options = {
		type: 'confirm',
		text: '',
		buttons : null,
		canClose : false,
		modal:true,
		modalEl:'.modal-backdrop'
	};
	$.extend(options, opts);

	//alert div
	$alert = $('<div>').addClass('flash-message').hide();

	// close button
	if(options.canClose) {
		$close = $('<span>').addClass('close fa fa-times');
		$close.one('click', function() {
			$(options.modalEl).fadeOut(100);
			$(this).parents('.flash-message').fadeOut(200,function(){ $(this).remove(); });
		})
		$alert.append($close);
	}

	// text
	$alert.append($('<p>').html(options.text));

	//buttons
	if(options.buttons != null) {
		$buttons = $('<div>').addClass('buttons');
		$.each(options.buttons,function(name,buttonOpts) {
			if(name == 'cancel') {
				$button = $('<a>').addClass('cancel').text('cancel');
				$button.one('click',function() {
					$(options.modalEl).fadeOut(100);
					$(this).closest('.flash-message').fadeOut(200,function(){ $(this).remove(); });
				});
			} else {
				$button = $('<button>').text(name);
				$button.addClass(buttonOpts.type);
				if(buttonOpts.action)
					$button.one('click',buttonOpts.action);
			}
			$buttons.append($button);
		});
		$alert.append($buttons);
	}


    $('body').append($alert.fadeIn(200));
    if(options.modal) $(options.modalEl).fadeIn(200);
    return $alert;
};
