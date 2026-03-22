const challenges = {
    tease: [
        "Whisper your favorite thing about your partner in their ear.",
        "Give your partner a seductive look and don't look away for 10 seconds.",
        "Trace your partner's lips with your finger slowly.",
        "Send your partner a bold text message right now.",
        "Describe a dream you've had about your partner.",
        "Whisper a 'naughty' plan for later tonight while standing close.",
        "Steal a passionate kiss in a place where you might be seen."
    ],
    intimate: [
        "Give your partner a slow, 30-second hug.",
        "Share one thing you're grateful for in your relationship.",
        "Look into each other's eyes for a full minute without speaking.",
        "Hold hands and talk about your favorite memory together.",
        "Give your partner a gentle massage for 3 minutes."
    ],
    bold: [
        "Give your partner a passionate kiss that lasts at least 15 seconds.",
        "Whisper a secret fantasy to your partner.",
        "Take the lead in Cowgirl or Reverse Cowgirl. For an extra tease, spell 'COCONUT' with your movements.",
        "Don't wait for the bedroom. Use the nearest wall for a passionate standing encounter.",
        "Experience mutual satisfaction with the classic 69. Focus on the give and take.",
        "Go deep with Doggy-style. Take control of the hips and set the rhythm.",
        "Elevate the classic missionary into the Anvil position. Legs on shoulders for maximum intensity.",
        "Move away from the mattress. Use a chair to unlock new angles and playful roleplay possibilities.",
        "Describe what you want to do to your partner later tonight."
    ],
    surprise: [
        "Switch roles with your partner for the next challenge.",
        "Partner's choice: Pick any challenge from any category.",
        "Blindfold your partner and give them a light kiss somewhere surprising.",
        "Make a bold toast to your future together.",
        "Dance slowly together for one whole song."
    ]
};

let currentCategory = 'tease';
let isFlipped = false;

// DOM Elements
const catButtons = document.querySelectorAll('.cat-btn');
const challengeCard = document.getElementById('challenge-card');
const challengeText = document.getElementById('challenge-text');
const cardCategory = document.getElementById('card-category');
const revealBtn = document.getElementById('reveal-btn');
const cardBack = document.querySelector('.card-back');

// Initialize
function init() {
    setupCategories();
    setupGameLogic();
}

function setupCategories() {
    catButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update UI
            catButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update State
            currentCategory = btn.dataset.category;
            
            // If card is already flipped, flip it back to reset
            if (isFlipped) {
                challengeCard.classList.remove('flipped');
                isFlipped = false;
                revealBtn.innerText = "Reveal Challenge";
            }
        });
    });
}

function setupGameLogic() {
    revealBtn.addEventListener('click', toggleChallenge);
    challengeCard.addEventListener('click', toggleChallenge);
}

function toggleChallenge() {
    if (!isFlipped) {
        // Reveal Logic
        const categoryChallenges = challenges[currentCategory];
        const randomChallenge = categoryChallenges[Math.floor(Math.random() * categoryChallenges.length)];
        
        challengeText.innerText = randomChallenge;
        cardCategory.innerText = currentCategory.toUpperCase();
        
        // Update styling based on category
        cardBack.className = `card-back ${currentCategory}`;
        
        challengeCard.classList.add('flipped');
        isFlipped = true;
        revealBtn.innerText = "Next Challenge";
        
        // Add a little haptic-like feel with a quick scale
        revealBtn.style.transform = "scale(0.95)";
        setTimeout(() => {
            revealBtn.style.transform = "scale(1)";
        }, 100);

    } else {
        // Reset Logic for Next
        challengeCard.classList.remove('flipped');
        isFlipped = false;
        revealBtn.innerText = "Reveal Challenge";
        
        // Wait for flip back animation before enabling "Reveal" again
        // revealBtn.disabled = true;
        // setTimeout(() => { revealBtn.disabled = false; }, 800);
    }
}

// Start the app
init();
