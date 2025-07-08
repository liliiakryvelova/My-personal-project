import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './About.css';

export default function About() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const animationIdRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    // Capture the current mount ref for cleanup
    const currentMount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const containerWidth = currentMount.clientWidth;
    const containerHeight = currentMount.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(containerWidth, containerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    currentMount.appendChild(renderer.domElement);
    sceneRef.current = scene;

    // Create floating geometric shapes
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.7, 32, 32),
      new THREE.ConeGeometry(0.7, 1.4, 32),
      new THREE.OctahedronGeometry(0.8),
      new THREE.TetrahedronGeometry(0.9)
    ];

    const materials = [
      new THREE.MeshLambertMaterial({ color: 0x667eea, transparent: true, opacity: 0.7 }),
      new THREE.MeshLambertMaterial({ color: 0x764ba2, transparent: true, opacity: 0.7 }),
      new THREE.MeshLambertMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.7 }),
      new THREE.MeshLambertMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.7 }),
      new THREE.MeshLambertMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.7 })
    ];

    const meshes = [];
    
    // Create multiple floating objects
    for (let i = 0; i < 15; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geometry, material);
      
      // Random positions
      mesh.position.x = (Math.random() - 0.5) * 20;
      mesh.position.y = (Math.random() - 0.5) * 20;
      mesh.position.z = (Math.random() - 0.5) * 20;
      
      // Random rotations
      mesh.rotation.x = Math.random() * 2 * Math.PI;
      mesh.rotation.y = Math.random() * 2 * Math.PI;
      
      // Add custom properties for animation
      mesh.userData = {
        originalPosition: mesh.position.clone(),
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        },
        floatSpeed: Math.random() * 0.01 + 0.005,
        floatAmount: Math.random() * 2 + 1
      };
      
      scene.add(mesh);
      meshes.push(mesh);
    }

    // Create particle system
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x667eea,
      size: 2,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Camera position
    camera.position.z = 15;

    // Scene is ready, hide loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Small delay to ensure smooth transition

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      
      // Animate meshes
      meshes.forEach((mesh) => {
        // Rotation
        mesh.rotation.x += mesh.userData.rotationSpeed.x;
        mesh.rotation.y += mesh.userData.rotationSpeed.y;
        mesh.rotation.z += mesh.userData.rotationSpeed.z;
        
        // Floating motion
        mesh.position.y = mesh.userData.originalPosition.y + 
          Math.sin(time * mesh.userData.floatSpeed) * mesh.userData.floatAmount;
        mesh.position.x = mesh.userData.originalPosition.x + 
          Math.cos(time * mesh.userData.floatSpeed * 0.7) * 0.5;
      });
      
      // Animate particles
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i]) * 0.01;
      }
      particles.geometry.attributes.position.needsUpdate = true;
      
      // Slowly rotate camera
      camera.position.x = Math.sin(time * 0.1) * 2;
      camera.lookAt(0, 0, 0);
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Mouse interaction
    const handleMouseMove = (event) => {
      if (!currentMount) return;
      const rect = currentMount.getBoundingClientRect();
      const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      meshes.forEach((mesh, index) => {
        const factor = (index + 1) * 0.1;
        mesh.rotation.y += mouseX * 0.001 * factor;
        mesh.rotation.x += mouseY * 0.001 * factor;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      
      // Dispose of geometries and materials
      meshes.forEach(mesh => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="about-container">
      {/* Loading State */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-spinner">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
            </div>
            <h2 className="loading-text">Loading Experience...</h2>
            <p className="loading-subtitle">Preparing 3D environment</p>
          </div>
        </div>
      )}
      
      {/* Three.js Canvas */}
      <div ref={mountRef} className="three-canvas" />
      
      {/* Content */}
      <div className={`about-content ${isLoading ? 'hidden' : 'visible'}`}>
        <div className="about-hero">
          <h1 className="about-title">About Me</h1>
          <p className="about-subtitle">Passionate Developer & Creative Technologist</p>
        </div>
        
        <div className="about-grid">
          <div className="about-card">
            <h3>🚀 Background</h3>
            <p>
              I'm a passionate developer based in Seattle, WA, with expertise in modern web technologies 
              and a love for creating immersive digital experiences. I specialize in React, Three.js, 
              and cutting-edge UI/UX design.
            </p>
          </div>
          
          <div className="about-card">
            <h3>💡 Skills</h3>
            <div className="skills-list">
              <span className="skill-tag">React</span>
              <span className="skill-tag">Three.js</span>
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">CSS3</span>
              <span className="skill-tag">WebGL</span>
              <span className="skill-tag">Node.js</span>
            </div>
          </div>
          
          <div className="about-card">
            <h3>🎯 Philosophy</h3>
            <p>
              I believe in creating beautiful, functional, and accessible web experiences that push 
              the boundaries of what's possible in the browser. Every project is an opportunity 
              to learn something new and create something amazing.
            </p>
          </div>
          
          <div className="about-card">
            <h3>🌟 Interests</h3>
            <p>
              When I'm not coding, you'll find me exploring the latest in 3D graphics, experimenting 
              with new design trends, or enjoying the beautiful Pacific Northwest outdoors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
