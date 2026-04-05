import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Shield, Target, Activity, Users, ChevronRight, Trophy, AlertCircle, TrendingUp, Clock, Swords, ChevronLeft, Star, Coins, MessageSquare, Bell, User as UserIcon } from 'lucide-react'
import { useGameStore } from '../store/useGameStore'
import { ClubCrest } from '../components/ClubCrest'
import { SoccerKit } from '../components/SoccerKit'

interface MatchDuel {
  id: number
  line: 'DEF' | 'MID' | 'ATT'
  playerName: string
  rivalName: string
  userPower: number
  awayPower: number
  won?: boolean
  goalChance?: number
}

interface FloatingValue {
  id: number
  value: string
  x: number
  y: number
}

type MatchView = 'BATTLE_LIST' | 'LINE_DETAIL'

export const MatchPage = () => {
  const { club, opponent, setPage, players, user } = useGameStore()
  
  // VIEW STATE
  const [currentView, setCurrentView] = useState<MatchView>('BATTLE_LIST')
  const [selectedSlot, setSelectedSlot] = useState(6) // User slot
  const [multiplier, setMultiplier] = useState(1)
  
  // MATCH TIMER (180s = 3 minutes)
  const [timeLeft, setTimeLeft] = useState(180)
  const [isResolving, setIsResolving] = useState(false)
  const [finalScore, setFinalScore] = useState({ user: 0, away: 0 })
  const [isFinished, setIsFinished] = useState(false)
  
  // ENERGY & DUELS
  const [energy, setEnergy] = useState(user.energy || 50)
  const [maxEnergy] = useState(50)
  
  const [duels, setDuels] = useState<MatchDuel[]>(() => [
    { id: 0, line: 'ATT', playerName: players[8]?.name || 'ATT BOT', rivalName: opponent.players[8]?.name || 'ATT RIVAL', userPower: 1500, awayPower: 1600, goalChance: 45 },
    { id: 1, line: 'ATT', playerName: players[9]?.name || 'ATT BOT', rivalName: opponent.players[9]?.name || 'ATT RIVAL', userPower: 1400, awayPower: 1300, goalChance: 45 },
    { id: 2, line: 'ATT', playerName: players[10]?.name || 'ATT BOT', rivalName: opponent.players[10]?.name || 'ATT RIVAL', userPower: 1600, awayPower: 1500, goalChance: 45 },
    
    { id: 3, line: 'MID', playerName: players[4]?.name || 'MID BOT', rivalName: opponent.players[4]?.name || 'MID RIVAL', userPower: 1200, awayPower: 1300, goalChance: 20 },
    { id: 4, line: 'MID', playerName: players[5]?.name || 'MID BOT', rivalName: opponent.players[5]?.name || 'MID RIVAL', userPower: 1100, awayPower: 1100, goalChance: 20 },
    { id: 5, line: 'MID', playerName: players[6]?.name || 'MID BOT', rivalName: opponent.players[6]?.name || 'MID RIVAL', userPower: 1000, awayPower: 1050, goalChance: 20 },
    { id: 6, line: 'MID', playerName: 'TÚ (ZRK)', rivalName: opponent.players[7]?.name || 'MID RIVAL', userPower: 950, awayPower: 1200, goalChance: 20 },
    
    { id: 7, line: 'DEF', playerName: players[0]?.name || 'GK BOT', rivalName: opponent.players[0]?.name || 'GK RIVAL', userPower: 1000, awayPower: 1200, goalChance: 5 },
    { id: 8, line: 'DEF', playerName: players[1]?.name || 'DEF BOT', rivalName: opponent.players[1]?.name || 'DEF RIVAL', userPower: 800, awayPower: 900, goalChance: 5 },
    { id: 9, line: 'DEF', playerName: players[2]?.name || 'DEF BOT', rivalName: opponent.players[2]?.name || 'DEF RIVAL', userPower: 900, awayPower: 850, goalChance: 5 },
    { id: 10, line: 'DEF', playerName: players[3]?.name || 'DEF BOT', rivalName: opponent.players[3]?.name || 'DEF RIVAL', userPower: 700, awayPower: 1100, goalChance: 5 },
  ])
  
  const [floatingValues, setFloatingValues] = useState<FloatingValue[]>([])
  const timerRef = useRef<any>(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timerRef.current)
          resolveMatch()
          return 0
        }
        return prev - 1
      })

      // SIMULATE BOT & RIVAL POWER GENERATION
      setDuels(prev => prev.map((duel, i) => {
        const botPush = i === selectedSlot ? 0 : Math.floor(Math.random() * 200) + 100
        const rivalPush = Math.floor(Math.random() * 250) + 120
        return {
          ...duel,
          userPower: duel.userPower + botPush,
          awayPower: duel.awayPower + rivalPush
        }
      }))

      // REGEN ENERGY
      setEnergy(prev => Math.min(maxEnergy, prev + 0.12))
    }, 1000)

    return () => clearInterval(timerRef.current)
  }, [selectedSlot])

  // USER ACTION (HIT LINE)
  const handleHit = (e: React.MouseEvent) => {
    if (energy < multiplier || timeLeft <= 0) return

    setEnergy(prev => prev - multiplier)
    const points = (Math.floor(Math.random() * 1500) + 2500) * multiplier
    
    setDuels(prev => prev.map((d, i) => i === selectedSlot ? { ...d, userPower: d.userPower + points } : d))
    
    const newId = Date.now()
    setFloatingValues(prev => [...prev, { id: newId, value: `+${(points >= 1000 ? (points/1000).toFixed(1) + 'k' : points)}`, x: e.clientX, y: e.clientY }])
    setTimeout(() => setFloatingValues(prev => prev.filter(f => f.id !== newId)), 800)
  }

  // FINAL RESOLUTION OF THE BATTLES
  const resolveMatch = () => {
    setIsResolving(true)
    setTimeout(() => {
       let userGoals = 0
       let awayGoals = 0

       const finalDuels = duels.map(d => {
          const won = d.userPower > d.awayPower
          if (won) {
            if (Math.random() * 100 < (d.goalChance || 0)) {
               userGoals++
            }
          } else {
            if (Math.random() * 100 < (d.goalChance || 0) * 0.6) {
               awayGoals++
            }
          }
          return { ...d, won }
       })

       setDuels(finalDuels)
       setFinalScore({ user: userGoals, away: awayGoals })
       setIsFinished(true)
       setIsResolving(false)
    }, 2500)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden font-rajdhani relative select-none">
      
      {/* OPTIMIZED STADIUM ENVIRONMENT - LESS FILTERS, NATURAL LOOK */}
      <div className={`absolute inset-0 z-0 transition-all duration-700 ease-in-out ${currentView === 'LINE_DETAIL' ? 'scale-150 translate-y-[15%]' : 'scale-100 opacity-60'}`}>
         
         {/* STADIUM BACKDROP (PHOTOGRAPHIC) - NO INTENSE BLUR */}
         <div className="absolute inset-0 z-0 overflow-hidden bg-black">
            <img 
              src="/assets/stadium_bg.png" 
              className="w-full h-full object-cover opacity-30" 
              alt="Stadium Backdrop" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
         </div>

         {/* PITCH TEXTURE (PHOTOGRAPHIC) - NATURAL GREEN */}
         <div className="absolute inset-0 z-10">
            <img 
               src="/assets/pitch_top_down.png" 
               className="w-full h-full object-cover"
               alt="Pitch"
               style={{ opacity: club.stadiumLevel === 3 ? 0.9 : 0.8 }}
            />
            
            {/* STADIUM LIGHTING (CLEANER) */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/60" />
            
            {/* PITCH LINES (CLEAN WHITE) */}
            <div className="absolute inset-0 opacity-20">
               <div className="absolute left-1/2 -translate-x-1/2 inset-y-0 w-[1px] bg-white" />
               <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-48 h-48 border border-white rounded-full" />
               <div className="absolute inset-x-20 bottom-0 h-96 border-x border-t border-white" />
            </div>
         </div>
      </div>

      {/* TOP HUD (SPORTS BROADCAST STYLE - LIGHTER) */}
      <div className="fixed top-0 left-0 w-full z-50 bg-black/90 border-b border-white/5 px-6 py-2 flex flex-col items-center">
         <div className="flex items-center justify-between w-full max-w-4xl h-8">
            <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
               <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                  <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                  <span className="text-white">144</span>
               </div>
               <div className="flex items-center gap-2">
                  <span className="tracking-widest uppercase text-[9px]">Progreso Nivel</span>
                  <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                     <div className="w-1/3 h-full bg-gold transition-all duration-700" />
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-400 fill-green-400" />
                  <span className="font-mono font-bold text-sm">{Math.floor(energy)}/{maxEnergy}</span>
               </div>
               <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-gold fill-gold" />
                  <span className="font-bold text-sm text-gold">295</span>
               </div>
            </div>
         </div>

         {/* MATCH SCOREBAR (CLEANER) */}
         <div className="w-full max-w-4xl py-3 flex items-center justify-between border-t border-white/5 mt-2">
            <button 
              onClick={() => currentView === 'LINE_DETAIL' ? setCurrentView('BATTLE_LIST') : setPage('dashboard')}
              className="p-2.5 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/5"
            >
               <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-8">
               <div className="flex items-center gap-3">
                  <ClubCrest crest={club.crest} size={32} />
                  <p className="text-sm font-black uppercase text-white tracking-tighter">{club.name}</p>
               </div>
               
               <div className="flex items-center gap-4 bg-black/60 px-8 py-2 rounded-xl border border-white/10">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-2xl font-black italic tracking-tighter tabular-nums">{formatTime(timeLeft)}</span>
                  <div className="w-2 h-2 bg-white/20 rounded-full" />
               </div>

               <div className="flex items-center gap-3">
                  <p className="text-sm font-black uppercase text-gray-400 tracking-tighter text-right">{opponent.name}</p>
                  <ClubCrest crest={opponent.crest} size={32} />
               </div>
            </div>

            <div className="w-8 h-8" />
         </div>
      </div>

      {/* CONTENT AREA */}
      <div className="relative z-10 pt-36 pb-32 h-screen overflow-hidden">
         <AnimatePresence mode="wait">
            {currentView === 'BATTLE_LIST' ? (
               <motion.div 
                 key="list"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 className="h-full overflow-y-auto px-6 custom-scrollbar"
               >
                  <div className="w-full max-w-4xl mx-auto space-y-2">
                     <p className="text-center text-[9px] font-black tracking-[0.4em] text-gray-500 uppercase pb-3">ESTADO ACTUAL DEL PARTIDO</p>
                     {duels.map((duel) => (
                        <DuelRow 
                           key={duel.id} 
                           duel={duel} 
                           club={club}
                           opponent={opponent}
                           onClick={() => { setSelectedSlot(duel.id); setCurrentView('LINE_DETAIL'); }} 
                        />
                     ))}
                  </div>
               </motion.div>
            ) : (
               <motion.div 
                 key="detail"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 1.05 }}
                 transition={{ duration: 0.4 }}
                 className="h-full flex flex-col items-center justify-center gap-12 relative"
               >
                  {/* FIELD ZOOM AREA */}
                  <div className="flex items-center justify-center gap-32 w-full max-w-5xl px-8 z-10">
                     <FieldCard name={duels[selectedSlot].playerName} isUser kit={club.kit} />
                     <FieldCard name={duels[selectedSlot].rivalName} isRival kit={opponent.crest} />
                     
                     {/* OPTIMIZED BALL */}
                     <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 z-20">
                        <div className="w-full h-full bg-white rounded-full relative overflow-hidden shadow-2xl ring-2 ring-black/20">
                           <div className="absolute top-0 right-0 w-7 h-7 bg-black rotate-45" />
                           <div className="absolute bottom-0 left-0 w-7 h-7 bg-black rotate-45" />
                        </div>
                     </div>
                  </div>

                  {/* TACTICAL OPTIONS (NATURAL) */}
                  <div className="flex gap-4 p-4 z-10">
                     {[1, 2, 3].map(i => (
                        <div 
                          key={i} 
                          className="w-28 h-40 bg-black/80 rounded-2xl border border-white/10 flex flex-col items-center justify-center hover:bg-black transition-colors md:cursor-pointer"
                        >
                           <p className="text-[9px] font-black text-gray-500 uppercase mb-2">TÁCTICA</p>
                           <p className="text-xl font-black text-white italic tracking-tighter">{club.name.substring(0,3).toUpperCase()}</p>
                           <div className="mt-4 p-2.5 rounded-full bg-white/5 border border-white/5">
                              <Star className="w-4 h-4 text-gold fill-gold" />
                           </div>
                        </div>
                     ))}
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* FOOTER BAR (CLEANER) */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-black/95 border-t border-white/5 flex flex-col items-center gap-6 py-6 px-10 transition-all">
         
         <AnimatePresence>
           {currentView === 'LINE_DETAIL' && (
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 20 }}
               className="flex items-center justify-between w-full max-w-2xl gap-5"
             >
                <button className="p-5 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
                   <MessageSquare className="w-7 h-7 text-white/50" />
                </button>

                <button 
                   onMouseDown={handleHit}
                   className={`flex-1 h-20 rounded-3xl bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition-all flex items-center justify-center ${energy < multiplier ? 'opacity-40 grayscale' : 'shadow-lg shadow-blue-900/20'}`}
                >
                   <span className="text-4xl font-black italic tracking-tighter text-white uppercase">ATACAR</span>
                </button>

                <button 
                  onClick={() => setMultiplier(prev => prev === 1 ? 10 : 1)}
                  className={`px-8 h-20 bg-white/5 rounded-3xl border transition-all flex items-center justify-center ${multiplier === 10 ? 'border-gold bg-gold/10 text-gold' : 'border-white/10 text-white/40'}`}
                >
                   <div className="flex flex-col items-center">
                      <span className="text-2xl font-black italic">x{multiplier}</span>
                      <Zap className={`w-4 h-4 fill-current mt-0.5 ${multiplier === 10 ? 'animate-pulse' : ''}`} />
                   </div>
                </button>
             </motion.div>
           )}
         </AnimatePresence>

         <div className={`w-full max-w-xl flex justify-between items-center transition-opacity duration-500 ${currentView === 'LINE_DETAIL' ? 'opacity-30' : 'opacity-100 h-10'}`}>
            <FooterIcon icon={UserIcon} label="PERFIL" />
            <FooterIcon icon={Shield} label="EQUIPO" />
            <FooterIcon icon={Users} label="AMIGOS" />
            <FooterIcon icon={Bell} label="NOTICIAS" />
            <FooterIcon icon={MessageSquare} label="CHAT" />
         </div>
      </div>

      {/* OPTIMIZED FLOATING VALUES */}
      <div className="fixed inset-0 pointer-events-none z-[100]">
         <AnimatePresence>
            {floatingValues.map(f => (
               <motion.div
                 key={f.id}
                 initial={{ opacity: 1, y: f.y, x: f.x }}
                 animate={{ opacity: 0, y: f.y - 120, scale: 2 }}
                 className="absolute text-4xl font-black italic tracking-tighter text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]"
               >
                 {f.value}
               </motion.div>
            ))}
         </AnimatePresence>
      </div>

      {/* RESOLUTION (CLEANER) */}
      <AnimatePresence>
         {isResolving && (
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
             className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center gap-8"
           >
              <Swords className="w-24 h-24 text-gold animate-bounce" />
              <div className="text-center">
                 <h3 className="text-4xl font-black italic uppercase tracking-tighter">FIN DEL ENCUENTRO</h3>
                 <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.4em] mt-2">DETERMINANDO MARCADOR...</p>
              </div>
           </motion.div>
         )}
      </AnimatePresence>

      {/* FINAL RESULT MODAL (OPTIMIZED) */}
      {isFinished && (
         <div className="fixed inset-0 z-[210] bg-black/98 flex flex-col items-center justify-center p-10">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-12 max-w-4xl w-full">
               <h2 className="text-5xl font-black italic uppercase text-gray-500">RESUMEN DEL PARTIDO</h2>
               <div className="flex items-center justify-center gap-24">
                  <div className="flex flex-col items-center gap-6">
                     <ClubCrest crest={club.crest} size={150} />
                     <p className="text-[10rem] font-black italic leading-none">{finalScore.user}</p>
                  </div>
                  <div className="text-4xl font-black text-gray-800 italic">VS</div>
                  <div className="flex flex-col items-center gap-6">
                     <ClubCrest crest={opponent.crest} size={150} />
                     <p className="text-[10rem] font-black italic leading-none opacity-40">{finalScore.away}</p>
                  </div>
               </div>
               <button onClick={() => setPage('dashboard')} className="btn-primary text-2xl px-20 py-6">VOLVER AL CLUB</button>
            </motion.div>
         </div>
      )}
    </div>
  )
}

