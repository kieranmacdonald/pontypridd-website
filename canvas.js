// A function that does everything from fetching the images
// to drawing them on the canvas, side by side.
async function drawImagesOnCanvas() {
  try {
      // Fetch the data
      const apiUrl = 'http://pontypridd.wales:5000/scribble';
      const response = await fetch(apiUrl);

      if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
      }

      // Parse JSON response
      const data = await response.json();
      console.log('Fetched data:', data);

      // Get the canvas and context
      const canvas = document.getElementById('scribbles');
      const ctx = canvas.getContext('2d');

      // Max height for consistency (adjust as needed)
      const maxHeight = 150;
      const spacing = 10; // Space between images
      let totalWidth = 0; // To calculate the canvas width

      // Load images and calculate dynamic sizes
      const images = await Promise.all(
          data.map(item => new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = () => {
                  // Scale proportionally to fit maxHeight
                  const scale = (maxHeight / img.height) * 0.8;
                  const newWidth = img.width * scale;
                  const newHeight = img.height * scale;

                  // Increase total width to fit this image
                  totalWidth += newWidth + spacing;

                  resolve({ img, newWidth, newHeight });
              };
              img.onerror = reject;

              // Ensure base64 string has correct data URI prefix
              img.src = item.base64.startsWith('data:')
                  ? item.base64
                  : `data:image/png;base64,${item.base64}`;
          }))
      );

      // Dynamically set canvas size
      canvas.width = totalWidth - spacing; // Remove last extra space
      canvas.height = maxHeight;
      canvas.style.width = `${canvas.width}px`;
      canvas.style.height = `${canvas.height}px`;

      // Ensure image smoothing is off for better quality
      // ctx.imageSmoothingEnabled = false;

      // Draw each image in the correct position
      let xOffset = 0;
      images.forEach(({ img, newWidth, newHeight }) => {
          ctx.drawImage(img, xOffset, (maxHeight - newHeight) / 2, newWidth, newHeight);
          xOffset += newWidth + spacing; // Move to the right for next image
      });

  } catch (error) {
      console.error('Error fetching or drawing images:', error);
  }
}

// Call function to draw images
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