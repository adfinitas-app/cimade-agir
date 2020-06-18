$("#play_button_video").click(function() {
    console.log("lol")
    $("#play_button_video").css("display", "none");
    $("#decoVideo").css("display", "none");
    var vid = document.getElementById("video"); 
    vid.play();
    vid.controls = true;
});