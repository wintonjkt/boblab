// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Demo tabs functionality
function showDemo(demoName) {
  // Hide all demo contents
  document.querySelectorAll('.demo-content').forEach(content => {
    content.classList.remove('active');
  });

  // Remove active class from all tabs
  document.querySelectorAll('.demo-tab').forEach(tab => {
    tab.classList.remove('active');
  });

  // Show selected demo content
  document.getElementById(`demo-${demoName}`).classList.add('active');

  // Add active class to clicked tab
  event.target.classList.add('active');
}

// Handle login form submission
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email && password) {
    // Show loading state
    const button = event.target.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Signing in...';
    button.disabled = true;

    // Simulate login delay
    setTimeout(() => {
      // Switch to dashboard demo
      document.querySelectorAll('.demo-content').forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById('demo-dashboard').classList.add('active');

      // Update tabs
      document.querySelectorAll('.demo-tab').forEach(tab => {
        tab.classList.remove('active');
      });
      document.querySelectorAll('.demo-tab')[1].classList.add('active');

      // Reset button
      button.textContent = originalText;
      button.disabled = false;
    }, 1000);
  }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
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

// Observe cards for animation
document.querySelectorAll('.card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// Observe metric cards
document.querySelectorAll('.metric-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// Counter animation for metrics
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const updateCounter = () => {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
}

// Trigger counter animation when Bobalytics is visible
const bobalyticsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const metrics = entry.target.querySelectorAll('.metric-value');
      metrics.forEach(metric => {
        const value = parseInt(metric.textContent);
        if (!isNaN(value) && metric.textContent.includes('%')) {
          // Skip percentage animation
          return;
        }
        if (!isNaN(value)) {
          animateCounter(metric, value);
        }
      });
      bobalyticsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const bobalyticsDemo = document.querySelector('.bobalytics-demo');
if (bobalyticsDemo) {
  bobalyticsObserver.observe(bobalyticsDemo);
}

// Add parallax effect to hero
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero && scrolled < window.innerHeight) {
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
  }
});

// Form validation feedback
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

if (emailInput) {
  emailInput.addEventListener('blur', () => {
    if (emailInput.value && !emailInput.value.includes('@')) {
      emailInput.style.borderColor = 'var(--danger-color)';
    } else {
      emailInput.style.borderColor = 'var(--border-color)';
    }
  });
}

if (passwordInput) {
  passwordInput.addEventListener('input', () => {
    if (passwordInput.value.length < 6) {
      passwordInput.style.borderColor = 'var(--warning-color)';
    } else {
      passwordInput.style.borderColor = 'var(--success-color)';
    }
  });
}

// Add keyboard navigation for demo tabs
document.addEventListener('keydown', (e) => {
  const tabs = document.querySelectorAll('.demo-tab');
  const currentTab = document.querySelector('.demo-tab.active');
  const currentIndex = Array.from(tabs).indexOf(currentTab);

  if (e.key === 'ArrowRight' && currentIndex < tabs.length - 1) {
    tabs[currentIndex + 1].click();
  } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
    tabs[currentIndex - 1].click();
  }
});

// Initialize - hide loading spinner if any
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
progressBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-color), var(--success-color));
  z-index: 9999;
  transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  progressBar.style.width = scrolled + '%';
});
