// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavigation();
    initScrollAnimations();
    initScrollProgress();
    initTypingAnimation();
    initParallaxEffects();
    initSmoothScrolling();
    initLoadingAnimation();
    initDownloadCV();
    initBackToTop();
    
    // Initialize AOS (Animate On Scroll) alternative
    observeElements();
});

// ===== NAVIGATION =====
function initNavigation() {
    const nav = document.querySelector('nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links a');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking on links
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Active navigation link based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== SCROLL PROGRESS INDICATOR =====
function initScrollProgress() {
    // Create scroll progress bar
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    scrollIndicator.appendChild(scrollProgress);
    document.body.appendChild(scrollIndicator);

    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) return;

    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.borderRight = '2px solid var(--primary-color)';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                subtitle.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    // Start typing animation when page loads
    setTimeout(typeWriter, 1500);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Add initial hidden state to elements
    const animatedElements = document.querySelectorAll(`
        .glass-card,
        .hero-text,
        .hero-image,
        .project-card,
        .skill-category,
        .timeline-item,
        .social-item
    `);

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                
                // Add staggered animation for timeline items
                if (element.classList.contains('timeline-item')) {
                    const delay = Array.from(element.parentElement.children).indexOf(element) * 200;
                    element.style.transitionDelay = `${delay}ms`;
                }
                
                // Add staggered animation for skill items
                if (element.classList.contains('skill-category')) {
                    const skillItems = element.querySelectorAll('.skill-item');
                    skillItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
                
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animated elements
    const elementsToObserve = document.querySelectorAll(`
        .glass-card,
        .hero-text,
        .hero-image,
        .project-card,
        .skill-category,
        .timeline-item,
        .social-item
    `);

    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

// ===== PARALLAX EFFECTS =====
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== LOADING ANIMATION =====
function initLoadingAnimation() {
    // Create loading screen
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loading);
    
    // Hide loading screen after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.remove();
            }, 500);
        }, 1000);
    });
}

// ===== DOWNLOAD CV FUNCTIONALITY =====
function initDownloadCV() {
    const downloadBtn = document.querySelector('.btn-primary');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Show loading state
            const originalText = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengunduh...';
            downloadBtn.style.pointerEvents = 'none';
            
            // Simulate CV generation and download
            setTimeout(() => {
                generateAndDownloadCV();
                
                // Reset button
                downloadBtn.innerHTML = originalText;
                downloadBtn.style.pointerEvents = 'auto';
                
                // Show success message
                showNotification('CV berhasil diunduh!', 'success');
            }, 2000);
        });
    }
}

// ===== GENERATE AND DOWNLOAD CV =====
function generateAndDownloadCV() {
    const cvContent = `
CURRICULUM VITAE

RAKHA RAIHAN ALFARIZKY
Calon Software Engineer
========================================

INFORMASI PRIBADI
Email: rakha.alfarizky@email.com
LinkedIn: linkedin.com/in/rakha-raihan-alfarizky-948010316/
GitHub: github.com/rrhka27
Instagram: @rrahka_

PROFIL
Mahasiswa aktif jurusan S1 Teknik Informatika yang memiliki ketertarikan tinggi pada pengembangan web dan aplikasi. Memiliki kemampuan dasar dalam bahasa pemrograman seperti HTML, CSS, JavaScript serta terbiasa bekerja dengan database MySQL. Aktif mengikuti pelatihan dan proyek mini di luar perkuliahan, dengan semangat tinggi untuk belajar langsung dari industri melalui program magang atau kolaborasi proyek.

PENDIDIKAN
2022 - Sekarang
Mahasiswa Teknik Informatika Semester 6
Sekolah Tinggi Manajemen Informatika dan Komputer Mardira Indonesia

PENGALAMAN
2022 - Sekarang
Driver ShopeeFood — Multitasking Antara Kuliah dan Kerja
- Mengasah kemampuan manajemen waktu dan ketepatan
- Memberikan layanan pelanggan secara langsung
- Belajar produktivitas dan disiplin dalam menghadapi tantangan ganda

2018 - 2021
Anggota Ekstrakurikuler AKAPPELA
SMA Negeri 1 Katapang
- Berpartisipasi aktif dalam kegiatan pelestarian lingkungan
- Kegiatan penanaman pohon dan pembersihan area hijau

PROYEK
1. Sistem Booking Jasa Terapi
   - Aplikasi web untuk mengelola sistem Booking Jasa Terapi
   - Teknologi: Java, HTML5, CSS3, MySQL, Bootstrap, JavaScript
   - Link: github.com/rrhka27/Booking-Terapy.git

2. Sistem Informasi Manajemen Produk dan Keuangan
   - Aplikasi Web untuk mengelola produk dan keuangan
   - Teknologi: PHP, HTML5, CSS3, JavaScript, MySQL, Bootstrap
   - Link: github.com/rrhka27/CRUD_Mahasiwa_22110375_RakhaRaihanAlfarizky.git

3. Aplikasi Pemesanan Tiket Bioskop (JSP Project)
   - Aplikasi sederhana pemesanan tiket bioskop berbasis JSP
   - Teknologi: Java, HTML5, CSS3, MySQL, Bootstrap
   - Link: github.com/rrhka27/22110375_RakhaRaihanAlfarrizky_L.git

KEAHLIAN TEKNIS

Frontend Development:
- HTML5, CSS3, JavaScript, Bootstrap

Backend Development:
- PHP, Laravel, Java, Python

Database & Tools:
- MySQL, XAMPP, Git, GitHub, Docker, Laragon

Others:
- Figma, Canva, CorelDRAW, Word, Excel

SERTIFIKASI
Agustus 2025
Code Generation and Optimization Using IBM Granite — IBM
Sertifikasi resmi dari IBM yang fokus pada teknik code generation dan optimization menggunakan platform IBM Granite.

MOTTO
"Tetap Ngoding, Tetap Penasaran"

========================================
© 2025 Rakha Raihan Alfarizky
    `;

    // Create and download the file
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CV_Rakha_Raihan_Alfarizky.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--secondary-color)' : 'var(--accent-color)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: var(--shadow-heavy);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== DYNAMIC SKILL PROGRESS =====
function initSkillProgress() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== PROJECT CARD INTERACTIONS =====
function initProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const techBadges = card.querySelectorAll('.tech-badge');
            techBadges.forEach((badge, index) => {
                setTimeout(() => {
                    badge.style.transform = 'scale(1.1)';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', () => {
            const techBadges = card.querySelectorAll('.tech-badge');
            techBadges.forEach(badge => {
                badge.style.transform = 'scale(1)';
            });
        });
    });
}

