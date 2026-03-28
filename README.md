# bob-lab

A modern, interactive learning platform showcasing the IBM Bob Enterprise AI Development Workshop through hands-on lab exercises with progress tracking.

## 🚀 Quick Start

**Recommended:** Use the **React version** for the best experience:

```bash
cd react-app
bun install
bun run dev
```

Visit http://localhost:5173 to start learning!

## 📦 Two Versions Available

This repository contains **two versions** of the Bob Lab application:

### 1. **React Application** (Recommended) 🌟
- **Location:** [`/react-app/`](react-app/)
- **Technology:** React + TypeScript + Vite
- **Design System:** Carbon Design System
- **Status:** ✅ **Active Development**
- **Documentation:** [react-app/README.md](react-app/README.md)

**Features:**
- Modern React architecture with TypeScript
- Enhanced performance and maintainability
- Comprehensive testing suite
- Better developer experience
- Production-ready deployment

### 2. **HTML Version** (Legacy)
- **Location:** [`/docs/`](docs/)
- **Technology:** Vanilla HTML/CSS/JavaScript
- **Status:** 📚 **Preserved for Reference**
- **Documentation:** [docs/README.md](docs/README.md)

**Note:** The HTML version is no longer actively maintained. New features and improvements are added to the React version.

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
1. **Home** - Landing page with component-based architecture
2. **Narrative** - Customer conversation guide with talk tracks
3. **Labs** - 13 interactive lab exercises covering Bob capabilities

### Component Architecture
The site uses a modular component system for maintainability:
- **Reusable Components** - Navbar, footer, breadcrumb, progress tracking
- **Dynamic Loading** - Components loaded via [`component-loader.js`](components/component-loader.js:1)
- **Consistent Structure** - All lab pages use standardized component layout
- **Theme Support** - Dark/light mode with [`theme-manager.js`](components/theme-manager.js:1)

## 🎨 Design System

This site uses the **Carbon Design System** - IBM's open-source design system:

- **Typography**: IBM Plex Sans & IBM Plex Mono
- **Colors**: Carbon Design System color palette
- **Spacing**: Carbon's 4px visual rhythm scale
- **Components**: Consistent with IBM design patterns

## 📁 Project Structure

```
boblab/
├── README.md               # This file
├── .gitignore              # Git exclusions
├── react-app/              # 🌟 React application (recommended)
│   ├── src/                # React source code
│   ├── public/             # Static assets
│   ├── package.json        # Dependencies
│   ├── vite.config.ts      # Vite configuration
│   └── README.md           # React app documentation
├── docs/                   # 📚 Original HTML version (legacy)
│   ├── index.html          # Landing page
│   ├── narrative.html      # Customer conversation guide
│   ├── styles.css          # Carbon Design System styles
│   ├── script.js           # Progress tracking & interactivity
│   ├── i18n.js             # Internationalization support
│   ├── components/         # Reusable UI components
│   ├── labs/               # Interactive lab exercises
│   ├── css/                # Additional stylesheets
│   └── README.md           # HTML version documentation
├── translations/           # 🌐 Shared i18n translation files
├── samples/                # 📦 Shared sample code and resources
└── scripts/                # 🛠️ Utility scripts
```

### Key Directories

- **`/react-app/`** - Modern React application (primary version)
- **`/docs/`** - Legacy HTML version (preserved for reference)
- **`/translations/`** - Shared translation files for both versions
- **`/samples/`** - Shared sample code used in labs
- **`/scripts/`** - Utility scripts for maintenance

## 🛠️ Local Development

### React Application (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/[your-username]/boblab.git
cd boblab/react-app
```

2. Install dependencies and run:
```bash
bun install
bun run dev
```

3. Open http://localhost:5173 in your browser

For more details, see [react-app/README.md](react-app/README.md)

### HTML Version (Legacy)

1. Navigate to the docs folder:
```bash
cd docs
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

For more details, see [docs/README.md](docs/README.md)

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

### Add New Lab Pages

All lab pages use the standardized component structure. Create new labs by:

1. Copy an existing lab file from [`labs/`](labs/) directory
2. Update the content within the `<main>` section
3. Components (navbar, breadcrumb, progress, footer) load automatically
4. Add the new lab to [`components/navbar.html`](components/navbar.html:1) dropdown menu

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

## 🗂️ Project Maintenance

### Excluded Files
The following files are excluded from version control (see [`.gitignore`](.gitignore:1)):
- **Temporary files**: `*.tmp`, `*.temp`, `*.swp`, `*.swo`
- **Editor files**: `.vscode/`, `.idea/`, `*.sublime-*`
- **OS files**: `.DS_Store`, `Thumbs.db`, `desktop.ini`
- **Build artifacts**: `dist/`, `build/`, `*.log`
- **Dependencies**: `node_modules/`, `package-lock.json`

These exclusions keep the repository clean and focused on source files.

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
