const overlay = document.getElementById('overlay');
const music = document.getElementById('bgMusic')
const video = document.getElementById('bgVideo');

overlay.addEventListener('click', () => {
    overlay.classList.add('hidden');
    
    music.play();
    music.volume = 0.5;
    
    video.play();

    const card = document.getElementById("card");
    
    card.hidden = false;
    card.classList.add("fadeClass");
});
