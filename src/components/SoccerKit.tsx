import React, { useId } from 'react'
import { motion } from 'framer-motion'

interface SoccerKitProps {
  kit: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    pattern: 'solid' | 'stripes' | 'hoops' | 'diagonal-sash' | 'halves' | 'halves-horizontal'
    collarType: 'round' | 'v-neck'
  }
  size?: number
  animate?: boolean
}

export const SoccerKit: React.FC<SoccerKitProps> = ({ kit, size = 100, animate = false }) => {
  const { primaryColor, secondaryColor, accentColor, pattern, collarType } = kit
  const uniqueId = useId().replace(/:/g, '')
  const clipId = `jersey-shape-${uniqueId}`

  const renderPattern = () => {
    switch (pattern) {
      case 'stripes':
        return (
          <g>
            <rect x="20" y="0" width="15" height="100" fill={secondaryColor} />
            <rect x="42.5" y="0" width="15" height="100" fill={secondaryColor} />
            <rect x="65" y="0" width="15" height="100" fill={secondaryColor} />
          </g>
        )
      case 'hoops':
        return (
          <g>
            <rect x="0" y="20" width="100" height="15" fill={secondaryColor} />
            <rect x="0" y="45" width="100" height="15" fill={secondaryColor} />
            <rect x="0" y="70" width="100" height="15" fill={secondaryColor} />
          </g>
        )
      case 'diagonal-sash':
        return (
          <path d="M0 20 L20 0 L100 80 L80 100 Z" fill={secondaryColor} />
        )
      case 'halves':
        return (
          <rect x="50" y="0" width="50" height="100" fill={secondaryColor} />
        )
      case 'halves-horizontal':
        return (
          <rect x="0" y="50" width="100" height="50" fill={secondaryColor} />
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      animate={animate ? { y: [0, -5, 0] } : {}}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center drop-shadow-2xl"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <defs>
          <clipPath id={clipId}>
            <path d="M20 10 L80 10 L95 25 L85 40 L80 35 L80 90 L20 90 L20 35 L15 40 L5 25 Z" />
          </clipPath>
          <pattern id="texture-pattern" width="4" height="4" patternUnits="userSpaceOnUse">
             <path d="M 0 0 L 4 4 M -1 3 L 1 5 M 3 -1 L 5 1" stroke="white" strokeWidth="0.5" opacity="0.2" />
          </pattern>
        </defs>

        {/* Base Layer (Jersey Shape) */}
        <path 
           d="M20 10 L80 10 L95 25 L85 40 L80 35 L80 90 L20 90 L20 35 L15 40 L5 25 Z" 
           fill={primaryColor} 
           stroke={accentColor} 
           strokeWidth="1"
        />

        {/* Pattern Layer */}
        <g clipPath={`url(#${clipId})`}>
           {renderPattern()}
        </g>

        {/* Sleeves Detail (Accent) */}
        <path d="M5 25 L15 15 M85 15 L95 25" stroke={accentColor} strokeWidth="2" opacity="0.5" />
        
        {/* Collar Detail */}
        {collarType === 'v-neck' ? (
           <path d="M40 10 L50 22 L60 10" fill="none" stroke={accentColor} strokeWidth="3" />
        ) : (
           <circle cx="50" cy="10" r="10" fill="none" stroke={accentColor} strokeWidth="3" />
        )}

        {/* Fabric Texture (Subtle overlay) */}
        <rect x="0" y="0" width="100" height="100" fill="url(#texture-pattern)" fillOpacity="0.05" clipPath={`url(#${clipId})`} />
      </svg>
    </motion.div>
  )
}
