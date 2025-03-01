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

        // Get the max available width for the canvas (full screen width)
        const screenWidth = window.innerWidth;
        const maxHeight = 150; // Max image height
        const spacing = 10; // Space between images

        let currentX = 0; // Tracks the X position of the next image
        let currentY = 0; // Tracks the Y position (new row)
        let rowHeight = 0; // Keeps track of the tallest image in the row
        let totalCanvasHeight = 0; // Keeps track of required canvas height

        // Load images and calculate dynamic sizes
        const images = await Promise.all(
            data.map(item => new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    // Scale proportionally to fit maxHeight
                    const scale = (maxHeight / img.height) * 0.6;
                    const newWidth = img.width * scale;
                    const newHeight = img.height * scale;

                    resolve({ img, newWidth, newHeight });
                };
                img.onerror = reject;

                // Ensure base64 string has correct data URI prefix
                img.src = item.base64;
            }))
        );

        // Calculate required canvas height and set up rows
        images.forEach(({ newWidth, newHeight }) => {
            // If the image would exceed the screen width, move to a new row
            if (currentX + newWidth > screenWidth) {
                currentX = 0; // Reset X position
                currentY += rowHeight + spacing; // Move to next row
                rowHeight = 0; // Reset row height
            }

            // Update row height (needed to ensure the row is tall enough)
            rowHeight = Math.max(rowHeight, newHeight);
            totalCanvasHeight = currentY + rowHeight; // Update total height
            currentX += newWidth + spacing; // Move X for the next image
        });

        // Set the final canvas size dynamically
        canvas.width = screenWidth;
        canvas.height = totalCanvasHeight;
        canvas.style.width = `${canvas.width}px`;
        canvas.style.height = `${canvas.height}px`;

        // Ensure image smoothing is off for better quality
        // ctx.imageSmoothingEnabled = false;

        // Reset X and Y positions for actual drawing
        currentX = 0;
        currentY = 0;
        rowHeight = 0;

        // Draw each image in the correct position
        images.forEach(({ img, newWidth, newHeight }) => {
            // If the image would exceed the screen width, move to a new row
            if (currentX + newWidth > screenWidth) {
                currentX = 0; // Reset X position
                currentY += rowHeight + spacing; // Move to next row
                rowHeight = 0; // Reset row height
            }

            // Draw the image
            ctx.drawImage(img, currentX, currentY, newWidth, newHeight);

            // Update row height and X position
            rowHeight = Math.max(rowHeight, newHeight);
            currentX += newWidth + spacing;
        });

    } catch (error) {
        console.error('Error fetching or drawing images:', error);
    }
}

// Call function to draw images
drawImagesOnCanvas();
