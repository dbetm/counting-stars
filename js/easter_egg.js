var count = 0;
var emoji = document.getElementById("eeg");
var counterEeg = document.getElementById("counterEeg");


function trick() {
    count += 1;
    counterEeg.innerHTML = count;

    if(count == 43) {
        count = 0;
        emoji.innerHTML = "⭐";
        counterEeg.innerHTML = "+)";
    }
}
