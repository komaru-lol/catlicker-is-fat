const overlay = document.getElementById('overlay');
const music = document.getElementById('bgMusic');
const card = document.getElementById("card");

/* ❖ CUSTOM CURSOR */
const cursor = document.querySelector('.cursor');
const trail = document.querySelector('.cursor-trail');

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    trail.style.left = e.clientX + "px";
    trail.style.top = e.clientY + "px";
});

/* ❖ PARTICLE BACKGROUND */
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;

        this.size = Math.random() * 2 + 1;
        this.color = "rgba(200, 120, 255, 0.8)";
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        this.draw();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 150; i++) particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => p.update());
    requestAnimationFrame(animate);
}

initParticles();
animate();

window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    initParticles();
});

/* ❖ INTRO CLICK HANDLER */
overlay.addEventListener('click', () => {
    overlay.classList.add('hidden');

    music.volume = 0;
    music.play();

    let fade = setInterval(() => {
        if (music.volume < 0.4) music.volume += 0.02;
        else clearInterval(fade);
    }, 80);

    card.hidden = false;
    card.classList.add("fadeClass");
});
