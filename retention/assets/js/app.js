$.fn.followTo = function (pos) {
  var $this = this,
  $window = $(window);

  $window.scroll(function (e) {
    if ($window.scrollTop() > pos) {
      $this.css({
        position: 'absolute',
        top: pos + (($this.height() / 2) - 6)
      });
    } else {
      $this.css({
        position: 'fixed',
        top: "250px"
      });
    }
  });
};

$(function(){
  $("#f_tel").intlTelInput({initialCountry: "fr", onlyCountries: ["al", "ad", "at", "by", "be", "ba", "bg", "hr", "cz", "dk", 
    "ee", "fo", "fi", "fr", "de", "gi", "gr", "va", "hu", "is", "ie", "it", "lv", 
    "li", "lt", "lu", "mk", "mt", "md", "mc", "me", "nl", "no", "pl", "pt", "ro", 
    "ru", "sm", "rs", "sk", "si", "es", "se", "ch", "ua", "gb"] });
});

var p = extractUrlParams();

$(document).ready( function() {
  fillOutForm();


});
$(window).scroll( function() {
  checkOffset();
});

$('#form').followTo(700);

function checkOffset() {
  /*var positionForm = $('#form').offset();
  var positionSlide = $('.infos').offset();
  //console.log("Form == " + positionForm.top + $('#form').height());
  //console.log("Slide == " + positionSlide.top);
  if ($('#form').offset().top + $('#form').height() >= $('.infos').offset().top - 70)
  {
    $('#form').css('position', 'absolute');
    if ((positionForm.top + $('#form').height) < positionSlide.top)
      $('#form').css('top', positionForm.top);
  }
  if ($(document).scrollTop() + window.innerHeight < $('.infos').offset().top)
  {
    $('#form').css('position', 'fixed');
  }*/

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


$.ajax({
  url: 'http://www.mesopinions.com/index.php?f=petition&a=getcounter&petition=30770&token=20170625496',
  beforeSend: function(xhr) {
   xhr.setRequestHeader("Authorization", "Bearer 6QXNMEMFHNY4FJ5ELNFMP5KRW52WFXN5")
 }, success: function(data){
  console.log("Nombre de signatures: " + data);
              $('#nbVote').text(data);
          }
        })

function showNotif() {
  $('.notification').slideDown( "slow", function() {
    setTimeout(function(){
      $('.notification').slideUp("slow", function() {

      });
    }, 5000);
  });
  $("input").each( function() {
    $(this).val('');
  });

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

  if ((document.getElementById('f_email').value.length == 0)) {
    $('.error_mail_none').show();
    document.getElementById('f_email').focus() ;
    return false;  
  }
  else 
    $('.error_mail_none').hide();

  if (atpos < 1 || ( dotpos - atpos < 2 ) && index.html) 
  {
    $('.error_mail').show();
    document.getElementById('f_email').focus() ;
    return false;
  }
  else
    $('.error_mail').hide();


  submitForm();
  return true;
};


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

function makeCorsRequest(data) {		 
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


function pureField(string) {
  return (string.replace(/'/g, "%27").replace(/"/g, "&quot;"));
}

function submitForm() {

  var data = {
    "db": {
      "schema": "TODO",
      "db": {
        "email": pureField($("input[name='email']").val()),
        "phone": pureField($("input[name='phone']").val()),
        "firstname": pureField($("input[name='firstname']").val().toUpperCase()),
        "lastname": pureField($("input[name='lastname']").val().toUpperCase()),
        "name": pureField($("input[name='firstname']").val()) + ' ' + pureField($("input[name='lastname']").val()),
        "language": $("input[name='language']").val(),
      }
    },
    "woopra" : {
      "host": "lacimade.org",
      "cookie": getCookie("wooTracker"),
      "event": "TODO",
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
      "ce_language": $("input[name='language']").val(),
    },
    "mailjet": {
      "Email": pureField($("input[name='email']").val()),
      "Properties": {
        "lastname": pureField($("input[name='lastname']").val()),
        "name": pureField($("input[name='firstname']").val()) + ' ' + pureField($("input[name='lastname']").val()),
        "language": $("input[name='language']").val()
      },
      "addLists": [],
      "delLists": []
    },
    //"grecaptcha_response": grecaptcha.getResponse()
  }
  console.log("READY TO SEND");
  //makeCorsRequest(data);
  showNotif();
}