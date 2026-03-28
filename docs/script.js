// ============================================
// BOB LAB - CARBON DESIGN SYSTEM
// Interactive JavaScript
// ============================================

// Progress tracking for lab exercises
const LAB_PROGRESS_KEY = 'bob-lab-progress';

// Save progress to localStorage
function saveProgress(sectionId, stepId, completed) {
  const progress = JSON.parse(localStorage.getItem(LAB_PROGRESS_KEY) || '{}');
  if (!progress[sectionId]) {
    progress[sectionId] = {};
  }
  progress[sectionId][stepId] = completed;
  localStorage.setItem(LAB_PROGRESS_KEY, JSON.stringify(progress));
  updateProgressSummary();
}

// Load progress from localStorage
function loadProgress() {
  const progress = JSON.parse(localStorage.getItem(LAB_PROGRESS_KEY) || '{}');
  Object.keys(progress).forEach(sectionId => {
    Object.keys(progress[sectionId]).forEach(stepId => {
      const checkbox = document.querySelector(`[data-section="${sectionId}"][data-step="${stepId}"]`);
      if (checkbox && progress[sectionId][stepId]) {
        checkbox.checked = true;
        const item = checkbox.closest('.progress-item');
        if (item) item.classList.add('completed');
      }
    });
  });
  updateProgressSummary();
}

// Update progress summary
function updateProgressSummary() {
  const allCheckboxes = document.querySelectorAll('.progress-item-checkbox input');
  const checkedCheckboxes = document.querySelectorAll('.progress-item-checkbox input:checked');

  const total = allCheckboxes.length;
  const completed = checkedCheckboxes.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const progressBar = document.querySelector('.progress-bar-fill');
  const progressText = document.querySelector('.progress-summary-text');

  if (progressBar) {
    progressBar.style.width = percentage + '%';
  }

  if (progressText) {
    progressText.textContent = `${completed} of ${total} steps completed (${percentage}%)`;
  }
}

// Initialize progress tracking
function initProgressTracking() {
  // Add event listeners to checkboxes
  document.querySelectorAll('.progress-item-checkbox input').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const sectionId = e.target.dataset.section;
      const stepId = e.target.dataset.step;
      const item = e.target.closest('.progress-item');

      if (e.target.checked) {
        item.classList.add('completed');
      } else {
        item.classList.remove('completed');
      }

      saveProgress(sectionId, stepId, e.target.checked);
    });
  });

  // Load saved progress
  loadProgress();
}

// Copy to clipboard functionality
function initCopyButtons() {
  document.querySelectorAll('.copy-button').forEach(button => {
    button.addEventListener('click', async (e) => {
      const codeBlock = e.target.closest('.code-block-wrapper').querySelector('code, pre');
      const text = codeBlock.textContent;

      try {
        await navigator.clipboard.writeText(text);
        button.classList.add('copied');
        const originalText = button.innerHTML;
        button.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        `;

        setTimeout(() => {
          button.classList.remove('copied');
          button.innerHTML = originalText;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  });
}

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('mobile-open');
  });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('mobile-open');
  });
});

// Sidebar toggle (mobile)
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.querySelector('.sidebar-overlay');

if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    if (sidebarOverlay) {
      sidebarOverlay.classList.toggle('show');
    }
  });
}

if (sidebarOverlay && sidebar) {
  sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('show');
  });
}

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
  const demoContent = document.getElementById(`demo-${demoName}`);
  if (demoContent) {
    demoContent.classList.add('active');
  }

  // Add active class to clicked tab
  const activeTab = event?.target;
  if (activeTab && activeTab.classList.contains('demo-tab')) {
    activeTab.classList.add('active');
  }
}

// Make showDemo available globally
window.showDemo = showDemo;

// Handle login form submission
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('email')?.value;
  const password = document.getElementById('password')?.value;

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

      const dashboardDemo = document.getElementById('demo-dashboard');
      if (dashboardDemo) {
        dashboardDemo.classList.add('active');
      }

      // Update tabs
      document.querySelectorAll('.demo-tab').forEach(tab => {
        tab.classList.remove('active');
      });
      const tabs = document.querySelectorAll('.demo-tab');
      if (tabs[1]) {
        tabs[1].classList.add('active');
      }

      // Reset button
      button.textContent = originalText;
      button.disabled = false;
    }, 1000);
  }
}

// Make handleLogin available globally
window.handleLogin = handleLogin;

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Update active state for walkthrough/appmod sidebar navigation
      if (this.classList.contains('capability-link')) {
        document.querySelectorAll('.capability-link').forEach(link => {
          link.classList.remove('active');
        });
        this.classList.add('active');
      }
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
document.querySelectorAll('.card, .stage-summary-card, .metric').forEach(card => {
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
        const valueText = metric.textContent;
        const value = parseInt(valueText);

        // Skip percentage animations or if contains non-numeric
        if (valueText.includes('%') || valueText.includes('$') || isNaN(value)) {
          return;
        }

        animateCounter(metric, value);
      });
      bobalyticsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const bobalyticsDemo = document.querySelector('.bobalytics-demo, .final-summary');
if (bobalyticsDemo) {
  bobalyticsObserver.observe(bobalyticsDemo);
}

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
progressBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background: var(--primary-color);
  z-index: 9999;
  transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  progressBar.style.width = scrolled + '%';
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
    tabs[currentIndex + 1]?.click();
  } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
    tabs[currentIndex - 1]?.click();
  }
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  initProgressTracking();
  initCopyButtons();

  // Mark current section in sidebar
  const currentPath = window.location.pathname;
  document.querySelectorAll('.progress-item').forEach(item => {
    const link = item.querySelector('a');
    if (link && link.getAttribute('href') === currentPath) {
      item.classList.add('active');
    }
  });
});

// Add loaded class to body
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
