const overlay = document.getElementById("overlay");
const card = document.getElementById("card");
const music = document.getElementById("bgMusic");

/* 🔮 HOLOGRAM DISTORTION BACKGROUND */
const canvas = document.getElementById("distortCanvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let t = 0;

function distort() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    g.addColorStop(0, `hsl(${(t) % 360}, 80%, 50%)`);
    g.addColorStop(1, `hsl(${(t + 60) % 360}, 80%, 50%)`);

    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    t += 0.2;
    requestAnimationFrame(distort);
}
distort();

window.onresize = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
};

/* 🔊 INTRO CLICK */
overlay.addEventListener("click", () => {
    overlay.classList.add("hidden");

    card.hidden = false;
    card.classList.add("fadeClass");

    music.volume = 0;
    music.play();
    let fadeIn = setInterval(() => {
        if (music.volume < 0.4) music.volume += 0.02;
        else clearInterval(fadeIn);
    }, 80);
});

/* 🌀 PARALLAX CARD MOVEMENT */
document.addEventListener("mousemove", (e) => {
    let x = (e.clientX / innerWidth - 0.5) * 30;
    let y = (e.clientY / innerHeight - 0.5) * -30;
    card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg)`;
});
