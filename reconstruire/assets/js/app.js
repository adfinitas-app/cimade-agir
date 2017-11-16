

$(window).scroll(function() {
	var height = $(window).scrollTop();

	if(height  > $(window).height()) {
		$("#sticky").css('background-color','transparent');
	}
	else {
		if ($(window).width() > 640)
			$("#sticky").css('background-color','transparent');
	}
});

$(window).scroll(function() {
	var height = $(window).scrollTop();
	if(height  >= 120) {
		$("#small-sticky").css('display', 'block');
	}
	else {
		$("#small-sticky").css('display', 'none');
	}
});

$(window).resize( function() {
	console.log($(window).height());
});

$(document).ready( function() {
	setTimeout(function(){
		$('#logo').fadeIn();
		setTimeout(function(){
			$('.text-header h1').fadeIn().css("display","inline-block");
			$('.text-header #hashtag').fadeIn();
			setTimeout(function(){
				$('.text-header p').fadeIn();
				setTimeout(function(){
					$('.player-header h6').fadeIn();
					$('.player-header img').fadeIn();
					setTimeout(function(){
						$('.menu-header').fadeIn();
					}, 1000);
				}, 1000);
			}, 1000);
		}, 1000);
	}, 500);




	$('.box').hover( 
		function() {
			$(this).css('background-color', '#FB3349');
			$(this).find('p:nth-child(2)').css('color', 'white');
			$(this).find('p:nth-child(4)').css('color', 'white');
		},
		function() {
			$(this).css('background-color', 'white');
			$(this).find('p:nth-child(2)').css('color', '#e94b48');
			$(this).find('p:nth-child(4)').css('color', 'black');
		});




	$('#un').click( function() {
		$('html, body').animate({
        scrollTop: $('#story_capucine').offset().top
    }, 400);
	});
	$('#deux').click( function() {
		$('html, body').animate({
        scrollTop: $('#part_don').offset().top
    }, 400);
	});
	$('#trois').click( function() {
		$('html, body').animate({
        scrollTop: $('#60_ans').offset().top
    }, 400);
	});
	$('#extend').click( function() {
		$('#to_extend').css('display', 'block');
		$('#extend').css('display', 'none');
	})
	$('#extend-small').click( function() {
		$('#to_extend-small').css('display', 'block');
		$('#extend-small').css('display', 'none');
	})




});

var scale = 1;
setInterval(function(){
	scale = scale == 1 ? 1.05 : 1
	$('.player-header').css('transform', 'scale('+scale+')')
}, 1000)

var scale = 1;
setInterval(function(){
	scale = scale == 1 ? 1.05 : 1
	$('.player-small').css('transform', 'scale('+scale+')')
}, 1000)

$('#logo').click( function() {
	woopra.track('interaction', {category:"LOGO_FA17",action:"clic",url:document.location.href,title: document.title});
})

$('#sticky').click( function() {
	woopra.track('interaction', {category:"DON-CTA_FA17",action:"clic",url:document.location.href,title: document.title});
})

$('.player-header').click( function() {
	woopra.track('interaction', {category:"VIDEO-CTA_FA17",action:"clic",url:document.location.href,title: document.title});
})

$('.player-small').click( function() {
	woopra.track('interaction', {category:"VIDEO-CTA_FA17",action:"clic",url:document.location.href,title: document.title});
})

$('#don_70').click( function() {
	woopra.track('interaction', {category:"DON-CTA-70_FA17",action:"clic",url:document.location.href,title: document.title});
})

$('#don_100').click( function() {
	woopra.track('interaction', {category:"DON-CTA-100_FA17",action:"clic",url:document.location.href,title: document.title});
})

$('#don_200').click( function() {
	woopra.track('interaction', {category:"DON-CTA-200_FA17",action:"clic",url:document.location.href,title: document.title});
})