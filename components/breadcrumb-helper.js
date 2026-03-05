// Breadcrumb helper for lab pages
function initBreadcrumb(pageTitle) {
  document.addEventListener('DOMContentLoaded', function() {
    // Wait for components to load
    setTimeout(() => {
      const breadcrumbTitle = document.getElementById('current-page-title');
      if (breadcrumbTitle && pageTitle) {
        breadcrumbTitle.textContent = pageTitle;
      }
    }, 100);
  });
}

// Export for use in lab pages
if (typeof window !== 'undefined') {
  window.initBreadcrumb = initBreadcrumb;
}