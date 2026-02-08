import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 20);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#0a0a0a',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontFamily: 'monospace'
        }}>
            {/* Reactor Core Animation - using standard div for safety */}
            <div style={{ position: 'relative', width: '150px', height: '150px', marginBottom: '40px' }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    border: '2px solid rgba(0, 243, 255, 0.3)',
                    borderRadius: '50%',
                    borderTopColor: '#00f3ff',
                    animation: 'spin 3s linear infinite'
                }} />
                <div style={{
                    position: 'absolute',
                    inset: '15px',
                    border: '2px solid rgba(188, 19, 254, 0.3)',
                    borderRadius: '50%',
                    borderLeftColor: '#bc13fe',
                    animation: 'spin-reverse 4s linear infinite'
                }} />
                <div style={{
                    position: 'absolute',
                    inset: '40px',
                    background: 'radial-gradient(circle, #00f3ff 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(5px)',
                    animation: 'pulse 2s ease-in-out infinite'
                }} />
            </div>

            <div style={{ textAlign: 'center', zIndex: 100000 }}>
                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    letterSpacing: '0.2rem',
                    marginBottom: '10px',
                    color: 'white',
                    textShadow: '0 0 10px rgba(0, 243, 255, 0.7)'
                }}>
                    SYSTEM BOOT
                </h1>
                <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: '20px' }}>
                    INITIALIZING PROTOCOLS... {progress}%
                </div>
            </div>

            <div style={{
                width: '300px',
                height: '4px',
                background: '#222',
                borderRadius: '2px',
                overflow: 'hidden',
                boxShadow: '0 0 10px rgba(0,0,0,0.5)'
            }}>
                <div style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #00f3ff, #bc13fe)',
                    transition: 'width 0.1s linear'
                }} />
            </div>

            <style>{`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                @keyframes spin-reverse { 0% { transform: rotate(0deg); } 100% { transform: rotate(-360deg); } }
                @keyframes pulse { 0% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.2); opacity: 0.8; } 100% { transform: scale(1); opacity: 0.5; } }
            `}</style>
        </div>
    );
};

export default Preloader;
