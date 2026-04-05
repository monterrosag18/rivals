import React from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, Filter, Search, PlusCircle, Star, Zap, TrendingUp, Shield, Activity, Info, Settings, User as UserIcon, Target } from 'lucide-react'
import { useGameStore } from '../store/useGameStore'
import { ClubCrest } from '../components/ClubCrest'
import { SoccerKit } from '../components/SoccerKit'
import { StatusBar } from '../components/StatusBar'

export const SquadPage = () => {
  const { club, players, setPage } = useGameStore()
  
  // SAFETY CHECKS
  if (!club || !players) return null

  // CALCULATE TEAM STATS
  const safePlayers = Array.isArray(players) ? players : []
  const totalRating = safePlayers.reduce((sum, p) => sum + (p.rating || p.power || 0), 0)
  const avgLevel = safePlayers.length > 0 
    ? Math.round(safePlayers.reduce((sum, p) => sum + (p.level || 1), 0) / safePlayers.length)
    : 0

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-20 pb-24 px-4 md:px-12 font-rajdhani overflow-x-hidden">
      <StatusBar />
      
      <div className="max-w-5xl mx-auto">
        
        {/* CLUB IDENTITY HEADER (High-Impact branding) */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12 bg-surface/40 p-8 rounded-[40px] border border-white/5 relative overflow-hidden backdrop-blur-xl">
           <div className="absolute top-0 right-0 p-10 opacity-5">
              <ClubCrest crest={club.crest} size={300} />
           </div>
           
           <div className="relative z-10">
              <ClubCrest crest={club.crest} size={140} animate />
           </div>

           <div className="flex-1 text-center md:text-left z-10">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                 <button 
                   onClick={() => setPage('dashboard')}
                   className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/5"
                 >
                   <ChevronLeft className="w-5 h-5" />
                 </button>
                 <h2 className="text-5xl font-black italic tracking-tighter uppercase text-gradient-legendary">{club.name}</h2>
              </div>
              <p className="text-sm font-bold text-gray-500 tracking-[0.5em] uppercase mb-6 ml-1">ALINEACIÓN OFICIAL 11 vs 11</p>
              
              <div className="flex items-center justify-center md:justify-start gap-8">
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gold tracking-widest uppercase mb-1">RATING TOTAL</span>
                    <span className="text-3xl font-black italic tracking-tighter">{totalRating}</span>
                 </div>
                 <div className="w-[1px] h-10 bg-white/10" />
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black text-cyan tracking-widest uppercase mb-1">NIVEL PROMEDIO</span>
                    <span className="text-3xl font-black italic tracking-tighter">LVL {avgLevel}</span>
                 </div>
                 <div className="w-[1px] h-10 bg-white/10" />
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black text-purple-400 tracking-widest uppercase mb-1">SQUAD SIZE</span>
                    <span className="text-3xl font-black italic tracking-tighter">{safePlayers.length}/11</span>
                 </div>
              </div>
           </div>
        </div>

        {/* CONTROLS (Compact) */}
        <div className="flex items-center justify-between mb-6 px-2">
           <div className="flex items-center gap-4">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                 <input 
                    type="text" 
                    placeholder="Filtrar plantilla..." 
                    className="bg-black/40 border border-white/5 py-2 pl-10 pr-6 rounded-full text-xs focus:outline-none focus:border-gold/30 transition-all w-48 font-bold" 
                 />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-black/40 border border-white/5 rounded-full text-[10px] font-black tracking-widest text-gray-400 hover:text-white transition-colors">
                 <Filter size={14} /> FILTRAR
              </button>
           </div>
           
           <button className="flex items-center gap-2 group">
              <span className="text-[10px] font-black text-gold tracking-widest uppercase">MEJORAR TODO EL EQUIPO</span>
              <div className="p-2 bg-gold/10 rounded-lg group-hover:bg-gold/20 transition-all border border-gold/10">
                 <Zap size={16} className="text-gold fill-gold" />
              </div>
           </button>
        </div>

        {/* SQUAD LIST (Compact Numbered Rows 1-11) */}
        <div className="space-y-2 mb-12">
            {[...Array(11)].map((_, index) => {
               const player = players[index]
               const isEven = index % 2 === 0
               
               if (!player) return (
                  <div key={index} className="w-full h-20 bg-white/[0.02] border border-dashed border-white/5 rounded-2xl flex items-center justify-between px-8 text-gray-700 hover:border-white/10 hover:bg-white/[0.03] transition-all cursor-pointer group">
                     <div className="flex items-center gap-8">
                        <span className="text-2xl font-black italic opacity-20 w-8">#{index + 1}</span>
                        <div className="w-12 h-14 bg-white/5 rounded-lg border border-white/5 flex items-center justify-center grayscale opacity-30">
                           <UserIcon size={24} />
                        </div>
                        <span className="text-sm font-black tracking-[0.3em] uppercase opacity-40">ESPACIO DISPONIBLE</span>
                     </div>
                     <PlusCircle className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
               )

               return (
                  <motion.div 
                    key={player.id} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`w-full h-20 flex items-center justify-between px-8 rounded-2xl border border-white/5 hover:bg-white/5 transition-all cursor-pointer group relative overflow-hidden ${isEven ? 'bg-surface/30' : 'bg-transparent'}`}
                  >
                     <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                     
                     <div className="flex items-center gap-8 z-10">
                        <span className="text-3xl font-black italic text-white/10 group-hover:text-gold/40 transition-colors w-10">#{index + 1}</span>
                        
                        <div className="w-14 h-16 relative flex items-center justify-center transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                           <SoccerKit kit={club.kit} size={70} />
                           <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-surface rounded-full border border-white/10 flex items-center justify-center font-black italic text-[10px] text-white shadow-xl">
                              {index + 1}
                           </div>
                        </div>

                        <div className="flex flex-col">
                           <div className="flex items-center gap-2">
                              <p className="text-lg font-black uppercase text-white tracking-tight leading-none">{player.name}</p>
                              <span className="text-[10px] font-black bg-white/5 px-2 py-0.5 rounded text-gray-500 border border-white/5">{player.position}</span>
                           </div>
                           <div className="flex items-center gap-2 mt-1">
                              <Star className="w-2.5 h-2.5 text-gold fill-gold" />
                              <p className="text-[10px] font-black text-gray-500 tracking-widest uppercase">PLAYER LEVEL {player.level || 1}</p>
                           </div>
                        </div>
                     </div>

                     <div className="flex items-center gap-12 z-10">
                        <div className="flex flex-col items-center">
                           <span className="text-[9px] font-black text-gray-600 tracking-widest uppercase mb-1">PODER ACTUAL</span>
                           <div className="flex items-center gap-2">
                              <span className="text-2xl font-black italic">{player.rating || player.power || 500}</span>
                              <Activity className="w-4 h-4 text-green-500" />
                           </div>
                        </div>

                        <div className="h-10 w-[1px] bg-white/5" />

                        <div className="flex gap-2">
                           <button className="px-6 py-2 bg-gold text-black font-black text-[10px] tracking-[0.2em] rounded-xl hover:bg-white transition-all uppercase shadow-lg shadow-gold/10">MEJORAR</button>
                           <button className="p-2 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all">
                              <Settings size={14} className="text-gray-400" />
                           </button>
                        </div>
                     </div>
                  </motion.div>
               )
            })}
        </div>

        {/* DEEP STATS PANEL (Image 3 Parity) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-surface/20 p-8 rounded-[40px] border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                 <Shield className="text-cyan w-6 h-6" />
                 <h4 className="font-black italic text-xl tracking-tight uppercase">DEFENSA</h4>
              </div>
              <div className="space-y-4">
                 <ProgressBar label="Organización" pct={85} color="cyan" />
                 <ProgressBar label="Bloqueos" pct={72} color="cyan" />
              </div>
           </div>

           <div className="bg-surface/20 p-8 rounded-[40px] border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                 <Activity className="text-gold w-6 h-6" />
                 <h4 className="font-black italic text-xl tracking-tight uppercase">CENTRO</h4>
              </div>
              <div className="space-y-4">
                 <ProgressBar label="Posesión" pct={64} color="gold" />
                 <ProgressBar label="Pases Clave" pct={48} color="gold" />
              </div>
           </div>

           <div className="bg-surface/20 p-8 rounded-[40px] border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                 <Target className="text-red-500 w-6 h-6" />
                 <h4 className="font-black italic text-xl tracking-tight uppercase">ATAQUE</h4>
              </div>
              <div className="space-y-4">
                 <ProgressBar label="Efectividad" pct={92} color="red" />
                 <ProgressBar label="Goles/P" pct={3.4} color="red" isStat />
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

const ProgressBar = ({ label, pct, color, isStat }: any) => (
   <div className="space-y-1.5">
      <div className="flex justify-between text-[10px] font-black tracking-widest uppercase text-gray-500">
         <span>{label}</span>
         <span className="text-white">{isStat ? pct : `${pct}%`}</span>
      </div>
      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
         <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: isStat ? '100%' : `${pct}%` }} 
            className={`h-full ${color === 'cyan' ? 'bg-cyan' : color === 'gold' ? 'bg-gold' : 'bg-red-500'}`} 
         />
      </div>
   </div>
)
