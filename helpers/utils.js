export function toMinutes(num) {
    let duration = num / 60000

    return ((duration.toFixed(2)).split('.').join(':'));
}
export function artistsString(arr) {
    let str = ''

    if (arr.length > 1) {
        arr.forEach((element, index) => {
            str += `${element.name}`
            if (index !== arr.length - 1) {
                str += ', ';
            }
        });
    } else {
        str = arr[0].name;
    }

    return str;
}

export function getAverageRGB(imgEl) {
    console.count('img');
    console.log(imgEl);
    imgEl.crossOrigin = "";

    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
        canvas = document.createElement("canvas"),
        context = canvas.getContext && canvas.getContext("2d"),
        data,
        width,
        height,
        i = -4,
        length,
        rgb = { r: 0, g: 0, b: 0 },
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height =
        imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width =
        imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch (e) {
		/* security error, img on diff domain */ console.log("trying to get image");
        return defaultRGB;
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}
