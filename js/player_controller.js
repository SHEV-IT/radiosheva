'use strict';

var player = null;
var api_link = "http://radio.knu.ua/airtime.php"; // TODO: set valid link to

function toggle_music(node) {
    player = player || document.getElementById("player_eng");
    if (player.paused) {
        node.src = "img/btn_pause.png";
        player.play();
    } else {
        node.src = "img/btn_play.png";
        player.pause();
    }
}

function update_song_meta() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            cached_data = JSON.parse(xhttp.responseText || "{}")["current"]["name"];
            display_cached_data();
        }
    };
    xhttp.open("GET", api_link, true);
    xhttp.send();
}

function display_cached_data() {
    if (cached_data) {
        var info = cached_data.split(/(.+) (- .+)/);
        document.getElementsByClassName("band")[0].innerHTML = info[1];
        document.getElementsByClassName("track")[0].innerHTML = info[2];
    } else
        update_song_meta();
}

function init_page() {
    display_cached_data();
    setInterval(update_song_meta, 5000);
}
