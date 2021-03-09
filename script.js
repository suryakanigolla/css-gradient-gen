var rgbPointer = document.querySelector("#rgbPointer");
var rgbHandle = document.querySelector(".rgbHandle");

var alphaPointer = document.querySelector("#alphaPointer");
var alphaHandle = document.querySelector(".alphaHandle");

var active = false;
var currentLeft;
var initialLeft;
var leftOffset = 0;

rgbHandle.addEventListener("mousedown", dragStart, false);
rgbHandle.addEventListener("mouseup", dragEnd, false);
rgbHandle.addEventListener("mousemove", drag, false);

function dragStart(e) {
    initialLeft = e.target.style.left - leftOffset;
    if (e.target == rgbPointer) {
        active = true; 
    }
    console.log(e.target)
}

function dragEnd(e) {
    initialLeft = currentLeft;
    active = false;
    console.log(currentLeft)
}

function drag(e) {
    if (active) {
        e.preventDefault();
        currentLeft = e.target.style.left - initialLeft;
        leftOffset = currentLeft
        setLeft(currentLeft, rgbPointer);
    }
}

function setLeft(leftCurrent, el) {
    el.style.left += leftCurrent;
}

function findHandle(e) {
    return document.querySelector
}