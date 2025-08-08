// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing birthday website with countdown timer...');
    // Initialize the birthday website
    initializeBirthdayWebsite();
});

function initializeBirthdayWebsite() {
    // Handle loading screen
    handleLoadingScreen();
    
    // Initialize countdown timer - this is the new feature!
    initializeCountdownTimer();
    
    // Initialize interactive elements - ensure this runs after DOM is ready
    setTimeout(() => {
        initializeInteractiveHeart();
    }, 100);
    
    // Initialize background animations
    initializeBackgroundAnimations();
    
    // Initialize mouse trail
    initializeMouseTrail();
    
    // Initialize floating decorations
    initializeFloatingDecorations();
    
    // Make interactive heart focusable for accessibility
    makeHeartAccessible();
}

// COUNTDOWN TIMER FUNCTIONALITY - NEW!
function initializeCountdownTimer() {
    console.log('Initializing countdown timer...');
    
    // Target birth time: August 8th, 2025 at 5:35 AM IST (UTC+5:30)
    const targetDateTime = new Date('2025-08-08T05:35:00+05:30');
    
    console.log('Target birth time:', targetDateTime);
    
    // Update timer every second
    const timerInterval = setInterval(() => {
        updateCountdownTimer(targetDateTime);
    }, 1000);
    
    // Initial update
    updateCountdownTimer(targetDateTime);
    
    // Store interval for potential cleanup
    window.countdownInterval = timerInterval;
}

function updateCountdownTimer(targetDateTime) {
    const now = new Date();
    const timeDifference = targetDateTime.getTime() - now.getTime();
    
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const countdownHeader = document.getElementById('countdown-header');
    const celebrationMessage = document.getElementById('celebration-message');
    
    if (!hoursElement || !minutesElement || !secondsElement) {
        console.error('Timer elements not found!');
        return;
    }
    
    if (timeDifference > 0) {
        // Before birth time - countdown mode
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
        // Update timer display with smooth animation
        updateTimerDisplay(hoursElement, hours);
        updateTimerDisplay(minutesElement, minutes);
        updateTimerDisplay(secondsElement, seconds);
        
        // Update header message
        if (countdownHeader) {
            countdownHeader.innerHTML = '<span>Time until your birth moment:</span>';
        }
        
        // Hide celebration message
        if (celebrationMessage) {
            celebrationMessage.classList.add('hidden');
        }
        
    } else if (Math.abs(timeDifference) <= 60000) {
        // Exactly at birth time (within 1 minute) - celebration mode!
        console.log('🎉 IT\'S HER BIRTH TIME! 🎉');
        
        updateTimerDisplay(hoursElement, 0);
        updateTimerDisplay(minutesElement, 0);
        updateTimerDisplay(secondsElement, 0);
        
        // Show special celebration message
        if (countdownHeader) {
            countdownHeader.innerHTML = '<span>🎉 Your Moment Has Arrived! 🎉</span>';
        }
        
        if (celebrationMessage) {
            celebrationMessage.classList.remove('hidden');
        }
        
        // Trigger celebration effects
        triggerBirthTimeCelebration();
        
    } else {
        // After birth time - elapsed time mode
        const elapsedTime = Math.abs(timeDifference);
        const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
        
        updateTimerDisplay(hoursElement, hours);
        updateTimerDisplay(minutesElement, minutes);
        updateTimerDisplay(secondsElement, seconds);
        
        // Update header message for elapsed time
        if (countdownHeader) {
            countdownHeader.innerHTML = '<span>Time since your birth moment:</span>';
        }
        
        // Hide celebration message after 2 minutes
        if (celebrationMessage && elapsedTime > 120000) {
            celebrationMessage.classList.add('hidden');
        }
    }
}

function updateTimerDisplay(element, value) {
    const formattedValue = value.toString().padStart(2, '0');
    
    if (element.textContent !== formattedValue) {
        // Add smooth transition animation
        element.style.transform = 'scale(1.1)';
        element.style.color = 'var(--romantic-accent)';
        
        setTimeout(() => {
            element.textContent = formattedValue;
            element.style.transform = 'scale(1)';
            element.style.color = 'var(--romantic-text)';
        }, 150);
    }
}

