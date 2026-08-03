/* ═══════════════════════════════════════════════════════════
   LITTLE PEARL ACADEMY — Clean Mobile & Interactive JS
   Handles: Preloader, Navbar, Mobile Menu, Gallery Filter,
            Gallery Lightbox, Back to Top, Ticker Loop
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Preloader ───
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = '';
            }, 800);
        });
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
        }, 2500);
    }

    // ─── Navbar Scroll Effect ───
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('.section[id], .hero');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleNavbarScroll() {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id') || 'home';
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    // ─── Mobile Navigation ───
    const hamburger = document.getElementById('navHamburger');
    const navLinksContainer = document.getElementById('navLinks');

    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navLinksContainer.classList.toggle('open');
        });

        navLinksContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('open');
            });
        });

        document.addEventListener('click', (e) => {
            if (!navLinksContainer.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('open');
            }
        });
    }

    // ─── Smooth Scroll ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 70;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ─── Scroll Animations ───
    const animatedElements = document.querySelectorAll('[data-animate]');
    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                animObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    });

    animatedElements.forEach(el => animObserver.observe(el));

    // ─── Gallery Filter ───
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // ─── Gallery Lightbox (Touch & Mobile Friendly) ───
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (!img) return;

            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed; inset: 0; background: rgba(0,0,0,0.88);
                display: flex; align-items: center; justify-content: center;
                z-index: 10000; cursor: pointer; padding: 16px;
            `;

            const largeImg = document.createElement('img');
            largeImg.src = img.src;
            largeImg.alt = img.alt;
            largeImg.style.cssText = `
                max-width: 95vw; max-height: 80vh; border-radius: 8px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.5); object-fit: contain;
            `;

            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '✕';
            closeBtn.style.cssText = `
                position: absolute; top: 16px; right: 16px;
                width: 44px; height: 44px; border-radius: 50%;
                background: rgba(255,255,255,0.2); border: none;
                color: white; font-size: 20px; cursor: pointer;
                display: flex; align-items: center; justify-content: center;
            `;

            overlay.appendChild(largeImg);
            overlay.appendChild(closeBtn);
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';

            const closeOverlay = () => {
                overlay.remove();
                document.body.style.overflow = '';
            };

            overlay.addEventListener('click', (e) => {
                if (e.target === overlay || e.target === closeBtn) {
                    closeOverlay();
                }
            });
        });
    });

    // ─── Back to Top Button ───
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ─── Ticker Loop ───
    const tickerContent = document.querySelector('.ticker-content');
    if (tickerContent) {
        tickerContent.innerHTML += tickerContent.innerHTML;
    }
});
