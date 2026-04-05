import { motion } from 'framer-motion'
import { Trophy, Users, LayoutDashboard, MessageSquare, Bell, ChevronRight, Play, Palette, Zap, Star, Clock } from 'lucide-react'
import { StatusBar } from '../components/StatusBar'
import { ClubCrest } from '../components/ClubCrest'
import { useGameStore } from '../store/useGameStore'

export const Dashboard = () => {
  const { club, setPage, visualStyle } = useGameStore()

  return (
    <div className="min-h-screen bg-bg text-white pt-20 pb-24 px-6 md:px-12 flex flex-col items-center relative overflow-hidden font-theme">
      <StatusBar />
      
      {/* Background decorations based on style */}
      <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none">
         <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-blue-900/40 via-transparent to-transparent" />
         {visualStyle === 'futuristic' && (
           <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan/5 blur-[120px] rounded-full animate-pulse" />
         )}
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
        
        {/* Main Column */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Cinematic Match Hub Hero */}
          <div className="relative glass rounded-[40px] overflow-hidden aspect-[16/9] md:aspect-[3/1] border-2 shadow-glow">
            <img 
              src={club.stadium?.image || '/assets/pitch_top_down.png'} 
              className="absolute inset-0 w-full h-full object-cover opacity-50 brightness-50"
              alt="Stadium"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${visualStyle === 'classic' ? 'from-bg/90' : 'from-bg/80 via-transparent'} to-transparent`} />
            
            <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10">
               <div className="w-2 h-2 bg-red rounded-full animate-pulse" />
               <span className="text-[10px] font-mono tracking-widest font-bold uppercase">MASTER LEAGUE • LIVE BROADCAST</span>
            </div>

            <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex items-center justify-center gap-4 md:gap-16 text-center px-4">
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="relative group">
                  <div className="absolute -inset-4 blur-xl rounded-full opacity-30 group-hover:opacity-60 transition-opacity" style={{ backgroundColor: 'var(--theme-accent)' }} />
                  <ClubCrest crest={club.crest} size={100} animate />
                </div>
                <div className="text-lg font-bold truncate w-32 uppercase tracking-tighter text-white" style={{ color: 'var(--theme-primary)' }}>{club.name}</div>
              </motion.div>
              
              <div className="flex flex-col items-center gap-2 min-w-[120px]">
                <div className="flex items-center gap-6">
                   <span className="text-6xl font-black italic tracking-tighter text-white">2</span>
                   <div className="flex flex-col items-center gap-1">
                      <div className="w-1 h-8 bg-white/20 rounded-full" />
                      <div className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-gray-400">45'</div>
                   </div>
                   <span className="text-6xl font-black italic tracking-tighter text-white">2</span>
                </div>
                {visualStyle === 'futuristic' && (
                  <div className="w-full momentum-bar mt-4">
                     <div className="momentum-active bg-cyan" style={{ width: '65%' }} />
                     <div className="momentum-active bg-red" style={{ width: '35%' }} />
                  </div>
                )}
              </div>

              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="relative group">
                   <div className="absolute -inset-4 bg-red/20 blur-xl rounded-full opacity-30 group-hover:opacity-60 transition-opacity" />
                   <ClubCrest crest={useGameStore.getState().opponent.crest} size={100} animate />
                </div>
                <div className="text-lg font-bold truncate w-32 uppercase tracking-tighter text-gray-400 text-center">{useGameStore.getState().opponent.name}</div>
              </motion.div>
            </div>

            <button 
              onClick={() => setPage('pre-match')}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 btn-primary flex items-center gap-3 shadow-2xl"
            >
              <Zap className="w-5 h-5 fill-current" />
              SALTA AL CAMPO
            </button>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <DashboardCard icon={Trophy} title="Competiciones" color="gold" onClick={() => setPage('competitions')} style={visualStyle} />
            <DashboardCard icon={Users} title="Plantilla" color="cyan" onClick={() => setPage('squad')} style={visualStyle} />
            <DashboardCard icon={Bell} title="Noticias" color="green" onClick={() => {}} style={visualStyle} />
            <DashboardCard icon={MessageSquare} title="Chat" color="red" onClick={() => {}} style={visualStyle} />
          </div>

          {/* Upcoming Matches Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-3 italic uppercase tracking-tighter">
              <Clock className="w-6 h-6 text-gold" /> PRÓXIMOS ENCUENTROS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[1, 2].map((i) => (
                 <div key={i} className="glass rounded-3xl p-6 flex items-center justify-between transition-all hover:translate-x-2 cursor-pointer shadow-glow">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-surface rounded-xl border border-white/10">
                         <ClubCrest crest={useGameStore.getState().leagues[0].teams[i === 1 ? 4 : 5].crest} size={32} />
                      </div>
                      <div className="text-left">
                         <p className="font-bold text-white uppercase italic">vs {useGameStore.getState().leagues[0].teams[i === 1 ? 4 : 5].name}</p>
                         <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">MASTER LEAGUE • HOY 18:32</p>
                      </div>
                   </div>
                   <div className="p-2 bg-white/5 rounded-lg">
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="glass p-8 rounded-[40px] space-y-8 shadow-glow">
            <h3 className="font-bold text-xl border-b border-white/5 pb-4 uppercase italic tracking-tighter">RESUMEN CLUB</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Liga Actual</span>
                <span className="font-bold text-lg text-white" style={{ color: 'var(--theme-accent)' }}>POSICIÓN: 4º</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Estado Copa</span>
                <span className="text-red font-bold italic">NOT QUALIFIED</span>
              </div>
            </div>
            
            <button 
               onClick={() => setPage('crest-editor')}
               className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-sm tracking-widest transition-all hover:scale-105 active:scale-95 bg-surface border border-white/10 text-white uppercase"
            >
               <Palette className="w-4 h-4" /> MODIFICAR ESCUDO
            </button>
          </div>

          {/* Gold Pass Premium Card */}
          <div className="glass p-8 rounded-[40px] relative overflow-hidden group shadow-glow">
            {visualStyle === 'futuristic' && (
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent shadow-[0_0_15px_#FFB800]" />
            )}
            <div className="relative z-10">
               <h3 className="font-bold text-2xl mb-4 italic tracking-tighter text-white" style={{ color: 'var(--theme-secondary)' }}>GOLD PASS</h3>
               <div className="h-3 w-full bg-black/40 rounded-full mb-6 overflow-hidden relative border border-white/10">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: '75%' }}
                   className="h-full relative bg-gold"
                 >
                    <div className="absolute inset-0 bar-stream opacity-50" />
                 </motion.div>
               </div>
               <p className="text-[10px] text-gray-400 mb-6 tracking-widest uppercase font-mono">NIVEL 61 / 100 • <span className="text-gold font-bold">5 RECOMPENSAS</span></p>
               <button className="w-full py-4 rounded-2xl font-bold transition-all shadow-xl bg-white text-black hover:scale-105 hover:bg-gold uppercase">RECLAMAR TODO</button>
            </div>
            {visualStyle === 'classic' && (
              <div className="absolute -right-8 -bottom-8 opacity-5 text-white">
                 <Star size={180} />
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Nav Bar (Fixed Bottom) */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 glass rounded-[32px] p-2 flex items-center gap-2 shadow-2xl z-50">
        <NavButton icon={LayoutDashboard} active={true} onClick={() => setPage('dashboard')} style={visualStyle} />
        <NavButton icon={Users} onClick={() => setPage('squad')} style={visualStyle} />
        <NavButton icon={Trophy} onClick={() => setPage('trophy-room')} style={visualStyle} />
        <NavButton icon={Bell} onClick={() => {}} style={visualStyle} />
        <NavButton icon={MessageSquare} onClick={() => {}} style={visualStyle} />
      </nav>
    </div>
  )
}

const DashboardCard = ({ icon: Icon, title, color, onClick, style }: any) => {
  const isClassic = style === 'classic'
  
  const accentColors: any = {
    gold: 'var(--color-gold)',
    cyan: isClassic ? 'var(--theme-accent)' : 'var(--color-cyan)',
    green: 'var(--color-green)',
    red: 'var(--color-red)',
  }

  return (
    <motion.button 
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="glass group p-8 rounded-[32px] flex flex-col items-center gap-4 transition-all shadow-glow"
      style={{ borderColor: isClassic ? 'rgba(255,255,255,0.1)' : `rgba(${color}, 0.2)` }}
    >
      <div className="p-5 rounded-2xl bg-surface border border-white/5 shadow-inner">
        <Icon className="w-8 h-8" style={{ color: accentColors[color] }} />
      </div>
      <span className="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors">{title}</span>
    </motion.button>
  )
}

const NavButton = ({ icon: Icon, active, onClick, style }: any) => {
  const isClassic = style === 'classic'
  return (
    <button 
      onClick={onClick}
      className={`p-5 rounded-[24px] transition-all relative ${active ? (isClassic ? 'bg-white text-black shadow-xl' : 'bg-cyan text-black shadow-glow') : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}
    >
      <Icon className="w-6 h-6 relative z-10" />
    </button>
  )
}
