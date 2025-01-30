const modelElement = document.getElementById("bridgeModel");

function startIncrementTimer() {
    // start timer
    setTimeout(raiseRotationSpeed, 1000);
}

function raiseRotationSpeed() {
    //raising rotation speed
    let currentSpeed = modelElement.getAttribute("rotation-per-second");
    currentSpeed = currentSpeed.split('deg')[0];

    currentSpeed *= 1.1;
    currentSpeed = currentSpeed + "deg";

    modelElement.setAttribute("rotation-per-second", currentSpeed);
    console.log(modelElement.getAttribute("rotation-per-second"));

    startIncrementTimer();
}

startIncrementTimer();