document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navLinksList = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');
    const exploreBtn = document.getElementById('explore-btn');
    const logoLink = document.getElementById('logo-link');
    const btnTop = document.querySelector('.btn-top');

    const portfolioSectionIds = ['about', 'projects', 'certifications', 'contact'];
    const portfolioSections = portfolioSectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);

    function isPortfolioSection(id) {
        return portfolioSectionIds.includes(id);
    }

    function preventScroll(event) {
        event.preventDefault();
    }

    function lockLandingScroll() {
        document.documentElement.classList.add('landing-mode');
        document.body.classList.add('landing-mode');
        document.body.classList.remove('portfolio-mode');
        window.addEventListener('wheel', preventScroll, { passive: false });
        window.addEventListener('touchmove', preventScroll, { passive: false });
        window.addEventListener('keydown', preventScrollKeys);
    }

    function unlockPortfolioScroll() {
        document.documentElement.classList.remove('landing-mode');
        document.body.classList.remove('landing-mode');
        document.body.classList.add('portfolio-mode');
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
        window.removeEventListener('keydown', preventScrollKeys);
    }

    function preventScrollKeys(event) {
        const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
        if (scrollKeys.includes(event.key)) {
            event.preventDefault();
        }
    }

    function enterLanding() {
        lockLandingScroll();
        header.classList.remove('scrolled');
        navLinksList.classList.remove('active');

        const icon = hamburger.querySelector('i');
        if (icon) {
            icon.classList.replace('fa-xmark', 'fa-bars');
        }

        navLinks.forEach((link) => link.classList.remove('active'));
        history.replaceState(null, '', '#home');
        window.scrollTo({ top: 0 });
    }

    function enterPortfolio(targetId = 'about') {
        unlockPortfolioScroll();

        const target = document.getElementById(targetId);
        if (!target) return;

        history.replaceState(null, '', `#${targetId}`);

        requestAnimationFrame(() => {
            window.scrollTo({ top: 0 });
            target.scrollIntoView({ behavior: 'smooth' });
        });
    }

    function handleHashOnLoad() {
        const hash = window.location.hash.replace('#', '');

        if (isPortfolioSection(hash)) {
            unlockPortfolioScroll();

            requestAnimationFrame(() => {
                const target = document.getElementById(hash);
                if (target) {
                    window.scrollTo({ top: 0 });
                    target.scrollIntoView();
                }
            });
            return;
        }

        enterLanding();
    }

    window.addEventListener('scroll', () => {
        if (document.body.classList.contains('landing-mode')) {
            header.classList.remove('scrolled');
            return;
        }

        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        navLinksList.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    exploreBtn.addEventListener('click', (event) => {
        event.preventDefault();
        enterPortfolio('about');
    });

    logoLink.addEventListener('click', (event) => {
        event.preventDefault();
        enterLanding();
    });

    if (btnTop) {
        btnTop.addEventListener('click', (event) => {
            event.preventDefault();
            if (document.body.classList.contains('portfolio-mode')) {
                enterLanding();
            }
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            const targetId = href ? href.replace('#', '') : '';

            if (targetId === 'home') {
                event.preventDefault();
                enterLanding();
                return;
            }

            if (isPortfolioSection(targetId)) {
                event.preventDefault();
                enterPortfolio(targetId);
            }

            navLinksList.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        if (document.body.classList.contains('landing-mode')) return;

        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const targetId = entry.target.getAttribute('id');

                navLinks.forEach((link) => {
                    if (link.getAttribute('href') === `#${targetId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    portfolioSections.forEach((section) => {
        sectionObserver.observe(section);
    });

    const subhead = document.querySelector('.hero-subtitle');
    const professions = ['Creative Developer', 'UI/UX Enthusiast', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = professions[wordIndex];

        if (isDeleting) {
            subhead.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            subhead.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 60 : 120;

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % professions.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Project database
    const projectsData = {
        haja: {
            title: "HAJA Rentals & Apparel",
            tags: ["Figma", "UI Design", "UX Prototyping"],
            client: "School Project",
            date: "March 30, 2026",
            description: "A high-fidelity UI/UX design prototype for a fashion rental and apparel platform. Designed with user experience in mind, it features intuitive navigation, visually appealing layouts, streamlined reservation processes, and a modern interface that enhances customer engagement and accessibility.",
            images: [
                "img/HAJA.png",
                "img/HAJA1.png",
                "img/HAJA2.png"
            ],
            github: "#",
            demo: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
        },
        "haja-website": {
            title: "HAJA Rentals and Apparel",
            tags: ["Figma", "Website Design"],
            client: "School Project",
            date: "April 2026",
            description: "A comprehensive Figma website design for HAJA Rentals and Apparel, showcasing a modern and user-friendly online store layout. It provides a seamless user journey from product catalog exploration to booking, with responsive interfaces designed for both desktop and mobile platforms.",
            images: [
                "img/HAJAweb.png",
                "img/HAJAweb1.png",
                "img/HAJAweb2.png"
            ],
            github: "#",
            demo: "#"
        },
        motomaster: {
            title: "Automotive Learning Platform",
            tags: ["Three.js", "JavaScript", "PHP", "Blender", "Bootstrap"],
            client: "Capstone Project",
            date: "On-going",
            description: "A web-based automotive education platform that combines interactive lessons, 3D vehicle simulations, and performance tracking to enhance technical learning. Designed for aspiring automotive technicians, it provides a structured and engaging environment for developing real-world diagnostic and repair skills.",
            images: [
                "img/Motomaster.png",
                "img/motomaster2.png",
                "img/motomaster1.png"
            ],
            github: "#",
            demo: "#"
        },
        car3d: {
            title: "3D Models",
            tags: ["Blender 3D", "Low Poly Art", "UV Mapping"],
            client: "Capstone Project",
            date: "On-going",
            description: "A detailed low-poly 3D vehicle model created in Blender, showcasing expertise in 3D modeling, texturing, UV mapping, and asset optimization. Designed for use in interactive applications, simulations, and game environments while maintaining visual quality and performance efficiency.",
            images: [
                "img/3D Model.png",
                "img/3D2.png",
                "img/3D1.png"
            ],
            github: "#",
            demo: "#"
        },
        gatepass: {
            title: "Gatepass Apk",
            tags: ["Flutter", "Dart", "JavaScript", "Mobile App"],
            client: "School Project",
            date: "Dec 2025",
            description: "GatePass is a mobile-based visitor management application developed to streamline entry and exit processes within secured facilities. The system enables QR code scanning, visitor verification, and real-time record management, providing a faster, safer, and more efficient access control experience.",
            images: [
                "img/gatepass.png",
                "img/gatepass.png"
            ],
            github: "#",
            demo: "#"
        }
    };

    // Modal & Slider Elements
    const projectModal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalSlider = document.getElementById('modal-slider');
    const modalTags = document.getElementById('modal-tags');
    const modalTitle = document.getElementById('modal-title');
    const modalClient = document.getElementById('modal-client');
    const modalDate = document.getElementById('modal-date');
    const modalDesc = document.getElementById('modal-desc');
    const modalGithub = document.getElementById('modal-github');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const sliderDots = document.getElementById('slider-dots');

    let currentProjectImages = [];
    let currentSlideIndex = 0;

    // Open Modal
    function openProjectModal(projectId) {
        const project = projectsData[projectId];
        if (!project) return;

        // Load details
        modalTitle.textContent = project.title;
        modalClient.textContent = project.client;
        modalDate.textContent = project.date;
        modalDesc.textContent = project.description;

        // GitHub Link visibility
        if (project.github && project.github !== '#') {
            modalGithub.href = project.github;
            modalGithub.style.display = 'inline-flex';
        } else {
            modalGithub.style.display = 'none';
        }



        // Render Tags
        modalTags.innerHTML = '';
        project.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'project-tag';

            let iconHtml = '';
            const lowerTag = tag.toLowerCase();
            if (lowerTag.includes('figma')) {
                iconHtml = '<i class="fa-brands fa-figma"></i> ';
            } else if (lowerTag.includes('js') || lowerTag.includes('javascript')) {
                iconHtml = '<i class="fa-brands fa-js"></i> ';
            } else if (lowerTag.includes('three')) {
                iconHtml = '<i class="fa-solid fa-cube"></i> ';
            } else if (lowerTag.includes('blender')) {
                iconHtml = '<i class="fa-solid fa-cube"></i> ';
            } else if (lowerTag.includes('flutter')) {
                iconHtml = '<i class="fa-solid fa-mobile-screen"></i> ';
            } else if (lowerTag.includes('design') || lowerTag.includes('website')) {
                iconHtml = '<i class="fa-solid fa-compass-drafting"></i> ';
            }

            span.innerHTML = `${iconHtml}${tag}`;
            modalTags.appendChild(span);
        });

        // Load Slide Images
        currentProjectImages = project.images || [];
        currentSlideIndex = 0;

        modalSlider.innerHTML = '';
        currentProjectImages.forEach(imgUrl => {
            const slide = document.createElement('div');
            slide.className = 'modal-slide';
            const img = document.createElement('img');
            img.src = imgUrl;
            img.alt = project.title;
            slide.appendChild(img);
            modalSlider.appendChild(slide);
        });

        // Render Slide Dots
        sliderDots.innerHTML = '';
        currentProjectImages.forEach((_, idx) => {
            const dot = document.createElement('span');
            dot.className = `dot ${idx === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(idx));
            sliderDots.appendChild(dot);
        });

        // Controls visibility
        if (currentProjectImages.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            sliderDots.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
            sliderDots.style.display = 'flex';
        }

        updateSliderPosition();

        // Show Modal & Disable main scroll
        projectModal.classList.add('active');
        document.body.classList.add('modal-open');
    }

    // Close Modal
    function closeProjectModal() {
        projectModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    // Slider slide positions
    function updateSliderPosition() {
        modalSlider.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

        const dots = sliderDots.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
            if (idx === currentSlideIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function goToSlide(index) {
        if (index < 0) {
            currentSlideIndex = currentProjectImages.length - 1;
        } else if (index >= currentProjectImages.length) {
            currentSlideIndex = 0;
        } else {
            currentSlideIndex = index;
        }
        updateSliderPosition();
    }

    // Event Listeners for slide action
    prevBtn.addEventListener('click', () => goToSlide(currentSlideIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlideIndex + 1));

    // Attach click listeners to cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            if (projectId) {
                openProjectModal(projectId);
            }
        });
    });

    // Close Modal listeners
    modalClose.addEventListener('click', closeProjectModal);
    modalOverlay.addEventListener('click', closeProjectModal);

    // Keyboard navigation (Escape to close, Arrows to slide)
    document.addEventListener('keydown', (e) => {
        if (!projectModal.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeProjectModal();
        } else if (e.key === 'ArrowLeft') {
            goToSlide(currentSlideIndex - 1);
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentSlideIndex + 1);
        }
    });

    // Contact Form AJAX Submission using FormSubmit.co
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            // If browsed as a local file (file://), use a mailto link fallback since FormSubmit blocks file:// origins
            if (window.location.protocol === 'file:') {
                event.preventDefault();
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;
                const subject = encodeURIComponent(`Portfolio Message from ${name}`);
                const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
                window.location.href = `mailto:aiapallado@gmail.com?subject=${subject}&body=${body}`;
                return;
            }

            event.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            fetch('https://formsubmit.co/ajax/aiapallado@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success === "true" || data.success === true) {
                        alert('Thank you! Your message has been sent successfully.');
                        contactForm.reset();
                    } else {
                        alert(data.message || 'Oops! Something went wrong. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                    alert('Oops! There was an error sending your message. Please check your network and try again.');
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                });
        });
    }

    setTimeout(typeEffect, 800);
    handleHashOnLoad();
});
