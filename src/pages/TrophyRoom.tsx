import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, ChevronLeft, Star, User, History, Shield, Globe, Award, Crown } from 'lucide-react'
import { useGameStore } from '../store/useGameStore'
import { MasterEliteCup } from '../components/MasterEliteCup'

export const TrophyRoom = () => {
  const { setPage, trophies, club, user } = useGameStore()

  const earnedTrophies = trophies.filter(t => t.earned)
  const lockedTrophies = trophies.filter(t => !t.earned)

  return (
    <div className="min-h-screen bg-bg text-white pt-24 pb-12 px-6 md:px-12 flex flex-col items-center overflow-x-hidden">
      
      {/* HUD (Top) */}
      <div className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5 py-4 px-12 flex justify-between items-center bg-black/60 backdrop-blur-xl">
        <button onClick={() => setPage('dashboard')} className="flex items-center gap-2 font-rajdhani font-bold text-gray-400 hover:text-white transition-all uppercase tracking-widest text-sm">
          <ChevronLeft className="w-5 h-5" /> VOLVER
        </button>
        <h2 className="text-2xl font-rajdhani font-bold italic tracking-tighter text-gradient-legendary uppercase">VITRINA DE GLORIA</h2>
        <div className="w-10 h-10" />
      </div>

      <div className="w-full max-w-6xl space-y-16">
        
        {/* Showcase Header */}
        <div className="text-center space-y-4 relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold/10 blur-[120px] rounded-full pointer-events-none" />
           <motion.div
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="inline-flex items-center gap-4 px-8 py-3 glass rounded-full border border-gold/30 mb-4"
           >
              <Crown className="w-6 h-6 text-gold fill-gold" />
              <span className="font-rajdhani font-black italic tracking-widest uppercase text-gold">MUSEO DE LEYENDAS</span>
           </motion.div>
           <h3 className="text-7xl font-rajdhani font-black italic tracking-tighter uppercase leading-none">{club.name}</h3>
           <p className="text-sm font-mono tracking-[0.5em] text-gray-500 uppercase">PALMARÉS E HISTORIAL DE PRESTIGIO</p>
        </div>

        {/* Trophies Grid */}
        <section className="space-y-8">
           <div className="flex items-center gap-4">
              <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-white/5" />
              <h4 className="font-rajdhani font-black italic text-xl uppercase tracking-widest text-gray-400">LOGROS DEL CLUB</h4>
              <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-white/5" />
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {trophies.filter(t => t.type === 'club').map((trophy, i) => (
                <TrophySlot key={trophy.id} trophy={trophy} delay={i * 0.1} />
              ))}
           </div>
        </section>

        {/* Personal Awards */}
        <section className="space-y-8 pb-12">
           <div className="flex items-center gap-4">
              <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-white/5" />
              <h4 className="font-rajdhani font-black italic text-xl uppercase tracking-widest text-gray-400">PREMIOS INDIVIDUALES</h4>
              <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-white/5" />
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {trophies.filter(t => t.type === 'personal').map((trophy, i) => (
                <TrophySlot key={trophy.id} trophy={trophy} delay={i * 0.1} isManager />
              ))}
           </div>
        </section>

      </div>
    </div>
  )
}

const TrophySlot = ({ trophy, delay, isManager }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`aspect-square glass rounded-[48px] border-2 transition-all hover:scale-105 hover:bg-white/5 relative flex flex-col items-center justify-center p-8 text-center gap-6 ${trophy.earned ? (isManager ? 'border-cyan/40 shadow-glow-cyan' : 'border-gold/40 shadow-glow-gold bg-gradient-to-b from-white/5 to-transparent') : 'border-white/5 opacity-50 grayscale contrast-75 brightness-50'}`}
    >
        <div className="relative group">
           {trophy.earned && <div className={`absolute -inset-12 blur-[60px] rounded-full opacity-40 ${isManager ? 'bg-cyan' : 'bg-gold animate-pulse'}`} />}
           
           {trophy.id === 'master-elite-cup' ? (
              <MasterEliteCup size={140} earned={trophy.earned} animate={true} />
           ) : (
              <div className="relative z-10 transition-transform group-hover:scale-110 duration-500">
                {trophy.icon === 'Trophy' && <Trophy className={`w-20 h-20 ${trophy.earned ? (isManager ? 'text-cyan shadow-glow-cyan' : 'text-gold drop-shadow-[0_0_15px_rgba(255,184,0,0.5)]') : 'text-gray-600'}`} />}
                {trophy.icon === 'User' && <User className={`w-20 h-20 ${trophy.earned ? (isManager ? 'text-cyan shadow-glow-cyan' : 'text-gold fill-gold/20') : 'text-gray-600'}`} />}
                {trophy.icon === 'Globe' && <Globe className={`w-20 h-20 ${trophy.earned ? (isManager ? 'text-cyan shadow-glow-cyan' : 'text-gold') : 'text-gray-600'}`} />}
                {trophy.icon === 'RotateCw' && <Award className={`w-20 h-20 ${trophy.earned ? (isManager ? 'text-cyan shadow-glow-cyan' : 'text-gold') : 'text-gray-600'}`} />}
                {trophy.icon === 'Cup' && <Shield className={`w-20 h-20 ${trophy.earned ? (isManager ? 'text-cyan shadow-glow-cyan' : 'text-gold') : 'text-gray-600'}`} />}
              </div>
           )}
        </div>

       <div className="space-y-1 relative z-10">
          <h4 className="font-rajdhani font-black text-[12px] uppercase leading-tight tracking-[0.2em]">{trophy.name}</h4>
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{trophy.earned ? trophy.date : '— PRÓXIMAMENTE —'}</p>
       </div>
       
       {!trophy.earned && (
         <div className="absolute inset-0 flex items-center justify-center rotate-[-15deg] pointer-events-none">
            <span className="bg-black/60 backdrop-blur-md px-6 py-1 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">BLOQUEADO</span>
         </div>
       )}
    </motion.div>
  )
}
