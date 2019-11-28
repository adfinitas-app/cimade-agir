var intervalSwitchPopUpDescription;
var intervalOpacityPopUpDescription;
var temoin1PopUpLeft = -100;
var temoin2PopUpLeft = 0;
var temoin3PopUpLeft = +100;
var ScrollWindow = 0;

$("#arrowRightPopUpDescription").click(function () {
    $("#arrowRightPopUpDescription").css("display", "block");
    $("#arrowLeftPopUpDescription").css("display", "block");
    if (temoin3PopUpLeft <= 101) {
        $("#arrowRightPopUpDescription").css("display", "none");
    }
    clearInterval(intervalSwitchPopUpDescription);
    intervalSwitchPopUpDescription = setInterval(function () {
        temoin1PopUpLeft--;
        temoin2PopUpLeft--;
        temoin3PopUpLeft--;
        document.getElementById('temoin1PopUpDescription').style.left = temoin1PopUpLeft + "%";
        document.getElementById('temoin2PopUpDescription').style.left = temoin2PopUpLeft + "%";
        document.getElementById('temoin3PopUpDescription').style.left = temoin3PopUpLeft + "%";
        if ((temoin1PopUpLeft % 100) == 0) {
            clearInterval(intervalSwitchPopUpDescription);
        }
    }, 5);
});

$("#arrowLeftPopUpDescription").click(function () {
    $("#arrowLeftPopUpDescription").css("display", "block");
    $("#arrowRightPopUpDescription").css("display", "block");
    if (temoin1PopUpLeft >= -101) {
        $("#arrowLeftPopUpDescription").css("display", "none");
    }
    clearInterval(intervalSwitchPopUpDescription);
    intervalSwitchPopUpDescription = setInterval(function () {
        temoin1PopUpLeft++;
        temoin2PopUpLeft++;
        temoin3PopUpLeft++;
        document.getElementById('temoin1PopUpDescription').style.left = temoin1PopUpLeft + "%";
        document.getElementById('temoin2PopUpDescription').style.left = temoin2PopUpLeft + "%";
        document.getElementById('temoin3PopUpDescription').style.left = temoin3PopUpLeft + "%";
        if ((temoin1PopUpLeft % 100) == 0) {
            clearInterval(intervalSwitchPopUpDescription);
        }
    }, 5);
});

$(".redCircleDescription").click(function () {
    if ($("#DescriptionPopUp").css("display") == "none") {
        $("body").css("overflow-y", "hidden");
        $("html").css("overflow-y", "hidden");
    } else {
        $("body").css("overflow-y", "scroll");
        $("html").css("overflow-y", "scroll");
    }
    $("#DescriptionPopUp").css("display", "block");
    if ($("#DescriptionPopUp").css("opacity") == 1) {
        $('html, body').animate({
            scrollTop: ScrollWindow
        }, 1);
        $("#DescriptionPopUp").animate({
            opacity: 0
        }, 1000, function () {
            $("#DescriptionPopUp").css("display", "none");
        });
    } else {
        $("#DescriptionPopUp").animate({
            opacity: 1
        }, 1000);
    }
});

$("#retourPopUpDescription").click(function () {
    if ($("#DescriptionPopUp").css("display") == "none") {
        $("body").css("overflow-y", "hidden");
        $("html").css("overflow-y", "hidden");
    } else {
        $("body").css("overflow-y", "scroll");
        $("html").css("overflow-y", "scroll");
    }
    $("#DescriptionPopUp").css("display", "block");
    if ($("#DescriptionPopUp").css("opacity") == 1) {
        $('html, body').animate({
            scrollTop: ScrollWindow
        }, 1);
        $("#DescriptionPopUp").animate({
            opacity: 0
        }, 1000, function () {
            $("#DescriptionPopUp").css("display", "none");
        });
    } else {
        $('html, body').animate({
            scrollTop: 0
        }, 1);
        $("#DescriptionPopUp").animate({
            opacity: 1
        }, 1000);
    }
});

$(".temoins").click(function () {
    ScrollWindow = $(window).scrollTop();

    $('html, body').animate({
        scrollTop: 0
    }, 1);
    $("#DescriptionPopUp").css("display", "block");
    $("#DescriptionPopUp").animate({
        opacity: 1
    }, 1000, function() {
        $("body").css("overflow-y", "hidden");
        $("html").css("overflow-y", "hidden");
    });
});


$("#temoin1").click(function () {
    $("#arrowRightPopUpDescription").css("display", "block");
    $("#arrowLeftPopUpDescription").css("display", "none");
    temoin1PopUpLeft = 0;
    temoin2PopUpLeft = 100;
    temoin3PopUpLeft = 200;
    document.getElementById('temoin1PopUpDescription').style.left = temoin1PopUpLeft + "%";
    document.getElementById('temoin2PopUpDescription').style.left = temoin2PopUpLeft + "%";
    document.getElementById('temoin3PopUpDescription').style.left = temoin3PopUpLeft + "%";
});

$("#temoin2").click(function () {
    $("#arrowRightPopUpDescription").css("display", "block");
    $("#arrowLeftPopUpDescription").css("display", "block");
    temoin1PopUpLeft = -100;
    temoin2PopUpLeft = 0;
    temoin3PopUpLeft = +100;
    document.getElementById('temoin1PopUpDescription').style.left = temoin1PopUpLeft + "%";
    document.getElementById('temoin2PopUpDescription').style.left = temoin2PopUpLeft + "%";
    document.getElementById('temoin3PopUpDescription').style.left = temoin3PopUpLeft + "%";
});

$("#temoin3").click(function () {
    $("#arrowRightPopUpDescription").css("display", "none");
    $("#arrowLeftPopUpDescription").css("display", "block");
    temoin1PopUpLeft = -200;
    temoin2PopUpLeft = -100;
    temoin3PopUpLeft = 0;
    document.getElementById('temoin1PopUpDescription').style.left = temoin1PopUpLeft + "%";
    document.getElementById('temoin2PopUpDescription').style.left = temoin2PopUpLeft + "%";
    document.getElementById('temoin3PopUpDescription').style.left = temoin3PopUpLeft + "%";
});
