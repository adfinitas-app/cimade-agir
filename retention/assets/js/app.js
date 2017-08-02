$.fn.followTo = function (pos) {
  var $this = this,
  $window = $(window);

  $window.scroll(function (e) {
    if ($window.scrollTop() > pos) {
      $this.css({
        position: 'absolute',
        top: pos + ($('.row.histoire').offset().top - $('.row.histoire').height()) 
      });
    } else {
      $this.css({
        position: 'fixed',
        top: "250px"
      });
    }
  });
};
function extractUrlParams() {
  var match,
  urlParams,
  pl     = /\+/g,  // Regex for replacing addition symbol with a space
  search = /([^&=]+)=?([^&]*)/g,
  decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
  query  = window.location.search.substring(1);

  urlParams = {};
  while (match = search.exec(query))
    urlParams[decode(match[1])] = decode(match[2]);
  return urlParams;
}

var p = extractUrlParams();
//$('#form').followTo($('.row.histoire').offset().top - $('.row.histoire').height() / 2);
var topForm =  $('#form').offset().top;

$(function(){
  $("#f_tel").intlTelInput({initialCountry: "fr", onlyCountries: ["al", "ad", "at", "by", "be", "ba", "bg", "hr", "cz", "dk", 
    "ee", "fo", "fi", "fr", "de", "gi", "gr", "va", "hu", "is", "ie", "it", "lv", 
    "li", "lt", "lu", "mk", "mt", "md", "mc", "me", "nl", "no", "pl", "pt", "ro", 
    "ru", "sm", "rs", "sk", "si", "es", "se", "ch", "ua", "gb"] });
});

var p = extractUrlParams();

$(document).ready( function() {
  fillOutForm();
  verticalAlign();

});

function verticalAlign() {
  var height = $('.vertical-center').height();
  var parentHeight = $('.parent').height();
  var margin = (parentHeight - (height / 2));

  if ($(window).width() > 1025 && $(window).height() > 850)
    $('.vertical-center').css("margin-top", margin);
  else
    $('.vertical-center').css("margin-top", "250px");
};

$(window).resize( function() {
});
$(window).scroll( function() {
  if ($(window).scrollTop() < topForm)
  {
   $('#form').css({position: 'static'});
 }
 else if ($(window).scrollTop() > topForm)
 {
  $('#form').css({position: 'fixed',top: "0px"});
     if ( $('#form').offset().top > ($('.row.infos').offset().top - $('#form').height() - 100))
      $('#form').css({position: 'absolute', top: ($('.row.infos').offset().top - $('#form').height() - 100)});
}
});



$('#goUp').click( function() {
  scrollTo('body');
})
function fillOutForm() {
  if ('lastname' in p)
    $('#f_name').val(p['lastname']);
  if ('firstname' in p)
    $('#f_prenom').val(p['firstname']);
  if ('email' in p)
    $('#f_email').val(p['email']);
  if ('phone' in p)
    $('#f_tel').val(p['phone']);
  if ('reserved_code_media' in p)
    $('#reserved_code_media').val(p['reserved_code_media']);
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
  url: 'https://www.mesopinions.com/index.php?f=petition&a=getcounter&petition=30770&token=20170625496',
  type: 'GET',
  success: function(data) { 
    $('#nbVote').text(data);
  },
  error: function(data) { 

  },
  beforeSend: function(xhr) {
   xhr.setRequestHeader("Authorization", "Bearer 6QXNMEMFHNY4FJ5ELNFMP5KRW52WFXN5")
 },
});



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

$('#f_summit').click(function(){ validateForm() });

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
  $.ajax({
  url: 'https://www.mesopinions.com/index.php?f=petition&a=getcounterplus&petition=30770&token=20170625496',
  type: 'GET',
  dataType: "jsonp",
  success: function(data) { 
    $('#nbVote').text(data);
  },
  error: function(data) { 

  },
  beforeSend: function(xhr) {
   xhr.setRequestHeader("Authorization", "Bearer 6QXNMEMFHNY4FJ5ELNFMP5KRW52WFXN5")
 },
});
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
 var url = 'https://adfinitas-io.herokuapp.com/api/v1/organization/adc529c9-3414-4e80-8004-b2002885ee65/webhook/3a66a987-839b-4275-8149-109503eb09e1'; 

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
function getCodeMedia() {
  if (typeof(p['reserved_code_media']) == 'undefined') {
    return ''
  } else {
    return p['reserved_code_media']
  }
}

function submitForm() {

  var data = {
    "db": {
      "schema": "cimade_petition_retention2017",
      "db": {
        "email": pureField($("input[name='email']").val()),
        "phone": pureField($("input[name='phone']").val()),
        "firstname": pureField($("input[name='firstname']").val().toUpperCase()),
        "lastname": pureField($("input[name='lastname']").val().toUpperCase()),
        "name": pureField($("input[name='firstname']").val()) + ' ' + pureField($("input[name='lastname']").val()),
        "reserved_code_media": getCodeMedia(),
        "language": $("input[name='language']").val(),
      }
    },
    "woopra" : {
      "host": "lacimade.org",
      "cookie": getCookie("wooTracker"),
      "event": "petition_retention2017",
      "cv_email": pureField($("input[name='email']").val()),
      "cv_phone": pureField($("input[name='phone']").val()),
      "cv_firstname": pureField($("input[name='firstname']").val()),
      "cv_lastname": pureField($("input[name='lastname']").val()),
      "cv_name": pureField($("input[name='firstname']").val()) + ' ' + pureField($("input[name='lastname']").val()),
      "ce_reserved_code_media": getCodeMedia(),
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
        "firstname": pureField($("input[name='firstname']").val()),
        "reserved_code_media": getCodeMedia(),
        "language": $("input[name='language']").val()
      },
      "addLists": ['retention2017'],
      "delLists": []
    },
    //"grecaptcha_response": grecaptcha.getResponse()
  }
  console.log(data);
  makeCorsRequest(data);
  showNotif();
}