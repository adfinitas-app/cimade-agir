	$(function(){
		$("#f_tel").intlTelInput({initialCountry: "fr", onlyCountries: ["al", "ad", "at", "by", "be", "ba", "bg", "hr", "cz", "dk", 
			"ee", "fo", "fi", "fr", "de", "gi", "gr", "va", "hu", "is", "ie", "it", "lv", 
			"li", "lt", "lu", "mk", "mt", "md", "mc", "me", "nl", "no", "pl", "pt", "ro", 
			"ru", "sm", "rs", "sk", "si", "es", "se", "ch", "ua", "gb"] });
	});

	$('#f_summit').click( function() {
		
	});




    function validateForm(mode) {
        var check = 0;
        var emailID = $("input[name='email']").val();
        atpos = emailID.indexOf("@");
        dotpos = emailID.lastIndexOf(".");


        $("input").each( function() {
            if ($(this).val().length == 0) {
                if ($(this).attr('id') == "f_tel")
                    return;
                check++;
                $(this).css('border','1px solid red');
            }
            else
                $(this).css('border','1px solid #cacaca');
        });

        if($("input[name='civility']").length && (!$("input[name='civility']:checked").val())) {
            check ++;
            $('.radio p').css('color', 'red');
        }
        else {
            $('.radio p').css('color', 'black');
        }
        $('.error').hide();

        if (check != 0) {
            $('.g_error').show();
            return false;
        }

        if (atpos < 1 || ( dotpos - atpos < 2 ) && index.html) 
        {
            $('.error_mail').show();
            $("input[name='email']").css('border','1px solid red');
            $("input[name='email']").focus() ;
            return false;
        }
        else
            $('.error_mail').hide();

        scrollTo($("#logo"));
        $('.notification').slideDown("slow", function() {
        });
        if (mode == 0) { // PRESSE 
        	woopra.track("inscription", {
		        url: document.location.href,
		        title: document.title,
		        optin: '',
		        origine: "SI",
		        type: 'journaliste'
    	});
            submitForm(0);
        }
        else    {       // LETTRE D'INFORMATION
            woopra.track("inscription", {
		        url: document.location.href,
		        title: document.title,
		        optin: '',
		        origine: "SI",
		        type: 'newsletter'
    	    });
            submitForm(1);
        }
    }






    function extractUrlParams(){
      var t = document.location.search.substring(1).split('&'); var f = [];
      for (var i=0; i<t.length; i++){
         var x = t[ i ].split('=');
         f[x[0]]=decodeURIComponent(x[1]);
     }
     return f;
 };

 var p = extractUrlParams();

 if (p['email'] && p['email'] != "undefined") {
  $("input[name=email]").val(p['email']);
}

if (p['firstname'] && p['firstname'] != "undefined") {
  $("input[name=firstname]").val(p['firstname']);
}

if (p['lastname'] && p['lastname'] != "undefined") {
  $("input[name=lastname]").val(p['lastname']);
}

if (p['phone'] && p['phone'] != "undefined") {
  $("input[name=phone]").val(p['phone']);
}


/*
 * Debut de la lib
 */

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
    // CORS not supported.
    xhr = null;
}
return xhr;
}
function makeCorsRequest(data) {
	var url = 'http://adfinitas-io.herokuapp.com/api/v1/organization/adc529c9-3414-4e80-8004-b2002885ee65/webhook/3a66a987-839b-4275-8149-109503eb09e1';
	var body = JSON.stringify(data);
	var xhr = createCORSRequest('POST', url);
	if (!xhr) {
		alert('CORS not supported');
		return;
	}
	xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(body);
}

