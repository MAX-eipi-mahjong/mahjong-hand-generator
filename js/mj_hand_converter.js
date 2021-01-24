
/**
* @param {string} format
* @return {string[]}
*/
function parseText(format) {
    /** @type {number[]} */
    const paiNumbers = [];
    const matches = format.match(/([mpsj](?:r?\d)+|b|\s)/g);
    for (const m of matches) {
        if (!m.trim()) {
            paiNumbers.push(40);
        }
        else if (m === "b") {
            paiNumbers.push(44);
        }
        else {
            const typeText = m[0];
            for (const n of m.match(/r?\d/g)) {
                paiNumbers.push(convertToPai(typeText, n));
            }
        }
    }
    console.log(paiNumbers);
    const paiImages = [];
    for (const p of paiNumbers) {
        paiImages.push(convertToPaiImage(p));
    }
    console.log(paiImages);
    return paiImages;
}

/**
 * @param {string} typeText 
 * @param {string} numberText 
 * @return {number}
 */
function convertToPai(typeText, numberText) {
    let paiNumber = 4;
    switch (typeText) {
        case "m":
            paiNumber = 0;
            break;
        case "p":
            paiNumber = 10;
            break;
        case "s":
            paiNumber = 20;
            break;
        case "j":
            paiNumber = 30;
            break;
    }
    if (numberText == "r5") {
        paiNumber = 40 + paiNumber / 10 + 1;
    }
    else {
        const num = parseInt(numberText);
        if (!isNaN(num)) {
            paiNumber += num;
        }
    }
    return paiNumber;
}

/**
 * @param {number} paiNumber
 * @return {string}
 */
function convertToPaiImage(paiNumber) {
    const typeTexts = ["man", "pin", "sou", "ji", "other"];
    const typeText = typeTexts[Math.trunc(paiNumber / 10)];
    const numberText = paiNumber % 10;
    return `images/${typeText}${numberText}-66-90-l.png`;
}


/**
 * @param {string} format 
 */
function putImages(format) {
    document.getElementById("put_area").querySelectorAll('*').forEach(n => n.remove());
    const images = parseText(format);
    for (const img of images) {
        const e = document.createElement("img");
        e.src = img;
        document.getElementById("put_area").appendChild(e);
    }
}

function captureImage() {
    document.getElementById("capture").querySelectorAll('*').forEach(n => n.remove());
    html2canvas(document.querySelector("#put_area"), { backgroundColor: null }).then(canvas => {
        document.getElementById("capture").appendChild(canvas);
    });
}