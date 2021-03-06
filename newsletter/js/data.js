
function sendData() {
    let data = {
        "db": {
            "schema": "newsletter",
            "db": {
                "email": pureField($('#email').val()),
                "phone": pureField(getPhone()),
                "firstname": pureField($('#firstName').val().toUpperCase()),
                "lastname": pureField($('#lastName').val().toUpperCase()),
                "civility": getCivility(),
                "civility_dear": getCivilityDear(),
                "civility_long": getCivilityLong(),
                "sexe": getSexe(),
                "name":  pureField($('#firstName').val()) + " " + pureField($('#lastName').val()),
            }
        },
        "woopra": {
            "host": "lacimade.org",			// Nom du projet dans Woopra.

            /* Variables de configuration de la fiche utilisateur, préfixe : "cv_" */

            "cv_email": pureField($('#email').val()),
            "cv_firstname": pureField($('#firstName').val().toUpperCase()),
            "cv_lastname": pureField($('#lastName').val().toUpperCase()),
            "cv_sexe": getSexe(),
            "cv_civility": getCivility(),
            "cv_name":  pureField($('#firstName').val()) + " " + pureField($('#lastName').val()),
            "cv_language": "fr_FR",

            /* Variables de l'événement, : préfixe : "ce_" */

            "event": "newsletter",				// Nom de l'événement à tracker si applicable. Non préfixé.
            "ce_email": pureField($('#email').val())
        },
        "mailjet": {
            "Email": pureField($('#email').val()),
            "Properties": {
                "firstname": pureField($('#firstName').val().toUpperCase()),
                "lastname": pureField($('#lastName').val().toUpperCase()),
                "sexe": getSexe(),
                "civility": getCivility(),
                "civility_dear": getCivilityDear(),
                "civility_long": getCivilityLong(),
                "name": pureField($('#firstName').val()) + " " + pureField($('#lastName').val())
            },
            "addLists": getList(), // Noms de transmission des listes dans lesquelles ajouter le contact. Ne pas mettre les listes "Toute la base" et "Prospects" ici, le contact y est inséré par défaut (excepté dans "Prospect" si donateur).
            "delLists": []  // Noms de transmission des listes dans lesquelles supprimer le contact.
        }
    };
    if (pureField(getPhone()) !== ""){
        data.woopra["cv_phone"] = pureField(getPhone());
        data.woopra["ce_phone"] = pureField(getPhone());
    }
    //console.log(data);
    makeCorsRequest(data);

    showNotif();
}


/*
 * Debut de la lib
 */

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i=0; i<ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
function createCORSRequest(method, url) {
    let xhr = new XMLHttpRequest();
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
    let url = 'https://adfinitas-io.herokuapp.com/api/v1/organization/adc529c9-3414-4e80-8004-b2002885ee65/webhook/3a66a987-839b-4275-8149-109503eb09e1';
    let body = JSON.stringify(data);
    let xhr = createCORSRequest('POST', url);
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


function getPhone() {
    return $('#telephone').intlTelInput("getNumber");
}

function getPersonnalisationCourte() {
    return getCivilityLong().toUpperCase() + " " + pureField($('#lastName').val().toUpperCase());
}

function getPersonnalisation() {
    return getCivilityDear() + " " + getCivilityLong().toUpperCase() + " " + pureField($('#lastName').val().toUpperCase());
}

function getList() {
    let data = [];

    if (getOptin() === "true") {
        // data.push('mjlist_optin_partenaire');
    }

    return data;
}

function pureField(string) {
    return (string.replace(/'/g, "%27").replace(/"/g, "&quot;"));
}


function getOptin() {
    /*if ($('#optin').is(":checked")) {
        return "false";
    }*/
    return "true";
}

function getSexe() {
    if ($('#civilityWoman').is(":checked"))
        return "Femme";
    else {
        return 'Homme';
    }
}

function getCivility() {
    if ($('#civilityWoman').is(":checked"))
        return "Mme";
    else {
        return 'M';
    }
}

function getCivilityDear() {
    if ($('#civilityWoman').is(":checked"))
        return "Chère";
    else {
        return 'Cher';
    }
}

function getCivilityLong() {
    if ($('#civilityWoman').is(":checked"))
        return "Madame";
    else {
        return 'Monsieur';
    }
}
