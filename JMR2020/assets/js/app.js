var toggle = true
var img = [
]
preload(img)

$(window).scroll(function (event) {

    handleNav()
    handleMenuScroll()
});

function handleNav() {
    var scroll = $(window).scrollTop();

    if (scroll > 0) {
        $('#nav').addClass('opaque')
    }
    else {
        $('#nav').removeClass('opaque')
    }
}


$(window).resize( function() {
});

$(document).ready( function() {
    handleMenuScroll()
    fillLink()
    handleNav()
    $(document).foundation();

    $('#nav .elements a').click(function (e) {
        e.preventDefault()

        scrollTo($(`#${$(this).attr('title')}`))
    })

    $('.show-more').click(function (e) {
        e.preventDefault()

        if ($(this).hasClass('small')) {
            scrollTo($(this).parent().parent().parent().parent().next().next())
        }
        else
            scrollTo($(this).parent().parent().parent().parent().parent().next())
    })

    $('.plus').click(function (e) {
        e.preventDefault()

        if ($(this).hasClass('active')) {
            changeTextPanel(0, 1)
        }
        else {
            var index

            if ($(this).hasClass('small')) {
                index = parseInt($(this).parent().parent().parent().parent().parent().attr('id').replace(/\D/g,'')) - 1
            }
            else
                index = parseInt($(this).parent().parent().parent().parent().attr('id').replace(/\D/g,'')) - 1

            changeTextPanel(index, 0)
        }
    })
});

function changeTextPanel(index, mode) {
    $('#panel .text').empty()
    if (mode === 0) {
        $('#panel .text').append(data[index])
        $('#panel').addClass('visible')
        $('.slide .actions').addClass('active')
        $('.plus').addClass('active')
    }
    else if (mode === 1) {
        $('#panel').removeClass('visible')
        $('.slide .actions').removeClass('active')
        $('.plus').removeClass('active')
    }
    else if (mode === 2) {
        $('#panel .text').append(data[index])
    }
}

function handleMenuScroll() {
    var index = 0;
    var indexText = 0

    var scroll = $(window).scrollTop();
    var scrollSlide1 = $('#slide2').offset().top - 1;
    var scrollSlide2 = $('#slide3').offset().top - 1;
    var scrollSlide3 = $('#slide4').offset().top - 1;
    var scrollSlide4 = $('#end').offset().top - 1;

    if (scroll >= scrollSlide1 && scroll <= scrollSlide2) {
        index = 1
        indexText = 1
    }
    else if (scroll >= scrollSlide2 && scroll <= scrollSlide3) {
        index = 2
        indexText = 2
    }
    else if (scroll >= scrollSlide3 && scroll <= scrollSlide4) {
        index = 3
        indexText = 3
    }
    else if (scroll >= scrollSlide4) {
        indexText = -1
    }


    $('#nav .elements a').each(function () {
        $(this).removeClass('active')
    })
    $('#nav .elements a').eq(index).addClass('active')
    if (indexText === -1) {
        changeTextPanel(0, 1)
    }
    else
        changeTextPanel(indexText, 2)
}


function 	scrollTo(next){
    $('html, body').stop().animate({
        scrollTop: $(next).offset().top - 0
    }, 700, 'swing');
}

function fillLink() {
    let p = extractUrlParams();
    let string = ''


    if (p['email'] && p['email'] !== "undefined")
        string += ("&email=" + p['email']);
    else if (p['wv_email'] && p['wv_email'] !== "undefined")
        string += ("&email=" + p['wv_email']);
    if (p['wv_firstname'] && p['wv_firstname'] !== "undefined")
        string += ("&firstname=" + p['wv_firstname']);
    else if (p['firstname'] && p['firstname'] !== "undefined")
        string += ("&firstname=" + p['firstname']);
    if (p['wv_lastname'] && p['wv_lastname'] !== "undefined")
        string += ("&lastname=" + p['wv_lastname']);
    else if (p['lastname'] && p['lastname'] !== "undefined")
        string += ("&lastname=" + p['lastname']);
    if (p['reserved_code_media'] && p['reserved_code_media'] !== "undefined")
        string += ("&reserved_code_media=" + p['reserved_code_media']);
    if (p['utm_campaign'] && p['utm_campaign'] !== "undefined")
        string += ("&utm_campaign=" + p['utm_campaign']);
    else
        string += ("&utm_campaign=JMR20");
    if (p['utm_source'] && p['utm_source'] !== "undefined")
        string += ("&utm_source=" + p['utm_source']);
    else
        string += ("&utm_source=LP");
    if (p['utm_medium'] && p['utm_medium'] !== "undefined")
        string += ("&utm_medium=" + p['utm_medium']);

    $('.link-don').each(function (el) {
        $('.link-don').eq(el).attr('href', $('.link-don').eq(el).attr('href') + string)
    })


}

function extractUrlParams(){
    var t = document.location.search.substring(1).split('&'); var f = [];
    for (var i=0; i<t.length; i++){
        var x = t[ i ].split('=');
        f[x[0]]=decodeURIComponent(x[1]);
    }
    return f;
};

function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}