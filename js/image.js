var image = new MarvinImage();
var scaledImg = new MarvinImage();
var grayImg;
var binarizedImg;
const thresholdDim = 500;
const binarizeThreshold = [56, 58, 65];


function processImage(url) {
    let totalStars = 0;

    image.load(url, function() {
        const [newWidth, newHeight] = computeNewDims(
            image.getWidth(), image.getHeight()
        );

        Marvin.scale(image, scaledImg, newWidth, newHeight);

        grayImg = new MarvinImage(scaledImg.getWidth(), scaledImg.getHeight());
        toGrayScale();

        let m = binarizeThreshold.length;

        for (let i = 0; i < m; i += 1) {
            binarizedImg = new MarvinImage(
                scaledImg.getWidth(), scaledImg.getHeight()
            );
            binarizeImg(binarizeThreshold[i]);

            let result = countStars();
            // console.log(result);

            totalStars += result;
            binarizedImg = null;
        }
        renderResult(Math.ceil(totalStars / m));
    });
}

function computeNewDims(width, height) {
    let factor = 1;
    if(width > height && width > thresholdDim) {
        factor = width / thresholdDim;
    }
    else if(height > thresholdDim) {
        factor = height / thresholdDim;
    }

    let newWidth = Math.floor(width / factor);
    let newHeight = Math.floor(height / factor);

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

    for(let y = 0; y < height; ++y) {
        for(let x = 0; x < width; ++x) {
            let intensity = binarizedImg.getIntComponent0(x, y);
            if(intensity == 255) {
                cont += 1;
                try {
                    explore(x, y);
                }
                catch (e) {
                    console.log("Error", e);
                }
            }
        }
    }

    return cont;
}

function explore(x, y) {
    if(!binarizedImg.isValidPosition(x, y)) {
        return;
    }
    if(!binarizedImg.getIntComponent0(x, y)) {
        return;
    }

    binarizedImg.setIntColor(x, y, 0, 0, 0);

    // right
    explore(x+1, y);
    // left
    explore(x-1, y);
    // down
    explore(x, y+1);
    // up
    explore(x, y-1);
}
