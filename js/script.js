// Configuration - UPDATE THESE VALUES!
const CONFIG = {
    herName: "Nana",
    yourName: "Goodness Olamide, OWOLABI",
    anniversaryNumber: "3rd",
    correctNames: ["my love", "baby", "nana", "deborah", "darling"]
};

// DOM Elements
const welcomeScreen = document.getElementById('welcomeScreen');
const nameScreen = document.getElementById('nameScreen');
const mainScreen = document.getElementById('mainScreen');
const nameInput = document.getElementById('nameInput');
const errorMessage = document.getElementById('errorMessage');
const herNameSpan = document.getElementById('herName');
const yourNameSpan = document.getElementById('yourName');
const anniversarySpan = document.getElementById('anniversaryNumber');

// Music variables
let isMusicPlaying = false;
let backgroundMusic, musicToggle;

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
});

function initializePage() {
    yourNameSpan.textContent = CONFIG.yourName;
    anniversarySpan.textContent = CONFIG.anniversaryNumber;
    
    backgroundMusic = document.getElementById('backgroundMusic');
    musicToggle = document.getElementById('musicToggle');
}

function setupEventListeners() {
    document.querySelector('.envelope').addEventListener('click', openEnvelope);
    
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') verifyName();
    });
    
    document.addEventListener('click', function() {
        if (backgroundMusic && backgroundMusic.paused) {
            backgroundMusic.load();
        }
    }, { once: true });
}

function openEnvelope() {
    welcomeScreen.classList.remove('active');
    nameScreen.classList.add('active');
    nameInput.focus();
}

function verifyName() {
    const enteredName = nameInput.value.trim().toLowerCase();
    const lowerCaseCorrectNames = CONFIG.correctNames.map(name => name.toLowerCase());
    
    if (lowerCaseCorrectNames.includes(enteredName)) {
        const displayName = CONFIG.correctNames.find(name => 
            name.toLowerCase() === enteredName
        ) || CONFIG.herName;
        
        herNameSpan.textContent = displayName;
        nameScreen.classList.remove('active');
        mainScreen.classList.add('active');
        
        document.querySelector('.love-letter').style.animation = 'fadeInUp 1s ease';
        
        setTimeout(() => {
            if (backgroundMusic) toggleMusic();
        }, 1000);
        
    } else {
        errorMessage.textContent = "That's not the special name I call you... try 'Nana', 'Deborah', or another pet name I use for you 💕";
        errorMessage.style.display = 'block';
        nameInput.value = '';
        nameInput.focus();
        
        nameInput.style.animation = 'shake 0.5s ease';
        setTimeout(() => nameInput.style.animation = '', 500);
    }
}

function toggleMusic() {
    if (!backgroundMusic) return;
    
    try {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicToggle.textContent = '🎵 Play Our Song';
        } else {
            backgroundMusic.play().catch(e => {
                musicToggle.textContent = '🎵 Click to Play Our Song';
            });
            musicToggle.textContent = '🔇 Pause Music';
        }
        isMusicPlaying = !isMusicPlaying;
    } catch (error) {
        console.log('Music error:', error);
    }
}

// CSS Animations
const additionalCSS = `
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-8px); }
    75% { transform: translateX(8px); }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
}

.pulse {
    animation: pulse 3s infinite;
}
`;

const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);