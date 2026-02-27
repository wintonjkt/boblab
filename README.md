# IBM Bob Workshop - GitHub Pages Site

A modern, responsive static website showcasing the IBM Bob Enterprise AI Development Workshop, built as a GitHub Pages site.

## 🌐 Live Demo

Visit the site at: `https://[your-username].github.io/boblab/`

## 📖 About

This website demonstrates the capabilities of IBM Bob through an interactive workshop experience. It showcases how Bob transforms enterprise development from weeks to minutes through:

- Multi-repo orchestration
- Security inline vulnerability detection
- Compliance automation (SOC 2, HIPAA, etc.)
- Bobalytics transparency dashboard

## 🚀 Features

### Static Website
- **Pure HTML/CSS/JS** - No build tools required
- **Responsive Design** - Works on all devices
- **Modern UI** - Clean, professional design
- **Interactive Demo** - Live demo of Bob capabilities

### Sections
1. **Hero** - Eye-catching introduction with code preview
2. **About** - Workshop overview and learning objectives
3. **Features** - Comparison with traditional AI tools
4. **Demo** - Interactive tabs showing:
   - Legacy login portal (with security issues)
   - Dashboard view
   - Bobalytics analytics dashboard
5. **Resources** - Links to documentation and case studies
6. **CTA** - Call-to-action for getting started

## 📁 Project Structure

```
boblab/
├── index.html          # Main landing page
├── styles.css          # All styling
├── script.js           # Interactive functionality
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

### Option 1: Automatic Deployment (Recommended)

1. Push to the `main` branch
2. GitHub Actions will automatically deploy to GitHub Pages
3. Visit your repository settings > Pages to configure source

### Option 2: Manual Deployment

1. Go to repository Settings > Pages
2. Select source: Deploy from a branch
3. Select branch: `main` and folder: `/root`
4. Click Save
5. Your site will be available at `https://[your-username].github.io/boblab/`

## 🎨 Customization

### Colors
Edit the CSS variables in `styles.css`:

```css
:root {
  --primary-color: #0f62fe;
  --primary-hover: #0353e9;
  --secondary-color: #393939;
  /* ... more variables */
}
```

### Content
Edit `index.html` to update:
- Hero section text
- Feature descriptions
- Demo content
- Resource links

### Interactive Features
Edit `script.js` to modify:
- Tab switching behavior
- Form interactions
- Animations
- Counter effects

## 📱 Responsive Breakpoints

- Desktop: > 968px
- Tablet: 640px - 968px
- Mobile: < 640px

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- No JavaScript frameworks = Fast load times

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - feel free to use this for your own projects.

## 🔗 Links

- [IBM Bob Documentation](https://internal.bob.ibm.com/docs/ide)
- [Original Workshop Repository](https://github.com/IBM/bob-a-thon)

## 📞 Support

For issues or questions:
- Open a GitHub issue
- Contact: bob-support@ibm.com

---

**Built with ❤️ for the IBM Bob Team**
