import React, { useRef, useEffect, useState } from 'react';

const NodeBackground = ({ 
    nodeCount = 156, 
    connectionDistance = 250, 
    nodeSpeed = 0.7, 
    backgroundColor = 'rgba(251, 243, 216, 0.9)',
    backgroundColorDark = 'rgba(42, 56, 111, 0.9)'
 }) => {
  const canvasRef = useRef(null);
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'));
  
  useEffect(() => {
    // Set up observer for dark mode changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas dimensions to match window
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Create nodes
    const nodes = [];
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width + 50,
        y: Math.random() * canvas.height + 50,
        radius: Math.random() * 5 + 2,
        vx: (Math.random() - 0.5) * nodeSpeed,
        vy: (Math.random() - 0.5) * nodeSpeed,
        // Generate random pastel colors
        color: `hsla(${Math.random() * 360}, 70%, 80%, ${Math.random() * 0.5 + 0.25})`
      });
    }
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add background color based on dark mode
      ctx.fillStyle = darkMode ? backgroundColorDark : backgroundColor; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections between nodes
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            // Opacity based on distance (closer = more opaque)
            const opacity = 1 - (distance / connectionDistance);
            ctx.strokeStyle = `hsla(${Math.random() * 360}, 90%, 80%, ${opacity * 0.5})`;
            
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Update and draw nodes
      nodes.forEach(node => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off walls
        if (node.x < -50 || node.x > canvas.width + 50) node.vx *= -1;
        if (node.y < -50 || node.y > canvas.height + 50) node.vy *= -1;
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      });
      
      animationFrameId = window.requestAnimationFrame(animate);
    };
    
    animate();
    
    // Clean up
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasSize);
      observer.disconnect();
    };
  }, [darkMode, nodeCount, connectionDistance]); // Added new dependencies
  
  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default NodeBackground;