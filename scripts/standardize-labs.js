#!/usr/bin/env node

/**
 * Script to standardize lab HTML files
 * - Adds breadcrumb component where missing
 * - Replaces inline footers with footer component
 * - Standardizes script sections
 */

const fs = require('fs');
const path = require('path');

const labsDir = path.join(__dirname, '..', 'labs');

// Lab files to process
const labFiles = [
  'getting-started.html',
  'bobshell.html',
  'custom-modes.html',
  'bob-rules.html',
  'mcp.html',
  'carbon-react.html',
  'spec-driven-development.html',
  'walkthrough.html',
  'appmod.html',
  'cobol2java.html',
  'ibmi.html',
  'sdlc.html'
];

// Lab titles for breadcrumb
const labTitles = {
  'getting-started.html': 'Getting Started with Bob',
  'bobshell.html': 'BobShell',
  'custom-modes.html': 'Custom Modes',
  'bob-rules.html': 'Bob Rules',
  'mcp.html': 'Using MCP in Bob',
  'carbon-react.html': 'Carbon React Mode',
  'spec-driven-development.html': 'Spec-Driven Development',
  'walkthrough.html': 'DevSecOps Walkthrough',
  'appmod.html': 'Application Modernization',
  'cobol2java.html': 'COBOL to Java',
  'ibmi.html': 'IBM i Modernization',
  'sdlc.html': 'SDLC Integration'
};

function addBreadcrumb(content, filename) {
  // Check if breadcrumb already exists
  if (content.includes('data-component="breadcrumb"')) {
    return content;
  }
  
  // Add breadcrumb after navbar
  const navbarPattern = /(<div data-component="navbar"><\/div>)/;
  if (navbarPattern.test(content)) {
    content = content.replace(
      navbarPattern,
      '$1\n  <div data-component="breadcrumb"></div>'
    );
  }
  
  return content;
}

function replaceFooterWithComponent(content) {
  // Check if already using footer component
  if (content.includes('data-component="footer"')) {
    return content;
  }
  
  // Pattern to match inline footer
  const footerPattern = /<footer class="footer">[\s\S]*?<\/footer>/;
  
  if (footerPattern.test(content)) {
    content = content.replace(
      footerPattern,
      '<div data-component="footer"></div>'
    );
  }
  
  return content;
}

function standardizeScripts(content, filename) {
  const title = labTitles[filename] || 'Lab';
  
  // Standard script section
  const standardScripts = `
  <script src="../components/component-loader.js"></script>
  <script src="../components/breadcrumb-helper.js"></script>
  <script>
    initBreadcrumb('${title}');
  </script>
  <script src="../i18n.js"></script>
  <script src="../script.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
  <script>
    hljs.highlightAll();
  </script>
</body>
</html>`;
  
  // Remove existing script section and add standard one
  const scriptPattern = /\s*<!-- Scripts -->[\s\S]*<\/body>\s*<\/html>/;
  
  if (scriptPattern.test(content)) {
    content = content.replace(scriptPattern, standardScripts);
  }
  
  return content;
}

function processLab(filename) {
  const filePath = path.join(labsDir, filename);
  
  console.log(`Processing ${filename}...`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  const originalLength = content.split('\n').length;
  
  // Apply transformations
  content = addBreadcrumb(content, filename);
  content = replaceFooterWithComponent(content);
  content = standardizeScripts(content, filename);
  
  // Write back
  fs.writeFileSync(filePath, content, 'utf8');
  
  const newLength = content.split('\n').length;
  const reduction = originalLength - newLength;
  
  console.log(`  ✓ ${filename}: ${originalLength} → ${newLength} lines (${reduction > 0 ? '-' : '+'}${Math.abs(reduction)} lines)`);
  
  return { original: originalLength, new: newLength, reduction };
}

// Main execution
console.log('Standardizing lab HTML files...\n');

let totalOriginal = 0;
let totalNew = 0;

labFiles.forEach(filename => {
  const stats = processLab(filename);
  totalOriginal += stats.original;
  totalNew += stats.new;
});

const totalReduction = totalOriginal - totalNew;

console.log(`\n${'='.repeat(50)}`);
console.log(`Total: ${totalOriginal} → ${totalNew} lines`);
console.log(`Reduction: ${totalReduction} lines (${((totalReduction / totalOriginal) * 100).toFixed(1)}%)`);
console.log(`${'='.repeat(50)}`);

// Made with Bob
