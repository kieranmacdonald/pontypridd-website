async function displayImage() {
    
    try {

        const ponty_api_url = 'http://pontypridd.wales:5000/scribble';
        const response = await fetch(ponty_api_url);

        if (!response.ok) {

            throw new Error(response.status);

        }

        let data = await response.json();
        console.log(data);
        

    } catch (error) {

        console.log(error);
        

    }

}

/*
const scribblesCanvas = document.getElementById("scribbles");
let ctx = scribblesCanvas.getContext("2d");

let image = new Image();
image.onload = function() {
    ctx.drawImage(image, 0, 0);
}

image.src = ""; // our base64 data
*/

displayImage()