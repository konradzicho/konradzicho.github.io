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

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (hamburger && navMenu && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Dropdown functionality - only prevent default in portrait mode
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        // Only prevent default and toggle dropdowns in portrait mode
        if (window.matchMedia("(orientation: portrait)").matches) {
            e.preventDefault();
            const dropdown = toggle.parentElement;
            dropdown.classList.toggle('active');
        }
        // In landscape mode, let the link navigate normally
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

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
                        textarea.value = 'I would like to request a custom experience.';
                    }
                }
            }, 100);
        }
    } else if (hash) {
        // Handle anchor links from other pages
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

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

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
            document.querySelectorAll('.nav-menu a[href*="#' + sectionId + '"]').forEach(link => {
                link.classList.add('active');
            });
        } else {
            document.querySelectorAll('.nav-menu a[href*="#' + sectionId + '"]').forEach(link => {
                link.classList.remove('active');
            });
        }
    });
});

// Mute/Unmute and Volume Control - SIMPLIFIED AND FIXED
(function initVideo() {
    const video = document.getElementById('bg-video');
    const muteBtn = document.getElementById('mute-btn');
    
    if (!video) {
        // Try again after a short delay if video not found
        setTimeout(initVideo, 100);
        return;
    }
    
    // Load saved state
    const savedVolume = localStorage.getItem('videoVolume');
    const savedMuted = localStorage.getItem('videoMuted');
    const savedTime = localStorage.getItem('videoTime');
    
    // Set volume
    if (savedVolume) {
        video.volume = parseFloat(savedVolume);
    } else {
        video.volume = 0.5;
        localStorage.setItem('videoVolume', '0.5');
    }
    
    // Set muted state
    if (savedMuted === 'false') {
        video.muted = false;
    } else {
        video.muted = true; // Default muted for autoplay
        if (!savedMuted) {
            localStorage.setItem('videoMuted', 'true');
        }
    }
    
    // Preload video for faster loading
    video.preload = 'auto';
    
    // Function to restore video time and play immediately
    const restoreTimeAndPlay = () => {
        if (savedTime && video.duration && video.duration > 0) {
            const time = parseFloat(savedTime);
            if (!isNaN(time) && time >= 0 && time < video.duration) {
                try {
                    video.currentTime = time;
                } catch (e) {
                    // Ignore errors
                }
            }
        }
        // Play immediately
        if (video.paused) {
            video.play().catch(() => {});
        }
    };
    
    // Set up video for seamless playback
    const setupVideo = () => {
        if (video.readyState >= 4) {
            // Video is fully loaded
            restoreTimeAndPlay();
        } else if (video.readyState >= 2) {
            // Video has metadata
            if (video.duration > 0) {
                restoreTimeAndPlay();
            } else {
                // Wait for duration
                setTimeout(setupVideo, 10);
            }
        } else {
            // Wait for video to load
            setTimeout(setupVideo, 10);
        }
    };
    
    // Try immediately
    setupVideo();
    
    // Listen for metadata - set time as soon as possible
    video.addEventListener('loadedmetadata', () => {
        if (video.duration > 0 && savedTime) {
            const time = parseFloat(savedTime);
            if (!isNaN(time) && time >= 0 && time < video.duration) {
                video.currentTime = time;
            }
        }
        // Try to play
        video.play().catch(() => {});
    }, { once: true });
    
    // Listen for canplay - video is ready to play
    video.addEventListener('canplay', () => {
        restoreTimeAndPlay();
    }, { once: true });
    
    // Also listen for loadeddata
    video.addEventListener('loadeddata', () => {
        restoreTimeAndPlay();
    }, { once: true });
    
    // Aggressive play attempts for seamless transition
    let playAttempts = 0;
    const tryPlay = () => {
        if (video.paused && playAttempts < 10) {
            playAttempts++;
            video.play().catch(() => {
                setTimeout(tryPlay, 50);
            });
        }
    };
    
    // Try playing multiple times
    tryPlay();
    setTimeout(tryPlay, 50);
    setTimeout(tryPlay, 100);
    setTimeout(tryPlay, 200);
    
    // Save time continuously
    video.addEventListener('timeupdate', () => {
        if (video.readyState >= 2) {
            localStorage.setItem('videoTime', video.currentTime.toString());
        }
    });
    
    // Save on unload
    window.addEventListener('beforeunload', () => {
        if (video.readyState >= 2) {
            localStorage.setItem('videoTime', video.currentTime.toString());
        }
    });
    
    // Mute button handling
    if (muteBtn) {
        // Ensure button is visible
        muteBtn.style.display = 'flex';
        muteBtn.style.visibility = 'visible';
        muteBtn.style.opacity = '1';
        
        // Update button icon
        const updateIcon = () => {
            if (video.muted || video.volume === 0) {
                muteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-x"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="1" x2="17" y2="7"></line><line x1="17" y1="1" x2="23" y2="7"></line></svg>`;
            } else if (video.volume < 0.5) {
                muteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-1"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
            } else {
                muteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
            }
        };
        
        updateIcon();
        
        // Create volume slider
        const volumeSlider = document.createElement('input');
        volumeSlider.type = 'range';
        volumeSlider.min = '0';
        volumeSlider.max = '1';
        volumeSlider.step = '0.1';
        volumeSlider.value = video.volume;
        volumeSlider.className = 'volume-slider';
        volumeSlider.style.display = 'none';
        muteBtn.parentElement.appendChild(volumeSlider);
        
        // Toggle mute on click
        muteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            video.muted = !video.muted;
            localStorage.setItem('videoMuted', video.muted);
            updateIcon();
            
            // Toggle slider
            if (volumeSlider.style.display === 'none' || volumeSlider.style.display === '') {
                volumeSlider.style.display = 'block';
                clearTimeout(window.sliderTimeout);
                window.sliderTimeout = setTimeout(() => {
                    volumeSlider.style.display = 'none';
                }, 3000);
            } else {
                volumeSlider.style.display = 'none';
                clearTimeout(window.sliderTimeout);
            }
        });
        
        // Volume slider
        volumeSlider.addEventListener('input', (e) => {
            video.volume = parseFloat(e.target.value);
            if (video.volume > 0) {
                video.muted = false;
            }
            localStorage.setItem('videoVolume', video.volume);
            localStorage.setItem('videoMuted', video.muted);
            updateIcon();
            clearTimeout(window.sliderTimeout);
            window.sliderTimeout = setTimeout(() => {
                volumeSlider.style.display = 'none';
            }, 3000);
        });
        
        // Prevent scroll when dragging
        volumeSlider.addEventListener('mousedown', () => {
            document.body.style.overflow = 'hidden';
        });
        volumeSlider.addEventListener('mouseup', () => {
            document.body.style.overflow = '';
        });
        document.addEventListener('mouseup', () => {
            document.body.style.overflow = '';
        });
    }
})();
