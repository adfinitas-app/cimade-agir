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

    $('.infos .link a').each( function () {
        $(this).removeClass('active');
        if ($(this).index() !== index)
            $(this).next().slideUp();
    });
    $(this).next().slideDown();
});

$(document).on('closed', '.remodal', function () {
    if ($('#modal iframe').css('display') === "block")
        $('#modal iframe').attr('src', '');
});