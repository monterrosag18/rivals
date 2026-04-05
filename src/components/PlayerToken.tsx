import React from 'react'
import { motion } from 'framer-motion'

interface PlayerTokenProps {
  player: any
  isEnemy?: boolean
  isActive?: boolean
  onClick?: () => void
}

export const PlayerToken: React.FC<PlayerTokenProps> = ({ player, isEnemy, isActive, onClick }) => {
  const tierColors = {
    BRONZE: 'from-orange-800 to-orange-950 border-orange-500/50',
    SILVER: 'from-slate-600 to-slate-900 border-slate-400/50',
    GOLD: 'from-amber-500 to-amber-900 border-amber-300/50',
    LEGENDARY: 'from-purple-500 to-indigo-900 border-purple-300/50',
    ICON: 'from-gray-800 to-black border-gold/50',
  }

  return (
    <motion.div
      whileHover={{ scale: 1.2, zIndex: 50 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`relative cursor-pointer group`}
    >
      {/* Active Aura */}
      {isActive && (
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute -inset-2 rounded-full blur-md bg-${isEnemy ? 'red' : 'cyan'}-500/30`}
        />
      )}

      {/* The Token */}
      <div className={`w-12 h-12 rounded-full border-2 bg-gradient-to-br ${tierColors[player.tier as keyof typeof tierColors] || tierColors.SILVER} flex flex-col items-center justify-center shadow-lg transition-all ${isActive ? 'ring-2 ring-white scale-110 shadow-glow-cyan' : 'scale-100 opacity-80'}`}>
        <span className="text-[14px] font-rajdhani font-bold leading-none">{player.rating}</span>
        <span className="text-[7px] font-bold font-mono opacity-60 uppercase">{player.position}</span>
      </div>

      {/* Tooltip on Hover */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 glass rounded-md hidden group-hover:block transition-all z-50">
        <span className="text-[10px] font-bold whitespace-nowrap">{player.name}</span>
      </div>
    </motion.div>
  )
}
