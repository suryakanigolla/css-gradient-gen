var rSlider = document.querySelector("#r");
var gSlider = document.querySelector("#g");
var bSlider = document.querySelector("#b");

var rInput = document.querySelector('#rInput');
var gInput = document.querySelector('#gInput');
var bInput = document.querySelector('#bInput');

var mainChoose = document.querySelector('.mainChoose');


$(document).ready(function() {
    $(rInput).val(0);
    $(gInput).val(0);
    $(bInput).val(0);
})

$(rSlider).on('input', function() {
    $(rInput).val($(this).val());
})

$(gSlider).on('input', function() {
    $(gInput).val($(this).val());
})

$(bSlider).on('input', function() {
    $(bInput).val($(this).val());
})

$(rInput, gInput, bInput).change(function() {
    rValue = String($(rInput).val());
    gValue = String($(gInput).val());
    bValue = String($(bInput).val());
    var tempString = `rgb(${rValue},${gValue},${bValue})`
    console.log(tempString)
})