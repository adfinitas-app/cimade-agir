$(function(){
    $("#f_tel").intlTelInput({initialCountry: "fr", onlyCountries: ["al", "ad", "at", "by", "be", "ba", "bg", "hr", "cz", "dk", 
        "ee", "fo", "fi", "fr", "de", "gi", "gr", "va", "hu", "is", "ie", "it", "lv", 
        "li", "lt", "lu", "mk", "mt", "md", "mc", "me", "nl", "no", "pl", "pt", "ro", 
        "ru", "sm", "rs", "sk", "si", "es", "se", "ch", "ua", "gb"] });
});


$(document).ready( function() {


});
$(window).scroll( function() {
    checkOffset();
});

function checkOffset() {
    var positionForm = $('#form').offset();
    var positionSlide = $('.infos').offset();
    console.log("Form == " + positionForm.top + $('#form').height());
    console.log("Slide == " + positionSlide.top);
    if ($('#form').offset().top + $('#form').height() >= $('.infos').offset().top - 70)
    {
        $('#form').css('position', 'absolute');
        if ((positionForm.top + $('#form').height) < positionSlide.top)
            $('#form').css('top', positionForm.top);
    }
    if ($(document).scrollTop() + window.innerHeight < $('.infos').offset().top)
    {
        $('#form').css('position', 'fixed');
    }
        
}

function fillOutForm() {
    if ('lastname' in p)
        $('#f_name').val(p['lastname']);
    if ('firstname' in p)
        $('#f_prenom').val(p['firstname']);
    if ('email' in p)
        $('#f_email').val(p['email']);
    if ('phone' in p)
        $('#f_tel').val(p['phone']);
}

function    scrollTo(next){
    if ($(next).length != 0)
    {
        $('html, body').stop().animate({
            scrollTop: $(next).offset().top + 1
        }, 700, 'swing');
        return false;
    }
};





function assignQuery(query) {
    $(".link-don").each( function() {
        $(this).attr("href", $(this).attr("href") + query);
    });
}

function addIraiserLink() {
    if ('reserved_code_media' in p) {
        if (p['reserved_code_media'].localeCompare("W17F60A1Z") == 0 || p['reserved_code_media'].localeCompare("W17P60ZZH") == 0) {
            $('.btn-adhere').hide();
            $('.big-for-hide').removeClass('large-6').addClass('large-12');
            if (p['reserved_code_media'].localeCompare("W17P60ZZH") == 0) {
                $('.btn-adhere.other').show();
                $('.big-for-hide').removeClass('large-12').addClass('large-6');
            }
        }
        if ('reserved_code_media' in p) {
            assignQuery('&reserved_code_media=' + p['reserved_code_media']);
            if ('reserved_code_email' in p) {
                assignQuery('&reserved_code_email=' + p['reserved_code_email']);
            }
        }
    }
}







function validateForm() {
    var emailID = document.getElementById('f_email').value;
    atpos = emailID.indexOf("@");
    dotpos = emailID.lastIndexOf(".");

    if (document.getElementById('f_name').value.length == 0) {  
        $('.error_np').show();
        document.getElementById('f_name').focus() ;
        return false;  
    }
    else 
        $('.error_np').hide();

    if ((document.getElementById('f_prenom').value.length == 0)) {
        $('.error_np').show();
        document.getElementById('f_prenom').focus() ;
        return false;  
    }
    else 
        $('.error_np').hide();

    if (atpos < 1 || ( dotpos - atpos < 2 ) && index.html) 
    {
        $('.error_mail').show();
        document.getElementById('f_email').focus() ;
        return false;
    }
    else
        $('.error_mail').hide();

    if((!$("input[name='civility']:checked").val())) {
        $('.error_civ').show();
        return false;
    }
    else {
       $('.error_civ').hide();
   }

   if(grecaptcha.getResponse().length == 0) {
    $('.error_captcha').show();
    return false;
}
else {
   $('.error_captcha').hide();
}

//formToDb();
//SendDataToWoopra();
submitForm();
return true;
};



