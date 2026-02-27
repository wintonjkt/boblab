// Fix walkthrough layout issues
document.addEventListener('DOMContentLoaded', function() {
  // Fix sidebar stickiness
  const sidebar = document.querySelector('.walkthrough-sidebar');
  const header = document.querySelector('.navbar') || document.querySelector('header');
  
  if (sidebar && header) {
    // Update CSS custom property for header height
    const headerHeight = header.offsetHeight;
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    
    // Adjust sidebar top position
    sidebar.style.top = `${headerHeight + 32}px`;
  }
  
  // Fix navigation smooth scrolling
  const navLinks = document.querySelectorAll('.capability-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Update active state
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
  
  // Update active nav link on scroll
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Fix copy buttons
  const copyButtons = document.querySelectorAll('.copy-button');
  copyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const codeBlock = this.closest('.code-block-wrapper').querySelector('code');
      if (codeBlock) {
        navigator.clipboard.writeText(codeBlock.textContent).then(() => {
          const originalText = this.querySelector('span').textContent;
          this.querySelector('span').textContent = 'Copied!';
          setTimeout(() => {
            this.querySelector('span').textContent = originalText;
          }, 2000);
        });
      }
    });
  });
});