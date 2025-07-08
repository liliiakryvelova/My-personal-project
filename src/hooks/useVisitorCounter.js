import { useState, useEffect } from 'react';
import visitorService from '../services/visitorService';

export const useVisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [currentVisitor, setCurrentVisitor] = useState(null);
  const [visitorStats, setVisitorStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initializeVisitor = async () => {
      try {
        // Get current visitor session (includes location data and global count)
        const session = await visitorService.getVisitorSession();
        
        // Get visitor statistics using the global count
        const stats = visitorService.getVisitorStats(session.globalCount);
        
        if (isMounted) {
          setCurrentVisitor(session);
          setVisitorCount(session.globalCount || stats.totalVisitors);
          setVisitorStats(stats);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error initializing visitor tracking:', error);
        // Fallback to simple counter
        if (isMounted) {
          try {
            // Try to get global count even if session failed
            const globalCount = await visitorService.getGlobalVisitorCount();
            setVisitorCount(globalCount);
          } catch (fallbackError) {
            // Ultimate fallback to localStorage
            const count = localStorage.getItem('portfolioVisitorCount') || '1';
            setVisitorCount(parseInt(count));
          }
          setLoading(false);
        }
      }
    };

    initializeVisitor();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    visitorCount,
    currentVisitor,
    visitorStats,
    loading
  };
};

export default useVisitorCounter;
