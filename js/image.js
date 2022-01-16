var image = new MarvinImage();
var scaledImg = new MarvinImage();
var grayImg;
var binarizedImg;
const thresholdDim = 600;
const binarizeThreshold = [70, 80, 96, 115];


function processImage(url) {
    let totalStars = 0;

    image.load(url, function() {
        const [newWidth, newHeight] = computeNewDims(
            image.getWidth(), image.getHeight()
        );

        console.log(newWidth, newHeight);

        Marvin.scale(image, scaledImg, newWidth, newHeight);

        grayImg = new MarvinImage(scaledImg.getWidth(), scaledImg.getHeight());
        toGrayScale();

        let m = binarizeThreshold.length;

        for (let i = 0; i < m; i += 1) {
            binarizedImg = new MarvinImage(scaledImg.getWidth(), scaledImg.getHeight());
            binarizeImg(binarizeThreshold[i]);
            let result = countStars();
            console.log(result);
            totalStars += result;
        }

        renderResult(Math.floor(totalStars / m));
    });
}

function computeNewDims(width, height) {
    let newWidth = width, newHeight = height;
    let factor = 1;
    if(width > height && width > thresholdDim) {
        factor = width / thresholdDim;
    }
    else if(height > thresholdDim) {
        factor = height / thresholdDim;
    }

    newWidth = Math.floor(width / factor);
    newHeight = Math.floor(height / factor);

    return [newWidth, newHeight];
}


function toGrayScale() {
    Marvin.grayScale(scaledImg, grayImg);
}

function binarizeImg(threshold){
    Marvin.thresholding(grayImg, binarizedImg, threshold);
}

function countStars() {
    let cont = 0;
    let height = binarizedImg.getHeight();
    let width = binarizedImg.getWidth();

    for(let i = 0; i < height; ++i) {
        for(let j = 0; j < width; ++j) {
            let intensity = binarizedImg.getIntComponent0(i, j);
            if(intensity == 255) {
                cont += 1;
                explore(i, j, height, width);
            }
        }
    }

    return cont;
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
