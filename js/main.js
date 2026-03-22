/**
 * WARBENCH - Military AI Evaluation Framework
 * Tactical Interface JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(47, 79, 47, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'active');

                // Trigger bar animations for dimension cards
                if (entry.target.classList.contains('dimension-card')) {
                    const barFills = entry.target.querySelectorAll('.bar-fill');
                    barFills.forEach((bar, index) => {
                        const width = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, index * 200);
                    });
                }

                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('.overview-card, .finding-card').forEach(el => {
        el.classList.add('fade-in');
        fadeObserver.observe(el);
    });

    // Typing effect for hero subtitle
    const subtitleElement = document.querySelector('.hero-subtitle');
    if (subtitleElement) {
        const text = subtitleElement.textContent;
        subtitleElement.textContent = '';
        let charIndex = 0;

        function typeText() {
            if (charIndex < text.length) {
                subtitleElement.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 20);
            }
        }

        // Start typing effect when page loads
        setTimeout(typeText, 500);
    }

    // Stats counter animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValues = entry.target.querySelectorAll('.stat-value');
                statValues.forEach(stat => {
                    const finalValue = stat.textContent;
                    const isPercentage = finalValue.includes('%');
                    const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));

                    animateCounter(stat, 0, numericValue, 2000, isPercentage);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    function animateCounter(element, start, end, duration, isPercentage) {
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOut);

            element.textContent = current + (isPercentage ? '%' : '');

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // Dimension card hover effect
    const dimensionCards = document.querySelectorAll('.dimension-card');
    dimensionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            dimensionCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Results table row highlight
    const tableRows = document.querySelectorAll('.results-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            tableRows.forEach(r => r.style.background = '');
            this.style.background = 'rgba(47, 79, 47, 0.15)';
        });
        row.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });

    // Model list hover effect
    const modelItems = document.querySelectorAll('.model-list li');
    modelItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            modelItems.forEach(i => i.style.background = '');
            this.style.background = 'rgba(47, 79, 47, 0.2)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });

    // Parallax effect for tactical grid
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const grid = document.querySelector('.tactical-grid');
        if (grid) {
            grid.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Glitch effect on title hover
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.3s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    }

    // Console easter egg
    console.log('%c[WARBENCH] Tactical Evaluation System', 'color: #2f4f2f; font-size: 20px; font-weight: bold;');
    console.log('%cUNCLASSIFIED // FOR PUBLIC RELEASE', 'color: #6b7280; font-size: 12px;');
    console.log('%cInitializing benchmark protocols...', 'color: #4ade80; font-size: 10px;');

    // Footer classification flicker effect
    const classificationMarking = document.querySelector('.classification-marking');
    if (classificationMarking) {
        setInterval(() => {
            classificationMarking.style.opacity = '0.5';
            setTimeout(() => {
                classificationMarking.style.opacity = '1';
            }, 100);
        }, 5000);
    }

    // Initialize tooltip system for table cells
    const scoreCells = document.querySelectorAll('.score');
    scoreCells.forEach(cell => {
        const value = parseFloat(cell.textContent);
        let tooltip = '';

        if (value >= 0.8 || (cell.textContent.includes('%') && value >= 80)) {
            tooltip = 'Status: EXCELLENT - Operational ready';
        } else if (value >= 0.6 || (cell.textContent.includes('%') && value >= 60)) {
            tooltip = 'Status: GOOD - Minor degradation';
        } else if (value >= 0.4 || (cell.textContent.includes('%') && value >= 40)) {
            tooltip = 'Status: MODERATE - Significant limitations';
        } else {
            tooltip = 'Status: CRITICAL - Non-viable for deployment';
        }

        cell.setAttribute('data-tooltip', tooltip);
    });

});

// Page load animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Simulate radar blips
    const radarScan = document.querySelector('.radar-scan');
    if (radarScan) {
        setInterval(() => {
            const blip = document.createElement('div');
            blip.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(74, 222, 128, 0.6);
                border-radius: 50%;
                top: ${30 + Math.random() * 40}%;
                left: ${30 + Math.random() * 40}%;
                animation: radar-blip 2s linear forwards;
            `;
            radarScan.appendChild(blip);

            setTimeout(() => blip.remove(), 2000);
        }, 800);
    }
});
