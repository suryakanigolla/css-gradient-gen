import {Pointer} from "../Pointer/Pointer.js";

export class GradientChanger {
    constructor(pointers) {
        this.pointers = pointers;
        this.currentId = 0;
    }

    checkOverlapping(pointer) {
        return (this.pointers.filter(item => item.pos == pointer.pos)).length == 0 ? false : true;
    }

    checkBorder(pointer) {
        return parseFloat(pointer.pos) < 101 ? true : false; 
    }

    addPointer(colour,pos) {
        var tempId = `pointer${this.currentId}`;
        var tempPointer;
        if(this.currentId == 0) {
            tempPointer =  new Pointer(colour,pos, tempId, true);
        }
        else {
            tempPointer =  new Pointer(colour,pos, tempId, false);
        }
        if (!this.checkOverlapping(tempPointer) && this.checkBorder(tempPointer)) {
            this.pointers.push(tempPointer);
            this.currentId += 1;
            $(".gradientChanger").append(tempPointer.getHTML());
        }
        else {
            console.log("overlapping");
        }
        
    }

    deletePointer(pointer) {
        if(this.pointers.length > 2) {
            $(pointer.getId()).remove();
            this.pointers = this.pointers.filter(item => item != pointer);
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

    generateGradient() {
        var tempStr = "linear-gradient(90deg,";
        for (var i = 0; i < this.pointers.length; i++) {
            tempStr += this.pointers[i].getColor();
            tempStr += " ";
            tempStr += this.pointers[i].getPos();
            if(i != this.pointers.length - 1) {
                tempStr += ",";
            }
        }
        tempStr += ")";
        return tempStr;
    }
}

