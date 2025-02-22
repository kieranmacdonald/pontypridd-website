const textArea = document.getElementById("base64-string");
const button = document.getElementById("submit-btn");

button.addEventListener('click', postBase64Data);

async function postBase64Data() {

    console.log(textArea.value);
    
    try {
        
        const apiUrl = 'http://pontypridd.wales:5000/scribble';
        
        await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify({
                base64: textArea.value
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .finally(() => {
            textArea.value = '';
        });

    } catch (error) {
        
        throw new Error(error);

    }

}