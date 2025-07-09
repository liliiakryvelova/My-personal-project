# Liliia Kryvelova - Personal Portfolio

A modern React portfolio website featuring glassmorphism design, responsive navigation, and interactive components.

## ✨ Features

- **Modern Glassmorphism UI** - Translucent elements with backdrop blur effects
- **Responsive Navigation** - Mobile-friendly hamburger menu with smooth animations
- **Dark/Light Theme Toggle** - Dynamic theme switching with smooth transitions
- **Interactive Components** - Hover effects and smooth animations throughout
- **Mobile Optimized** - Fully responsive design for all device sizes
- **Modern Footer** - Social links and scroll-to-top functionality
- **Global Visitor Counter** - Real-time visitor tracking shared across all users
- **Visitor Analytics** - Location-based visitor statistics with privacy protection
- **Three.js Integration** - Interactive 3D animations on the About page

## 🚀 Technologies Used

- **React 19** - Latest React with modern hooks and features
- **Material-UI Icons** - Professional iconography
- **Three.js** - 3D graphics and animations
- **CSS3** - Advanced styling with animations and glassmorphism
- **React Router** - Client-side routing for navigation
- **CountAPI** - Global visitor counter service
- **IP Geolocation API** - Location-based visitor analytics

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Modern navigation with theme toggle
│   ├── Footer.js           # Enhanced footer with social links and visitor counter
│   ├── VisitorStats.jsx    # Visitor analytics modal component
│   └── pages/
│       ├── SplashPage.jsx  # Landing page with hero section
│       ├── Home.jsx        # Home page content
│       ├── About.jsx       # About page with Three.js animation
│       ├── Services.jsx    # Services page
│       └── Contact.jsx     # Contact page
├── hooks/
│   └── useVisitorCounter.js # Custom hook for visitor tracking
├── services/
│   ├── visitorService.js   # Global visitor counter and analytics
│   ├── globalVisitorService.js # CountAPI integration
│   └── firebaseVisitorService.js # Firebase setup (optional)
└── App.js                  # Main app component with routing
```

## 🛠️ Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/liliiakryvelova/My-personal-project.git

# Navigate to project directory
cd My-personal-project

# Install dependencies
npm install

# Start development server
npm start
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.\
Creates an optimized production build.

### `npm run build-docs`

Builds the app and copies files to the `docs` folder for GitHub Pages deployment.

### `npm test`

Launches the test runner in interactive watch mode.

## 🚀 Deployment

This project is configured for multiple deployment options:

### GitHub Pages (Current)
The project is deployed using GitHub Pages with the `docs/` folder:
- **Live URL**: [https://liliiakryvelova.github.io/My-personal-project/](https://liliiakryvelova.github.io/My-personal-project/)
- **Auto-deployment**: Push to main branch updates the live site
- **Build command**: `npm run build` then copy to `docs/`

### Local Development
```bash
npm start
# Runs on http://localhost:3000
```

### Production Build
```bash
npm run build
# Creates optimized build in build/ folder
```

## ⚡ Performance Testing

Monitor your site's performance using these tools:

### Google PageSpeed Insights
```bash
# Test your live site
https://pagespeed.web.dev/analysis?url=https://liliiakryvelova.github.io/My-personal-project/
```

### Lighthouse (Built into Chrome)
1. Open site in Chrome
2. Press F12 → Lighthouse tab
3. Click "Analyze page load"
4. Get detailed performance metrics

### Local Performance Analysis
```bash
# Bundle analyzer
npm install --save-dev webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

### Performance Metrics to Monitor
- **First Contentful Paint (FCP)** - < 1.8s
- **Largest Contentful Paint (LCP)** - < 2.5s  
- **Cumulative Layout Shift (CLS)** - < 0.1
- **First Input Delay (FID)** - < 100ms

## 🎨 Design Features

- **Glassmorphism Effects** - Modern translucent design with backdrop filters
- **Smooth Animations** - CSS transitions and keyframe animations
- **Responsive Design** - Mobile-first approach with breakpoints
- **Theme Switching** - Dark and light mode with persistent preferences
- **Modern Typography** - Carefully selected fonts and sizing

## 📊 Visitor Analytics

The portfolio includes a sophisticated visitor tracking system:

### Global Counter
- **Shared Counter** - All visitors see the same real-time count using CountAPI
- **Real-time Updates** - Counter increments with each new visitor session
- **Privacy-Conscious** - No personal data collection, only aggregate statistics

### Location Analytics
- **IP Geolocation** - Approximate visitor location (city, country) using IP address
- **Interactive Stats** - Click the visitor counter to view detailed analytics
- **Local Storage** - Browser-specific statistics for enhanced insights

### Features
- **🌍 Global Reach** - Track visitors from around the world
- **📱 Responsive Modal** - Beautiful analytics display on all devices
- **🔒 Privacy First** - No tracking cookies or personal data storage
- **⚡ Fast & Reliable** - Uses free tier APIs with fallback mechanisms

## 📍 Location

Currently based in **Seattle, WA** 🌲

## 🌟 Key Highlights

### Modern Architecture
- **Component-based** - Modular React components for maintainability
- **Custom Hooks** - Reusable logic for visitor tracking and theme management
- **Service Layer** - Clean separation of concerns for API integration

### Performance Optimized
- **Code Splitting** - Optimized bundle sizes for faster loading
- **Responsive Images** - Adaptive image loading for different screen sizes
- **Efficient Animations** - Hardware-accelerated CSS transitions

### User Experience
- **Accessibility** - ARIA labels and semantic HTML for screen readers
- **Progressive Enhancement** - Graceful fallbacks for older browsers
- **Mobile First** - Designed primarily for mobile devices

## 🤝 Contributing

This is a personal portfolio project, but feel free to:
- **Fork** the repository for your own portfolio
- **Report issues** or suggest improvements
- **Submit pull requests** for bug fixes
- **Use as inspiration** for your own projects

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit with descriptive messages
5. Push to your fork and submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Live Demo**: [https://liliiakryvelova.github.io/My-personal-project/](https://liliiakryvelova.github.io/My-personal-project/)
- **Repository**: [https://github.com/liliiakryvelova/My-personal-project](https://github.com/liliiakryvelova/My-personal-project)
- **Issues**: [Report bugs or request features](https://github.com/liliiakryvelova/My-personal-project/issues)

## 🙏 Acknowledgments

- **CountAPI** - Free global counter service
- **IP Geolocation API** - Location services
- **Material-UI** - Beautiful React components and icons
- **Three.js** - 3D graphics library
- **React Community** - Amazing ecosystem and documentation

---

*Built with ❤️ using React and modern web technologies*
