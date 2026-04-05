import { motion } from 'framer-motion'
import { Star, Zap, Database, Wallet } from 'lucide-react'
import { ClubCrest } from './ClubCrest'
import { useGameStore } from '../store/useGameStore'

export const StatusBar = () => {
  const { user, club, setPage } = useGameStore()
  
  const xpPercent = (user.xp / user.maxXp) * 100

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-bg/80 backdrop-blur-xl border-b border-white/5 py-3 px-6 flex items-center justify-between">
      <div className="flex items-center gap-6">
        {/* User XP / Level */}
        <div className="flex flex-col gap-1 w-48">
          <div className="flex items-center justify-between text-xs font-rajdhani font-bold">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-gold fill-gold" />
              <span>NIVEL {user.level}</span>
            </div>
            <span className="text-gray-400">{user.xp.toLocaleString()} / {(user.maxXp / 1000000).toFixed(2)}M</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${xpPercent}%` }}
              className="h-full bg-gold relative"
            >
               <div className="absolute inset-0 bar-stream opacity-50" />
            </motion.div>
          </div>
        </div>
        
        {/* Stars */}
        <div className="flex items-center gap-2 bg-white/5 py-1 px-3 rounded-full border border-white/10">
          <Star className="w-4 h-4 text-gold fill-gold" />
          <span className="font-mono text-sm font-bold">{club.stars}</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Energy */}
        <div className="flex items-center gap-2 bg-green/10 py-1 px-3 rounded-full border border-green/20">
          <Zap className="w-4 h-4 text-green fill-green animate-pulse" />
          <span className="font-mono text-sm font-bold text-green">{user.energy}/50</span>
        </div>

        {/* Gold */}
        <div className="flex items-center gap-2 bg-gold/10 py-1 px-4 rounded-full border border-gold/20">
          <Wallet className="w-4 h-4 text-gold fill-gold" />
          <span className="font-mono text-sm font-bold text-gold">{user.gold}</span>
        </div>

        {/* Club Profile */}
        <div className="flex items-center gap-3">
          <div 
             onClick={() => setPage('profile')}
             className="cursor-pointer hover:scale-110 transition-transform active:scale-95"
          >
            <ClubCrest crest={club.crest} size={40} />
          </div>
        </div>
      </div>
    </div>
  )
}
