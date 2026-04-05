import { motion } from 'framer-motion'
import { Shield, Zap, Target, Brain, MousePointer2, Trophy } from 'lucide-react'

interface PlayerCardProps {
  player: {
    id: string
    name: string
    rating: number
    tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'LEGENDARY' | 'ICON'
    position: string
    country: string
    stats: {
      spd: number
      acc: number
      phy: number
      int: number
      ctl: number
      fin: number
      def: number
    }
  }
  compact?: boolean
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player, compact = false }) => {
  const tierStyles = {
    BRONZE: 'from-orange-900 to-orange-700 border-orange-500/30 text-orange-200',
    SILVER: 'from-slate-700 to-slate-500 border-slate-400/30 text-slate-100',
    GOLD: 'from-amber-600 to-amber-400 border-amber-300/40 text-amber-50 shadow-glow-gold',
    LEGENDARY: 'from-purple-600 via-pink-500 to-indigo-600 border-white/40 text-white shadow-2xl',
    ICON: 'from-black via-gray-800 to-black border-gold/50 text-gold shadow-glow-gold'
  }

  const tierGlow = {
    LEGENDARY: 'animate-pulse',
    ICON: 'animate-pulse transition-all duration-1000'
  }

  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.05 }}
      className={`relative w-full ${compact ? 'max-w-[120px] aspect-[2/3]' : 'max-w-[280px] aspect-[2/3]'} rounded-2xl overflow-hidden border-2 p-1 bg-gradient-to-br ${tierStyles[player.tier]} ${tierGlow[player.tier as keyof typeof tierGlow] || ''}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)]" />
        <div className="grid grid-cols-4 grid-rows-6 h-full w-full">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="border border-white/20" />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col bg-black/40 rounded-xl p-3 backdrop-blur-sm">
        {/* Header: Rating & Position */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col">
            <span className="text-4xl font-rajdhani font-bold leading-none">{player.rating}</span>
            <span className="text-xs font-bold font-mono tracking-tighter opacity-80">{player.position}</span>
          </div>
          <div className="w-8 h-6 bg-white/10 rounded flex items-center justify-center text-sm">
             {/* Country Flag Sim */}
             <span className="text-lg">{player.country === 'HR' ? '🇭🇷' : player.country === 'CO' ? '🇨🇴' : player.country === 'ES' ? '🇪🇸' : '⚽'}</span>
          </div>
        </div>

        {/* Avatar Area (Procedural) */}
        <div className="flex-1 flex items-center justify-center relative mb-4">
          <div className={`w-3/4 aspect-square rounded-full flex items-center justify-center border-4 border-white/10 bg-surface/50 shadow-inner overflow-hidden`}>
            {/* Silueta genérica */}
            <UsersSilhouette className="w-full h-full text-white/20 scale-125 translate-y-4" />
          </div>
          {/* Positional Icon Overlay */}
          <div className="absolute bottom-2 right-4 p-2 bg-black/50 rounded-full border border-white/10">
            <Trophy className="w-4 h-4 text-gold" />
          </div>
        </div>

        {/* Player Name */}
        <div className="text-center mb-4">
          <h4 className="font-rajdhani font-bold text-xl uppercase tracking-tight truncate">{player.name}</h4>
          <div className="h-1 w-1/2 bg-white/20 mx-auto rounded-full mt-1" />
        </div>

        {/* Stats Grid */}
        {!compact && (
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs font-mono">
            <StatRow label="SPD" val={player.stats.spd} />
            <StatRow label="ACC" val={player.stats.acc} />
            <StatRow label="PHY" val={player.stats.phy} />
            <StatRow label="INT" val={player.stats.int} />
            <StatRow label="CTL" val={player.stats.ctl} />
            <StatRow label="FIN" val={player.stats.fin} />
          </div>
        )}
      </div>

      {/* Rarity Flare */}
      {player.tier === 'LEGENDARY' && (
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/20 blur-[40px] rotate-45 pointer-events-none" />
      )}
    </motion.div>
  )
}

const StatRow = ({ label, val }: any) => (
  <div className="flex justify-between border-b border-white/5 pb-0.5">
    <span className="text-gray-400 text-[9px] uppercase">{label}</span>
    <span className="font-bold">{val}</span>
  </div>
)

const UsersSilhouette = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-7 13a7 7 0 1 1 14 0 7 7 0 0 1-14 0Z" />
  </svg>
)
