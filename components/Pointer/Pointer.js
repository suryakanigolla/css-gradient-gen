export class Pointer {
    constructor(colour,pos,id) {
        this.colour = colour;
        this.pos = pos;
        this.id = id;
    }

    updateColorPointer(newColor) {
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
        if(this.id == "pointer0") {
            return `<div class='gradientPointer selected' style='left: ${this.pos};' id='${this.id}'></div>`
        }
        else {
            return `<div class='gradientPointer' style='left: ${this.pos};' id='${this.id}'></div>`
        }
    }
}