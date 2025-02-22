// A function that does everything from fetching the images
// to drawing them on the canvas, side by side.
async function drawImagesOnCanvas() {
    try {
      // 1. Fetch the data
      const apiUrl = 'http://pontypridd.wales:5000/scribble';
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
  
      // 2. Parse the JSON
      const data = await response.json();
      // Expecting `data` to be an array of objects, each with a `base64` property.
      console.log('Fetched data:', data);
  
      // 3. Get the canvas and context
      const canvas = document.getElementById('scribbles');
      const ctx = canvas.getContext('2d');
  
      // (Optional) If you want to reduce blur when scaling:
      // Turn off image smoothing for a crisper (though more pixelated) appearance
      ctx.imageSmoothingEnabled = false;
      ctx.imageSmoothingQuality = 'high';
  
      // 4. Loop through each item in the data array and draw images side by side
      //    Let's assume each image is drawn at 100×100
      const drawSize = 100;
  
      data.forEach((item, index) => {
        // Create a new Image
        const img = new Image();
  
        img.onload = () => {
          // Calculate x based on the index
          const x = index * drawSize; // side-by-side horizontally
          const y = 0;
  
          // Draw the image at 100×100
          ctx.drawImage(img, x, y, drawSize, drawSize);
        };
  
        img.onerror = (err) => {
          console.error('Image failed to load:', err);
        };
  
        // 5. Ensure the base64 string has the proper data URI prefix
        //    If the API only returns the raw base64 (no "data:image/png;base64," prefix),
        //    then we need to add it:
        const base64String = item.base64;
        if (!base64String.startsWith('data:')) {
          img.src = 'data:image/png;base64,' + base64String;
        } else {
          img.src = base64String;
        }
      });
  
    } catch (error) {
      console.error('Error fetching or drawing images:', error);
    }
}
  
drawImagesOnCanvas();
  

/*
async function getImages() {
    
    try {

        const ponty_api_url = 'http://pontypridd.wales:5000/scribble';
        const response = await fetch(ponty_api_url);

        if (!response.ok) {

            throw new Error(response.status);

        }

        let data = await response.json();

        // let testData = data[0].base64;
        // console.log('Base64: ' + testData);

        return data;

    } catch (error) {

        console.log(error);
        

    }

}

function generateCanvas(data) {
    const scribblesCanvas = document.getElementById("scribbles");
    let ctx = scribblesCanvas.getContext("2d");

    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingQuality = "high";

    data.forEach((base64DataItem, index) => {
        
        const image = new Image();

        image.onload = function() {

            const x = index * 100;
            ctx.drawImage(image, x, 0);
        
        };

        image.onerror = function(e) {
            console.error("Image failed to load", e);
        };

        // console.log(`Index: ${index}, Base64: ${base64DataItem.base64}`);
        
        image.src = base64DataItem.base64; // our base64 data

    });

}


getImages().then((base64Data) => {
    
    generateCanvas(base64Data);
});
*/



// function generateCanvasTest(base64_string) {

//     console.log('received: ' + base64_string);
    
//     const scribblesCanvas = document.getElementById("scribbles");
//     let ctx = scribblesCanvas.getContext("2d");

//     let image = new Image();
//     image.onload = function() {
//         ctx.drawImage(image, 0, 0);
//     }

//     image.src = base64_string; // our base64 data

//     image.onerror = function(e) {
//         console.error("Image failed to load", e);
//     };

// }