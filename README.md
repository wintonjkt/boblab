# bob-lab

A modern, responsive static website showcasing the IBM Bob Enterprise AI Development Workshop as an interactive lab experience with progress tracking, built as a GitHub Pages site.

## 🌐 Live Demo

Visit the site at: `https://[your-username].github.io/boblab/`

## 📖 About

**bob-lab** is an interactive learning platform demonstrating how IBM Bob handles enterprise-scale development challenges through hands-on lab exercises with progress tracking.

The workshop covers a realistic scenario: implementing SSO + MFA across 3 legacy systems to pass a SOC 2 audit. With Bob, you'll complete it in ~10 minutes instead of 7-8 weeks.

## ✨ Features

### Lab Experience
- **Progress Tracking** - Checkbox-based sidebar to track your completion
- **Copy-Paste Friendly** - One-click copy for all code snippets and prompts
- **Carbon Design System** - IBM's design language for consistent UI
- **Responsive Layout** - Works on desktop, tablet, and mobile

### Content Pages
1. **Home** - Landing page with overview and interactive demo
2. **Narrative** - Stage-by-stage workshop guide with sidebar progress
3. **Walkthrough** - Self-paced learning with verification checkpoints
4. **Demo** - Interactive tabs showing legacy vs. transformed systems

## 🎨 Design System

This site uses the **Carbon Design System** - IBM's open-source design system:

- **Typography**: IBM Plex Sans & IBM Plex Mono
- **Colors**: Carbon Design System color palette
- **Spacing**: Carbon's 4px visual rhythm scale
- **Components**: Consistent with IBM design patterns

## 📁 Project Structure

```
boblab/
├── index.html          # Landing page with demo
├── narrative.html      # Stage-by-stage guide with sidebar
├── walkthrough.html    # Self-paced walkthrough
├── styles.css          # Carbon Design System styles
├── narrative.css       # Additional page styles
├── script.js           # Progress tracking & interactivity
├── README.md           # This file
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Pages deployment
```

## 🛠️ Local Development

1. Clone the repository:
```bash
git clone https://github.com/[your-username]/boblab.git
cd boblab
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8000
```

3. Open http://localhost:8000 in your browser

## 🚢 Deployment to GitHub Pages

### Automatic Deployment (Recommended)

1. Push to the `main` branch
2. GitHub Actions will automatically deploy to GitHub Pages
3. Visit your repository Settings > Pages to configure source

### Manual Deployment

1. Go to repository Settings > Pages
2. Select source: Deploy from a branch
3. Select branch: `main` and folder: `/root`
4. Click Save

## 🎨 Customization

### Update Branding

Search and replace "bob-lab" with your preferred name across all HTML files.

### Modify Lab Steps

Edit the sidebar progress items in `narrative.html` and `walkthrough.html`:

```html
<label class="progress-item">
  <span class="progress-item-checkbox">
    <input type="checkbox" data-section="stage1" data-step="your-step">
    <span class="checkbox-custom"></span>
  </span>
  <span class="progress-item-text">Your step description</span>
</label>
```

### Update Colors

Edit the CSS variables in `styles.css`:

```css
:root {
  --cds-interactive-01: #0f62fe;  /* Primary blue */
  --cds-support-01: #da1e28;      /* Error red */
  --cds-support-02: #198038;      /* Success green */
  /* ... more Carbon colors */
}
```

## 📱 Responsive Breakpoints

- Desktop: > 968px (Full sidebar visible)
- Tablet: 640px - 968px (Collapsible sidebar)
- Mobile: < 640px (Hidden sidebar with toggle)

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- No JavaScript frameworks required

## 🔐 Privacy

Progress tracking uses localStorage only - no data is sent to external servers. All progress remains on your device.

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

MIT License - feel free to use this for your own projects.

## 🔗 Links

- [Carbon Design System](https://carbondesignsystem.com/)
- [IBM Plex Fonts](https://www.ibm.com/plex/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## 📞 Support

For issues or questions:
- Open a GitHub issue
- Check the [Troubleshooting Guide](https://github.com/IBM/bob-a-thon)

---

**Built with ❤️ using Carbon Design System**
