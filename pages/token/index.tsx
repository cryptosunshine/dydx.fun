import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function TokenPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    

    const particles: any[] = [];
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 5 + 1,
        color: `rgba(255, 215, 0, ${Math.random() * 0.5 + 0.25})`,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 - 1.5
      });
    }
    
    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="token-page">
      <Head>
        <title>$BHW Token | BlockHero</title>
      </Head>

      <canvas ref={canvasRef} className="particle-background"></canvas>
      
      <div className="token-content">
        <h1 className="token-title">$BHW</h1>
        <p className="token-description">The official token of BlockHero game ecosystem</p>
        
        <div className="token-info">
          <div className="token-info-item">
            <h3>Token Mint Address</h3>
            <p className="token-address">Coming soon</p>
          </div>
          
          <div className="token-info-item">
            <h3>Blockchain</h3>
            <p>Solana</p>
          </div>
        </div>
        
        <div className="token-buttons">
          {/* <button className="primary-button" onClick={() => window.open("https://pump.fun/coin/", "_blank")}>
            Buy on Pump.fun
          </button> */}
          <button className="secondary-button" onClick={() => router.push("/")}>
            Back to Game
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .token-page {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          color: white;
          font-family: 'Poppins', sans-serif;
        }
        
        .particle-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        
        .token-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 20px;
          text-align: center;
          background: rgba(0, 0, 0, 0.6);
        }
        
        .token-title {
          font-size: 4rem;
          margin-bottom: 0.5rem;
          color: gold;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
          animation: pulse 2s infinite;
        }
        
        .token-description {
          font-size: 1.5rem;
          margin-bottom: 2rem;
          max-width: 600px;
        }
        
        .token-info {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        
        .token-info-item {
          background: rgba(0, 0, 0, 0.5);
          padding: 1rem;
          border-radius: 10px;
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 215, 0, 0.3);
        }
        
        .token-address {
          word-break: break-all;
          font-family: monospace;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.5rem;
          border-radius: 5px;
        }
        
        .token-buttons {
          display: flex;
          gap: 1rem;
        }
        
        .primary-button, .secondary-button {
          padding: 0.8rem 1.5rem;
          border-radius: 30px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          font-size: 1rem;
        }
        
        .primary-button {
          background: gold;
          color: black;
        }
        
        .primary-button:hover {
          background: #ffcc00;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        
        .secondary-button {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .secondary-button:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
} 