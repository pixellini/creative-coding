const starAmount = 1600;
const stars = [];
const maxSpeed = 50;
let speed = 1;

class Star {
    x = 0;
    y = 0;
    z = 0;
    pz = 0; // previous Z, used to draw the line.

    constructor() {
        this.setRandomPosition();
        this.z = random(window.innerWidth);
        this.setPreviousZ();
    }

    update () {
        this.z = this.z - speed;
        if (this.z < 1) {
            this.z = window.innerWidth;
            this.setRandomPosition();
            this.setPreviousZ();
        }
    }

    show () {
        fill(255);
        noStroke();

        const sx = map(this.x / this.z, 0, 1, 0, window.innerWidth);
        const sy = map(this.y / this.z, 0, 1, 0, window.innerHeight);

        const px = map(this.x / this.pz, 0, 1, 0, window.innerWidth); 
        const py = map(this.y / this.pz, 0, 1, 0, window.innerHeight);

        this.setPreviousZ();

        stroke(255);
        line(px, py, sx, sy);
    }

    setRandomPosition () {
        this.x = random(-window.innerWidth, window.innerWidth);
        this.y = random(-window.innerHeight, window.innerHeight);
    }

    setPreviousZ () {
        this.pz = this.z;
    }
}

function setup () {
    createCanvas(window.innerWidth, window.innerHeight);

    for (let i = 0; i < starAmount; i++) {
        stars[i] = new Star();
    }
}

function draw () {
    speed = map(mouseY, 0, window.innerWidth, maxSpeed, -maxSpeed);
    background(0);
    translate(window.innerWidth / 2, window.innerHeight / 2);
    for (let i = 0; i < starAmount; i++) {
        stars[i].update();
        stars[i].show();
    }
}