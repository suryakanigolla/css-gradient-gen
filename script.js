import {ColorPicker} from "./components/ColorPicker/ColorPicker.js";
import {GradientChanger} from "./components/GradientChanger/GradientChanger.js";
// import {Pointer} from "./components/Pointer/Pointer.js";

var rSlider = document.querySelector("#r");
var gSlider = document.querySelector("#g");
var bSlider = document.querySelector("#b");

var rInput = document.querySelector('#rInput');
var gInput = document.querySelector('#gInput');
var bInput = document.querySelector('#bInput');

var mainChoose = document.querySelector('.mainChoose');
var hexCode = document.querySelector('.hexCode');

var isHexCode = false;
var isClicked = false;

var picker = new ColorPicker(mainChoose,250,250);
var gradientChanger = new GradientChanger([])

setInterval(() => picker.draw(),1);

$(document).ready(function() {
    start();

    //Main Choose
    $(mainChoose).mousedown(function(e) {
        isClicked = true;
    });
    
    $(mainChoose).mousemove(function(e) {
        if(isClicked) {
            var pos = findPos(this);
            var x = e.pageX - pos.x;
            var y = e.pageY - pos.y;
            var c = this.getContext('2d');
            var p = c.getImageData(x, y, 1, 1).data; 
            var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
            updateAll(p[0],p[1],p[2]);
            gradientChanger.updateColor($(".selected").attr("id"),hex);
            updateGradient();
        }
    })
    
    $(mainChoose).mouseup(function(e) {
        isClicked = false;
    })

    //Inputs Sliders HexCode
    $(hexCode).mousedown(function() {
        if(!isHexCode) {
            $(hexCode).val("#");
        }
    })
    
    $(hexCode).change(function() {
        var hexValue = $(hexCode).val();
        var rgbComp = hexToRgb(hexValue);
        $(rInput).val(rgbComp.r);
        $(gInput).val(rgbComp.g);
        $(bInput).val(rgbComp.b);
        updateMainChoose();
    
    })

    $(rSlider).on('input', function() {
        $(rInput).val($(this).val());
        updateMainChoose();
    })
    
    $(gSlider).on('input', function() {
        $(gInput).val($(this).val());
        updateMainChoose();
    })
    
    $(bSlider).on('input', function() {
        $(bInput).val($(this).val());
        updateMainChoose();
    })
    
    $(".rgbInput").change(function() {
       updateMainChoose();
    })

    //Gradient Changer


    $(".gradientPointer").each(function(index) {
        $(this).on("mousedown", function() {
            $(".gradientPointer").removeClass("selected");
            $(this).addClass("selected");
        })
        $(this).draggable({
            axis:"x",
            containment:".gradientChanger",
            drag: function() {
                gradientChanger.movePointer($(this).attr("id"),$(this).css("left"));
                updateGradient();
            }
        });

    })

    $()

})

//Main function
function start() {
    addAPointer("#FFFFFF", "10%");
    addAPointer("#000000", "30%");
    updateGradient();
}

//Update Function
function updateGradient() {
    $(".gradientChanger").css("background", function() {
        return gradientChanger.generateGradient();
    });
}

function updateAll(r,g,b) {
    $(rInput).val(r);
    $(gInput).val(g);
    $(bInput).val(b);
    $(hexCode).val(rgbToHex(r,g,b));
}

function updateMainChoose() {
    picker.updateColor($(rInput).val(),$(gInput).val(),$(bInput).val());
 }


//Utilities Functions
function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

function addAPointer(color,pos) {
    gradientChanger.addPointer(color,pos);
}

function isValid(hexCode) {
    return /^#[0-9A-F]{6}$/i.test(hexCode);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : "Invalid Input";
}


