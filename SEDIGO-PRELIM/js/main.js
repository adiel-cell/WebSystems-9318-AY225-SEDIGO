// Main JavaScript for common functionality across all pages

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            menuToggle.innerHTML = mainNav.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (validateEmail(email)) {
                // In a real application, you would send this to a server
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Form validation helper
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Highlight active navigation link
    const currentPage = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements with the 'animate-on-scroll' class
    document.querySelectorAll('.program-card, .event-card, .faculty-card, .value-item').forEach(el => {
        observer.observe(el);
    });
    // Navigation History System
class NavigationHistory {
    constructor() {
        this.history = [];
        this.currentIndex = -1;
        this.init();
    }
    
    init() {
        // Store the initial page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        this.addToHistory(currentPage);
        
        // Track navigation
        this.trackNavigation();
    }
    
    addToHistory(page) {
        // Don't add consecutive duplicates
        if (this.history[this.currentIndex] !== page) {
            this.history.push(page);
            this.currentIndex++;
        }
    }
    
    trackNavigation() {
        // Intercept link clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href && !link.href.includes('#') && !link.getAttribute('target')) {
                const href = link.getAttribute('href');
                if (href.endsWith('.html')) {
                    this.addToHistory(href);
                    this.updateBackButton();
                }
            }
        });
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            this.currentIndex = this.history.indexOf(currentPage);
            if (this.currentIndex === -1) {
                this.addToHistory(currentPage);
            }
            this.updateBackButton();
        });
    }
    
    getPreviousPage() {
        if (this.currentIndex > 0) {
            return this.history[this.currentIndex - 1];
        }
        return null;
    }
    
    goBack() {
        const previousPage = this.getPreviousPage();
        if (previousPage) {
            window.location.href = previousPage;
        }
    }
    
    updateBackButton() {
        const backButton = document.getElementById('backButton');
        if (backButton) {
            const previousPage = this.getPreviousPage();
            if (previousPage && previousPage !== 'index.html') {
                backButton.style.display = 'flex';
                backButton.setAttribute('href', previousPage);
                
                // Update back button text based on previous page
                const pageNames = {
                    'college.html': 'About College',
                    'academics.html': 'Academic Programs',
                    'faculty.html': 'Faculty Directory',
                    'announcement.html': 'Announcements',
                    'inquiry.html': 'Contact'
                };
                
                const pageName = pageNames[previousPage] || 'Previous Page';
                backButton.querySelector('.back-text').textContent = `Back to ${pageName}`;
            } else {
                backButton.style.display = 'none';
            }
        }
    }
}

            // Initialize navigation history
            const navHistory = new NavigationHistory();

            // Modified DOMContentLoaded event handler
            document.addEventListener('DOMContentLoaded', function() {
            // ... existing code ...
    
            // Add back button functionality
            const backButton = document.getElementById('backButton');
            if (backButton) {
            backButton.addEventListener('click', function(e) {
            e.preventDefault();
            navHistory.goBack();
            });
    }
    
            // Update back button on page load
            setTimeout(() => navHistory.updateBackButton(), 100);
            });

            
});