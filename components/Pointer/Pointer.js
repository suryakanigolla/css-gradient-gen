export class Pointer {
    constructor(colour,pos,id, isSelected) {
        this.colour = colour;
        this.pos = pos;
        this.id = id;
        this.isSelected = isSelected;
    }

    updateColor(newColor) {
        this.colour = newColor;
    }

    updatePos(newPos) {
        this.pos = newPos;
    }

    getColor() {
        return this.colour;
    }

    getPos() {
        return this.pos;
    }

    getId() {
        return this.id;
    }

    getHTML() {
        if(this.isSelected) {
            return `<div class='gradientPointer selected' style='left: ${this.pos};' id='${this.id}'></div>`
        }
        else {
            return `<div class='gradientPointer' style='left: ${this.pos};' id='${this.id}'></div>`
        }
    }
}