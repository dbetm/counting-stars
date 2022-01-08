var canvas = document.getElementById("viz")
var inputImg = new MarvinImage();
var scaledImg = new MarvinImage();
var grayImg;
var binarizedImg;
var totalStars = 0;

inputImg.load("assets/img/starry_1.jpg", function() {
    Marvin.scale(inputImg, scaledImg, 200, 200);
    scaledImg.draw(canvas);
    // console.log(inputImg.getWidth(), inputImg.getHeight());
    grayImg = new MarvinImage(scaledImg.getWidth(), scaledImg.getHeight());
    toGrayScale();
    binarizedImg = new MarvinImage(scaledImg.getWidth(), scaledImg.getHeight());
    binarizeImg();
    //binarizedImg.draw(canvas);
    // iterateImage();
    countStars();
    //binarizedImg.draw(canvas);
    console.log("listo!");
    let result = document.getElementById("number-stars");
    console.log(result);
    result.innerHTML = totalStars;
});


function toGrayScale() {
    Marvin.grayScale(scaledImg, grayImg);
    // grayImg.draw(canvas);
}

function binarizeImg(){
    Marvin.thresholding(grayImg, binarizedImg, 80);
}

function iterateImage() {
    let height = binarizedImg.getHeight();
    let width = binarizedImg.getWidth();

    for(let i = 0; i < height; ++i) {
        for(let j = 0; j < width; ++j) {
            let intensity = binarizedImg.getIntComponent0(i, j);
            if(intensity == 255) {
                console.log(intensity);
                /*
                binarizedImg.setIntColor(
                    i, j, binarizedImg.getAlphaComponent(i, j), 0, 0, 0
                );
                */
            }
        }
        console.log("")
    }
    console.log("listo");
}

function countStars() {
    let height = binarizedImg.getHeight();
    let width = binarizedImg.getWidth();

    for(let i = 0; i < height; ++i) {
        for(let j = 0; j < width; ++j) {
            let intensity = binarizedImg.getIntComponent0(i, j);
            if(intensity == 255) {
                totalStars += 1;
                explore(i, j, height, width);
            }
        }
    }
}

function explore(i, j, height, width) {
    if(i >= height || i < 0 || j >= width || j < 0) {
        return;
    }
    if(binarizedImg.getIntComponent0(i, j) == 0) {
        return;
    }

    binarizedImg.setIntColor(
        i, j, binarizedImg.getAlphaComponent(i, j), 0, 0, 0
    );

    // left
    explore(i, j-1, height, width);
    // right
    explore(i, j+1, height, width);
    // up
    explore(i-1, j, height, width);
    // down
    explore(i+1, j, height, width);
}
