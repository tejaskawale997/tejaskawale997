document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ==========================================
    // MOBILE NAVIGATION TOGGLE
    // ==========================================
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    function toggleMobileMenu() {
        const isActive = mobileMenuOverlay.classList.toggle('active');
        // Toggle icon between hamburger and X
        const icon = mobileNavToggle.querySelector('i');
        if (isActive) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        // Prevent background scrolling when menu is active
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
    }

    mobileNavToggle.addEventListener('click', toggleMobileMenu);
    
    // Close mobile nav when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenuOverlay.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // ==========================================
    // NAVBAR SCROLL EFFECTS
    // ==========================================
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================
    // HERO TYPING EFFECT
    // ==========================================
    const words = ["Java Developer", "Full-Stack Web Intern", "MSc CA Graduate", "Problem Solver"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpan = document.getElementById('typing-text');
    const typeDelay = 150;
    const eraseDelay = 75;
    const wordWaitDelay = 2000; // time before starting to delete

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentDelay = isDeleting ? eraseDelay : typeDelay;

        if (!isDeleting && charIndex === currentWord.length) {
            currentDelay = wordWaitDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            currentDelay = 500; // small break before next word
        }

        setTimeout(type, currentDelay);
    }

    // Start Typing Effect
    if (typingSpan) {
        setTimeout(type, 1000);
    }

    // ==========================================
    // SCROLL REVEAL & SKILLS PROGRESS ANIMATION
    // ==========================================
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    let animatedSkills = false;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // If it is the skills section, animate the bars
                if (entry.target.id === 'skills' && !animatedSkills) {
                    animateSkills();
                    animatedSkills = true;
                }
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    function animateSkills() {
        skillBars.forEach(bar => {
            const targetPercent = bar.getAttribute('data-percent');
            bar.style.width = targetPercent;
        });
    }

    // ==========================================
    // ACTIVE NAVBAR LINKS HIGHLIGHT ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // PROJECTS GALLERY FILTER
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all buttons
            filterButtons.forEach(button => button.classList.remove('active'));
            // Add active class to clicked button
            e.currentTarget.classList.add('active');
            
            const filterValue = e.currentTarget.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    // Animation delay for layout reordering visual impact
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ==========================================
    // CONTACT FORM INTERACTIVE SUBMISSION
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');

    function showToast(message, isSuccess = true) {
        toastMsg.textContent = message;
        // Icon swap based on status
        const icon = toast.querySelector('i');
        if (isSuccess) {
            icon.setAttribute('data-lucide', 'check-circle');
            toast.style.borderColor = 'var(--accent-cyan)';
            toast.style.boxShadow = '0 10px 25px rgba(0, 242, 254, 0.15)';
        } else {
            icon.setAttribute('data-lucide', 'alert-circle');
            toast.style.borderColor = 'var(--accent-pink)';
            toast.style.boxShadow = '0 10px 25px rgba(217, 70, 239, 0.15)';
        }
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        toast.classList.remove('hidden');
        
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 4000);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                showToast("Please fill in all fields.", false);
                return;
            }

            // Disable submit button temporarily
            const submitBtn = contactForm.querySelector('.form-submit-btn');
            const submitBtnText = submitBtn.querySelector('span');
            const originalText = submitBtnText.textContent;
            
            submitBtn.disabled = true;
            submitBtnText.textContent = "Sending...";

            // Simulate form submission API call
            setTimeout(() => {
                showToast(`Thank you, ${name}! Your message has been received.`);
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtnText.textContent = originalText;
            }, 1500);
        });
    }

    // ==========================================
    // PORTFOLIO GALLERY MODAL INTERACTIVE SLIDER
    // ==========================================
    const projectModal = document.getElementById('project-modal');
    const modalClose = projectModal.querySelector('.modal-close');
    const modalBackdrop = projectModal.querySelector('.modal-backdrop');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTagsContainer = document.getElementById('modal-tags');
    const modalGithub = document.getElementById('modal-github');
    const galleryDotsContainer = document.getElementById('gallery-dots');
    const prevBtn = projectModal.querySelector('.gallery-nav.prev');
    const nextBtn = projectModal.querySelector('.gallery-nav.next');

    let currentImagesList = [];
    let currentImageIndex = 0;

    // Attach click listeners to gallery open buttons in cards
    document.querySelector('.project-grid').addEventListener('click', (e) => {
        const btn = e.target.closest('.open-gallery-btn');
        if (!btn) return;
        
        const card = btn.closest('.project-card');
        if (!card) return;

        // Retrieve attributes
        const title = card.getAttribute('data-title');
        const desc = card.getAttribute('data-desc');
        const tags = card.getAttribute('data-tags').split(',');
        const imagesListRaw = card.getAttribute('data-images');
        currentImagesList = imagesListRaw ? imagesListRaw.split(',') : [];
        currentImageIndex = 0;

        // Set text content
        modalTitle.textContent = title;
        modalDesc.textContent = desc;

        // Render tags
        modalTagsContainer.innerHTML = '';
        tags.forEach(tag => {
            const span = document.createElement('span');
            span.textContent = tag.trim();
            modalTagsContainer.appendChild(span);
        });

        // Set initial image
        updateModalImage();

        // Render dots
        updateModalDots();

        // Open modal
        projectModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    });

    function updateModalImage() {
        if (currentImagesList.length > 0) {
            // Apply a small fade out
            modalImage.style.opacity = '0';
            
            setTimeout(() => {
                modalImage.src = currentImagesList[currentImageIndex];
                modalImage.onload = () => {
                    modalImage.style.opacity = '1';
                };
            }, 150);
        }
    }

    function updateModalDots() {
        galleryDotsContainer.innerHTML = '';
        currentImagesList.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('gallery-dot');
            if (idx === currentImageIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                currentImageIndex = idx;
                updateModalImage();
                updateActiveDot();
            });
            galleryDotsContainer.appendChild(dot);
        });
    }

    function updateActiveDot() {
        const dots = galleryDotsContainer.querySelectorAll('.gallery-dot');
        dots.forEach((dot, idx) => {
            if (idx === currentImageIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Previous Image Action
    prevBtn.addEventListener('click', () => {
        if (currentImagesList.length <= 1) return;
        currentImageIndex = (currentImageIndex - 1 + currentImagesList.length) % currentImagesList.length;
        updateModalImage();
        updateActiveDot();
    });

    // Next Image Action
    nextBtn.addEventListener('click', () => {
        if (currentImagesList.length <= 1) return;
        currentImageIndex = (currentImageIndex + 1) % currentImagesList.length;
        updateModalImage();
        updateActiveDot();
    });

    // Close Modal Functionality
    function closeModal() {
        projectModal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Restore background scroll
    }

    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    // Escape Key Close
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !projectModal.classList.contains('hidden')) {
            closeModal();
        }
    });
});
