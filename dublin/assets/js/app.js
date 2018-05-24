

$(document).ready( function () {
    $("#f_phone").intlTelInput({
        utilsScript:"https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.13/js/utils.js",
        initialCountry:"fr"
    });

    var CountRef = firebase.database().ref('count');

    CountRef.once('value', function(snapshot) {
        $('#nb-signatures').html(snapshot.val());
    });


    fillFieldsFromUrl();
    if ($(window).width() > 640) {
        $(document).foundation();

        $('.body').css('min-height', $(window).height() - ($('.header').height() + 20));
        $('.body .left').css('min-height', $(window).height() - ($('.header').height() + 20));
        $('.body .right').css('min-height', $(window).height() - ($('.header').height() + 20));
    }




    $('.open-petition').click( function () {
        $('.section.text-begin').hide();
        $('.section.petition').show();
        $(document).scrollTop( $("#body").offset().top + 1);
    });
    $('.close-petition').click( function () {
        $('.section.text-begin').show();
        $('.section.petition').hide();
        $(document).scrollTop( $("#body").offset().top + 1);
    });
    $('.open-video').click( function () {
        $('.section.text-begin').hide();
        $('.section.video').show();
        $('.body .left').css('background-color','#191919');
        $(document).scrollTop( $("#body").offset().top + 1);
    });
    $('.close-video').click( function () {
        $('.section.text-begin').show();
        $('.section.video').hide();
        $('.body .left').css('background-color','white');
        $(document).scrollTop( $("#body").offset().top + 1);
    });

});

function addVote() {
    var CountRef = firebase.database().ref('count');

    CountRef.once('value', function(snapshot) {
        $('#nb-signatures').html(snapshot.val() + 1);
        firebase.database().ref('count').set(snapshot.val() + 1);
    });

}

$('form').submit( function (e) {
    e.preventDefault();

    if ($(this).hasClass('validate')) {
        if (validateForm()) {
            $('#body').fadeOut(function () {
                $('#merci').fadeIn( function () {
                    $(document).scrollTop( $("header").offset().top + 1);
                });
            });
            addVote();
            sendData();
        }
    }
    else {
        $('.error-generic').hide();
        if ($('#f_email').val() !== "") {
            if (!validateEmail($('#f_email').val())) {
                $('.error-mail-wrong').show();
                $('#f_email').addClass('red-border');
                check = false;
            }
            else {
                $('.error-mail-wrong').hide();
                $('.error-generic').hide();
                $(this).find('.hidden').slideDown();
                $(this).addClass('validate');
            }
        }
        else {
            $('.error-generic').show();
        }

    }


});


function validateForm() {
    var check = true;
    var selectedOption;
    if ($('#f_female').is(":checked"))
        selectedOption = "Madame";
    else if ($('#f_male').is(":checked"))
        selectedOption = "Monsieur";
    else
        selectedOption = "";


    $('.error').hide();
    $('.civilite-container *').css('color','white');
    $('#form input').each( function() {
        $(this).removeClass('red-border');

        if ($(this).hasClass('required')) {
            if ($(this).val() === "") {
                $('.error-generic').show();
                $(this).addClass('red-border');
                check = false;
            }
        }
    });

    if (selectedOption === "") {
        $('.civilite-container *').css('color','black');
        $('.error-civility').show();
        check = false;
    }

    if ($('#f_email').val() !== "") {
        if (!validateEmail($('#f_email').val())) {
            $('.error-mail-wrong').show();
            $('#f_email').addClass('red-border');
            check = false;
        }
    }
    if ($('#f_phone').val() != "") {
        if (!$("#f_phone").intlTelInput("isValidNumber")) {
            $('.error-phone-wrong').show();
            $('#f_phone').addClass('red-border');
            check = false;
        }
    }
    return check;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function fillFieldsFromUrl() {
    var p = extractUrlParams();

    if (p['email'] && p['email'] !== "undefined")
        $("#f_email").val(p['email']);
    if (p['firstname'] && p['firstname'] !== "undefined")
        $("#f_firstname").val(p['firstname']);
    if (p['lastname'] && p['lastname'] !== "undefined")
        $("#f_lastname").val(p['lastname']);
    if (p['phone'] && p['phone'] !== "undefined")
        $("#f_phone").val(p['phone']);
}

function extractUrlParams(){
    var t = document.location.search.substring(1).split('&'); var f = [];
    for (var i=0; i<t.length; i++){
        var x = t[ i ].split('=');
        f[x[0]]=decodeURIComponent(x[1]);
    }
    return f;
}