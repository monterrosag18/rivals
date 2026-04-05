import { motion } from 'framer-motion'
import { Zap, Shield, Users, Thermometer, Wind, Play, ChevronLeft, Tv, BarChart3 } from 'lucide-react'
import { useGameStore } from '../store/useGameStore'
import { ClubCrest } from '../components/ClubCrest'

export const PreMatchPage = () => {
  const { club, setPage, visualStyle } = useGameStore()
  
  const stadiumImg = "/assets/stadium_bg.png"
  const isFuturistic = visualStyle === 'futuristic'

  return (
    <div className="fixed inset-0 z-[100] bg-bg overflow-hidden flex items-center justify-center h-screen w-screen font-theme">
      
      {/* CINEMATIC BACKGROUND FX */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img 
          src={stadiumImg}
          className="w-full h-full object-cover brightness-[0.5] contrast-[1.2] blur-[4px]"
          alt="Stadium"
        />
        {/* Large Vignette for Realism */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,6,15,0.9)_100%)]" />
        
        {/* Broadcast flares */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white text-white/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
      </motion.div>

      {/* VS WATERMARK (WATERMARK BEHIND PLATES) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
         <motion.span 
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 0.05, scale: 1.2 }}
           className="text-[40rem] font-black italic select-none"
         >
            VS
         </motion.span>
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 w-full max-w-7xl px-8 flex flex-col items-center justify-between h-full py-16">
        
        {/* Match Header (Broadcast Style) */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
           <div className="flex items-center gap-3 bg-red/20 px-3 py-1 border border-red/30 rounded-md">
              <div className="w-1.5 h-1.5 bg-red rounded-full animate-pulse" />
              <span className="text-[10px] font-mono font-black tracking-widest text-red uppercase">LIVE BROADCAST</span>
           </div>
           <div className="text-center">
              <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter text-white uppercase italic leading-none drop-shadow-2xl">THE SHOWDOWN</h1>
              <p className="text-xs font-mono tracking-[0.6em] text-gold uppercase mt-2 font-bold opacity-80 underline underline-offset-8">Master League • Matchday 12</p>
           </div>
        </motion.div>

        {/* VERSES BATTLE (REALISTIC PLATES) */}
        <div className="w-full flex items-center justify-center gap-4 md:gap-12 lg:gap-24">
           
           {/* HOME TEAM PLATE */}
           <motion.div 
             initial={{ x: -100, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 0.5, type: "spring" }}
             className="flex-1 flex flex-col items-end gap-6 text-right"
           >
              <div className="relative group">
                 {/* Atmosphere Light */}
                 <div className="absolute -inset-12 blur-3xl opacity-30 transition-opacity" style={{ background: 'var(--theme-accent)' }} />
                 <div className="glass p-12 rounded-[60px] border-2 shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500" style={{ borderColor: 'var(--theme-border)' }}>
                    <ClubCrest crest={club.crest} size={180} animate />
                 </div>
              </div>
              <div className="space-y-4">
                 <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white leading-none">{club.name}</h2>
                 <div className="flex justify-end gap-2">
                    {['W', 'W', 'L', 'W', 'W'].map((r, i) => (
                      <span key={i} className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold border ${r === 'W' ? 'bg-green/10 border-green text-green' : 'bg-red/10 border-red text-red'}`}>{r}</span>
                    ))}
                 </div>
              </div>
           </motion.div>

           {/* CINEMATIC VERTICAL SEPARATOR */}
           <div className="h-[400px] w-px bg-gradient-to-b from-transparent via-white/40 to-transparent relative">
              <motion.div 
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 blur-[2px] bg-white/20" 
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg p-4 border border-white/10 rounded-full scale-125 shadow-2xl">
                 <span className="text-2xl font-black italic text-gold">VS</span>
              </div>
           </div>

           {/* AWAY TEAM PLATE */}
           <motion.div 
             initial={{ x: 100, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 0.5, type: "spring" }}
             className="flex-1 flex flex-col items-start gap-6 text-left"
           >
              <div className="relative group">
                 <div className="absolute -inset-12 blur-3xl opacity-30 transition-opacity bg-red" />
                 <div className="glass p-12 rounded-[60px] border-2 border-red/20 shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500">
                    <div className="w-44 h-44 bg-surface border-4 border-red/40 rounded-[48px] flex items-center justify-center font-bold text-9xl text-red shadow-glow-red italic">L</div>
                 </div>
              </div>
              <div className="space-y-4">
                 <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white leading-none">LA MAFIA RS</h2>
                 <div className="flex justify-start gap-2">
                    {['L', 'L', 'D', 'W', 'L'].map((r, i) => (
                      <span key={i} className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold border ${r === 'W' ? 'bg-green/10 border-green text-green' : r === 'L' ? 'bg-red/10 border-red text-red' : 'bg-gray-500/10 border-gray-500 text-gray-500'}`}>{r}</span>
                    ))}
                 </div>
              </div>
           </motion.div>
        </div>

        {/* HEAD-TO-HEAD INFOGRAPHIC */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="w-full max-w-5xl glass p-8 rounded-[40px] shadow-glow flex items-stretch gap-12 border-white/5"
        >
           {/* Home Top Player Info */}
           <div className="flex-1 flex items-center gap-6">
              <div className="w-24 h-24 rounded-3xl bg-surface border-2 flex items-center justify-center text-4xl text-white font-black italic" style={{ borderColor: 'var(--theme-accent)', color: 'var(--theme-accent)' }}>GK</div>
              <div className="text-left flex-1">
                 <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                    <Tv size={12} /> TOP PERFORMER
                 </p>
                 <p className="font-black text-3xl uppercase italic text-white tracking-tighter">BUFFON MASTER</p>
                 <div className="mt-3 space-y-2">
                    <StatBar label="OFFENSE" val={88} color="var(--theme-accent)" isLeft />
                    <StatBar label="DEFENSE" val={96} color="var(--theme-accent)" isLeft />
                    <StatBar label="FORM" val={92} color="var(--theme-accent)" isLeft />
                 </div>
              </div>
           </div>

           {/* Technical Data Feed (Center) */}
           <div className="hidden md:flex flex-col items-center justify-center gap-6 px-8 border-x border-white/5">
              <InfoData icon={Thermometer} val="22°C" label="TEMP" />
              <InfoData icon={Wind} val="12KM/H" label="WIND" />
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                 <BarChart3 className="text-gold" size={24} />
              </div>
           </div>

           {/* Away Top Player Info */}
           <div className="flex-1 flex items-center flex-row-reverse gap-6">
              <div className="w-24 h-24 rounded-3xl bg-surface border-2 border-red/40 flex items-center justify-center text-4xl text-red font-black italic">ST</div>
              <div className="text-right flex-1">
                 <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 flex items-center justify-end gap-2 text-right">
                    TOP PERFORMER <Tv size={12} />
                 </p>
                 <p className="font-black text-3xl uppercase italic text-gray-300 tracking-tighter">GONZALO R.</p>
                 <div className="mt-3 space-y-2">
                    <StatBar label="OFFENSE" val={92} color="#FF2D55" isLeft={false} />
                    <StatBar label="DEFENSE" val={82} color="#FF2D55" isLeft={false} />
                    <StatBar label="FORM" val={88} color="#FF2D55" isLeft={false} />
                 </div>
              </div>
           </div>
        </motion.div>

        {/* CROWD ATMOSPHERE & ACTION */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex items-center gap-12"
        >
           <button 
             onClick={() => setPage('dashboard')}
             className="px-8 py-4 rounded-2xl border border-white/10 text-gray-400 font-bold hover:bg-white/5 transition-all flex items-center gap-3 uppercase tracking-widest text-xs"
           >
              <ChevronLeft className="w-4 h-4" /> GESTIÓN DEL EQUIPO
           </button>
           <button 
             onClick={() => setPage('match')}
             className="btn-primary flex items-center gap-6 text-3xl px-16 py-6 rounded-[40px] shadow-glow group overflow-hidden relative"
           >
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              <Play className="w-10 h-10 fill-current" />
              EMPEZAR EL PARTIDO
           </button>
        </motion.div>

      </div>
    </div>
  )
}

const StatBar = ({ label, val, color, isLeft }: any) => (
  <div className={`flex flex-col ${isLeft ? 'items-start' : 'items-end'}`}>
    <span className="text-[8px] font-black tracking-widest uppercase opacity-40 mb-1">{label}</span>
    <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden flex">
       <div className={`h-full ${isLeft ? 'ml-0' : 'mr-0 ml-auto'}`} style={{ width: `${val}%`, backgroundColor: color }} />
    </div>
  </div>
)

const InfoData = ({ icon: Icon, val, label }: any) => (
  <div className="flex flex-col items-center">
     <div className="flex items-center gap-1 text-[10px] font-black text-white italic">
        <Icon size={12} className="text-gold" />
        <span>{val}</span>
     </div>
     <span className="text-[7px] font-mono tracking-widest text-gray-600 font-black">{label}</span>
  </div>
)
