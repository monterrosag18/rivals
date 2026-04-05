import React from 'react'
import { motion } from 'framer-motion'

export const FootballPitch: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a2f16]">
      {/* Grass Texture Effect */}
      <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/p6.png')]" />
      
      {/* Pitch Lines */}
      <div className="absolute inset-4 border-2 border-white/20 rounded-sm">
        {/* Center Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-white/20" />
        
        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/20 rounded-full" />

        {/* Penalty Areas (Left) */}
        <div className="absolute top-1/4 left-0 w-24 h-1/2 border-2 border-white/20 border-l-0" />
        <div className="absolute top-[40%] left-0 w-10 h-[20%] border-2 border-white/20 border-l-0" />

        {/* Penalty Areas (Right) */}
        <div className="absolute top-1/4 right-0 w-24 h-1/2 border-2 border-white/20 border-r-0" />
        <div className="absolute top-[40%] right-0 w-10 h-[20%] border-2 border-white/20 border-r-0" />
      </div>

      {/* Atmospheric Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg opacity-80" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_#05060f_100%)] opacity-60" />
      
      {/* Moving Light Rays */}
      <motion.div 
        animate={{ x: [-500, 500], opacity: [0, 0.2, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-[200px] h-full bg-white/10 blur-[100px] -skew-x-12"
      />
    </div>
  )
}
