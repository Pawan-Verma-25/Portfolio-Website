// Global variables
let currentTheme = localStorage.getItem('theme') || 'light';
let isMenuOpen = false;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Set initial theme
    setTheme(currentTheme);
    
    // Show home page by default
    showPage('home');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Add smooth scrolling to all internal links
    addSmoothScrolling();
    
    // Add form validation
    setupFormValidation();
    
    // Add animation to cards on scroll
    setupScrollAnimations();
});

// Theme toggle functionality
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const themeButton = document.querySelector('.theme-toggle');
    if (themeButton) {
        themeButton.textContent = theme === 'light' ? '🌙' : '☀️';
    }
}

// Page navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
        
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Update active navigation link
    updateActiveNavLink(pageId);
    
    // Close mobile menu if open
    if (isMenuOpen) {
        toggleMobileMenu();
    }
}

function updateActiveNavLink(activePageId) {
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current nav link
    const activeLink = document.querySelector(`a[href="#${activePageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (navMenu && mobileMenu) {
        isMenuOpen = !isMenuOpen;
        navMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    }
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--white)';
        navbar.style.backdropFilter = 'none';
    }
}

// Project view functionality
function viewProject(projectId) {
    const projectDetails = {
        sales: {
            title: "Sales Data Analysis Project",
            description: "This comprehensive project analyzed customer trends and seasonal demand patterns using advanced Python libraries and SQL queries. The analysis revealed key insights about customer behavior, peak sales periods, and product performance.",
            highlights: [
                "Identified 35% increase in sales during Q4",
                "Discovered key customer segments contributing 60% of revenue",
                "Optimized inventory management reducing costs by 20%",
                "Created predictive models for demand forecasting"
            ],
            technologies: ["Python", "Pandas", "NumPy", "DAX", "PowerBi", "SQL", "Jupyter Notebook"],
            github: "https://github.com/Pawan-Verma-25/SuperStore-Sales-and-forecasting-"
        },
        retail: {
            title: "Interactive Retail Dashboard",
            description: "Built a comprehensive Power BI dashboard providing real-time insights into retail operations. The dashboard includes KPI tracking, customer segmentation, and trend analysis with interactive filters.",
            highlights: [
                "Real-time sales monitoring with automated refresh",
                "Customer segmentation analysis with RFM modeling",
                "Geographic sales distribution visualization",
                "Monthly/quarterly trend analysis with forecasting"
            ],
            technologies: ["Power BI", "DAX", "Power Query", "SQL Server", "Excel"],
            github: "https://github.com/pawankumarverma/retail-dashboard"
        },
        predictive: {
            title: "Real Estate Price intelligence report and model",
            description: "Developed machine learning models to forecast product demand with 85% accuracy. Used regression analysis, time series forecasting, and feature engineering techniques.",
            highlights: [
                "Achieved 85% accuracy in demand prediction",
                "Reduced inventory holding costs by 18%",
                "Implemented automated reordering system",
                "Created early warning system for stock-outs"
            ],
            technologies: ["Python", "Random Forest Regressor","Power Bi" , "DAX","SQL", "Pandas", "NumPy", "Matplotlib"],
            github: "https://github.com/Pawan-Verma-25/Real-Estate-Price-Intelligence-Prediction-Dashboard"
        },
        optimization: {
            title: "Process Optimization Study",
            description: "Analyzed and documented the end-to-end development of an EMR system using agile methodology, SDLC, requirement analysis, and tools like JIRA, Confluence, Balsamiq, and Lucidchart.",
            highlights: [
                "Improved requirement clarity by 30% through effective elicitation and gap analysis",
                "Accelerated project delivery by 20% using Agile methodology with JIRA tracking and sprint reviews",
                "Optimized stakeholder communication with BPMN, wireframes, and UML models, reducing rework cycles by 25%",
                "Increased QA and UAT test coverage by 15% through structured SDLC alignment"
            ],
            technologies: ["Python", "Excel", "Agile", "FRD", "BRD"],
            github: "https://github.com/pawankumarverma/process-optimization"
        }
    };
    
    const project = projectDetails[projectId];
    if (project) {
        showProjectModal(project);
    }
}

// Show project modal
function showProjectModal(project) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal-overlay" id="projectModal" onclick="closeProjectModal(event)">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2>${project.title}</h2>
                    <button class="modal-close" onclick="closeProjectModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <p class="project-description">${project.description}</p>
                    
                    <h3>Key Highlights:</h3>
                    <ul class="project-highlights">
                        ${project.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                    </ul>
                    
                    <h3>Technologies Used:</h3>
                    <div class="project-tech-tags">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    
                    <div class="modal-actions">
                        <a href="${project.github}" target="_blank" class="github-btn">
                            💻 View on GitHub
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles if not already present
    if (!document.querySelector('#modalStyles')) {
        addModalStyles();
    }
    
    // Animate modal in
    setTimeout(() => {
        const modal = document.getElementById('projectModal');
        if (modal) {
            modal.classList.add('active');
        }
    }, 10);
}

// Close project modal
function closeProjectModal(event) {
    if (event && event.target !== event.currentTarget) return;
    
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Add modal styles
function addModalStyles() {
    const styles = `
        <style id="modalStyles">
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-content {
            background: var(--white);
            border-radius: 15px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: translateY(-30px);
            transition: transform 0.3s ease;
        }
        
        .modal-overlay.active .modal-content {
            transform: translateY(0);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem;
            border-bottom: 1px solid var(--bg-light);
        }
        
        .modal-header h2 {
            color: var(--text-dark);
            margin: 0;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            color: var(--text-light);
            cursor: pointer;
            padding: 0;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .modal-close:hover {
            background: var(--bg-light);
            color: var(--text-dark);
        }
        
        .modal-body {
            padding: 2rem;
        }
        
        .project-description {
            color: var(--text-light);
            line-height: 1.6;
            margin-bottom: 2rem;
        }
        
        .modal-body h3 {
            color: var(--primary-color);
            margin: 1.5rem 0 1rem;
        }
        
        .project-highlights {
            list-style: none;
            padding: 0;
        }
        
        .project-highlights li {
            color: var(--text-light);
            margin-bottom: 0.5rem;
            padding-left: 1.5rem;
            position: relative;
        }
        
        .project-highlights li:before {
            content: '✓';
            color: var(--primary-color);
            font-weight: bold;
            position: absolute;
            left: 0;
        }
        
        .project-tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 2rem;
        }
        
        .tech-tag {
            background: var(--primary-color);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 500;
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .github-btn, .demo-btn {
            padding: 12px 25px;
            border-radius: 25px;
            font-weight: 600;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
        }
        
        .github-btn {
            background: var(--text-dark);
            color: white;
        }
        
        .demo-btn {
            background: var(--primary-color);
            color: white;
        }
        
        .github-btn:hover, .demo-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// Request demo functionality
function requestDemo(projectTitle) {
    // Pre-fill contact form with demo request
    showPage('contact');
    
    setTimeout(() => {
        const subjectField = document.getElementById('subject');
        const messageField = document.getElementById('message');
        
        if (subjectField) {
            subjectField.value = `Demo Request: ${projectTitle}`;
        }
        
        if (messageField) {
            messageField.value = `Hi Pawan,\n\nI'm interested in seeing a demo of your "${projectTitle}" project. Please let me know when we can schedule a call.\n\nThanks!`;
        }
        
        // Close modal
        closeProjectModal();
    }, 500);
}

// Form submission
function submitForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Get form values
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Thank you! Your message has been sent. I\'ll get back to you soon.', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Download resume
function downloadResume() {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual resume URL
    link.download = 'Pawan_Kumar_Verma_Resume.pdf';
    
    // Show notification since we don't have actual file
    showNotification('Resume download will be available soon. Please contact me directly for now.', 'info');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="closeNotification(this)">&times;</button>
        </div>
    `;
    
    // Add notification styles if not present
    if (!document.querySelector('#notificationStyles')) {
        addNotificationStyles();
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('active');
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        closeNotification(notification.querySelector('.notification-close'));
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

function closeNotification(button) {
    const notification = button.closest('.notification');
    if (notification) {
        notification.classList.remove('active');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
}

// Add notification styles
function addNotificationStyles() {
    const styles = `
        <style id="notificationStyles">
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 3000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        }
        
        .notification.active {
            transform: translateX(0);
        }
        
        .notification-content {
            background: var(--white);
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 1rem;
            min-width: 300px;
            border-left: 4px solid var(--primary-color);
        }
        
        .notification-success .notification-content {
            border-left-color: #10b981;
        }
        
        .notification-error .notification-content {
            border-left-color: #ef4444;
        }
        
        .notification-warning .notification-content {
            border-left-color: #f59e0b;
        }
        
        .notification-message {
            flex: 1;
            color: var(--text-dark);
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--text-light);
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .notification-close:hover {
            background: var(--bg-light);
            color: var(--text-dark);
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// Smooth scrolling for internal links
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.length <= 1) return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form validation setup
function setupFormValidation() {
    const inputs = document.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    // Remove existing error
    clearFieldError(event);
    
    if (!value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    return true;
}

function showFieldError(field, message) {
    field.style.borderColor = '#ef4444';
    
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.style.color = '#ef4444';
        errorElement.style.fontSize = '0.9rem';
        errorElement.style.marginTop = '0.5rem';
        errorElement.style.display = 'block';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearFieldError(event) {
    const field = event.target;
    field.style.borderColor = '';
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const elementsToAnimate = document.querySelectorAll(
        '.highlight-card, .project-card, .service-card, .testimonial-card, .cert-card, .milestone'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
    
    // Add animation styles
    if (!document.querySelector('#animationStyles')) {
        addAnimationStyles();
    }
}

// Add animation styles
function addAnimationStyles() {
    const styles = `
        <style id="animationStyles">
        .highlight-card, .project-card, .service-card, .testimonial-card, .cert-card, .milestone {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .highlight-card.animate-in, .project-card.animate-in, .service-card.animate-in, 
        .testimonial-card.animate-in, .cert-card.animate-in, .milestone.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .highlight-card:nth-child(2).animate-in { transition-delay: 0.1s; }
        .highlight-card:nth-child(3).animate-in { transition-delay: 0.2s; }
        .highlight-card:nth-child(4).animate-in { transition-delay: 0.3s; }
        
        .project-card:nth-child(2).animate-in { transition-delay: 0.1s; }
        .project-card:nth-child(3).animate-in { transition-delay: 0.2s; }
        .project-card:nth-child(4).animate-in { transition-delay: 0.3s; }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    // Close modal with Escape key
    if (event.key === 'Escape') {
        const modal = document.getElementById('projectModal');
        if (modal) {
            closeProjectModal();
        }
    }
    
    // Navigate with arrow keys (optional feature)
    if (event.altKey) {
        const pages = ['home', 'about', 'projects', 'achievements', 'services', 'testimonials', 'contact'];
        const currentPage = document.querySelector('.page-section.active').id;
        const currentIndex = pages.indexOf(currentPage);
        
        if (event.key === 'ArrowLeft' && currentIndex > 0) {
            showPage(pages[currentIndex - 1]);
        } else if (event.key === 'ArrowRight' && currentIndex < pages.length - 1) {
            showPage(pages[currentIndex + 1]);
        }
    }
});

// Performance optimization: Lazy load images if any are added
function lazyLoadImages() {
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
}

// Initialize lazy loading when DOM is loaded
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Export functions for global access
window.showPage = showPage;
window.toggleTheme = toggleTheme;
window.toggleMobileMenu = toggleMobileMenu;
window.viewProject = viewProject;
window.closeProjectModal = closeProjectModal;
window.submitForm = submitForm;
window.downloadResume = downloadResume;