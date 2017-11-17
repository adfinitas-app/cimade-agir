function preload() {
	for (i = 0; i < preload.arguments.length; i++) {
		images[i] = new Image()
		images[i].src = preload.arguments[i]
	}
};

$(document).ready(function() {
	images = new Array();
	preload(
		'https://s3.amazonaws.com/heroku-adfinitas-campaign/VLM-virades/LP/menu-burger-close-icon.png',
		'https://s3.amazonaws.com/heroku-adfinitas-campaign/VLM-virades/LP/menu-burger-icon.png',
		'https://s3.amazonaws.com/heroku-adfinitas-campaign/cimade-no%C3%ABl-2017/facebook-hover.png',
		'https://s3.amazonaws.com/heroku-adfinitas-campaign/cimade-no%C3%ABl-2017/twitter-hover.png'
	);

	$('#burger').click(function() {
		var that = $(this);

		if ( that.hasClass('folded') ) {
			that.removeClass('folded').addClass('unfolded');
			that.attr('src', 'https://s3.amazonaws.com/heroku-adfinitas-campaign/VLM-virades/LP/menu-burger-close-icon.png')
			$('.deplier').show('easing');
		} else if ( that.hasClass('unfolded') ){
			that.removeClass('unfolded').addClass('folded');
			that.attr('src', 'https://s3.amazonaws.com/heroku-adfinitas-campaign/VLM-virades/LP/menu-burger-icon.png')
			$('.deplier').hide('easing');
		}
	});

	$('.sommes-nous .text_accordeon').css('background-color', '#423733');
	$('.sommes-nous .text_accordeon').css('color', 'white');
	$('.sommes-nous-hide').css('display', 'block');

	$('.sommes-nous a').click(function (e) {
		e.preventDefault();
		$('.sommes-nous .text_accordeon').css('background-color', '#423733');
		$('.sommes-nous .text_accordeon').css('color', 'white');
		$('.sommes-nous-hide').slideDown();
		$('.mission .text_accordeon').css('background-color', '#A59982');
		$('.mission .text_accordeon').css('color', 'black');
		$('.mission-hide').slideUp();
		$('.efficacite .text_accordeon').css('background-color', '#A59982');
		$('.efficacite .text_accordeon').css('color', 'black');
		$('.efficacite-hide').slideUp();
		$('.derouler li').slideUp();
	});

	$('.mission a').click(function (e) {
		e.preventDefault();
		$('.mission .text_accordeon').css('background-color', '#423733');
		$('.mission .text_accordeon').css('color', 'white');
		$('.mission-hide').slideDown();
		$('.sommes-nous .text_accordeon').css('background-color', '#A59982');
		$('.sommes-nous .text_accordeon').css('color', 'black');
		$('.sommes-nous-hide').slideUp();
		$('.efficacite .text_accordeon').css('background-color', '#A59982');
		$('.efficacite .text_accordeon').css('color', 'black');
		$('.efficacite-hide').slideUp();
		$('.derouler li').slideUp();
	});

	$('.efficacite a').click(function (e) {
		e.preventDefault();
		$('.efficacite .text_accordeon').css('background-color', '#423733');
		$('.efficacite .text_accordeon').css('color', 'white');
		$('.efficacite-hide').slideDown();
		$('.mission .text_accordeon').css('background-color', '#A59982');
		$('.mission .text_accordeon').css('color', 'black');
		$('.mission-hide').slideUp();
		$('.sommes-nous .text_accordeon').css('background-color', '#A59982');
		$('.sommes-nous .text_accordeon').css('color', 'black');
		$('.sommes-nous-hide').slideUp();
		$('.derouler li').slideDown();
	});

	$('#shareFb').hover(function() {
		$(this).attr('src', 'https://s3.amazonaws.com/heroku-adfinitas-campaign/cimade-no%C3%ABl-2017/facebook-hover.png');
	}, function () {
		$(this).attr('src', 'https://s3.amazonaws.com/heroku-adfinitas-campaign/cimade-no%C3%ABl-2017/facebook.png');
	});

	$('#shareTw').hover(function() {
		$(this).attr('src', 'https://s3.amazonaws.com/heroku-adfinitas-campaign/cimade-no%C3%ABl-2017/twitter-hover.png');
	}, function () {
		$(this).attr('src', 'https://s3.amazonaws.com/heroku-adfinitas-campaign/cimade-no%C3%ABl-2017/twitter.png');
	});

	$('.menu-item').click(function() {
		var offset;
		var that = $(this);
		if ( that.hasClass('campagne') ) {
			offset = $('header').offset().top;
		} else if ( that.hasClass('actions') ) {
			offset = $('section#papier').offset().top;
		} else if ( that.hasClass('faireUnDon') ) {
			return true;
			offset = $('section#eq').offset().top;
		}
		$('html, body').animate({
			scrollTop: offset
		}, 500);
	});
});
