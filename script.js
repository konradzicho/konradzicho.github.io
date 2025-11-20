// Logo click - navigate to index.html or scroll to top if already on index
const logoLink = document.getElementById('logoLink');
if (logoLink) {
    logoLink.addEventListener('click', (e) => {
        // Get current page filename
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const isOnIndexPage = currentPage === 'index.html' || currentPage === '';
        
        if (isOnIndexPage) {
            // On index.html, prevent default navigation and scroll to top
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        // If not on index page, let the default link behavior navigate to index.html
    });
}

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Dropdown functionality for mobile
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        // Only prevent default and toggle on mobile
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const dropdown = toggle.parentElement;
            dropdown.classList.toggle('active');
        }
    });
});

// Close mobile menu when clicking on a link (but not dropdown toggles)
document.querySelectorAll('.nav-menu a:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Back to Top Button (set up before smooth scroll handler to ensure it works)
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        return false;
    }, true); // Use capture phase to run first
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Skip back-to-top button (handled separately)
    if (anchor.classList.contains('back-to-top') || anchor.id === 'backToTop') {
        return;
    }
    
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only prevent default for same-page anchors
        if (href.startsWith('#') && !href.includes('.')) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Handle anchor links from other pages and URL parameters
window.addEventListener('load', () => {
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    
    // Handle custom service form prefill
    if (serviceParam === 'custom') {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            setTimeout(() => {
                const offsetTop = contactSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Prefill form
                const form = document.getElementById('contactForm');
                if (form) {
                    const select = form.querySelector('select');
                    const textarea = form.querySelector('textarea');
                    
                    if (select) {
                        // Find and select "Custom Experience" option
                        const options = select.querySelectorAll('option');
                        options.forEach(option => {
                            if (option.textContent.trim() === 'Custom Experience') {
                                option.selected = true;
                            }
                        });
                    }
                    
                    if (textarea) {
                        // Prefill with helpful questions
                        textarea.value = 'I\'m interested in a custom experience. Please tell me more about:\n\n- What type of event/space do you have in mind?\n- What atmosphere or theme are you envisioning?\n- What is your expected number of guests?\n- Are there any specific elements (music, dance, art, etc.) you\'d like to incorporate?\n\nThank you!';
                    }
                }
            }, 300);
        }
    } else if (hash) {
        // Handle regular anchor links
        setTimeout(() => {
            const target = document.querySelector(hash);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const phone = contactForm.querySelector('input[type="tel"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Simulate form submission (replace with actual API call)
    alert(`Thank you, ${name}! We'll be in touch soon.`);
    contactForm.reset();
});


// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and other sections
document.querySelectorAll('.service-card, .about-content, .contact-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add active state to navigation links on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Mute/Unmute video
const video = document.getElementById('bg-video');
const muteBtn = document.getElementById('mute-btn');

if (video && muteBtn) {
    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        if (video.muted) {
            muteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-x"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="1" x2="17" y2="7"></line><line x1="17" y1="1" x2="23" y2="7"></line></svg>`;
        } else {
            muteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
        }
    });
}
