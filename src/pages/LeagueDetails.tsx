import React from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, Trophy, Star, ChevronRight, LayoutList, Target, Award, TrendingUp } from 'lucide-react'
import { useGameStore } from '../store/useGameStore'
import { ClubCrest } from '../components/ClubCrest'
import { MasterEliteCup } from '../components/MasterEliteCup'

export const LeagueDetails = () => {
  const { setPage, leagues } = useGameStore()
  const masterLeague = leagues.find(l => l.id === 'master-league')

  if (!masterLeague) return <div>No data found</div>

  return (
    <div className="min-h-screen bg-bg text-white pt-24 pb-12 px-6 md:px-12 flex flex-col items-center overflow-x-hidden">
      
      {/* HUD (Top) */}
      <div className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5 py-4 px-12 flex justify-between items-center text-white bg-black/60 backdrop-blur-xl">
        <button onClick={() => setPage('competitions')} className="flex items-center gap-2 font-rajdhani font-bold text-gray-400 hover:text-white transition-all uppercase tracking-widest text-sm">
          <ChevronLeft className="w-5 h-5" /> VOLVER
        </button>
        <h2 className="text-2xl font-rajdhani font-bold italic tracking-tighter text-gradient-legendary uppercase">{masterLeague.name}</h2>
        <div className="w-10 h-10" />
      </div>

      <div className="w-full max-w-6xl space-y-12">
        
        {/* League Overview Header with SPINNING CUP */}
        <div className="glass p-10 rounded-[48px] border-2 border-white/5 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
           <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-transparent pointer-events-none" />
           
           {/* LEFT: Trophy Spotlight */}
           <div className="relative group">
              <div className="absolute inset-0 bg-gold/20 blur-[100px] rounded-full opacity-30 group-hover:opacity-60 transition-all duration-1000" />
              <MasterEliteCup size={240} earned={false} animate={true} />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass px-6 py-2 rounded-full border border-gold/50 shadow-glow-gold">
                 <span className="text-[10px] font-black text-gold uppercase tracking-[0.3em] whitespace-nowrap italic">GRAN PREMIO FINAL</span>
              </div>
           </div>

           {/* CENTER: League Info */}
           <div className="flex-1 space-y-6 text-center lg:text-left">
              <div className="space-y-1">
                 <h3 className="text-6xl font-rajdhani font-black italic tracking-tighter uppercase leading-none">LIGA MASTER ELITE</h3>
                 <p className="text-xl font-mono tracking-[0.4em] text-gray-500 uppercase font-black">TEMPORADA 1 • JORNADA 12 / 38</p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                 <Badge icon={Target} label="PUESTO 4º" color="cyan" />
                 <Badge icon={TrendingUp} label="SUBIENDO" color="green" />
                 <Badge icon={Award} label="ASCENSO A PRÓXIMA DIVISIÓN" color="gold" />
              </div>
           </div>
           
           {/* RIGHT: Current Stats */}
           <div className="bg-black/40 p-8 rounded-[32px] border border-white/5 backdrop-blur-3xl flex gap-16 text-center shadow-inner">
              <div className="space-y-1">
                 <p className="text-[12px] text-gray-400 font-black uppercase tracking-widest opacity-60">Victorias</p>
                 <p className="text-4xl font-rajdhani font-black text-white italic">8</p>
              </div>
              <div className="space-y-1">
                 <p className="text-[12px] text-gray-400 font-black uppercase tracking-widest opacity-60">Puntos</p>
                 <p className="text-4xl font-rajdhani font-black text-gold italic">26</p>
              </div>
              <div className="space-y-1">
                 <p className="text-[12px] text-gray-400 font-black uppercase tracking-widest opacity-60">Racha</p>
                 <div className="flex gap-2 justify-center pt-2">
                    {['W', 'W', 'D', 'L', 'W'].map((s, i) => (
                      <div key={i} className={`w-4 h-4 rounded-full shadow-lg ${s === 'W' ? 'bg-green' : s === 'D' ? 'bg-gold' : 'bg-red'}`} />
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Standings Table with HIGH IMMERSION */}
        <div className="space-y-4">
           <div className="flex items-center justify-between px-6">
              <h4 className="text-xl font-rajdhani font-black italic uppercase tracking-tighter flex items-center gap-2">
                 <LayoutList className="text-gold" /> CLASIFICACIÓN GENERAL
              </h4>
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">ACTUALIZACIÓN EN TIEMPO REAL</p>
           </div>

           <div className="glass rounded-[48px] overflow-hidden border-2 border-white/5 shadow-2xl">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-white/5 border-b-2 border-white/10">
                       <th className="p-8 font-rajdhani font-black uppercase tracking-widest text-[11px] text-gray-400 text-center w-16">#</th>
                       <th className="p-8 font-rajdhani font-black uppercase tracking-widest text-[11px] text-gray-400 w-16">ESCUDO</th>
                       <th className="p-8 font-rajdhani font-black uppercase tracking-widest text-[11px] text-gray-400">CLUB / MÁNAGER</th>
                       <th className="p-8 font-rajdhani font-black uppercase tracking-widest text-[11px] text-gray-400 text-center">PJ</th>
                       <th className="p-8 font-rajdhani font-black uppercase tracking-widest text-[11px] text-gray-400 text-center">V—E—D</th>
                       <th className="p-8 font-rajdhani font-black uppercase tracking-widest text-[11px] text-gray-400 text-center">PTS</th>
                    </tr>
                 </thead>
                 <tbody>
                    {masterLeague.teams.map((team, i) => (
                      <motion.tr 
                        key={team.name}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 * i }}
                        className={`group border-b border-white/5 transition-all hover:bg-white/10 ${team.isUser ? 'bg-cyan/10' : ''}`}
                      >
                         <td className="p-8 text-center group-hover:scale-125 transition-transform">
                            <div className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center font-rajdhani font-black text-xl shadow-xl ${i < 3 ? 'bg-gold text-black shadow-glow-gold' : 'bg-surface text-gray-400 border border-white/10'}`}>
                               {i + 1}
                            </div>
                         </td>
                         <td className="p-8 text-center">
                            <div className="flex justify-center drop-shadow-xl group-hover:rotate-12 transition-transform">
                               <ClubCrest crest={team.crest} size={40} />
                            </div>
                         </td>
                         <td className="p-8 font-rajdhani font-black tracking-tight text-2xl">
                            <div className="flex items-center gap-4">
                              {team.isUser && <Star className="w-5 h-5 text-cyan fill-cyan animate-pulse" />}
                              <span className={team.isUser ? 'text-cyan shadow-glow-cyan uppercase italic' : 'text-white/90 uppercase italic'}>{team.name}</span>
                            </div>
                         </td>
                         <td className="p-8 text-center font-mono font-black text-gray-500 text-lg opacity-60">{team.played}</td>
                         <td className="p-8 text-center text-gray-400 font-mono font-black">
                            {team.won}—{team.drawn}—{team.lost}
                         </td>
                         <td className="p-8 text-center">
                            <div className={`font-rajdhani font-black text-4xl italic tracking-tighter ${team.isUser ? 'text-cyan' : 'text-white group-hover:text-gold transition-colors'}`}>{team.points}</div>
                         </td>
                      </motion.tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

      </div>
    </div>
  )
}

const Badge = ({ icon: Icon, label, color }: any) => {
   const colors: any = {
      cyan: 'bg-cyan/10 border-cyan/30 text-cyan shadow-glow-cyan',
      green: 'bg-green/10 border-green/30 text-green',
      gold: 'bg-gold/10 border-gold/30 text-gold shadow-glow-gold',
   }
   return (
      <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[9px] font-black uppercase tracking-widest ${colors[color]}`}>
         <Icon size={12} /> {label}
      </div>
   )
}