const DuelRow = ({ duel, club, opponent, onClick }: any) => {
   const progress = (duel.userPower / (duel.userPower + duel.awayPower)) * 100
   
   return (
      <div 
         onClick={onClick}
         className="w-full h-24 bg-black/70 border border-white/5 flex items-center justify-between px-8 cursor-pointer hover:bg-black transition-all rounded-2xl group"
      >
         <div className="flex items-center gap-6 w-[220px]">
           <div className="w-14 h-16 relative flex items-center justify-center transition-transform group-hover:scale-110">
              <SoccerKit kit={club.kit} size={64} />
           </div>
           <div>
              <p className="text-sm font-black uppercase text-white truncate max-w-[120px]">{duel.playerName}</p>
              <p className="text-[8px] font-black text-gray-500 tracking-widest uppercase">NIVEL PRO</p>
           </div>
         </div>

         <div className="flex-1 flex flex-col items-center gap-2 mx-8 max-w-sm">
            <div className="w-full flex justify-between text-xs font-black font-mono">
               <span className="text-white">{(duel.userPower >= 1000 ? (duel.userPower/1000).toFixed(1) + 'K' : duel.userPower)}</span>
               <span className="text-gray-500">{(duel.awayPower >= 1000 ? (duel.awayPower/1000).toFixed(1) + 'K' : duel.awayPower)}</span>
            </div>
            
            <div className="w-full h-3 bg-black/80 rounded-full overflow-hidden flex relative border border-white/5">
               <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-white z-20" />
               <motion.div animate={{ width: `${progress}%` }} className="h-full bg-blue-600" />
               <motion.div animate={{ width: `${100 - progress}%` }} className="h-full bg-red-800" />
            </div>
         </div>

         <div className="flex items-center gap-6 w-[220px] justify-end">
           <div className="text-right">
              <p className="text-sm font-black uppercase text-gray-500 truncate max-w-[120px]">{duel.rivalName}</p>
              <p className="text-[8px] font-black text-gray-700 tracking-widest uppercase">RIVAL</p>
           </div>
           <div className="w-14 h-16 relative flex items-center justify-center opacity-40 group-hover:opacity-100">
              <SoccerKit kit={{ primaryColor: opponent.crest.secondaryColor, secondaryColor: opponent.crest.primaryColor, accentColor: '#333', pattern: 'solid', collarType: 'round' }} size={56} />
           </div>
         </div>
      </div>
   )
}

