import {Pointer} from "../Pointer/Pointer.js";

export class GradientChanger {
    constructor(pointers) {
        this.pointers = pointers;
        this.currentId = 0;
    }

    checkOverlapping(pointer) {
        return (this.pointers.filter(item => item.pos == pointer.pos)).length == 0 ? false : true;
    }

    // checkBorder(pointer) {
    //     return parseFloat(pointer.pos) < 101 ? true : false; 
    // }

    addPointer(colour,pos) {
        var tempId = `pointer${this.currentId}`;
        var tempPointer;
        tempPointer =  new Pointer(colour,pos, tempId);
        if (!this.checkOverlapping(tempPointer)) {
            this.pointers.push(tempPointer);
            this.pointers.sort(function(a,b) { return parseFloat(a.getPos()) - parseFloat(b.getPos()) });
            this.currentId += 1;
            $(".gradientChanger").append(tempPointer.getHTML());
        }
        else {
            console.log("overlapping");
        }
        return tempId;
        
    }

    deletePointer(pointerID) {
        if(this.pointers.length > 2) {
            console.log(pointerID)
            $("#"+pointerID).remove();
            this.pointers = this.pointers.filter(item => item.id != pointerID);
        }
    }

    getPointer(id) {
        return this.pointers.filter(item => item.id == id);
    }

    getPointers() {
        return this.pointers;
    }

    movePointer(id,newPos) {
        var pointerTemp = this.pointers.filter(item => item.id == id);
        pointerTemp[0].updatePos(newPos);
    }

    updateColor(id,newColor) {
        var pointerTemp = this.pointers.filter(item => item.id == id);
        pointerTemp[0].updateColor(newColor); 
    }

    // toHTML() {
    //     var divNew = document.createElement("div");
    //     divNew.className = "gradientChanger";
    //     return divNew;
    // }

    generateGradient(width) {
        var tempStr = "linear-gradient(90deg,";
        var tempVal;
        for (var i = 0; i < this.pointers.length; i++) {
            tempStr += this.pointers[i].getColor();
            tempStr += " ";
            tempVal = (parseFloat($("#"+this.pointers[i].getId()).css("left"))/width)*100;
            tempStr += String(tempVal) + "%";
            if(i != this.pointers.length - 1) {
                tempStr += ",";
            }
        }
        tempStr += ")";
        return tempStr;
    }
}

