document.addEventListener('DOMContentLoaded', function() {
    const surpriseBtn = document.getElementById('surpriseBtn');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainContent = document.getElementById('mainContent');

    surpriseBtn.addEventListener('click', function() {
        welcomeScreen.classList.add('fade-out');
        setTimeout(function() {
            mainContent.classList.add('show');
            initializeMainPage();
        }, 500);
        createConfetti();
    });

    document.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && !welcomeScreen.classList.contains('fade-out')) {
            surpriseBtn.click();
        }
    });
});

function initializeMainPage() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.love-card, .reason-card').forEach(card => {
        observer.observe(card);
    });

    const blowBtn = document.getElementById('blowCandles');
    if (blowBtn) {
        blowBtn.addEventListener('click', function() {
            const cake = document.querySelector('.cake-container');
            const candles = document.querySelectorAll('.candle');
            cake.classList.add('blowing');
            candles.forEach(candle => candle.classList.add('blown'));
            createBirthdayConfetti();
            playBirthdaySound();
            setTimeout(() => {
                blowBtn.disabled = true;
                blowBtn.textContent = '🎉 Make a Wish! 🎉';
            }, 600);
        });
    }

    const envelopeBtn = document.getElementById('openEnvelope');
    if (envelopeBtn) {
        envelopeBtn.addEventListener('click', function() {
            const envelope = document.querySelector('.envelope');
            const letter = document.querySelector('.letter-content');
            envelope.classList.add('opened');
            setTimeout(() => {
                letter.classList.add('visible');
            }, 300);
        });
    }

    const replayBtn = document.getElementById('replayBtn');
    if (replayBtn) {
        replayBtn.addEventListener('click', function() {
            location.reload();
        });
    }
}

function createConfetti() {
    const colors = ['#ff1493', '#ff69b4', '#ffb6c1', '#ff0000', '#ff6b9d'];
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';
        document.body.appendChild(confetti);
        let top = 0;
        let left = parseInt(confetti.style.left);
        let velocity = Math.random() * 2 + 1;
        let horizontalVelocity = (Math.random() - 0.5) * 4;
        const animation = setInterval(function() {
            top += velocity;
            left += horizontalVelocity;
            confetti.style.top = top + 'px';
            confetti.style.left = left + 'px';
            confetti.style.opacity = 1 - (top / window.innerHeight);
            if (top > window.innerHeight) {
                clearInterval(animation);
                confetti.remove();
            }
        }, 20);
    }
}

function createBirthdayConfetti() {
    const colors = ['#ff1493', '#ff69b4', '#ffb6c1', '#ff0000', '#ff6b9d', '#ffd700', '#00d4ff'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = Math.random() * window.innerHeight / 2 + 'px';
        confetti.style.width = Math.random() * 8 + 4 + 'px';
        confetti.style.height = Math.random() * 8 + 4 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';
        document.body.appendChild(confetti);
        let top = parseInt(confetti.style.top);
        let left = parseInt(confetti.style.left);
        let velocity = Math.random() * 3 + 1;
        let horizontalVelocity = (Math.random() - 0.5) * 6;
        const animation = setInterval(function() {
            top += velocity;
            left += horizontalVelocity;
            confetti.style.top = top + 'px';
            confetti.style.left = left + 'px';
            confetti.style.opacity = 1 - (top / window.innerHeight);
            if (top > window.innerHeight) {
                clearInterval(animation);
                confetti.remove();
            }
        }, 20);
    }
}

function playBirthdaySound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [327.03, 327.03, 367.99, 327.03, 435.99];
    notes.forEach((freq, index) => {
        setTimeout(() => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.frequency.value = freq;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        }, index * 150);
    });
}