function SendDataToWoopra() {		

 woopra.identify({		
     email: document.getElementById('f_email').value,		
     name: document.getElementById('f_prenom').value + " " + document.getElementById('f_name').value,		
     firstname: document.getElementById('f_prenom').value,		
     lastname: document.getElementById('f_name').value	
 });		

 var optin = "";		
 if(document.getElementById('f_check').checked == true)		
     optin = "non";		
 else		
     optin = "oui";		

 woopra.track("moipresident_2017", {		
     partenaires_optin: optin,		
     phone: document.getElementById('f_tel').value,			
 });			
} 

function formToDb() {		
    var canal = "";		
    var q = [];		
    var optin = "";		
    var i = 0;		

     /*if ('canal' in p) {		
         canal = "orixa"		
     }		
     else {		
         canal = "bdd";		
     }*/		

     if(document.getElementById('f_check').checked == true)		
         optin = "non";		
     else		
         optin = "oui";		

     $(".selected").each( function() {		
         q[i] = $(this).find("p:nth-child(2)").text();		
         i++;		
     })		

     var data = {		
         "schema": "spa_petition_2017",		
         "db": {		
             "origin": "Enquete 2017",		
             "email": $("#f_email").val(),		
             "firstname": $('#f_prenom').val(),		
             "lastname": $('#f_name').val(),		
             "phone": $('#f_tel').val(),		
             "optin": optin,		
             "reponse1": q[0],		
             "reponse2": q[1],		
             "reponse3": q[2]		
         }		
     }		
     makeCorsRequest(data, 0);		
 }

 /* form-to-db */
 function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
}
return "";
}

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
} else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
} else {
    // CORS not supported
    xhr = null;
}
return xhr;
}

function makeCorsRequest(data, mode) {		 
 if (mode == 0)	 
     var url = 'https://form-to-db.herokuapp.com/';		
 else		
     var url = 'http://adfinitas-io.herokuapp.com/api/v1/organization/3a15acaa-ae68-49cf-9244-616cb46067ff/webhook/97ea9471-84a7-4e59-8b06-533b8a483f77'; 

 var body = JSON.stringify(data);
 var xhr = createCORSRequest('POST', url);
 if (!xhr) {
    alert('CORS not supported');
    return;
}
xhr.setRequestHeader('Content-Type', 'application/json');
  // Error Handler
  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
};
xhr.send(body);
}
/* end form-to-db */

function extractUrlParams(){    
    var t = document.location.search.substring(1).split('&'); var f = [];
    for (var i=0; i<t.length; i++){
        var x = t[ i ].split('=');
        f[x[0]]=decodeURIComponent(x[1]);
    }
    return f;
};


function    scrollTo(next){
    if ($(next).length != 0)
    {
        $('html, body').stop().animate({
            scrollTop: $(next).offset().top + 1
        }, 700, 'swing');
        return false;
    }
};


function getCodeMedia() {
  if (typeof(p['reserved_code_media']) == 'undefined') {
    return ''
} else {
    return p['reserved_code_media']
}
}

