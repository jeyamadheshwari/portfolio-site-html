// --- Snowflake Animation Script ---
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('snowflakes-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let snowflakes = [];
    const numberOfSnowflakes = (canvas.width * canvas.height) / 10000;

    class Snowflake {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1; 
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 + 0.5;
            this.opacity = Math.random() * 0.5 + 0.3;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.y > canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
            if (this.x > canvas.width || this.x < 0) {
                this.x = Math.random() * canvas.width;
                this.y = 0;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initSnowflakes() {
        snowflakes = [];
        for (let i = 0; i < numberOfSnowflakes; i++) {
            snowflakes.push(new Snowflake());
        }
    }

    function animateSnowflakes() {
        requestAnimationFrame(animateSnowflakes);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        snowflakes.forEach(snowflake => {
            snowflake.update();
            snowflake.draw();
        });
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initSnowflakes();
    });

    initSnowflakes();
    animateSnowflakes();
});


// --- Scroll-triggered Animations ---
const sections = document.querySelectorAll('.section-fade-in');
const animatedCards = document.querySelectorAll('.animated-card');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

animatedCards.forEach(card => {
    observer.observe(card);
});


// --- Number Counting Animation ---
const countUpElements = document.querySelectorAll('.count-up');

const countUpObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseFloat(el.getAttribute('data-target'));
            const plus = el.hasAttribute('data-plus');
            const decimal = parseInt(el.getAttribute('data-decimal')) || 0;

            let start = 0;
            const duration = 2000;
            let current = 0;
            const increment = target / (duration / 16);

            const timer = setInterval(() => {
                current += increment;
                el.textContent = current.toFixed(decimal) + (plus ? '+' : '');

                if (current >= target) {
                    el.textContent = target.toFixed(decimal) + (plus ? '+' : '');
                    clearInterval(timer);
                }
            }, 16);

            observer.unobserve(el);
        }
    });
}, { threshold: 0.5 });

countUpElements.forEach(el => {
    countUpObserver.observe(el);
});