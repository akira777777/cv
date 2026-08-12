// canvas-animations.js - Three.js particle system with frame throttling
(function() {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================

  /**
   * Animation configuration constants.
   */
  const CONFIG = {
    // Scene setup
    backgroundColor: 0x1a1a2e,        // Dark blue background
    cameraPosition: { x: 0, y: 50, z: 100 },
    
    // Particle system settings
    particleCount: 3000,              // Total particles to render
    baseSize: 0.5,                    // Base particle size
    color: 0xffffff,                  // White color for particles
    
    // Animation behavior
    rotationSpeedX: 0.001,            // Slow rotation on X axis
    rotationSpeedY: 0.002,            // Faster rotation on Y axis
    pulseEnabled: true,               // Enable size pulsing effect
    pulseSpeed: 0.5,                  // Pulse animation speed
    
    // Frame throttling (performance optimization)
    minFps: 15,                       // Minimum target FPS
    maxFrameTime: 66.67,              // ~15fps in milliseconds
    skipFrames: 2,                    // Skip frames when needed
    
    // Responsive settings
    resizeThreshold: 0.8,             // Resize only if viewport changed > 80%
    minParticles: 1000,               // Minimum particles for mobile
    maxParticles: 4000                // Maximum particles for large screens
  };

  // ============================================
  // THREE.JS SETUP (if loaded)
  // ============================================

  let scene = null;
  let camera = null;
  let renderer = null;
  let particleSystem = null;
  let animationId = null;
  let lastFrameTime = 0;
  let frameSkippedCount = 0;
  let activeContainer = null;
  
  // State flags
  let isInitialized = false;
  let shouldThrottle = false;

  /**
   * Initialize the Three.js scene.
   */
  function initThreeJS(container) {
    if (!container || !document.body || typeof THREE === 'undefined') return;

    activeContainer = container;

    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(CONFIG.backgroundColor);
    
    // Create camera (orthographic for particle system)
    const aspect = (container.clientWidth || window.innerWidth) / (container.clientHeight || window.innerHeight);
    const frustumSize = 300;
    
    camera = new THREE.OrthographicCamera(
      -frustumSize * aspect, 
      frustumSize * aspect, 
      frustumSize, 
      -frustumSize, 
      1, 
      1000
    );
    
    // Set camera position for 3D effect
    camera.position.set(CONFIG.cameraPosition.x, CONFIG.cameraPosition.y, CONFIG.cameraPosition.z);
    camera.lookAt(0, 0, 0);

    // Create renderer (use WebGLRenderer with performance optimizations)
    renderer = new THREE.WebGLRenderer({ 
      alpha: true,           // Allow transparent background
      antialias: false       // Disable for better performance on particles
    });
    
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2x
    
    container.appendChild(renderer.domElement);

    isInitialized = true;
  }

  /**
   * Create and configure the particle system.
   */
  function createParticleSystem() {
    if (!scene || !camera || typeof THREE === 'undefined') return;

    const count = getOptimalParticleCount();
    const colorObj = new THREE.Color(CONFIG.color);
    
    // Generate random positions in a sphere-like distribution (flat 1D arrays)
    const positions = [];
    const colors = [];
    
    for (let i = 0; i < count; i++) {
      // Spherical coordinates to Cartesian conversion
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 50 + Math.random() * 80; // Spread between 50-130
      
      positions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );

      // Add slight color variation for depth perception
      const brightness = 0.5 + Math.random() * 0.5;
      const c = colorObj.clone().multiplyScalar(brightness);
      colors.push(c.r, c.g, c.b);
    }

    // Create geometry with optimized buffer attributes
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    // Create material for particles
    const material = new THREE.PointsMaterial({
      size: CONFIG.baseSize,
      vertexColors: true,
      transparent: false,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });

    // Create particle system
    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
  }

  /**
   * Get optimal particle count based on viewport.
   */
  function getOptimalParticleCount() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Calculate area-based scaling
    const area = width * height;
    const minArea = 1920 * 1080;      // Full HD as reference
    
    let scale = area / minArea;
    
    if (scale < 0.5) {
      return Math.max(CONFIG.minParticles, Math.floor(500 + scale * 500));
    } else if (scale > 2) {
      return Math.min(CONFIG.particleCount, Math.floor(3000 + scale * 1000));
    }
    
    return CONFIG.particleCount;
  }

  /**
   * Animation frame loop with throttling.
   */
  function animate(currentTime) {
    if (!isInitialized || !particleSystem) return;

    const now = typeof currentTime === 'number' ? currentTime : performance.now();
    const deltaTime = now - lastFrameTime;
    
    if (shouldThrottle && frameSkippedCount >= CONFIG.skipFrames) {
      shouldThrottle = false;
      frameSkippedCount = 0;
      render();
    } else if (!shouldThrottle) {
      lastFrameTime = now;
      updateParticles(deltaTime, now);
      render();
    }

    animationId = requestAnimationFrame(animate);
  }

  /**
   * Update particle system state (rotation, pulsing).
   */
  function updateParticles(deltaTime, currentTime) {
    if (!particleSystem) return;

    const time = typeof currentTime === 'number' ? currentTime : Date.now();
    
    const rotX = (time / CONFIG.maxFrameTime) * CONFIG.rotationSpeedX;
    const rotY = (time / CONFIG.maxFrameTime) * CONFIG.rotationSpeedY;
    
    particleSystem.rotation.x = rotX % (Math.PI * 2);
    particleSystem.rotation.y = rotY % (Math.PI * 2);

    if (CONFIG.pulseEnabled) {
      const pulse = 1 + Math.sin(time / CONFIG.maxFrameTime * CONFIG.pulseSpeed) * 0.1;
      particleSystem.scale.set(pulse, pulse, pulse);
    } else {
      particleSystem.scale.set(1, 1, 1);
    }
  }

  /**
   * Single render call.
   */
  function render() {
    if (!renderer || !scene || !camera) return;
    renderer.render(scene, camera);
  }

  /**
   * Handle window resize with threshold check.
   */
  let lastViewportSize = 0;
  
  function handleResize() {
    if (!activeContainer || !camera || !renderer) return;

    const newWidth = activeContainer.clientWidth || window.innerWidth;
    const newHeight = activeContainer.clientHeight || window.innerHeight;
    
    const oldSize = Math.sqrt(lastViewportSize || (newWidth * newHeight));
    const newSize = Math.sqrt(newWidth * newHeight);
    const changeRatio = Math.abs(1 - (newSize / oldSize));

    lastViewportSize = newWidth * newHeight;

    if (changeRatio > 0.1 || !lastViewportSize) {
      const aspect = newWidth / newHeight;
      const frustumSize = 300;
      camera.left = -frustumSize * aspect;
      camera.right = frustumSize * aspect;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const newCount = getOptimalParticleCount();
      if (newCount !== CONFIG.particleCount) {
        updateParticleCount(newCount);
      }
    }
  }

  /**
   * Smoothly transition between particle counts.
   */
  function updateParticleCount(targetCount) {
    if (!particleSystem || typeof THREE === 'undefined') return;

    const positions = [];
    const colors = [];
    const colorObj = new THREE.Color(CONFIG.color);
    
    for (let i = 0; i < targetCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 50 + Math.random() * 80;
      
      positions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );

      const brightness = 0.5 + Math.random() * 0.5;
      const c = colorObj.clone().multiplyScalar(brightness);
      colors.push(c.r, c.g, c.b);
    }

    particleSystem.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    particleSystem.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    CONFIG.particleCount = targetCount;
  }

  /**
   * Start the animation loop.
   */
  function startAnimation() {
    if (animationId) cancelAnimationFrame(animationId);
    
    lastFrameTime = performance.now();
    animationId = requestAnimationFrame(animate);
  }

  // ============================================
  // PUBLIC API
  // ============================================

  const ParticleController = {
    
    init(containerSelector) {
      if (typeof THREE === 'undefined') {
        console.warn('ParticleController: THREE is not defined');
        return null;
      }

      const containerElement = typeof containerSelector === 'string' 
        ? document.querySelector(containerSelector) 
        : containerSelector;

      if (!containerElement) {
        console.warn('ParticleController: Container not found for selector:', containerSelector);
        return null;
      }

      initThreeJS(containerElement);
      createParticleSystem();
      window.addEventListener('resize', handleResize, { passive: true });
      startAnimation();
      
      console.log('ParticleController: Animation started');
      return this;
    },

    getState() {
      return {
        isInitialized,
        particleCount: CONFIG.particleCount,
        containerWidth: window.innerWidth,
        containerHeight: window.innerHeight
      };
    },

    setThrottled(enabled) {
      shouldThrottle = enabled;
      if (enabled && !isInitialized) {
        lastFrameTime = 0;
        frameSkippedCount = 0;
      }
    },

    setParticleCount(count) {
      const clamped = Math.max(CONFIG.minParticles, Math.min(count || CONFIG.particleCount, CONFIG.maxParticles));
      if (clamped !== CONFIG.particleCount) {
        updateParticleCount(clamped);
      }
    },

    pause() {
      if (animationId) cancelAnimationFrame(animationId);
      isInitialized = false;
    },

    resume() {
      startAnimation();
      isInitialized = true;
    },

    destroy() {
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer) {
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        renderer.dispose();
        window.removeEventListener('resize', handleResize, { passive: true });
      }

      isInitialized = false;
      animationId = null;
      activeContainer = null;
      console.log('ParticleController: Destroyed');
    }
  };

  // ============================================
  // MODULE EXPORTS (UMD pattern for compatibility)
  // ============================================

  if (typeof window !== 'undefined') {
    window.ParticleController = ParticleController;
    
    const checkContainer = () => {
      if (!isInitialized && typeof THREE !== 'undefined' && document.body) {
        const target = document.querySelector('#main-canvas') || document.querySelector('#particle-canvas');
        if (target) {
          console.log('canvas-animations.js: Auto-initializing...');
          ParticleController.init(target);
        }
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkContainer);
    } else {
      setTimeout(checkContainer, 100);
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      CONFIG,
      initThreeJS,
      createParticleSystem,
      animate,
      updateParticles,
      render,
      handleResize,
      ParticleController
    };
  }

})();