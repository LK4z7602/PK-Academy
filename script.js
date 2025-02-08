// Inicialização do EmailJS
(function() {
    emailjs.init("CxFs3vpe41-3dy6v3"); // Substitua com seu User ID do EmailJS
})();

// Configuração do ScrollReveal com efeitos aprimorados
ScrollReveal().reveal('.feature', {
    delay: 200,
    distance: '50px',
    duration: 1000,
    origin: 'bottom',
    interval: 100,
    rotate: { x: 10, y: 10, z: 0 },
    opacity: 0,
    scale: 0.9,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
});

ScrollReveal().reveal('.benefit-card', {
    delay: 200,
    distance: '50px',
    duration: 1000,
    origin: 'bottom',
    interval: 150,
    rotate: { x: 0, y: 10, z: 0 },
    opacity: 0,
    scale: 0.9,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
});

ScrollReveal().reveal('.section-title', {
    delay: 100,
    distance: '30px',
    duration: 1000,
    origin: 'top',
    opacity: 0,
    scale: 0.95,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
});

// Efeito de parallax aprimorado no hero
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    const title = document.querySelector('.game-font');
    const logo = document.querySelector('.main-logo');
    
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    
    if (title) {
        title.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
    }
    
    if (logo) {
        logo.style.transform = `translate(${mouseX * -30}px, ${mouseY * -30}px)`;
    }
    
    hero.style.backgroundPosition = `${50 + mouseX * 10}% ${50 + mouseY * 10}%`;
});

// Navbar transparente que muda de cor ao rolar
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(6, 0, 41, 0.95)';
        nav.style.borderBottom = '1px solid rgba(107, 71, 255, 0.2)';
    } else {
        nav.style.background = 'transparent';
        nav.style.borderBottom = 'none';
    }
});

// Menu mobile
const menuMobile = document.querySelector('.menu-mobile');
const navLinks = document.querySelector('.nav-links');

menuMobile.addEventListener('click', () => {
    menuMobile.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Animação suave ao clicar nos links do menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Fecha o menu mobile se estiver aberto
            menuMobile.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const currentlyActive = document.querySelector('.faq-item.active');
        if (currentlyActive && currentlyActive !== item) {
            currentlyActive.classList.remove('active');
        }
        item.classList.toggle('active');
    });
});

// Formulário de contato com EmailJS
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Enviando...';
    submitBtn.disabled = true;
    
    const templateParams = {
        from_name: contactForm.name.value,
        from_email: contactForm.email.value,
        message: contactForm.message.value
    };
    
    emailjs.send('service_jjyoc6j', 'template_x143mu2', templateParams)
        .then(function() {
            submitBtn.innerHTML = 'Mensagem Enviada!';
            contactForm.reset();
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, 3000);
        }, function(error) {
            console.error('Erro ao enviar mensagem:', error);
            submitBtn.innerHTML = 'Erro ao enviar';
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, 3000);
        });
});

// Efeito de glitch no texto
const glitchText = document.querySelector('.glitch-text');
if (glitchText) {
    glitchText.setAttribute('data-text', glitchText.textContent);
}

// Efeito de flutuação suave nos cards
const cards = document.querySelectorAll('.benefit-card, .feature');
cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Efeito de digitação para títulos
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar efeito de digitação aos títulos quando ficarem visíveis
const titles = document.querySelectorAll('.section-title');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const originalText = entry.target.textContent;
            typeWriter(entry.target, originalText, 50);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

titles.forEach(title => observer.observe(title));

// Efeito de partículas no hero (usando canvas)
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const hero = document.querySelector('.hero');

if (hero) {
    hero.appendChild(canvas);
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    
    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.opacity = Math.random() * 0.5;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(107, 71, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    initParticles();
    animateParticles();
} 