var url_string = window.location.href;
var url = new URL(url_string);
var utmParams = "";
var links = document.getElementsByClassName("utmHref");


if (url.searchParams.get("utm_campaign")) {
    utmParams += "&utm_campaign=" + url.searchParams.get("utm_campaign");
} else {
    utmParams += "&utm_campaign=FA19";
}

if (url.searchParams.get("utm_source")) {
    utmParams += "&utm_source=" + url.searchParams.get("utm_source");
} else {
    utmParams += "&utm_source=LP";
}

for (var x = 0; x < links.length; x++) {
    var newHref = "https://donner.lacimade.org/b?cid=76";
    var url_string = links[x].href;
    var url = new URL(url_string);
    var c = url.searchParams.get("amount");
    if (c) {
        newHref += "&amount=" + c;
    }
    newHref += utmParams;
    links[x].href = newHref;
}