function isOptin() {
    if(document.getElementById('f_check').checked)
        return false;
    else
        return true;
}
function pureField(string) {
  return (string.replace(/'/g, "%27").replace(/"/g, "&quot;"));
}

function getSexe() {
  if (pureField($("input[name='civility']:checked").val()) == 'Madame') {
    return 'Femme';
} else {
    return 'Homme';
}
}

function getCivilityDear() {
  if (pureField($("input[name='civility']:checked").val()) == 'Madame') {
    return 'Chère';
} else {
    return 'Cher';
}
}

function getCivilityLong() {
  if (pureField($("input[name='civility']:checked").val()) == 'Madame')
    return 'MADAME';
else
    return 'MONSIEUR';
}

function getAddLists() {
    var list = [];

    list.push("moipresident_2017");


    if (isOptin()) {
        list.push("optin_partenaires");
    }
    return list;
}

function submitForm() {

    var q= [];
    $(".selected").each( function() {
        q.push($(this).find("p:nth-child(2)").text());
    })
    
    var data = {
        "db": {
          "schema": "spa_moipresident_2017",
          "db": {
            "email": pureField($("input[name='email']").val()),
            "phone": pureField($("input[name='phone']").val()),
            "sexe": getSexe(),
            "civility": pureField($("input[name='civility']:checked").val()),
            "civility_dear": getCivilityDear(),
            "civility_long": getCivilityLong(),
            "personnalisation": getCivilityDear() + ' ' + pureField($("input[name='civility']:checked").val()).toUpperCase() + ' ' + pureField($("input[name='lastname']").val()).toUpperCase(),
            "personnalisation_courte": pureField($("input[name='civility']:checked").val()).toUpperCase() + ' ' + pureField($("input[name='lastname']").val()).toUpperCase(),
            "firstname": pureField($("input[name='firstname']").val().toUpperCase()),
            "lastname": pureField($("input[name='lastname']").val().toUpperCase()),
            "name": pureField($("input[name='firstname']").val()) + ' ' + pureField($("input[name='lastname']").val()),
            "partenaires_optin": $("input[name='optin']:checked").size() != 0,
            "reserved_code_media": getCodeMedia(),
            "language": $("input[name='language']").val(),
            "ce_reponse1": q[0],
            "ce_reponse2": q[1],
            "ce_reponse3": q[2]
        }
    },
    "woopra" : {
      "host": "spa.asso.fr",
      "cookie": getCookie("wooTracker"),
      "event": "moipresident_2017",
      "cv_email": pureField($("input[name='email']").val()),
      //"cv_phone": pureField($("input[name='phone']").val()),
      "cv_sexe": getSexe(),
      "cv_firstname": pureField($("input[name='firstname']").val()),
      "cv_lastname": pureField($("input[name='lastname']").val()),
      "cv_name": pureField($("input[name='firstname']").val()) + ' ' + pureField($("input[name='lastname']").val()),
      "ce_email": pureField($("input[name='email']").val()),
      "ce_phone": pureField($("input[name='phone']").val()),
      "ce_firstname": pureField($("input[name='firstname']").val()),
      "ce_lastname": pureField($("input[name='lastname']").val()),
      "ce_name": pureField($("input[name='firstname']").val()) + ' ' + pureField($("input[name='lastname']").val()),
      "cv_partenaires_optin": isOptin(),
      "ce_reserved_code_media": getCodeMedia(),
      "ce_language": $("input[name='language']").val(),
      "ce_reponse1": q[0],
      "ce_reponse2": q[1],
      "ce_reponse3": q[2]
  },
  "mailjet": {
      "Email": pureField($("input[name='email']").val()),
      "Properties": {
        "sexe": getSexe(),
        "civility": pureField($("input[name='civility']:checked").val()),
        "civility_dear": getCivilityDear(),
        "civility_long": getCivilityLong(),
        "personnalisation": getCivilityDear() + ' ' + pureField($("input[name='civility']:checked").val()).toUpperCase() + ' ' + pureField($("input[name='lastname']").val()).toUpperCase(),
        "personnalisation_courte": pureField($("input[name='civility']:checked").val()).toUpperCase() + ' ' + pureField($("input[name='lastname']").val()).toUpperCase(), "firstname": pureField($("input[name='firstname']").val()),
        "lastname": pureField($("input[name='lastname']").val()),
        "name": pureField($("input[name='firstname']").val()) + ' ' + pureField($("input[name='lastname']").val()),
        "partenaires_optin": $("input[name='optin']:checked").size() != 0,
        "reserved_code_media": getCodeMedia(),
        "language": $("input[name='language']").val()
    },
    "addLists": getAddLists(),
    "delLists": []
},
"grecaptcha_response": grecaptcha.getResponse()
}
makeCorsRequest(data, 1);
}