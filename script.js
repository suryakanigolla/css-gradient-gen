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

var sidebarList = document.querySelector("#sidebar .list");

var isHexCode = false;
var isClicked = false;
var wasSideBarOpen = false;
var isLinear = true;

var picker = new ColorPicker(mainChoose,250,250);
var gradientChanger = new GradientChanger([])

var lgTemp;

setInterval(() => picker.draw(),1);

$(document).ready(function() {
    start();

    //Main Choose
    $(mainChoose).mousedown(function(e) {
        isClicked = true;
    });
    
    $(mainChoose).mousemove(function(e) {
        if(isClicked && this==e.target) {
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

    $(mainChoose).mouseleave(function(e) {
        isClicked = false;
    })

    //Radial and Linear Buttons
    $("#radialButton").click(function() {
        if (isLinear) {
            isLinear = false;
            $("#linearButton").removeClass("selectedButton");
            $(this).toggleClass("selectedButton");
            updateGradient();
        }
    })

    $("#linearButton").click(function() {
        if (!isLinear) {
            isLinear = true;
            $("#radialButton").removeClass("selectedButton");
            $(this).toggleClass("selectedButton");
            updateGradient();
        }
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
        $(this).on("mousedown", function(e) {
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

    $(".gradientChanger").on("click",function(e) {
        if(this == e.target) {
            var getPosTemp = e.pageX - $(this).offset().left;
            var returnID = addAPointer($(hexCode).val(),String(getPosTemp)+"px");
            $(".gradientPointer").removeClass("selected");
            $("#"+returnID).addClass("selected");
            $("#"+returnID).draggable({
                axis:"x",
                containment:".gradientChanger",
                drag: function() {
                    gradientChanger.movePointer($(this).attr("id"),$(this).css("left"));
                    updateGradient();
                }
            });
            $("#"+returnID).on("mousedown", function(e) {
                $(".gradientPointer").removeClass("selected");
                $(this).addClass("selected");
            })
            updateGradient();
        }
        
    })

    //SideBar
    $(".toggle-btn").click(function(){
        $("#sidebar").toggleClass("active");
        updateSideBar();
        if(!wasSideBarOpen) {
            $(".toggle-btn-inner").css("display","none");
            $(".crossSidebar").css("display","block");
            wasSideBarOpen = true;
        }
        else {
            $(".toggle-btn-inner").css("display","block");
            $(".crossSidebar").css("display","none");
            wasSideBarOpen = false;
        }
    })

    $(sidebarList).on("click",".itemDelete",function() {
        var sId = $(this).parent().parent().attr("id");
        sId = sId.substring(0,sId.length-3);
        gradientChanger.deletePointer(sId);
        updateGradient();
        updateSideBar();
    })
    

});

//Main function
function start() {
    addAPointer("#FFFFFF", "2px");
    addAPointer("#000000", "320px");
    $(hexCode).val("#000000")
    updateGradient();
}

//Update Function
function updateGradient() {
    
    $(".gradientChanger").css("background", function() {
        // lgTemp = gradientChanger.generateGradient($(this).width());
        // if(isLinear) {
        //     return "linear-gradient(90deg," + lgTemp + ")";
        // }
        if(isLinear) {
            lgTemp = "linear-gradient(90deg,"+gradientChanger.generateGradient($(this).width()) + ")";
            return lgTemp;
        }
        else {
            lgTemp = "radial-gradient(circle,"+gradientChanger.generateGradient($(this).width()) + ")";
            return "linear-gradient(90deg,"+gradientChanger.generateGradient($(this).width()) + ")";
        }
    });

    $(".gradientViewer").css("background",lgTemp);   
    updateSideBar();
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

function updateSideBar() {
    var listPointers = gradientChanger.getPointers();
    $(sidebarList).html("")
    for (var i = 0; i < listPointers.length; i++) {
        var itemDiv = document.createElement("div");
        itemDiv.setAttribute("class","item");
        itemDiv.setAttribute("id",listPointers[i].getId()+"div");

        var itemColor = document.createElement("div");
        itemColor.setAttribute("class","itemColor");
        itemColor.style.backgroundColor = listPointers[i].getColor();

        var itemDetails = document.createElement("div");
        itemDetails.setAttribute("class","itemDetails");
        
        var itemHex = document.createElement("span");
        itemHex.setAttribute("class","itemHex");
        var itemHexVal = document.createTextNode(listPointers[i].getColor());
        itemHex.append(itemHexVal);

        var itemDelete = document.createElement("button");
        itemDelete.setAttribute("class","itemDelete");
        var itemDeleteVal = document.createTextNode("Delete");
        itemDelete.append(itemDeleteVal);

        itemDetails.append(itemHex);
        itemDetails.append(itemDelete);

        itemDiv.append(itemColor);
        itemDiv.append(itemDetails);

        $(sidebarList).append(itemDiv);
    }
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
     var id = gradientChanger.addPointer(color,pos);
    updateSideBar();
    return id;
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


