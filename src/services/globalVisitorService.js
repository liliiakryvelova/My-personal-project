// Global visitor counter using CountAPI (free service)
const COUNTER_API_URL = 'https://api.countapi.xyz';
const COUNTER_KEY = 'liliia-portfolio-visitors';

export const globalVisitorService = {
  // Get current count and increment by 1
  async incrementVisitorCount() {
    try {
      const response = await fetch(`${COUNTER_API_URL}/hit/portfolio/${COUNTER_KEY}`);
      const data = await response.json();
      return data.value || 1;
    } catch (error) {
      console.warn('Failed to update global visitor count:', error);
      // Fallback to localStorage
      let localCount = localStorage.getItem('portfolioVisitorCount') || '0';
      localCount = parseInt(localCount) + 1;
      localStorage.setItem('portfolioVisitorCount', localCount.toString());
      return localCount;
    }
  },

  // Get current count without incrementing
  async getVisitorCount() {
    try {
      const response = await fetch(`${COUNTER_API_URL}/get/portfolio/${COUNTER_KEY}`);
      const data = await response.json();
      return data.value || 0;
    } catch (error) {
      console.warn('Failed to get global visitor count:', error);
      return parseInt(localStorage.getItem('portfolioVisitorCount') || '0');
    }
  },

  // Get visitor stats (this would still be local)
  async getVisitorStats() {
    try {
      // Get IP info for current visitor
      const ipResponse = await fetch('https://ipapi.co/json/');
      const ipData = await ipResponse.json();
      
      return {
        ip: ipData.ip || 'Unknown',
        country: ipData.country_name || 'Unknown',
        city: ipData.city || 'Unknown',
        region: ipData.region || 'Unknown',
        timezone: ipData.timezone || 'Unknown',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.warn('Failed to get visitor location:', error);
      return {
        ip: 'Unknown',
        country: 'Unknown',
        city: 'Unknown',
        region: 'Unknown',
        timezone: 'Unknown',
        timestamp: new Date().toISOString()
      };
    }
  }
};
