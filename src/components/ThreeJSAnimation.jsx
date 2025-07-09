import React, { useEffect, useRef, useState, memo } from 'react';

// Optimized Three.js component with performance improvements
const ThreeJSAnimation = memo(() => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    let observer;

    // Intersection Observer for lazy loading
    const handleIntersection = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isInView) {
        setIsInView(true);
        observer?.disconnect();
      }
    };

    if (mountRef.current) {
      observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.1,
        rootMargin: '100px'
      });
      observer.observe(mountRef.current);
    }

    return () => {
      observer?.disconnect();
    };
  }, [isInView]);

  useEffect(() => {
    if (!isInView || !mountRef.current) return;

    let isMounted = true;

    // Dynamically import Three.js only when needed and in view
    const loadThreeJS = async () => {
      try {
        const THREE = await import('three');
        
        if (!isMounted || !mountRef.current) return;

        const currentMount = mountRef.current;

        // Scene setup with performance optimizations
        const scene = new THREE.Scene();
        const containerWidth = currentMount.clientWidth;
        const containerHeight = currentMount.clientHeight;
        const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
        
        // Optimized renderer settings
        const renderer = new THREE.WebGLRenderer({ 
          alpha: true, 
          antialias: window.devicePixelRatio <= 1, // Only use antialias on non-retina displays
          powerPreference: "high-performance",
          precision: "mediump", // Use medium precision for better performance
          stencil: false,
          depth: true
        });
        
        // Set pixel ratio but cap it at 2 for performance
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(containerWidth, containerHeight);
        renderer.setClearColor(0x000000, 0);
        currentMount.appendChild(renderer.domElement);
        sceneRef.current = scene;
        rendererRef.current = renderer;

        // Create simplified geometric shapes for better performance
        const geometries = [
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.SphereGeometry(0.7, 8, 8), // Reduced segments significantly
          new THREE.ConeGeometry(0.6, 1.2, 8), // Reduced segments significantly
          new THREE.TorusGeometry(0.6, 0.2, 6, 8) // Reduced segments significantly
        ];

        // Use MeshBasicMaterial instead of MeshLambertMaterial for better performance
        const materials = [
          new THREE.MeshBasicMaterial({ color: 0x667eea, wireframe: true, transparent: true, opacity: 0.8 }),
          new THREE.MeshBasicMaterial({ color: 0x764ba2, wireframe: true, transparent: true, opacity: 0.8 }),
          new THREE.MeshBasicMaterial({ color: 0xf093fb, wireframe: true, transparent: true, opacity: 0.8 }),
          new THREE.MeshBasicMaterial({ color: 0xf5576c, wireframe: true, transparent: true, opacity: 0.8 })
        ];

        const shapes = [];
        // Reduced number of shapes for better performance
        for (let i = 0; i < 6; i++) {
          const geometry = geometries[i % geometries.length];
          const material = materials[i % materials.length];
          const shape = new THREE.Mesh(geometry, material);
          
          shape.position.x = (Math.random() - 0.5) * 8;
          shape.position.y = (Math.random() - 0.5) * 8;
          shape.position.z = (Math.random() - 0.5) * 8;
          
          shape.rotation.x = Math.random() * Math.PI;
          shape.rotation.y = Math.random() * Math.PI;
          
          scene.add(shape);
          shapes.push(shape);
        }

        camera.position.z = 8;

        // Throttled animation loop for better performance
        let lastTime = 0;
        const targetFPS = 24; // Reduced FPS for mobile performance
        const frameInterval = 1000 / targetFPS;
        let frameId;

        const animate = (currentTime) => {
          if (!isMounted) return;

          frameId = requestAnimationFrame(animate);

          // Throttle animation to target FPS
          if (currentTime - lastTime < frameInterval) return;
          lastTime = currentTime;

          // Simplified animation with reduced calculations
          shapes.forEach((shape) => {
            shape.rotation.x += 0.003;
            shape.rotation.y += 0.003;
            
            // Reduce floating motion calculations
            shape.position.y += Math.sin(currentTime * 0.0005) * 0.001;
          });

          renderer.render(scene, camera);
        };

        // Start animation with delay to allow layout completion
        setTimeout(() => {
          animate(performance.now());
          setIsLoading(false);
        }, 100);

        // Optimized resize handler with debouncing
        let resizeTimeout;
        const handleResize = () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            if (!currentMount || !isMounted) return;
            
            const width = currentMount.clientWidth;
            const height = currentMount.clientHeight;
            
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
          }, 100);
        };

        window.addEventListener('resize', handleResize, { passive: true });

        // Cleanup function
        return () => {
          clearTimeout(resizeTimeout);
          window.removeEventListener('resize', handleResize);
          if (frameId) {
            cancelAnimationFrame(frameId);
          }
          if (currentMount && renderer.domElement) {
            currentMount.removeChild(renderer.domElement);
          }
          
          // Dispose of Three.js resources
          shapes.forEach(shape => {
            scene.remove(shape);
            if (shape.geometry) shape.geometry.dispose();
            if (shape.material) shape.material.dispose();
          });
          
          // Dispose geometries and materials
          geometries.forEach(geometry => geometry.dispose());
          materials.forEach(material => material.dispose());
          renderer.dispose();
        };

      } catch (error) {
        console.error('Failed to load Three.js:', error);
        setIsLoading(false);
      }
    };

    const cleanup = loadThreeJS();

    return () => {
      isMounted = false;
      if (cleanup && typeof cleanup.then === 'function') {
        cleanup.then(cleanupFn => cleanupFn && cleanupFn());
      }
    };
  }, [isInView]);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        position: 'relative'
      }}
    >
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#667eea'
        }}>
          Loading 3D Animation...
        </div>
      )}
    </div>
  );
});

ThreeJSAnimation.displayName = 'ThreeJSAnimation';

export default ThreeJSAnimation;
