$(document).foundation();
fillFieldsFromUrl();

$('form').submit( function (e) {
    e.preventDefault();

    if (validateForm())
        sendData();
});


function validateForm() {
    let check = true;
    let selectedOption;


    if($('#civilityWoman').is(':checked'))
        selectedOption = "Madame";
    else if($('#civilityMan').is(':checked'))
        selectedOption = "Monsieur";
    else
        selectedOption = "";

    $('.error').hide();

    if (selectedOption === "") {
        $('.error-civility').show();
        check = false;
    }

    if ($('#email').val() === "") {
        $('.error-mail').show();
        check = false;
    }
    if ($('#firstName').val() === "") {
        $('.error-firstname').show();
        check = false;
    }
    if ($('#lastName').val() === "") {
        $('.error-lastname').show();
        check = false;
    }

    if ($('#email').val() !== "") {
        if (!validateEmail($('#email').val())) {
            $('.error-mail-wrong').show();
            check = false;
        }
    }
    if ($('#telephone').val() !== "") {
        if (!$("#telephone").intlTelInput("isValidNumber")) {
            $('.error-phone-wrong').show();
            check = false;
        }
    }
    return check;
}
function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function fillFieldsFromUrl() {
    let p = extractUrlParams();

    if (p['email'] && p['email'] !== "undefined")
        $("#email").val(p['email']);
    if (p['firstname'] && p['firstname'] !== "undefined")
        $("#firstName").val(p['firstname']);
    if (p['lastname'] && p['lastname'] !== "undefined")
        $("#lastName").val(p['lastname']);
    if (p['phone'] && p['phone'] !== "undefined")
        $("#telephone").val(p['phone']);
    if (p['civility'] && p['civility'] !== "undefined") {
        if (p['civility'].toLowerCase() === "madame")
            $('#civilityWoman').prop('checked', true);
        else if (p['civility'].toLowerCase() === "monsieur")
            $('#civilityMan').prop('checked', true);
    }
    if (p['wv_email'] && p['wv_email'] !== "undefined")
        $("#email").val(p['wv_email']);
    if (p['n_email'] && p['n_email'] !== "undefined")
        $("#email").val(p['n_email']);
    if (p['wv_firstname'] && p['wv_firstname'] !== "undefined")
        $("#firstName").val(p['wv_firstname']);
    if (p['wv_lastname'] && p['wv_lastname'] !== "undefined")
        $("#lastName").val(p['wv_lastname']);
    if (p['wv_phone'] && p['wv_phone'] !== "undefined")
        $("#telephone").val(p['wv_phone']);
    if (p['wv_civility'] && p['wv_civility'] !== "undefined") {
        if (p['civility'].toLowerCase() === "madame")
            $('#civilityWoman').prop('checked', true);
        else if (p['civility'].toLowerCase() === "monsieur")
            $('#civilityMan').prop('checked', true);
    }
}

function extractUrlParams(){
    let t = document.location.search.substring(1).split('&'); let f = [];
    for (let i=0; i<t.length; i++){
        let x = t[ i ].split('=');
        f[x[0]]=decodeURIComponent(x[1]);
    }
    return f;
}

function showNotif() {
    $('.notification').slideDown( "slow", function() {
        setTimeout(function(){
            $('.notification').slideUp("slow");
        }, 5000);
    });
}

function handlePhoneNumber () {
    let form = document.getElementById("form");
    let dialCode = "00" + document.getElementsByClassName("selected-flag")[0].getAttribute("title").split("+")[1];
    let phoneNumber = document.getElementById("telephone");

    if (phoneNumber.value.charAt(0) === '0')
        phoneNumber.value = phoneNumber.value.substr(1);
    phoneNumber.value = dialCode + phoneNumber.value;
}