const FieldCard = ({ name, isUser, isRival, kit }: any) => {
   const jerseyKit = isUser ? kit : { primaryColor: kit.secondaryColor, secondaryColor: kit.primaryColor, accentColor: '#333', pattern: 'solid', collarType: 'round' }
   
   return (
      <div className={`p-10 bg-black/40 rounded-[40px] border-2 flex flex-col items-center gap-6 shadow-2xl relative ${isUser ? 'border-blue-500' : 'border-red-800'}`}>
         {isUser && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[9px] font-black px-5 py-2 rounded-full border border-white/20 whitespace-nowrap uppercase">
               TU POSICIÓN
            </div>
         )}
         
         <div className="relative transform scale-110">
            <SoccerKit kit={jerseyKit} size={140} />
            <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full border-2 flex items-center justify-center font-black italic shadow-2xl ${isUser ? 'bg-blue-600 border-white' : 'bg-red-800 border-white'}`}>
               <span className="text-lg">{isUser ? '10' : '17'}</span>
            </div>
         </div>

         <div className="space-y-1.5 text-center mt-2">
            <p className="text-3xl font-black uppercase tracking-tighter italic">{name}</p>
            <div className="flex gap-2 justify-center items-center bg-black/40 px-4 py-1.5 rounded-full border border-white/5">
               <span className="text-[10px] font-black text-gold tracking-widest uppercase">PODER</span>
               <span className="text-xl font-black italic tabular-nums">813</span>
            </div>
         </div>
      </div>
   )
}

const FooterIcon = ({ icon: Icon, label }: any) => (
   <button className="flex flex-col items-center gap-2 group w-14">
      <div className="p-2.5 rounded-xl group-hover:bg-white/5 transition-all text-gray-600 group-hover:text-white">
         <Icon size={22} strokeWidth={2.5} />
      </div>
      <span className="text-[7px] font-black text-gray-700 tracking-widest uppercase group-hover:text-white">{label}</span>
   </button>
)