function triggerBirthTimeCelebration() {
    console.log('Triggering birth time celebration!');
    
    // Create massive particle explosion
    createMassiveParticleExplosion();
    
    // Add special glow to timer
    const countdownSection = document.querySelector('.countdown-section');
    if (countdownSection) {
        countdownSection.style.animation = 'celebration-pulse 0.5s infinite alternate';
        countdownSection.style.boxShadow = '0 20px 60px rgba(255, 215, 0, 0.8)';
    }
    
    // Add celebration class to body for additional effects
    document.body.classList.add('celebration-active');
    
    // Animate age number
    const ageNumber = document.querySelector('.age-number');
    if (ageNumber) {
        ageNumber.style.animation = 'age-glow 0.8s infinite alternate, pulse 1s infinite';
    }
    
    // Create floating birthday messages
    createFloatingBirthdayMessages();
    
    // Play celebration sound effect (visual indication)
    console.log('🎵 Playing celebration sound! 🎵');
}

function createMassiveParticleExplosion() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Create multiple explosion waves
    for (let wave = 0; wave < 3; wave++) {
        setTimeout(() => {
            for (let i = 0; i < 25; i++) {
                createCelebrationParticle(centerX, centerY);
            }
        }, wave * 200);
    }
}

function createCelebrationParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'celebration-particle';
    
    // Random celebration emojis
    const celebrationEmojis = ['🎉', '🎊', '🎈', '💖', '✨', '🌟', '💕', '🎂'];
    particle.textContent = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
    
    const angle = Math.PI * 2 * Math.random();
    const velocity = 100 + Math.random() * 150;
    const offsetX = Math.cos(angle) * velocity;
    const offsetY = Math.sin(angle) * velocity;
    
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9998';
    particle.style.animation = `celebration-particle-float 4s ease-out forwards`;
    particle.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${Math.random() * 360}deg)`;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 4000);
}

function createFloatingBirthdayMessages() {
    const messages = ['Happy Birthday!', '24 Years!', 'Our First!', 'Love You!', 'Special Day!'];
    
    messages.forEach((message, index) => {
        setTimeout(() => {
            const msgElement = document.createElement('div');
            msgElement.textContent = message;
            msgElement.style.position = 'fixed';
            msgElement.style.left = Math.random() * (window.innerWidth - 200) + 'px';
            msgElement.style.top = window.innerHeight + 'px';
            msgElement.style.fontFamily = 'Dancing Script, cursive';
            msgElement.style.fontSize = '2rem';
            msgElement.style.color = 'var(--romantic-gold)';
            msgElement.style.fontWeight = '600';
            msgElement.style.pointerEvents = 'none';
            msgElement.style.zIndex = '9997';
            msgElement.style.textShadow = '2px 2px 10px rgba(255, 215, 0, 0.8)';
            msgElement.style.animation = 'float-message 6s ease-out forwards';
            
            document.body.appendChild(msgElement);
            
            setTimeout(() => {
                if (msgElement.parentNode) {
                    msgElement.parentNode.removeChild(msgElement);
                }
            }, 6000);
        }, index * 800);
    });
}

// Loading Screen Handler
function handleLoadingScreen() {
    const loadingScreen = document.getElementById('loading');
    
    // Hide loading screen after 3 seconds with a beautiful transition
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            
            // Start celebration animations after loading
            setTimeout(() => {
                startCelebrationAnimations();
            }, 1000);
        }
    }, 3000);
}

// Interactive Heart Handler - Enhanced with timer integration
function initializeInteractiveHeart() {
    const interactiveHeart = document.getElementById('interactive-heart');
    const messageSection = document.getElementById('message-section');
    const closeMessageButton = document.getElementById('close-message');
    
    console.log('Interactive heart element:', interactiveHeart);
    console.log('Message section element:', messageSection);
    
    if (!interactiveHeart) {
        console.error('Interactive heart element not found!');
        return;
    }
    
    if (!messageSection) {
        console.error('Message section element not found!');
        return;
    }
    
    // Heart click handler with better event binding
    interactiveHeart.addEventListener('click', function(e) {
        console.log('Heart clicked!');
        e.preventDefault();
        e.stopPropagation();
        
        // Create party poppers effect
        createPartyPoppers(e.clientX, e.clientY);
        
        // Create particle explosion effect
        createParticleExplosion(e.clientX, e.clientY);
        
        // Show message with animation
        showBirthdayMessage();
        
        // Add click effect to heart
        addHeartClickEffect();
    });
    
    // Alternative event binding for touch devices
    interactiveHeart.addEventListener('touchend', function(e) {
        console.log('Heart touched!');
        e.preventDefault();
        
        const touch = e.changedTouches[0];
        createParticleExplosion(touch.clientX, touch.clientY);
        showBirthdayMessage();
        addHeartClickEffect();
    });
    
    // Close message handler
    if (closeMessageButton) {
        closeMessageButton.addEventListener('click', function(e) {
            console.log('Close button clicked!');
            e.preventDefault();
            hideBirthdayMessage();
        });
    }
    
    // Close message when clicking outside
    messageSection.addEventListener('click', function(e) {
        if (e.target === messageSection) {
            console.log('Clicked outside message, closing...');
            hideBirthdayMessage();
        }
    });
    
    console.log('Interactive heart initialized successfully!');
}

// Show/Hide Birthday Message - Enhanced
function showBirthdayMessage() {
    console.log('Showing birthday message...');
    const messageSection = document.getElementById('message-section');
    
    if (messageSection) {
        messageSection.classList.remove('hidden');
        messageSection.style.display = 'flex';
        
        // Add body scroll lock
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        const messageCard = messageSection.querySelector('.message-card');
        if (messageCard) {
            messageCard.focus();
        }
        
        console.log('Birthday message displayed!');
    } else {
        console.error('Message section not found when trying to show message');
    }
}

function hideBirthdayMessage() {
    console.log('Hiding birthday message...');
    const messageSection = document.getElementById('message-section');
    
    if (messageSection) {
        messageSection.classList.add('hidden');
        
        // Remove body scroll lock
        document.body.style.overflow = 'auto';
        
        // Return focus to heart
        const interactiveHeart = document.getElementById('interactive-heart');
        if (interactiveHeart) {
            interactiveHeart.focus();
        }
        
        console.log('Birthday message hidden!');
    }
}

// Heart Click Effect
function addHeartClickEffect() {
    const heartInner = document.querySelector('.heart-inner');
    if (heartInner) {
        heartInner.style.animation = 'none';
        heartInner.offsetHeight; // Trigger reflow
        heartInner.style.animation = 'heart-pulse 0.6s ease-out, heart-pulse 3s infinite ease-in-out 0.6s';
    }
}

// Party Poppers Effect
function createPartyPoppers(x, y) {
    const popperEmojis = ['🎉', '🎊', '✨', '💖', '🌟', '💕', '🎈', '🎀'];
    
    // Left side poppers
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const popper = document.createElement('div');
            popper.className = 'party-popper';
            popper.textContent = popperEmojis[Math.floor(Math.random() * popperEmojis.length)];
            
            const startX = 50;
            const targetX = x - 100 + Math.random() * 200;
            const targetY = y - 50 + Math.random() * 100;
            
            popper.style.left = startX + 'px';
            popper.style.top = y + 'px';
            popper.style.setProperty('--target-x', targetX + 'px');
            popper.style.setProperty('--target-y', targetY + 'px');
            popper.style.animation = 'popperLeft 2s ease-out forwards';
            
            document.body.appendChild(popper);
            
            setTimeout(() => {
                if (popper.parentNode) {
                    popper.parentNode.removeChild(popper);
                }
            }, 2000);
        }, i * 80);
    }
    
    // Right side poppers
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const popper = document.createElement('div');
            popper.className = 'party-popper';
            popper.textContent = popperEmojis[Math.floor(Math.random() * popperEmojis.length)];
            
            const startX = window.innerWidth - 50;
            const targetX = x - 100 + Math.random() * 200;
            const targetY = y - 50 + Math.random() * 100;
            
            popper.style.left = startX + 'px';
            popper.style.top = y + 'px';
            popper.style.setProperty('--target-x', targetX + 'px');
            popper.style.setProperty('--target-y', targetY + 'px');
            popper.style.animation = 'popperRight 2s ease-out forwards';
            
            document.body.appendChild(popper);
            
            setTimeout(() => {
                if (popper.parentNode) {
                    popper.parentNode.removeChild(popper);
                }
            }, 2000);
        }, i * 80);
    }
}

// Particle Explosion Effect - Enhanced
function createParticleExplosion(x, y) {
    console.log('Creating particle explosion at:', x, y);
    const particleContainer = document.getElementById('particle-container');
    if (!particleContainer) {
        console.error('Particle container not found');
        return;
    }
    
    const particleCount = Math.floor(15 * (window.PARTICLE_COUNT_MODIFIER || 1));
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(x, y, particleContainer);
    }
}

function createParticle(x, y, container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position around click point
    const angle = (Math.PI * 2 * Math.random());
    const velocity = 50 + Math.random() * 100;
    const offsetX = Math.cos(angle) * velocity;
    const offsetY = Math.sin(angle) * velocity;
    
    particle.style.left = (x - 3) + 'px';
    particle.style.top = (y - 3) + 'px';
    particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    
    // Random color
    const colors = ['#ffd700', '#e76799', '#f47bb6', '#fbd6ff'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 3000);
}

// Background Animations
function initializeBackgroundAnimations() {
    // Add additional floating hearts
    addFloatingHearts();
    
    // Add sparkle effects
    addSparkleEffects();
}

function addFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    if (!heartsContainer) return;
    
    const heartEmojis = ['💕', '💖', '💗', '💝', '🌸', '🦋'];
    
    // Create additional floating hearts
    for (let i = 0; i < 4; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.position = 'absolute';
        heart.style.fontSize = `${1 + Math.random() * 1.5}rem`;
        heart.style.left = `${Math.random() * 90}%`;
        heart.style.top = `${Math.random() * 80}%`;
        heart.style.animation = `float ${6 + Math.random() * 4}s infinite ease-in-out`;
        heart.style.animationDelay = `${Math.random() * 4}s`;
        heart.style.opacity = '0.7';
        heart.style.pointerEvents = 'none';
        
        heartsContainer.appendChild(heart);
    }
}

function addSparkleEffects() {
    const sparklesContainer = document.querySelector('.sparkles');
    if (!sparklesContainer) return;
    
    const sparkleEmojis = ['✨', '⭐', '🌟', '💫', '🎆'];
    
    // Create sparkle effects
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'floating-sparkle';
        sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = `${0.8 + Math.random()}rem`;
        sparkle.style.left = `${Math.random() * 95}%`;
        sparkle.style.top = `${Math.random() * 85}%`;
        sparkle.style.animation = `sparkle ${4 + Math.random() * 3}s infinite ease-in-out`;
        sparkle.style.animationDelay = `${Math.random() * 3}s`;
        sparkle.style.opacity = '0.6';
        sparkle.style.pointerEvents = 'none';
        
        sparklesContainer.appendChild(sparkle);
    }
}

// Mouse Trail Effect
function initializeMouseTrail() {
    let mouseTrailTimeout;
    
    document.addEventListener('mousemove', function(e) {
        clearTimeout(mouseTrailTimeout);
        
        mouseTrailTimeout = setTimeout(() => {
            createMouseTrailSparkle(e.clientX, e.clientY);
        }, 100);
    });
}

function createMouseTrailSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.background = '#ffd700';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '998';
    sparkle.style.animation = 'sparkle-trail 1.5s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 1500);
}

// Floating Decorations
function initializeFloatingDecorations() {
    // Create continuous floating decorations
    setInterval(createFloatingDecoration, 8000);
}

function createFloatingDecoration() {
    const decorations = ['🎈', '🎀', '🌹', '🌺', '🦋', '🪷'];
    const decoration = document.createElement('div');
    
    decoration.textContent = decorations[Math.floor(Math.random() * decorations.length)];
    decoration.style.position = 'fixed';
    decoration.style.fontSize = '2rem';
    decoration.style.left = `${Math.random() * 100}vw`;
    decoration.style.top = '110vh';
    decoration.style.pointerEvents = 'none';
    decoration.style.zIndex = '1';
    decoration.style.animation = 'float-up 12s linear forwards';
    decoration.style.opacity = '0.6';
    
    document.body.appendChild(decoration);
    
    setTimeout(() => {
        if (decoration.parentNode) {
            decoration.parentNode.removeChild(decoration);
        }
    }, 12000);
}

// Celebration Animations
function startCelebrationAnimations() {
    // Trigger age number glow
    const ageNumber = document.querySelector('.age-number');
    if (ageNumber) {
        ageNumber.style.animation = 'age-glow 4s infinite ease-in-out, pulse 2s ease-out';
    }
    
    // Add entrance animations to elements
    const elements = [
        { selector: '.first-birthday-badge', delay: 0 },
        { selector: '.main-title', delay: 500 },
        { selector: '.subtitle', delay: 1000 },
        { selector: '.countdown-section', delay: 1200 },
        { selector: '.age-display', delay: 1800 },
        { selector: '.interactive-heart', delay: 2200 }
    ];
    
    elements.forEach(({ selector, delay }) => {
        setTimeout(() => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 100);
            }
        }, delay);
    });
}

// Make interactive heart accessible
function makeHeartAccessible() {
    const interactiveHeart = document.getElementById('interactive-heart');
    if (interactiveHeart) {
        interactiveHeart.setAttribute('tabindex', '0');
        interactiveHeart.setAttribute('role', 'button');
        interactiveHeart.setAttribute('aria-label', 'Click to reveal special birthday message');
    }
}

// Add keyboard support for accessibility - Enhanced
document.addEventListener('keydown', function(e) {
    const messageSection = document.getElementById('message-section');
    
    // Close message with Escape key
    if (e.key === 'Escape' && messageSection && !messageSection.classList.contains('hidden')) {
        hideBirthdayMessage();
    }
    
    // Open message with Enter/Space when heart is focused
    const interactiveHeart = document.getElementById('interactive-heart');
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === interactiveHeart) {
        e.preventDefault();
        console.log('Heart activated via keyboard');
        
        // Get center of heart for particle effect
        const rect = interactiveHeart.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        createParticleExplosion(centerX, centerY);
        showBirthdayMessage();
        addHeartClickEffect();
    }
});

// Add additional CSS animations via JavaScript
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes sparkle-trail {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0) rotate(180deg); }
    }
    
    @keyframes float-up {
        0% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
        10% { opacity: 0.8; }
        90% { opacity: 0.8; }
        100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
    }
    
    @keyframes celebration-particle-float {
        0% { opacity: 1; transform: scale(1) rotate(0deg); }
        100% { opacity: 0; transform: scale(0.5) rotate(360deg) translateY(-200px); }
    }
    
    @keyframes float-message {
        0% { opacity: 0; transform: translateY(100px) scale(0.5); }
        20% { opacity: 1; transform: translateY(0) scale(1); }
        80% { opacity: 1; transform: translateY(-50px) scale(1); }
        100% { opacity: 0; transform: translateY(-150px) scale(0.8); }
    }
    
    .floating-heart, .floating-sparkle {
        user-select: none;
        will-change: transform;
    }
    
    .interactive-heart {
        will-change: transform;
        cursor: pointer;
        user-select: none;
    }
    
    .interactive-heart:active {
        transform: scale(0.95);
    }
    
    /* Additional hover effects for better interactivity */
    .interactive-heart:hover .heart-glow {
        opacity: 1;
        animation: glow-pulse 1s infinite ease-in-out;
    }
    
    .interactive-heart:hover .click-hint {
        color: var(--romantic-primary);
        transform: translateY(-5px);
        transition: all 0.3s ease;
    }
    
    .interactive-heart:focus {
        outline: 3px solid var(--romantic-gold);
        outline-offset: 5px;
    }
    
    /* Timer hover effects */
    .timer-segment:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 30px rgba(255, 215, 0, 0.6);
    }
    
    .countdown-section:hover {
        transform: translateY(-2px);
    }
    
    /* Celebration mode body styles */
    body.celebration-active {
        animation: celebration-bg 2s infinite alternate;
    }
    
    @keyframes celebration-bg {
        0% { background: linear-gradient(135deg, var(--romantic-bg-start) 0%, var(--romantic-bg-end) 100%); }
        100% { background: linear-gradient(135deg, #fff0f0 0%, #fce4ff 100%); }
    }
    
    /* Message card hover effect */
    .message-card {
        transition: transform 0.3s ease;
        outline: none;
    }
    
    .message-section:not(.hidden) .message-card {
        animation: message-appear 0.8s ease-out, gentle-float 6s infinite ease-in-out 1s;
    }
    
    @keyframes gentle-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
    }
    
    /* Timer animation enhancements */
    .timer-value {
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    /* Special birthday styling */
    .celebration-particle {
        animation: celebration-particle-float 4s ease-out forwards;
        text-shadow: 2px 2px 8px rgba(255, 215, 0, 0.8);
    }
`;

document.head.appendChild(additionalStyles);

// Performance optimization: Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
    // Reduce particle count for lower-end devices
    window.PARTICLE_COUNT_MODIFIER = 0.5;
} else {
    window.PARTICLE_COUNT_MODIFIER = 1;
}

// Cleanup function for timer
window.addEventListener('beforeunload', function() {
    if (window.countdownInterval) {
        clearInterval(window.countdownInterval);
    }
});

// Debug helper - can be removed in production
window.debugBirthday = {
    showMessage: showBirthdayMessage,
    hideMessage: hideBirthdayMessage,
    testParticles: () => createParticleExplosion(window.innerWidth/2, window.innerHeight/2),
    testCelebration: triggerBirthTimeCelebration,
    getTimeUntilBirth: () => {
        const target = new Date('2025-08-08T05:35:00+05:30');
        const now = new Date();
        return target.getTime() - now.getTime();
    }
};

console.log('Birthday website with countdown timer loaded successfully! 🎉⏰');
console.log('Current time:', new Date().toLocaleString());
console.log('Target birth time: August 8th, 2025 at 5:35 AM IST');