// ===== CONTACT FORM INTERACTIONS =====
function initContactInteractions() {
    const socialItems = document.querySelectorAll('.social-item');
    
    socialItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Add click animation
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = item.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            item.style.position = 'relative';
            item.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation keyframes
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== EASTER EGG =====
function initEasterEgg() {
    let konamiCode = [];
    const targetCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > targetCode.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.length === targetCode.length && 
            konamiCode.every((code, index) => code === targetCode[index])) {
            showEasterEgg();
            konamiCode = [];
        }
    });
}

function showEasterEgg() {
    const hero = document.querySelector('.hero');
    const originalBg = hero.style.background;
    
    hero.style.background = 'linear-gradient(45deg, #ff0000, #ff7700, #ffff00, #00ff00, #0077ff, #4400ff, #8800ff)';
    hero.style.backgroundSize = '400% 400%';
    hero.style.animation = 'rainbow 2s ease infinite';
    
    if (!document.querySelector('#rainbow-animation')) {
        const style = document.createElement('style');
        style.id = 'rainbow-animation';
        style.textContent = `
            @keyframes rainbow {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(style);
    }
    
    showNotification('🎉 Easter egg found! Keep coding!', 'success');
    
    setTimeout(() => {
        hero.style.background = originalBg;
        hero.style.animation = 'none';
    }, 5000);
}

// ===== PERFORMANCE OPTIMIZATION =====
function initPerformanceOptimization() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) originalScrollHandler();
        }, 16); // ~60fps
    });
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
            setTimeout(() => {
                backToTopButton.style.opacity = '1';
            }, 10);
        } else {
            backToTopButton.style.opacity = '0';
            setTimeout(() => {
                backToTopButton.style.display = 'none';
            }, 300);
        }
    });

    // Scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Initial setup
    backToTopButton.style.opacity = '0';
    backToTopButton.style.transition = 'opacity 0.3s ease';
}

// ===== INITIALIZATION =====
// Initialize additional features after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initSkillProgress();
    initProjectInteractions();
    initContactInteractions();
    initEasterEgg();
    initPerformanceOptimization();
    
    // Console message for developers
    console.log(`
    🚀 Portfolio Website by Rakha Raihan Alfarizky
    
    Halo Developer! 👋
    
    Terima kasih sudah melihat source code website ini.
    Jika kamu tertarik untuk berkolaborasi atau punya saran,
    jangan ragu untuk menghubungi saya!
    
    GitHub: https://github.com/rrhka27
    LinkedIn: https://www.linkedin.com/in/rakha-raihan-alfarizky-948010316/
    
    Happy Coding! 💻✨
    `);
});