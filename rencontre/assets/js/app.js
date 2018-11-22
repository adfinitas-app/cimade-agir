$('.accompagner .box').click( function () {
    let index = $(this).index();

    $('#modal h6').html(title[index]);
    $('#modal p').html(text[index]);

    if (choice[index]) {
        $('#modal img').show();
        $('#modal img').attr('src', img[index]);
        $('#modal .video-container').hide();
    }
    else {
        $('#modal img').hide();
        $('#modal iframe').attr('src', video[index]);
        $('#modal .video-container').show();
    }
});

$('.infos .link a').click( function (e) {
    e.preventDefault();

    let index = $(this).index();

    $('.infos .text .accordeon-elem').each( function () {
        $(this).removeClass('active');
    });
    $('.infos .text .accordeon-elem').eq(index - 1).addClass('active');



    $('.infos .link a').each( function () {
        $(this).removeClass('active');
    });
    $(this).addClass('active');
});

$(document).on('closed', '.remodal', function () {
    if ($('#modal iframe').css('display') === "block")
        $('#modal iframe').attr('src', '');
});

$('#campagne').click( function (e) {
    e.preventDefault();
   scrollTo(".first .video", -50);
});

$('#actions').click( function (e) {
    e.preventDefault();
    scrollTo(".accompagner", -34);
});

$('#goDon').click( function (e) {
    e.preventDefault();
    scrollTo(".don", 0);
});

function    scrollTo(next, offset){
    if ($(next).length != 0)
    {
        $('html, body').stop().animate({
            scrollTop: $(next).offset().top + 1 + offset
        }, 700, 'swing');
        return false;
    }
};