// Visitor tracking service with global counter and geolocation capabilities

class VisitorService {
  constructor() {
    this.globalCounterAPI = 'https://api.countapi.xyz';
    this.counterKey = 'liliia-portfolio-visitors';
    this.ipApiEndpoint = 'https://ipapi.co/json/';
  }

  // Get visitor's IP and location information
  async getVisitorInfo() {
    try {
      // Try to get location data from IP
      const response = await fetch(this.ipApiEndpoint);
      const data = await response.json();
      
      if (data.ip) {
        return {
          ip: data.ip,
          country: data.country_name || 'Unknown',
          countryCode: data.country_code || 'Unknown',
          region: data.region || 'Unknown',
          city: data.city || 'Unknown',
          timezone: data.timezone || 'Unknown',
          isp: data.org || 'Unknown',
          latitude: data.latitude,
          longitude: data.longitude,
          timestamp: new Date().toISOString()
        };
      }
    } catch (error) {
      console.warn('Could not fetch location data:', error);
    }
    
    // Fallback to basic info
    return {
      ip: 'Unknown',
      country: 'Unknown',
      city: 'Unknown',
      timestamp: new Date().toISOString()
    };
  }

  // Get global visitor count (shared between all users)
  async getGlobalVisitorCount() {
    try {
      const response = await fetch(`${this.globalCounterAPI}/get/portfolio/${this.counterKey}`);
      const data = await response.json();
      return data.value || 0;
    } catch (error) {
      console.warn('Failed to get global visitor count:', error);
      // Fallback to localStorage
      return parseInt(localStorage.getItem('portfolioVisitorCount') || '0');
    }
  }

  // Increment global visitor count (shared between all users)
  async incrementGlobalVisitorCount() {
    try {
      const response = await fetch(`${this.globalCounterAPI}/hit/portfolio/${this.counterKey}`);
      const data = await response.json();
      
      // Also update localStorage for consistency
      if (data.value) {
        localStorage.setItem('portfolioVisitorCount', data.value.toString());
      }
      
      return data.value || 1;
    } catch (error) {
      console.warn('Failed to increment global visitor count:', error);
      // Fallback to localStorage increment
      let localCount = localStorage.getItem('portfolioVisitorCount') || '0';
      localCount = parseInt(localCount) + 1;
      localStorage.setItem('portfolioVisitorCount', localCount.toString());
      return localCount;
    }
  }

  // Get or create visitor session
  async getVisitorSession() {
    const sessionKey = 'portfolioVisitorSession';
    
    // Check if this is a new session
    let currentSession = sessionStorage.getItem(sessionKey);
    
    if (!currentSession) {
      // New session - get visitor info and increment global counter
      const visitorInfo = await this.getVisitorInfo();
      
      // Increment the global counter for new visitors
      const globalCount = await this.incrementGlobalVisitorCount();
      
      // Create session ID
      const sessionId = this.generateSessionId();
      
      currentSession = {
        sessionId,
        startTime: new Date().toISOString(),
        isNewVisitor: true,
        globalCount,
        ...visitorInfo
      };
      
      // Store session
      sessionStorage.setItem(sessionKey, JSON.stringify(currentSession));
      
      // Add to local visitors list for stats
      this.addVisitorToLocalStorage(currentSession);
    } else {
      currentSession = JSON.parse(currentSession);
      
      // For returning visitors in same session, get current global count
      if (!currentSession.isNewVisitor) {
        const globalCount = await this.getGlobalVisitorCount();
        currentSession.globalCount = globalCount;
      }
    }
    
    return currentSession;
  }

  // Add visitor to local storage for local statistics
  addVisitorToLocalStorage(visitorData) {
    const visitorsKey = 'portfolioVisitors';
    let visitors = JSON.parse(localStorage.getItem(visitorsKey) || '[]');
    
    // Add new visitor
    visitors.push(visitorData);
    
    // Keep only last 100 visitors to prevent storage bloat
    if (visitors.length > 100) {
      visitors = visitors.slice(-100);
    }
    
    localStorage.setItem(visitorsKey, JSON.stringify(visitors));
  }

  // Get visitor statistics (local data for privacy)
  getVisitorStats(globalCount) {
    const visitorsKey = 'portfolioVisitors';
    const visitors = JSON.parse(localStorage.getItem(visitorsKey) || '[]');
    
    const stats = {
      totalVisitors: globalCount || 0, // Use global count
      localVisitors: visitors.length, // Local visitors seen by this browser
      uniqueCountries: new Set(visitors.map(v => v.country)).size,
      uniqueCities: new Set(visitors.map(v => v.city)).size,
      recentVisitors: visitors.slice(-5), // Last 5 visitors from this browser
      topCountries: this.getTopCountries(visitors),
      topCities: this.getTopCities(visitors)
    };
    
    return stats;
  }

  // Get top countries by visitor count
  getTopCountries(visitors) {
    const countryCount = {};
    visitors.forEach(visitor => {
      const country = visitor.country || 'Unknown';
      countryCount[country] = (countryCount[country] || 0) + 1;
    });
    
    return Object.entries(countryCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([country, count]) => ({ country, count }));
  }

  // Get top cities by visitor count
  getTopCities(visitors) {
    const cityCount = {};
    visitors.forEach(visitor => {
      const city = visitor.city || 'Unknown';
      const country = visitor.country || 'Unknown';
      const location = `${city}, ${country}`;
      cityCount[location] = (cityCount[location] || 0) + 1;
    });
    
    return Object.entries(cityCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([location, count]) => ({ location, count }));
  }

  // Generate unique session ID
  generateSessionId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Clear all visitor data (for testing)
  clearVisitorData() {
    localStorage.removeItem('portfolioVisitors');
    localStorage.removeItem('portfolioVisitorCount');
    sessionStorage.removeItem('portfolioVisitorSession');
  }
}

const visitorService = new VisitorService();
export default visitorService;
