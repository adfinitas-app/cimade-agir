
if (window.innerWidth < 780) {
    $("#titleHeader").attr("src", "assets/titleHeaderSmall.png");
    $("#titleHeader").css("margin-left", "-173px");
}

$(window).resize(function () {
    if (window.innerWidth < 780) {
        $("#titleHeader").attr("src", "assets/titleHeaderSmall.png");
        $("#titleHeader").css("margin-left", "-173px");
    } else {
        $("#titleHeader").attr("src", "assets/titleHeader.png");
        $("#titleHeader").css("margin-left", "-389px");
    }
});

var video= $('#bgvid').get(0);
video.addEventListener('ended',function(){
    video.style.display = 'none';
},false);
