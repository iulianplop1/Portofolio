document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    // --- Paper Plane Scroll Animation ---
    const plane = document.getElementById('paperPlane');
    if (plane) {
        // Select path based on resolution
        let pathId = "#flightPath2k";
        const w = window.innerWidth;
        if (w >= 3000) pathId = "#flightPath4k";
        else if (w >= 1800) pathId = "#flightPath2k";
        else if (w >= 1000) pathId = "#flightPath1k";
        else pathId = "#flightPathMobile";

        gsap.to(plane, {
            motionPath: {
                path: pathId,
                align: pathId,
                alignOrigin: [0.5, 0.5],
                autoRotate: true
            },
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            }
        });
    }

    // --- Page Load Animation ---
    gsap.to('.load-hidden', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        delay: 0.3
    });

    // --- Magnetic Buttons ---
    const magneticElements = document.querySelectorAll('.live-btn, .github-btn, .close-overlay, .project-nav-btn');
    magneticElements.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        });
    });

    const projects = [
        { title: "VIACompass", desc: "Interactive campus map with real-time room availability.", tag: "Web App", image: "screenshots/VIACompass-showcase1.png", imageWide: "screenshots/HackatonProject-showcase3.png", github: "https://github.com/iulianplop1/VIA-ProjectMap", live: "https://iulianplop1.github.io/VIA-ProjectMap/" },
        { title: "Receipts", desc: "AI-powered budgeting app with receipt scanning and voice input.", tag: "React / AI", image: "screenshots/Receipts-showcase1.png", imageWide: "screenshots/Receipts-showcase3.png", github: "https://github.com/iulianplop1/Receipts", live: "https://iulianplop1.github.io/Receipts/" },
        { title: "Shopping List", desc: "Secure wishlist planner that links items to financial goals.", tag: "Web App", image: "screenshots/Shoppin list-showcase1.png", imageWide: "screenshots/ShoppinList-showcase3.png", github: "https://github.com/iulianplop1/Shopping-List", live: "https://iulianplop1.github.io/Shopping-List/" },
        { title: "InstaStop", desc: "Android app that strictly limits mindless scrolling with a 5-min timer.", tag: "Android", image: "screenshots/InstaStop-showcase1.png", imageWide: "screenshots/InstaStop-showcase3.png", github: "https://github.com/iulianplop1/InstaStop", live: "https://iulianplop1.github.io/InstaStop/" },
        { title: "Outfitt", desc: "Personal wardrobe manager with a Tinder-style outfit generator.", tag: "Android", image: "screenshots/Outfit-showcase1.png", imageWide: "screenshots/outfitt-showcase3.png", github: "https://github.com/iulianplop1/Outfitt", live: "https://iulianplop1.github.io/Outfitt/" },
        { title: "Scrapper", desc: "High-speed vehicle data extraction and filtering from 999.md.", tag: "Python", image: "screenshots/Scrapper-showcase1.png", imageWide: "screenshots/Scrapper-showcase3.png", github: "https://github.com/iulianplop1/Scrapper", live: "https://iulianplop1.github.io/Scrapper/" },
        { title: "Cloverville", desc: "Eco-village community management platform.", tag: "Web App", image: "screenshots/CloverVille-showcase1.png", imageWide: "screenshots/Sep project- showcase3.png", github: "https://github.com/iulianplop1/SEP-Project", live: "https://batorgabora.github.io/cloverville/" },
        { title: "Quote", desc: "Daily movie quotes app that distills cinematic wisdom into a daily routine.", tag: "React / AI", image: "screenshots/Quote-showcase1.png", imageWide: "screenshots/Quotes-showcase3.png", github: "https://github.com/iulianplop1/Quote", live: "https://iulianplop1.github.io/Quote/" }
    ];

    // Card Generator Helper
    function createCards(containerId, isAbsolute = true) {
        const container = document.getElementById(containerId);
        projects.forEach((proj, i) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.setAttribute('data-index', i);
            card.innerHTML = `
                <div class="card-img-placeholder" style="background-image: url('${proj.image}'); background-size: cover; background-position: top center;"></div>
                <div class="card-gradient"></div>
                <div class="tag">${proj.tag}</div>
                <h3>${proj.title}</h3>
                <p>${proj.desc}</p>
            `;
            // Add click listener for overlay
            card.addEventListener('click', () => openOverlay(proj));
            container.appendChild(card);
        });
        return container.querySelectorAll('.project-card');
    }

    // --- Showcase 1: Carousel ---
    const isMobile = window.innerWidth <= 768;
    const carouselCards = createCards('carouselRing');
    const radius = isMobile ? 300 : 500;
    const anglePerCard = 360 / projects.length;
    
    carouselCards.forEach((card, i) => {
        gsap.set(card, {
            rotationY: i * anglePerCard,
            z: radius,
            transformOrigin: `50% 50% ${-radius}px`
        });
    });

    gsap.to('#carouselRing', {
        rotationY: -360,
        ease: 'none',
        scrollTrigger: {
            trigger: '.carousel-scene',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            pin: '.carousel-sticky',
            onUpdate: (self) => {
                const currentAngle = self.progress * 360;
                carouselCards.forEach((card, i) => {
                    const cardAngle = i * anglePerCard;
                    let diff = Math.abs((cardAngle - currentAngle) % 360);
                    if (diff > 180) diff = 360 - diff;
                    
                    if (diff < 70) {
                        card.style.pointerEvents = 'auto';
                    } else {
                        card.style.pointerEvents = 'none';
                    }
                });
            }
        }
    });


    // --- Outro: Fullscreen to Grid (Scroll Driven) ---
    // Animate the outro subtitle
    gsap.to('.outro-subtitle', {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.grid-scene',
            start: 'top top',
            end: '+=30%',
            scrub: 1
        }
    });

    // We animate the CSS variables of the grid to zoom out
    const gridVars = isMobile ? {
        "--col1": "1fr",
        "--col2": "1fr",
        "--row1": "1.5fr",
        "--row2": "1fr",
        "--row3": "1fr",
        "--gap": "6px",
        "--rad": "8px",
        ease: "power2.inOut",
        scrollTrigger: {
            trigger: '.grid-scene',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            pin: '.grid-scene-sticky'
        }
    } : {
        "--col1": "1fr",
        "--col2": "1fr",
        "--col3": "1fr",
        "--row1": "1fr",
        "--row2": "1fr",
        "--gap": "8px",
        "--rad": "12px",
        ease: "power2.inOut",
        scrollTrigger: {
            trigger: '.grid-scene',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            pin: '.grid-scene-sticky'
        }
    };

    gsap.to('#scrollGrid', gridVars);
    // Shrink text slightly
    gsap.to('.hero-me-text h2', {
        scale: 0.6,
        ease: "power2.inOut",
        scrollTrigger: {
            trigger: '.grid-scene',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
        }
    });

    // --- Overlay Logic ---
    const overlay = document.getElementById('projectOverlay');
    const overlayTitle = document.getElementById('overlayTitle');
    const overlayDesc = document.getElementById('overlayDesc');
    const overlayHero = document.getElementById('overlayHero');
    const overlayTag = document.getElementById('overlayTag');
    const overlayGithub = document.getElementById('overlayGithub');
    const overlayLive = document.getElementById('overlayLive');
    const overlayRole = document.getElementById('overlayRole');
    const overlayTech = document.getElementById('overlayTech');
    const closeBtn = document.querySelector('.close-overlay');
    const prevBtn = document.getElementById('prevProject');
    const nextBtn = document.getElementById('nextProject');
    const prevName = document.getElementById('prevProjectName');
    const nextName = document.getElementById('nextProjectName');
    let currentProjectIndex = 0;

    function openOverlay(proj) {
        currentProjectIndex = projects.indexOf(proj);
        populateOverlay(proj);
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        overlay.scrollTop = 0;
    }

    function populateOverlay(proj) {
        overlayTitle.textContent = proj.title;
        overlayDesc.textContent = proj.desc;
        if(overlayTag) overlayTag.textContent = proj.tag;
        
        if(overlayGithub) overlayGithub.href = proj.github || "#";
        if(overlayLive) {
            if (proj.live && proj.live !== "#") {
                overlayLive.href = proj.live;
                overlayLive.style.display = "inline-flex";
            } else {
                overlayLive.style.display = "none";
            }
        }
        
        if(overlayRole) overlayRole.textContent = proj.role || "Developer";
        if(overlayTech) overlayTech.textContent = proj.tech || proj.tag;
        
        const heroImg = proj.imageWide ? proj.imageWide : proj.image;
        overlayHero.style.backgroundImage = `url('${heroImg}')`;

        // Update next/prev labels
        const prevIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
        const nextIndex = (currentProjectIndex + 1) % projects.length;
        prevName.textContent = projects[prevIndex].title;
        nextName.textContent = projects[nextIndex].title;
    }

    prevBtn.addEventListener('click', () => {
        currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
        populateOverlay(projects[currentProjectIndex]);
        overlay.scrollTop = 0;
    });

    nextBtn.addEventListener('click', () => {
        currentProjectIndex = (currentProjectIndex + 1) % projects.length;
        populateOverlay(projects[currentProjectIndex]);
        overlay.scrollTop = 0;
    });

    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // --- Keyboard Navigation ---
    document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('active')) return;
        if (e.key === 'Escape') {
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowLeft') {
            currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
            populateOverlay(projects[currentProjectIndex]);
        } else if (e.key === 'ArrowRight') {
            currentProjectIndex = (currentProjectIndex + 1) % projects.length;
            populateOverlay(projects[currentProjectIndex]);
        }
    });
});
