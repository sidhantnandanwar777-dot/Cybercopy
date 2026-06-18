document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. THE TIMED GLITCH & VANISH SEQUENCE ---
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    const glitchTexts = document.querySelectorAll('.glitch-text');

    function executeVanishGlitch(el) {
        const originalText = el.dataset.value;
        let iteration = 0;

        // Phase 1: Glitch Out (Scramble into noise)
        el.style.opacity = 1;
        let glitchOut = setInterval(() => {
            el.innerText = originalText.split("").map(() => letters[Math.floor(Math.random() * letters.length)]).join("");
            iteration++;
            
            // After ~300ms of scrambling, vanish the text
            if (iteration > 10) { 
                clearInterval(glitchOut);
                el.style.opacity = 0; // The text disappears
            }
        }, 30);

        // Phase 2: Wait 2 seconds, then Reappear & Decrypt
        setTimeout(() => {
            el.style.opacity = 1; // Snap back to visible
            let unscrambleIteration = 0;
            
            let glitchIn = setInterval(() => {
                el.innerText = originalText.split("").map((letter, index) => {
                    if(index < unscrambleIteration) return originalText[index]; // Lock correct letter
                    return letters[Math.floor(Math.random() * letters.length)]; // Scramble the rest
                }).join("");

                if(unscrambleIteration >= originalText.length) {
                    clearInterval(glitchIn);
                    el.innerText = originalText; // Ensure perfect spelling at the end
                }
                unscrambleIteration += 1 / 2; // Speed of decryption
            }, 30);
            
        }, 2000); // 2000 milliseconds = 2 seconds of being invisible
    }

    // Trigger the sequence every 10 seconds (10000 milliseconds)
    setInterval(() => {
        glitchTexts.forEach(el => executeVanishGlitch(el));
    }, 5000);


    // --- 2. SERVICE SELECTION LOGIC (Unchanged & Functional) ---
    const services = document.querySelectorAll('.cyber-list li');

    services.forEach(service => {
        const taskSpan = service.querySelector('.cyber-task');
        service.dataset.originalText = taskSpan.innerText;

        service.addEventListener('click', function() {
            this.classList.toggle('initialized');

            if (this.classList.contains('initialized')) {
                taskSpan.innerText = ">> [ ✓ ] PROJECT HAS BEEN INITIALIZED";
            } else {
                taskSpan.innerText = this.dataset.originalText;
            }
        });
        
        service.style.cursor = 'pointer';

        // --- 3. MOBILE HAMBURGER MENU LOGIC ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        // Toggle menu open/close on click
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Auto-close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
    });
});