const modelElement = document.getElementById("bridgeModel");

const maxRotationsPerSec = 100000;

let rotationsPerSec = 0;
let currentPosY = 0;

function startIncrementTimer() {

    if (rotationsPerSec <= maxRotationsPerSec) {
        
        // start timer
        setTimeout(raiseRotationSpeed, 1000);

    }
}

function raiseRotationSpeed() {
    //raising rotation speed
    let currentSpeed = modelElement.getAttribute("rotation-per-second");
    currentSpeed = currentSpeed.split('deg')[0];

    currentSpeed *= 1.1;
    rotationsPerSec = currentSpeed;
    currentSpeed = currentSpeed + "deg";

    modelElement.setAttribute("rotation-per-second", currentSpeed);
    
    // currentPosY = currentPosY<=0 ? currentPosY+=1 : currentPosY*=1.1;
    // modelElement.style = `transform: translateY(-${currentPosY}px);`;

    // console.log(Math.floor(currentPosY) + ", " + Math.floor(rotationsPerSec));

    startIncrementTimer();
}

startIncrementTimer();