/*
 * Fin de la lib
 */

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
 	if (pureField($("input[name='civility']:checked").val()) == 'Madame') {
 		return 'MADAME';
 	} else {
 		return 'MONSIEUR';
 	}
 }


 function submitForm(mode) {
     if (mode == 0) // PRESSE
     {
       var data = {
          "db": {
             "schema": "cimade_journaliste",
             "db": {
                "email": pureField($("input[name='email']").val()),
                "phone": pureField($("input[name='phone']").val()),
                "firstname": pureField($("input[name='firstname']").val()),
                "lastname": pureField($("input[name='lastname']").val()),
                "name": pureField($("input[name='firstname']").val()) + ' ' + pureField($("input[name='lastname']").val()),
                "media": pureField($("input[name='media']").val()),
                "language": $("input[name='language']")
            },
        },
        "woopra" : {
         "host": "lacimade.org",
         "cookie": getCookie("wooTracker"),
         "event": "inscription-presse",
         "cv_email": pureField($("input[name='email']").val()),
         "cv_phone": pureField($("input[name='phone']").val()),
         "cv_firstname": pureField($("input[name='firstname']").val()),
         "cv_lastname": pureField($("input[name='lastname']").val()),
         "cv_name": pureField($("input[name='firstname']").val()) + ' ' + pureField($("input[name='lastname']").val()),
         "ce_email": pureField($("input[name='email']").val()),
         "ce_phone": pureField($("input[name='phone']").val()),
         "ce_firstname": pureField($("input[name='firstname']").val()),
         "ce_lastname": pureField($("input[name='lastname']").val()),
         "ce_name": pureField($("input[name='firstname']").val()) + ' ' + pureField($("input[name='lastname']").val()),
         "ce_media": pureField($("input[name='media']").val()),
         "language": $("input[name='language']")
     },
     "mailjet": {
         "Email": pureField($("input[name='email']").val()),
         "Properties": {
            "firstname": pureField($("input[name='firstname']").val()),
            "lastname": pureField($("input[name='lastname']").val()),
            "name": pureField($("input[name='firstname']").val()) + ' ' +
            pureField($("input[name='lastname']").val()),
            "language": $("input[name='language']")
        },
        "addLists": ["mjlist_journalistes"],
        "delLists": ["mjlist_prospect"]
    },
    "grecaptcha_response": grecaptcha.getResponse()
}
}
else  // LETTRE D'INFORMATION
{
   var data = {
      "db": {
         "schema": "cimade_newsletter",
         "db": {
            "email": pureField($("input[name='email']").val()),
            "phone": pureField($("input[name='phone']").val()),
            "sexe": getSexe(),
            "civility": pureField($("input[name='civility']:checked").val()),
            "civility_dear": getCivilityDear(),
            "civility_long": getCivilityLong(),
            "personnalisation": getCivilityDear() + ' ' + pureField($("input[name='civility']:checked").val()).toUpperCase() + ' ' +
            pureField($("input[name='lastname']").val()).toUpperCase(),
            "personnalisation_courte": pureField($("input[name='civility']:checked").val()).toUpperCase() + ' ' +
            pureField($("input[name='lastname']").val()).toUpperCase(),
            "firstname": pureField($("input[name='firstname']").val()),
            "lastname": pureField($("input[name='lastname']").val()),
            "name": pureField($("input[name='firstname']").val()) + ' ' +
            pureField($("input[name='lastname']").val()),
            "partenaires_optin": $("input[name='optin']:checked").size() != 0,
            "language": "fr_FR"
        }
    },
    "woopra" : {
     "host": "lacimade.org",
     "cookie": getCookie("wooTracker"),
     "event": "inscription-newsletter",
     "cv_email": pureField($("input[name='email']").val()),
     "cv_phone": pureField($("input[name='phone']").val()),
     "cv_sexe": getSexe(),
     "cv_civility": pureField($("input[name='civility']:checked").val()),
     "cv_firstname": pureField($("input[name='firstname']").val()),
     "cv_lastname": pureField($("input[name='lastname']").val()),
     "cv_name": pureField($("input[name='firstname']").val()) + ' ' +
     pureField($("input[name='lastname']").val()),
     "ce_email": pureField($("input[name='email']").val()),
     "ce_phone": pureField($("input[name='phone']").val()),
     "ce_sexe": getSexe(),
     "ce_civility": pureField($("input[name='civility']:checked").val()),
     "ce_firstname": pureField($("input[name='firstname']").val()),
     "ce_lastname": pureField($("input[name='lastname']").val()),
     "ce_name": pureField($("input[name='firstname']").val()) + ' ' +
     pureField($("input[name='lastname']").val()),
     "ce_language": "fr_FR"
 },
 "mailjet": {
     "Email": pureField($("input[name='email']").val()),
     "Properties": {
        "sexe": getSexe(),
        "civility": pureField($("input[name='civility']:checked").val()),
        "civility_dear": getCivilityDear(),
        "civility_long": getCivilityLong(),
        "personnalisation": getCivilityDear() + ' ' + pureField($("input[name='civility']:checked").val()).toUpperCase() + ' ' +
        pureField($("input[name='lastname']").val()).toUpperCase(),
        "personnalisation_courte": pureField($("input[name='civility']:checked").val()).toUpperCase() + ' ' +
        pureField($("input[name='lastname']").val()).toUpperCase(),
        "firstname": pureField($("input[name='firstname']").val()),
        "lastname": pureField($("input[name='lastname']").val()),
        "name": pureField($("input[name='firstname']").val()) + ' ' +
        pureField($("input[name='lastname']").val()),
        "partenaires_optin": $("input[name='optin']:checked").size() != 0,
        "language": "fr_FR"
    },
    "addLists": [],
    "delLists": []
},
"grecaptcha_response": grecaptcha.getResponse()
}
}
makeCorsRequest(data);
}

function checkPhone() {
  $phone = $("#f_tel");
  if ($phone.intlTelInput("isValidNumber")) {
     $phone.get(0).setCustomValidity("");
 } else {
     $phone.get(0).setCustomValidity("Numéro de téléphone invalide");
 }
}

var submitted = false;
function launchTemplate() {
  $("#f_tel").intlTelInput({
     utilsScript: "/js/vendor/intl-tel-input/build/js/utils.js",
     initialCountry: "fr"
 });
  $("#f_tel").get(0).onchange = checkPhone;
  $('form').on('submit', function(e) {
     e.preventDefault();
     if (grecaptcha.getResponse().length == 0) {
        alert('Merci de remplir le reCaptcha');
        return;
    }
    if (!$('form').attr('disabled')) {
        $('form').attr('disabled', 'disabled')
        submitForm(function success() {
           $('.success').css('display', 'block');
           var url = $('#sondage-btn').attr('href');
           var params = {
              'firstname_hide': $('input[name=firstname]').val(),
              'lastname_hide': $('input[name=lastname]').val(),
              'phone_hide': $('input[name=phone]').val(),
              'email_hide': $('input[name=email]').val()
          };
          $('#sondage-btn').attr('href', url + '?' + $.param(params, true));
      }, function error() {
       alert('Woops, there was an error making the request.');
       $('form').removeAttr('disabled')
   });
    }
});
}

$(document).ready(launchTemplate);


function    scrollTo(next){
    if ($(next).length != 0)
    {
        $('html, body').stop().animate({
            scrollTop: $(next).offset().top + 1
        }, 700, 'swing');
        return false;
    }
};