var count = 0;
var emoji = document.getElementById("eeg");
var counterEeg = document.getElementById("counterEeg");


function trick() {
    count += 1;
    counterEeg.innerHTML = count;

    if(count == 4) {
        emoji.innerHTML = "❤️";
    }
    else if(count == 6) {
        emoji.innerHTML = "🌖";
    }
    else if (count == 7) {
        emoji.innerHTML = "🍀";
    }
    else if (count == 13) {
        emoji.innerHTML = "🌻";
    }
    else if (count == 17) {
        count = 0;
        emoji.innerHTML = "⭐";
        counterEeg.innerHTML = "+)";
        window.open("https://youtu.be/n9ta1Pgeu80", "_blank");
    }
}
