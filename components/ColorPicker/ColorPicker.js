export class ColorPicker {
    constructor(target, width, height) {
        this.target = target;
        this.width = width;
        this.height = height;
        this.target.width = target.width;
        this.target.height = target.height;
        this.context = this.target.getContext("2d");
        this.pickerCircle = {x : 10, y: 10, width: 2, height: 2};
        this.backgroundColor = "rgb(0,0,0)";
    }

    draw() {
        this.build();
    }

    build() {
        this.context.imageSmoothingEnabled = false;
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0,0,this.target.width,this.target.height);
        var gradient = this.context.createLinearGradient(0,0,this.target.width,this.target.height);
        gradient.addColorStop(0,'white');
        gradient.addColorStop(1,'rgba(255,255,255,0)');
        this.context.fillStyle = gradient; 
        this.context.fillRect(0,0,this.target.width,this.target.height);
        gradient = this.context.createLinearGradient(0,0,0,this.target.height);
        gradient.addColorStop(0, 'rgba(0,0,0,0)');
        gradient.addColorStop(1,  '#000');
        this.context.fillStyle = gradient; 
        this.context.fillRect(0,0,this.target.width,this.target.height);  

        //Circle
        // this.context.beginPath();
        // this.context.arc(this.pickerCircle.x, this.pickerCircle.y, this.pickerCircle.width, 0, Math.PI * 2);
        // this.context.strokeStyle = "black";
        // this.context.stroke();
        // this.context.closePath();
    }

    updateColor(r,g,b) {
        var tempString = `rgb(${r},${g},${b})`;
        this.backgroundColor = tempString;
    }

    pickerListener () {
        var isMouseDown = false;
        
        const onMouseDown = (e) => {
            var currentX = e.clientX - this.target.offsetLeft;
            var currentY = e.clientY - this.target.offsetTop;
            if (currentY > this.pickerCircle.y && currentY < this.pickerCircle.y + this.pickerCircle.width && currentX > this.pickerCircle.x && currentX < this.pickerCircle.x + this.pickerCircle.w) {
                isMouseDown = true;
            }
            else {
                this.pickerCircle.x = currentX;
                this.pickerCircle.y = currentY;
            }
        }

        const onMouseMove = (e) => {
            var currentX = e.clientX - this.target.offsetLeft;
            var currentY = e.clientY - this.target.offsetTop;
            this.pickerCircle.x = currentX;
            this.pickerCircle.y = currentY;
        }

        const onMouseUp = (e) => {
            isMouseDown = false;
        }

        this.addEventListener("mousedown", onMouseDown);
        this.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }


}