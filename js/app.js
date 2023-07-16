var inputImg = document.getElementById("inputImg");
var previewImg = document.getElementById("starImage");

inputImg.onchange = event => {
    const [file] = inputImg.files
    if (file) {
        url = URL.createObjectURL(file);
        renderPreview(url);
        processImage(url);
    }
}

function renderPreview(url) {
    previewImg.src = url;
    document.getElementById("tagUploadPhoto").style.display = "none";

    toggleRegionImage(false);
}

function renderResult(total) {
    let divResult = document.getElementsByClassName("result")[0];
    divResult.style.display = "block";

    let result = document.getElementById("number-stars");

    if(result == 1) {
        "There is " + total + " star";
    }
    else {
        result.innerHTML = "There are " + total + " stars";
    }
}

function selectImage() {
    inputImg.click();
}

function reset() {
    // remove current image
    previewImg.src = "";
    document.getElementById("tagUploadPhoto").style.display = "block";

    // hide the latest result
    let divResult = document.getElementsByClassName("result")[0];
    divResult.style.display = "none";

    // remove value of input file
    inputImg.value = "";

    toggleRegionImage(true);
}

function toggleRegionImage(setup) {
    let region = document.getElementById("uploadedImage");
    if(setup) {
        // add dash border
        region.style.border = "3px dashed #98103d";
        // add background
        region.style.backgroundColor = "#dadada";
    }
    else {
        // remove dash border
        region.style.border = "none";
        // remove background
        region.style.backgroundColor = "transparent";
    }
}
