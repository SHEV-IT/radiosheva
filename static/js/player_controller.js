'use strict';

var player = null;

function toggle_music(node) {
    player = player || document.getElementById("player_eng");
    if (player.paused) {
        node.src = "static/img/btn_pause.png";
        player.play();
    } else {
        node.src = "static/img/btn_play.png";
        player.pause();
    }
}


function update_song_meta() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            cached_data = xhttp.responseText;
            display_cached_data();
        }
    };
    xhttp.open("GET", "/live-info", true);
    xhttp.send();
}

function display_cached_data() {
    var info = cached_data.split(/(.+) (- .+)/);
    document.getElementsByClassName("band")[0].innerHTML = info[1];
    document.getElementsByClassName("track")[0].innerHTML = info[2];
}

function init_page() {
    display_cached_data();
    setInterval(update_song_meta, 5000);
}
