import React from 'react'
import { motion } from 'framer-motion'

interface SoccerBallProps {
  position: { x: number; y: number }
}

export const SoccerBall: React.FC<SoccerBallProps> = ({ position }) => {
  return (
    <motion.div
      animate={{ 
        x: position.x, 
        y: position.y,
        scale: [1, 1.1, 1],
        rotate: 360
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 80, 
        damping: 15,
        rotate: { duration: 1, repeat: Infinity, ease: "linear" }
      }}
      className="absolute z-40 -translate-x-1/2 -translate-y-1/2"
    >
      {/* Outer Glow */}
      <div className="absolute inset-0 bg-white/20 blur-md rounded-full" />
      
      {/* The Ball */}
      <div className="relative w-6 h-6 bg-white rounded-full border border-black/10 overflow-hidden shadow-2xl">
        <div className="grid grid-cols-2 grid-rows-2 h-full w-full opacity-40">
           <div className="bg-black" />
           <div />
           <div />
           <div className="bg-black" />
        </div>
        {/* Shine */}
        <div className="absolute top-1 left-1 w-2 h-2 bg-white/80 rounded-full" />
      </div>
    </motion.div>
  )
}
