import React, { useId } from 'react'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'

interface ClubCrestProps {
  crest: {
    shape: 'shield' | 'circle' | 'modern' | 'wings' | 'oval' | 'classic-spain' | 'hexagon' | 'pentagon-sharp' | 'rounded-square' | 'diamond' | 'walled' | 'double-circle'
    pattern: 'solid' | 'stripes' | 'diagonal' | 'quarters' | 'cross' | 'diagonal-sash' | 'hoops'
    primaryColor: string
    secondaryColor: string
    accentColor: string
    icon: string
    text: string
    hasCrown: boolean
    decoration: 'none' | 'lion' | 'eagle' | 'star-ring' | 'crown' | 'swords' | 'anchor'
  }
  size?: number
  animate?: boolean
}

export const ClubCrest: React.FC<ClubCrestProps> = ({ crest, size = 100, animate = false }) => {
  const { shape, pattern, primaryColor, secondaryColor, accentColor, icon, text, hasCrown, decoration } = crest
  const uniqueId = useId().replace(/:/g, '')
  const clipId = `crest-clip-${uniqueId}`
  
  // Icon resolution from lucide
  const IconComponent = (Icons as any)[icon.charAt(0).toUpperCase() + icon.slice(1)] || Icons.Shield

  const renderShapePath = () => {
    switch (shape) {
      case 'circle': return "M50 50 m-48 0 a48 48 0 1 0 96 0 a48 48 0 1 0 -96 0"
      case 'double-circle': return "M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0 M 50, 50 m -35, 0 a 35,35 0 1,0 70,0 a 35,35 0 1,0 -70,0"
      case 'classic-spain': return "M50 5 a45 45 0 1 1 0 90 a45 45 0 1 1 0 -90"
      case 'oval': return "M50 5 C25 5 10 25 10 50 C10 75 25 95 50 95 C75 95 90 75 90 50 C90 25 75 5 50 5"
      case 'modern': return "M10 10 L90 10 L80 90 L20 90 Z"
      case 'wings': return "M50 10 C20 10 5 30 5 60 C5 90 30 95 50 90 C70 95 95 90 95 60 C95 30 80 10 50 10 Z"
      case 'hexagon': return "M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z"
      case 'pentagon-sharp': return "M20 5 L80 5 L95 40 L50 95 L5 40 Z"
      case 'rounded-square': return "M5 5 L95 5 L95 60 C95 85 75 95 50 95 C25 95 5 85 5 60 Z"
      case 'diamond': return "M50 5 L90 50 L50 95 L10 50 Z"
      case 'walled': return "M10 20 L25 20 L25 10 L40 10 L40 20 L60 20 L60 10 L75 10 L75 20 L90 20 L90 90 L50 98 L10 90 Z"
      default: return "M10 10 C10 10 10 70 50 95 C90 70 90 10 90 10 Z"
    }
  }

  const renderDecoration = () => {
    switch (decoration) {
      case 'crown':
        return (
          <g transform="translate(25, -15) scale(0.5)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))">
             <path 
               d="M5 45 L15 15 L35 35 L50 5 L65 35 L85 15 L95 45 Z" 
               fill={accentColor} 
               stroke="black" 
               strokeWidth="2" 
             />
             <circle cx="5" cy="45" r="4" fill={accentColor} stroke="black" />
             <circle cx="50" cy="5" r="4" fill={accentColor} stroke="black" />
             <circle cx="95" cy="45" r="4" fill={accentColor} stroke="black" />
             <rect x="5" y="45" width="90" height="10" rx="2" fill={accentColor} stroke="black" />
          </g>
        )
      case 'lion':
        return (
          <g transform="translate(75, -5) scale(0.35)" opacity="0.9">
             <path d="M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 M50,0 L60,-10 L50,-40 L40,-10 Z" fill={accentColor} />
             <circle cx="50" cy="50" r="30" fill="none" stroke={accentColor} strokeWidth="5" />
          </g>
        )
      case 'star-ring':
        return (
           <g>
              {[0, 60, 120, 180, 240, 300].map(angle => (
                 <motion.path 
                    key={angle}
                    d="M 0,-5 L 1, -1 L 5, 0 L 1, 1 L 0, 5 L -1, 1 L -5, 0 L -1, -1 Z"
                    fill={accentColor}
                    transform={`translate(50, 50) rotate(${angle}) translate(0, -42) scale(1.5)`}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, delay: angle / 60 }}
                 />
              ))}
           </g>
        )
      case 'swords':
        return (
          <g transform="translate(15, 15) scale(0.7)" opacity="0.4">
             <path d="M0,0 L100,100 M100,0 L0,100" stroke={accentColor} strokeWidth="8" strokeLinecap="round" />
          </g>
        )
      case 'anchor':
        return (
           <g transform="translate(35, 75) scale(0.3)" opacity="0.8">
              <path d="M50 0 L50 80 M20 40 L80 40 M20 80 Q50 110 80 80" fill="none" stroke={accentColor} strokeWidth="12" strokeLinecap="round" />
           </g>
        )
      default: return null
    }
  }

  return (
    <motion.div
      animate={animate ? { y: [0, -4, 0], rotate: [0, 1, -1, 0] } : {}}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center drop-shadow-2xl"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
           <clipPath id={clipId}>
              <path d={renderShapePath()} />
           </clipPath>
           <filter id={`glow-${uniqueId}`}>
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
           </filter>
           <linearGradient id={`grad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: primaryColor, stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: primaryColor, stopOpacity: 0.8 }} />
           </linearGradient>
        </defs>

        {/* Global Decoration Overlay (Crown above everything) */}
        {(hasCrown || decoration !== 'none') && renderDecoration()}

        {/* Base Layer */}
        <path 
          d={renderShapePath()} 
          fill={`url(#grad-${uniqueId})`} 
          stroke={accentColor} 
          strokeWidth="2" 
          filter={accentColor !== '#05060F' ? `url(#glow-${uniqueId})` : ''}
        />

        {/* Pattern Layer */}
        <g clipPath={`url(#${clipId})`}>
          {pattern === 'stripes' && (
             <g>
               {[0, 25, 50, 75, 100].map(x => (
                  <rect key={x} x={x} y="0" width="12" height="100" fill={secondaryColor} opacity="0.8" />
               ))}
             </g>
          )}
          {pattern === 'diagonal' && (
            <rect x="-50" y="0" width="200" height="30" fill={secondaryColor} transform="rotate(45 50 50)" opacity="0.8" />
          )}
          {pattern === 'diagonal-sash' && (
            <path d="M-20 20 L20 -20 L120 80 L80 120 Z" fill={secondaryColor} opacity="0.9" />
          )}
          {pattern === 'hoops' && (
             <g>
               {[0, 30, 60, 90].map(y => (
                  <rect key={y} x="0" y={y} width="100" height="12" fill={secondaryColor} opacity="0.8" />
               ))}
             </g>
          )}
          {pattern === 'quarters' && (
             <g opacity="0.8">
                <rect x="50" y="0" width="50" height="50" fill={secondaryColor} />
                <rect x="0" y="50" width="50" height="50" fill={secondaryColor} />
             </g>
          )}
          {pattern === 'cross' && (
             <g opacity="0.8">
                <rect x="42.5" y="0" width="15" height="100" fill={secondaryColor} />
                <rect x="0" y="42.5" width="100" height="15" fill={secondaryColor} />
             </g>
          )}
        </g>

        {/* Center Symbol / Icon */}
        <foreignObject x="25" y="23" width="50" height="50">
           <div className="w-full h-full flex items-center justify-center text-white drop-shadow-lg">
              <IconComponent size={32} strokeWidth={2.5} style={{ color: accentColor }} />
           </div>
        </foreignObject>

        {/* Initials Layer */}
        {text && (
          <text 
            x="50" 
            y={shape === 'classic-spain' || shape === 'circle' || shape === 'double-circle' ? "53" : "82"} 
            textAnchor="middle" 
            fill={accentColor} 
            className={`font-rajdhani font-black tracking-tighter ${text.length > 2 ? 'text-[14px]' : 'text-[18px]'} uppercase`}
            style={{ 
              textShadow: '0 0 10px rgba(0,0,0,0.8)',
              paintOrder: 'stroke',
              stroke: 'black',
              strokeWidth: '1px'
            }}
          >
            {text}
          </text>
        )}

        {/* Final Border Accent (Metallic Effect) */}
        <path 
           d={renderShapePath()} 
           fill="none" 
           stroke={accentColor} 
           strokeWidth="3" 
           opacity="0.5"
        />
        <path 
           d={renderShapePath()} 
           fill="none" 
           stroke="white" 
           strokeWidth="0.5" 
           strokeDasharray="2,5"
           opacity="0.3"
        />
      </svg>
    </motion.div>
  )
}
