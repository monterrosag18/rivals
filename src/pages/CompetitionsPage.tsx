import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, ChevronLeft, Lock, Star, ChevronRight, Globe, Zap } from 'lucide-react'
import { useGameStore } from '../store/useGameStore'
import { MasterEliteCup } from '../components/MasterEliteCup'

export const CompetitionsPage = () => {
  const { setPage } = useGameStore()

  return (
    <div className="min-h-screen bg-bg text-white pt-24 pb-12 px-6 md:px-12 flex flex-col items-center overflow-x-hidden">
      
      {/* HUD (Top) */}
      <div className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5 py-4 px-12 flex justify-between items-center bg-black/60 backdrop-blur-xl">
        <button onClick={() => setPage('dashboard')} className="flex items-center gap-2 font-rajdhani font-bold text-gray-400 hover:text-white transition-all uppercase tracking-widest text-sm">
          <ChevronLeft className="w-5 h-5" /> VOLVER
        </button>
        <h2 className="text-2xl font-rajdhani font-bold italic tracking-tighter text-gradient-legendary">CENTRO DE COMPETICIONES</h2>
        <div className="w-10 h-10" />
      </div>

      <div className="w-full max-w-5xl space-y-12">
        
        {/* Active Leagues Section */}
        <section className="space-y-6">
           <h3 className="font-rajdhani text-xl font-bold flex items-center gap-3 text-gold">
             <Star className="w-5 h-5 fill-gold" /> LIGAS ACTIVAS
           </h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <CompetitionCard 
                title="LIGA MASTER ELITE" 
                subtitle="DÍA 12 / 38 • JUGANDO" 
                icon={MasterEliteCup} 
                color="gold" 
                active 
                onClick={() => setPage('league-details')}
              />
              <CompetitionCard 
                title="COPA DE CAMPEONES" 
                subtitle="BLOQUEADO • NIVEL 60" 
                icon={Globe} 
                color="cyan" 
                locked 
              />
           </div>
        </section>

        {/* Upcoming Events */}
        <section className="space-y-6">
           <h3 className="font-rajdhani text-xl font-bold flex items-center gap-3 text-red">
             <Zap className="w-5 h-5 fill-red" /> EVENTOS ESPECIALES
           </h3>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="glass p-6 rounded-2xl border border-white/5 opacity-50 relative overflow-hidden group grayscale">
                   <div className="flex flex-col items-center gap-4 text-center">
                      <div className="p-4 bg-surface rounded-full border border-white/10">
                         <Lock className="w-8 h-8 text-gray-500" />
                      </div>
                      <div className="space-y-1">
                         <h4 className="font-rajdhani font-bold text-gray-400 uppercase">PRÓXIMAMENTE</h4>
                         <p className="text-[10px] text-gray-600 tracking-widest">TEMPORADA 3</p>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </section>

      </div>
    </div>
  )
}

const CompetitionCard = ({ title, subtitle, icon: Icon, color, active, locked, onClick }: any) => {
  const colors: any = {
    gold: 'text-gold border-gold/40 shadow-glow-gold',
    cyan: 'text-cyan border-cyan/30 shadow-glow-cyan',
  }

  return (
    <motion.button
      whileHover={!locked ? { scale: 1.02, y: -5 } : {}}
      onClick={!locked ? onClick : undefined}
      className={`relative w-full glass p-8 rounded-[40px] border-2 text-left flex items-center justify-between transition-all group overflow-hidden ${locked ? 'opacity-60 grayscale cursor-not-allowed border-white/5' : 'hover:border-white/20 border-white/10'}`}
    >
      {active && <div className="absolute top-0 left-0 w-[6px] h-full bg-gold shadow-[0_0_20px_#FFB800]" />}
      
      <div className="flex items-center gap-6 relative z-10">
         <div className={`p-1 bg-surface rounded-3xl border-2 border-white/5 ${active ? colors[color] : ''}`}>
            {Icon === MasterEliteCup ? (
               <MasterEliteCup size={100} earned={active} animate={active} />
            ) : (
               <div className="p-4"><Icon className="w-10 h-10" /></div>
            )}
         </div>
         <div className="space-y-1">
            <h4 className={`text-3xl font-rajdhani font-black italic tracking-tighter uppercase ${active ? 'text-white' : 'text-gray-400'}`}>{title}</h4>
            <p className={`text-xs font-mono tracking-[0.3em] uppercase font-black ${active ? 'text-gold' : 'text-gray-600'}`}>{subtitle}</p>
         </div>
      </div>

      {!locked ? (
        <ChevronRight className="w-8 h-8 text-gray-600 group-hover:text-white transition-all transform group-hover:translate-x-2" />
      ) : (
        <Lock className="w-8 h-8 text-gray-600" />
      )}
      
      {active && (
        <div className="absolute -right-12 -bottom-12 opacity-10 rotate-12 transition-transform group-hover:rotate-0 scale-150">
           {Icon === MasterEliteCup ? <MasterEliteCup size={240} animate={false} /> : <Icon size={200} />}
        </div>
      )}
    </motion.button>
  )
}
