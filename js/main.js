// Particles
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 15; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 100 + 50;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 6 + 's';
    p.style.animationDuration = (Math.random() * 4 + 4) + 's';
    particlesContainer.appendChild(p);
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .feature-card, .review-card, .about-card, .section-header').forEach(el => {
    observer.observe(el);
});

// Sticky CTA
const stickyCta = document.getElementById('stickyCta');
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 600 && currentScroll > lastScroll) {
        stickyCta.classList.add('visible');
    } else if (currentScroll < 300 || currentScroll < lastScroll) {
        stickyCta.classList.remove('visible');
    }
    lastScroll = currentScroll;
});

// Before/After Slider
const baContainer = document.getElementById('baContainer');
const baHandle = document.getElementById('baHandle');
const baAfter = document.getElementById('baAfter');
let isDragging = false;

function updateSlider(x) {
    const rect = baContainer.getBoundingClientRect();
    let percent = ((x - rect.left) / rect.width) * 100;
    percent = Math.max(5, Math.min(95, percent));
    baHandle.style.left = percent + '%';
    baAfter.style.width = percent + '%';
}

baHandle.addEventListener('mousedown', () => isDragging = true);
baHandle.addEventListener('touchstart', () => isDragging = true);
window.addEventListener('mouseup', () => isDragging = false);
window.addEventListener('touchend', () => isDragging = false);
window.addEventListener('mousemove', (e) => isDragging && updateSlider(e.clientX));
window.addEventListener('touchmove', (e) => isDragging && updateSlider(e.touches[0].clientX));
baContainer.addEventListener('click', (e) => updateSlider(e.clientX));

// Form handling
const bookingForm = document.getElementById('bookingForm');
const successModal = document.getElementById('successModal');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    successModal.classList.add('active');
    bookingForm.reset();
});

function closeModal() {
    successModal.classList.remove('active');
}

document.getElementById('consultBtn').addEventListener('click', () => {
    successModal.classList.add('active');
});

successModal.addEventListener('click', (e) => {
    if (e.target === successModal) closeModal();
});