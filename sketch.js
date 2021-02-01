const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    setup();
});

function createSolarSystem() {
    setup();
    motion();
}



class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.diameter = Math.random() * 2;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.diameter, 0, Math.PI * 2, false);
        c.fillStyle = 'gold';
        c.fill();
    }
}

class Planet {
    constructor(x, y, diameter, color, speed, orbit, name) {
        this.x = x;
        this.y = y;
        this.startX = x;
        this.startY = y;
        this.diameter = diameter;
        this.color = color;
        this.speed = speed;
        this.radian = 0;
        this.orbit = orbit;
        this.name = name;
        ;
    }

    draw() {
        c.fillStyle = "#606060";
        c.font = '20px Comic Sans MS';
        c.fillText('Solar System by Ievgen Dotsenko', canvas.width / 2 - 150, canvas.height - 20);
        // Planet orbit 
        c.beginPath();
        c.lineWidth = 2;
        c.arc(
            this.startX,
            this.startY,
            this.orbit,
            0,
            Math.PI * 2,
            false
        );
        c.strokeStyle = 'rgba(96, 96, 96, 0.5)';
        c.stroke();

        // Planet
        c.shadowColor = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.diameter, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.font = "20px Arial";
        c.fillText(this.name, this.x - this.diameter / 1.2, this.y - this.diameter);


    }

    update() {
        this.draw();
        if (this.speed > 0) {
            this.radian = this.radian + this.speed;
            this.x = this.startX + Math.cos(this.radian) * this.orbit;
            this.y = this.startY + Math.sin(this.radian) * this.orbit;
        }
    }
}

const createPlanet = (diameter, speed, orbit, color, name) =>
    new Planet(
        canvas.width / 2,
        canvas.height / 2,
        diameter,
        color,
        speed / 1000,
        orbit,
        name
    );

let planets;
let stars;
function setup() {
    planets = [];
    stars = [];

    // Planet metric data from https://nssdc.gsfc.nasa.gov/planetary/factsheet/
    // orbits of planets is not to scale
    planets.push(createPlanet(67.9 / 2, 0, 0, 'yellow', "SUN"));
    planets.push(createPlanet(4.8, 47.4, 65, 'GoldenRod', "MERCURY"));
    planets.push(createPlanet(12.1, 35.0, 90, 'orange', "VENUS"));
    planets.push(createPlanet(12.7, 29.8, 125, 'green', "EARTH"));
    planets.push(createPlanet(6.7, 24.1, 175, 'red', "MARS"));
    planets.push(createPlanet(14.2 * 2, 13.1, 225, 'BlanchedAlmond', "JUPITER"));
    planets.push(createPlanet(12 * 2, 9.7, 275, 'Khaki', "SATURN"));
    planets.push(createPlanet(5.1, 6.8, 325, 'SkyBlue', "URANUS"));
    planets.push(createPlanet(4.9 * 2, 5.4, 375, 'RoyalBlue', "NEPTUNE"));
    planets.push(createPlanet(2.3, 4.7, 450, 'SandyBrown', "PLUTO"));

    for (let x = 0; x < 800; x++) {
        stars.push(new Star());
    }
}

function motion() {

    requestAnimationFrame(motion);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = 'rgb(0, 0, 0)';
    c.fillRect(0, 0, canvas.width, canvas.height);


    stars.forEach(star => {
        star.draw();
    });

    planets.forEach(planet => {
        planet.update();
    });
}

createSolarSystem()