# Bob Lab - Original HTML Version

This directory contains the **original HTML version** of the Bob Lab application. This version has been preserved for reference and backward compatibility.

## 📍 Current Status

The HTML version is now considered **legacy**. The primary, actively maintained version is the **React application** located in `/react-app/`.

## 🚀 Viewing the HTML Version

To view this HTML version:

1. **Local Development:**
   - Simply open `index.html` in your web browser
   - Or use a local web server:
     ```bash
     # From the docs/ directory
     python3 -m http.server 8000
     # Then visit http://localhost:8000
     ```

2. **Features:**
   - Interactive labs and tutorials
   - Multi-language support (i18n)
   - Theme switching (light/dark mode)
   - Progress tracking
   - Responsive design

## 📂 Directory Structure

```
docs/
├── index.html              # Main landing page
├── narrative.html          # Narrative/story page
├── styles.css              # Main stylesheet
├── narrative.css           # Narrative page styles
├── narrative.css.backup    # Backup of narrative styles
├── script.js               # Main JavaScript logic
├── i18n.js                 # Internationalization support
├── image.png               # Application logo/image
├── components/             # Reusable HTML components
│   ├── navbar.html
│   ├── footer.html
│   ├── breadcrumb.html
│   └── ...
├── labs/                   # Lab content pages
│   ├── getting-started.html
│   ├── ibmi.html
│   ├── cobol2java.html
│   └── ...
└── css/                    # Additional stylesheets
```

## 🔗 React Version

The **recommended version** is the React application:

- **Location:** `/react-app/`
- **Documentation:** [react-app/README.md](../react-app/README.md)
- **Features:**
  - Modern React + TypeScript architecture
  - Carbon Design System components
  - Enhanced performance and maintainability
  - Better developer experience
  - Comprehensive testing

## 🔄 Shared Resources

Both versions share the following resources from the project root:

- **`/translations/`** - Translation files for internationalization
- **`/samples/`** - Sample code and files used in labs

## 📝 Notes

- This HTML version is **read-only** and not actively maintained
- New features and improvements are added to the React version
- Bug fixes may be backported on a case-by-case basis
- Consider migrating to the React version for the best experience

## 🆘 Support

For questions or issues:
- Check the main [README.md](../README.md)
- Review the React app documentation in [react-app/README.md](../react-app/README.md)
- Refer to the original HTML implementation for reference

---

**Last Updated:** March 2026  
**Status:** Legacy / Reference Only