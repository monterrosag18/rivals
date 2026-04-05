import React from 'react'
import { motion } from 'framer-motion'

interface MasterEliteCupProps {
  size?: number
  earned?: boolean
  animate?: boolean
}

export const MasterEliteCup: React.FC<MasterEliteCupProps> = ({ size = 200, earned = false, animate = true }) => {
  return (
    <div 
      className="relative flex items-center justify-center p-4 overflow-hidden" 
      style={{ 
        width: size, 
        height: size,
        perspective: '1000px'
      }}
    >
      {/* GLOW BACKGROUND (IF EARNED) */}
      {earned && (
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gold/30 blur-[80px] rounded-full"
        />
      )}
      
      {/* THE SPINNING TROPHY CONTAINER */}
      <motion.div
        animate={animate ? { rotateY: [0, 360] } : {}}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <svg viewBox="0 0 200 200" className={`w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] ${!earned && 'grayscale brightness-75 contrast-125 opactiy-90'}`}>
          <defs>
            {/* LUXURY GOLD GRADIENTS */}
            <linearGradient id="gold-primary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#FFF6BC', stopOpacity: 1 }} />
              <stop offset="20%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#FFB800', stopOpacity: 1 }} />
              <stop offset="80%" style={{ stopColor: '#B8860B', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#8B6508', stopOpacity: 1 }} />
            </linearGradient>

            <radialGradient id="gold-shine" cx="30%" cy="30%" r="50%">
               <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 0.6 }} />
               <stop offset="100%" style={{ stopColor: '#FFD700', stopOpacity: 0 }} />
            </radialGradient>

            <linearGradient id="marble-base" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" style={{ stopColor: '#222222', stopOpacity: 1 }} />
               <stop offset="100%" style={{ stopColor: '#05060F', stopOpacity: 1 }} />
            </linearGradient>

            <filter id="bloom">
               <feGaussianBlur stdDeviation="2" result="blur" />
               <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* LAYER 1: THE HANDLES (Behind) */}
          <g opacity="0.9">
             <path d="M45 45 Q15 45 25 85 Q35 115 60 105" fill="none" stroke="url(#gold-primary)" strokeWidth="10" strokeLinecap="round" />
             <path d="M155 45 Q185 45 175 85 Q165 115 140 105" fill="none" stroke="url(#gold-primary)" strokeWidth="10" strokeLinecap="round" />
          </g>

          {/* LAYER 2: THE BASE (Heavy Marble) */}
          <rect x="60" y="155" width="80" height="30" rx="4" fill="url(#marble-base)" stroke="#333" strokeWidth="1" />
          <rect x="50" y="175" width="100" height="15" rx="3" fill="#000" />
          <path d="M70 155 L130 155 L120 135 L80 135 Z" fill="url(#gold-primary)" opacity="0.8" />

          {/* LAYER 3: THE MAIN BODY (Reflective Bowl) */}
          <path 
             d="M50 40 C50 140 150 140 150 40 L155 35 L45 35 Z" 
             fill="url(#gold-primary)" 
             stroke="rgba(0,0,0,0.1)" 
          />
          
          {/* LAYER 4: BOWL HIGHLIGHTS (Metallic Shine) */}
          <path 
             d="M60 45 C60 120 140 120 140 45" 
             fill="none" 
             stroke="url(#gold-shine)" 
             strokeWidth="2" 
             opacity="0.4"
          />

          {/* LAYER 5: THE RIM (Polished Top) */}
          <ellipse cx="100" cy="35" rx="55" ry="8" fill="url(#gold-primary)" stroke="rgba(0,0,0,0.1)" />
          <ellipse cx="100" cy="35" rx="45" ry="5" fill="#543C00" opacity="0.3" />

          {/* LAYER 6: ETCHINGS (Master League Logo) */}
          <g transform="translate(85, 60) scale(0.3)">
             <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" fill="rgba(0,0,0,0.2)" />
             <text x="50" y="55" textAnchor="middle" fill="rgba(84,60,0,0.5)" className="font-rajdhani font-bold text-[20px] tracking-tighter">ELITE</text>
          </g>

          {/* LAYER 7: BLOOM SPARKS (If Earned) */}
          {earned && (
             <motion.g animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}>
                <path d="M100 20 L102 28 L110 30 L102 32 L100 40 L98 32 L90 30 L98 28 Z" fill="white" filter="url(#bloom)" />
                <circle cx="150" cy="80" r="3" fill="white" filter="url(#bloom)" />
             </motion.g>
          )}

          {/* 3D LIGHTING OVERLAY (Gives volume) */}
          <path d="M100 40 C100 135 150 130 150 40" fill="white" opacity="0.05" />
          <path d="M50 40 C50 130 100 135 100 40" fill="black" opacity="0.1" />
        </svg>
      </motion.div>

      {/* PRICE PLATFORM (If visible in spotlight) */}
      <div className="absolute bottom-0 w-full h-[20%] bg-gradient-to-t from-black to-transparent opacity-40 blur-md pointer-events-none" />
    </div>
  )
}
