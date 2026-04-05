import { motion } from 'framer-motion'
import { ChevronLeft, User, Star, Award, History, LayoutDashboard, Database, TrendingUp, Cpu, Monitor, Zap, Landmark } from 'lucide-react'
import { useGameStore } from '../store/useGameStore'
import { ClubCrest } from '../components/ClubCrest'

export const ProfilePage = () => {
  const { user, club, setPage, visualStyle, setVisualStyle } = useGameStore()

  return (
    <div className="min-h-screen bg-bg text-white pt-24 pb-12 px-6 md:px-12 flex flex-col items-center font-theme">
      <div className="w-full max-w-4xl space-y-12">
        
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-12">
           <div className="relative group">
              <div className="absolute -inset-1 blur-xl opacity-40 rounded-full" style={{ backgroundColor: 'var(--theme-accent)' }} />
              <div className="w-32 h-32 rounded-full border-4 border-white/10 flex items-center justify-center bg-surface relative z-10 box-shadow-none">
                 <User size={64} className="text-white" />
                 <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gold rounded-full border-4 border-bg flex items-center justify-center shadow-lg">
                    <Star size={16} className="text-black fill-current" />
                 </div>
              </div>
           </div>

           <div className="text-center md:text-left flex-1 space-y-2">
              <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white">{user.username}</h1>
              <p className="text-xs font-mono tracking-[0.4em] text-gold uppercase font-bold">Mánager Élite Leyenda</p>
              
              <div className="grid grid-cols-2 gap-4 w-full mt-8 border-t border-white/5 pt-8">
                 <div className="space-y-1">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Nivel</p>
                    <p className="text-2xl font-bold text-white">{user.level}</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Títulos</p>
                    <p className="text-2xl font-bold text-gold">22</p>
                 </div>
              </div>

              {/* Theme Switcher */}
              <div className="w-full mt-8 space-y-4">
                 <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Modo de Transmisión</p>
                 <div className="grid grid-cols-2 gap-2 p-1 bg-black/40 rounded-xl border border-white/5">
                    <button 
                      onClick={() => setVisualStyle('classic')}
                      className={`flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${visualStyle === 'classic' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                       <Monitor size={14} /> Clásico
                    </button>
                    <button 
                      onClick={() => setVisualStyle('futuristic')}
                      className={`flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${visualStyle === 'futuristic' ? 'bg-cyan text-black shadow-glow' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                       <Zap size={14} /> E-Sports
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Career Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <ProfileStatCard icon={TrendingUp} label="Ratio de Victorias" value="78%" trend="+2.5% este mes" color="green" />
           <ProfileStatCard icon={Database} label="Reputación Mundial" value="95.4K" trend="Rango Mundial #412" color="cyan" />
           <ProfileStatCard icon={LayoutDashboard} label="Prestigio de Táctica" value="S-Tier" trend="Basado en 144 victorias" color="gold" />
           <ProfileStatCard icon={Cpu} label="Eficiencia de Mercado" value="A+" trend="32M en beneficios" color="red" />
        </div>

        {/* Achievements Section */}
        <div className="glass p-8 rounded-[40px] space-y-8 shadow-glow">
           <h3 className="text-xl font-bold uppercase italic tracking-tighter flex items-center gap-3">
              <Award className="text-gold" /> Logros Recientes del Mánager
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AchievementItem icon="ML" title="Líder de Liga Master" desc="Racha de 5 victorias consecutivas" />
              <AchievementItem icon="T1" title="Talent Scout" desc="Fichaje de 5 leyendas" />
           </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
           {/* Stadium Selector */}
           <div 
             onClick={() => setPage('stadium-selector')}
             className="glass p-6 rounded-3xl flex items-center gap-4 group hover:bg-white/5 transition-all cursor-pointer border-white/5 border hover:border-gold/30"
           >
              <div className="p-4 bg-surface rounded-2xl group-hover:bg-gold/20 transition-all">
                 <Landmark className="text-gray-400 group-hover:text-gold" />
              </div>
              <div className="flex-1 text-left">
                 <p className="font-bold uppercase text-xs tracking-[0.2em] text-white">Gestión de Estadio</p>
                 <p className="text-[10px] text-gray-500 uppercase font-black">Evoluciona tu sede y atmósfera</p>
              </div>
              <ChevronLeft className="rotate-180 text-gray-500 group-hover:text-white transition-all" />
           </div>

           {/* Kit Editor */}
           <div 
             onClick={() => setPage('kit-editor')}
             className="glass p-6 rounded-3xl flex items-center gap-4 group hover:bg-white/5 transition-all cursor-pointer border-white/5 border hover:border-blue-500/30"
           >
              <div className="p-4 bg-surface rounded-2xl group-hover:bg-blue-500/20 transition-all">
                 <Zap className="text-gray-400 group-hover:text-blue-400" />
              </div>
              <div className="flex-1 text-left">
                 <p className="font-bold uppercase text-xs tracking-[0.2em] text-white">Diseñador de Equipación</p>
                 <p className="text-[10px] text-gray-500 uppercase font-black">Personaliza los colores y patrones del club</p>
              </div>
              <ChevronLeft className="rotate-180 text-gray-500 group-hover:text-white transition-all" />
           </div>

           <div className="glass p-6 rounded-3xl flex items-center gap-4 group hover:bg-white/5 transition-colors cursor-pointer border-white/5 border">
              <div className="p-4 bg-surface rounded-2xl">
                 <History className="text-gray-400 group-hover:text-white" />
              </div>
              <div className="flex-1 text-left">
                 <p className="font-bold uppercase text-xs tracking-[0.2em] text-white">Historial de Carrera</p>
                 <p className="text-[10px] text-gray-500 uppercase font-black">Ver todos los clubes anteriores</p>
              </div>
              <ChevronLeft className="rotate-180 text-gray-500" />
           </div>
        </div>

        <button 
           onClick={() => setPage('dashboard')}
           className="w-full py-4 border border-white/10 rounded-2xl font-bold uppercase tracking-widest text-xs text-gray-500 hover:text-white hover:bg-white/5 transition-all"
        >
           Volver al Dashboard
        </button>

      </div>
    </div>
  )
}

const ProfileStatCard = ({ icon: Icon, label, value, trend, color }: any) => {
  const accentColors: any = {
    green: 'var(--color-green)',
    cyan: 'var(--theme-accent)',
    gold: 'var(--color-gold)',
    red: 'var(--color-red)'
  }

  return (
    <div className="glass p-8 rounded-[32px] space-y-4 shadow-glow group hover:bg-white/5 transition-all">
       <div className="flex items-center justify-between">
          <div className="p-3 bg-surface rounded-xl border border-white/5">
             <Icon size={20} style={{ color: accentColors[color] }} />
          </div>
          <Icon size={48} className="absolute right-4 top-4 opacity-5" style={{ color: accentColors[color] }} />
       </div>
       <div className="space-y-1">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{label}</p>
          <div className="flex items-end gap-3">
             <p className="text-4xl font-black italic tracking-tighter text-white">{value}</p>
             <p className="text-[10px] font-mono mb-1" style={{ color: accentColors[color] }}>{trend}</p>
          </div>
       </div>
    </div>
  )
}

const AchievementItem = ({ icon, title, desc }: any) => (
  <div className="flex items-center gap-4 p-4 bg-surface/40 rounded-2xl border border-white/5">
     <div className="w-12 h-12 bg-surface rounded-xl border border-white/10 flex items-center justify-center font-bold text-gold">{icon}</div>
     <div className="text-left">
        <p className="font-bold text-white uppercase text-[10px] tracking-widest">{title}</p>
        <p className="text-[9px] text-gray-500 uppercase">{desc}</p>
     </div>
  </div>
)
