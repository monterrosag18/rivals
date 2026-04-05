import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Save, MapPin, Users, Zap, Shield, Star, Trophy, Building2, Landmark } from 'lucide-react'
import { useGameStore } from '../store/useGameStore'

const STADIUMS = [
  {
    level: 1,
    name: 'Campo Vecinal',
    desc: 'Un campo comunitario humilde con gran corazón. El inicio de toda leyenda.',
    capacity: '2,500',
    perks: ['Césped Natural', 'Atmósfera Cercana'],
    image: '/assets/stadium_basic.png',
    accent: '#10B981' // Green
  },
  {
    level: 2,
    name: 'Arena Profesional',
    desc: 'Estadio moderno con infraestructura de élite y gradas para miles de fans.',
    capacity: '45,000',
    perks: ['Iluminación Pro', 'Drenaje Avanzado', 'Tienda Oficial'],
    image: '/assets/stadium_medium.png',
    accent: '#3B82F6' // Blue
  },
  {
    level: 3,
    name: 'Mega-Estadio Legendario',
    desc: 'La joya de la corona. Tecnología futurista y una atmósfera imbatible.',
    capacity: '95,000',
    perks: ['Líneas LED', 'Pantallas Holográficas', 'VIP Lounge'],
    image: '/assets/stadium_premium.png',
    accent: '#00FF87' // Cyan
  }
]

export const StadiumSelector = () => {
  const { club, updateStadium, setPage } = useGameStore()
  const [selectedLevel, setSelectedLevel] = useState<any>(club.stadium?.level || 1)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      updateStadium(selectedLevel as 1 | 2 | 3)
      setIsSaving(false)
      setPage('profile')
    }, 1500)
  }

  const activeStadium = STADIUMS.find(s => s.level === selectedLevel)!

  return (
    <div className="min-h-screen bg-bg text-white flex flex-col items-center pt-24 pb-12 px-6 overflow-x-hidden">
      
      {/* HEADER HUD */}
      <div className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5 py-4 px-12 flex justify-between items-center bg-black/60 shadow-2xl">
        <button onClick={() => setPage('profile')} className="flex items-center gap-2 font-rajdhani font-bold text-gray-400 hover:text-white transition-all uppercase tracking-widest text-sm">
          <ChevronLeft className="w-5 h-5" /> VOLVER
        </button>
        <h2 className="text-2xl font-rajdhani font-bold italic tracking-tighter text-gradient-legendary uppercase">GESTIÓN DE ESTADIO</h2>
        <div className="w-10 h-10" />
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
        
        {/* PREVIEW PANEL (LEFT) */}
        <div className="lg:col-span-7 space-y-6">
           <div className="relative aspect-video rounded-[40px] overflow-hidden border-4 border-white/10 shadow-glow transition-all duration-700">
              <AnimatePresence mode="wait">
                 <motion.img 
                   key={activeStadium.image}
                   initial={{ opacity: 0, scale: 1.1 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   transition={{ duration: 0.5 }}
                   src={activeStadium.image} 
                   className="w-full h-full object-cover" 
                   alt="Stadium Preview"
                 />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              
              <div className="absolute bottom-8 left-10 space-y-2">
                 <motion.div 
                   key={activeStadium.name}
                   initial={{ x: -20, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   className="flex items-center gap-4"
                 >
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                       <Landmark className="text-gold" />
                    </div>
                    <div>
                       <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white">{activeStadium.name}</h3>
                       <p className="text-gray-400 font-rajdhani font-bold text-xs tracking-widest uppercase opacity-60">Nivel de Prestigio: {activeStadium.level}</p>
                    </div>
                 </motion.div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-8 right-10">
                 <div className={`px-4 py-2 rounded-full border backdrop-blur-xl font-bold text-[10px] tracking-widest uppercase ${club.stadium?.level === activeStadium.level ? 'border-green text-green shadow-glow-green' : 'border-white/20 text-white/40'}`}>
                    {club.stadium?.level === activeStadium.level ? 'ACTIVO' : 'DISPONIBLE'}
                 </div>
              </div>
           </div>

           {/* Features Grid */}
           <div className="grid grid-cols-3 gap-4">
              <div className="glass p-6 rounded-3xl border border-white/5 space-y-2">
                 <Users className="text-blue-400 w-5 h-5" />
                 <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Capacidad</p>
                 <p className="text-2xl font-black italic">{activeStadium.capacity}</p>
              </div>
              <div className="glass p-6 rounded-3xl border border-white/5 space-y-2">
                 <Building2 className="text-gold w-5 h-5" />
                 <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Instalaciones</p>
                 <p className="text-xl font-black italic">{activeStadium.perks.length} Módulos</p>
              </div>
              <div className="glass p-6 rounded-3xl border border-white/5 space-y-2">
                 <Zap className="text-cyan w-5 h-5" />
                 <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Atmósfera</p>
                 <p className="text-xl font-black italic uppercase tracking-tighter">Élite</p>
              </div>
           </div>
        </div>

        {/* SELECTOR PANEL (RIGHT) */}
        <div className="lg:col-span-5 space-y-8">
           <div className="space-y-4">
              <p className="text-sm font-rajdhani font-black text-gold uppercase tracking-[0.4em] mb-6">SELECCIONAR INFRAESTRUCTURA</p>
              <div className="space-y-4">
                 {STADIUMS.map(s => (
                   <button 
                     key={s.level} 
                     onClick={() => setSelectedLevel(s.level)}
                     className={`w-full group relative flex items-center gap-6 p-6 rounded-3xl border-2 transition-all duration-300 ${selectedLevel === s.level ? 'bg-white/5 border-gold shadow-glow-gold' : 'bg-surface/30 border-white/5 hover:border-white/20 hover:bg-white/5'}`}
                   >
                     {/* Level indicator */}
                     <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black italic text-xl ${selectedLevel === s.level ? 'bg-gold text-black shadow-lg' : 'bg-white/10 text-white/40 group-hover:text-white'}`}>
                        <span className="text-[8px] leading-none mb-1 opacity-60">LVL</span>
                        {s.level}
                     </div>
                     
                     <div className="flex-1 text-left">
                        <h4 className={`text-lg font-black uppercase tracking-tighter italic ${selectedLevel === s.level ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{s.name}</h4>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1 opacity-60 line-clamp-1">{s.desc}</p>
                     </div>

                     {selectedLevel === s.level && (
                       <motion.div layoutId="selection-check" className="absolute -right-3 -top-3 w-8 h-8 bg-gold rounded-full border-4 border-bg flex items-center justify-center shadow-lg">
                          <Trophy size={14} className="text-black" />
                       </motion.div>
                     )}
                   </button>
                 ))}
              </div>
           </div>

           <div className="glass p-8 rounded-[40px] border border-white/5 space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-cyan flex items-center gap-3">
                 <Shield className="w-4 h-4" /> BENEFICIOS DE NIVEL
              </h4>
              <div className="space-y-4">
                 {activeStadium.perks.map(p => (
                   <div key={p} className="flex items-center gap-4 text-sm font-bold text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeStadium.accent }} />
                      {p}
                   </div>
                 ))}
              </div>
           </div>

           <button 
             onClick={handleSave}
             disabled={isSaving || club.stadium?.level === activeStadium.level}
             className={`w-full py-5 rounded-2xl font-black italic text-xl tracking-[0.2em] shadow-2xl transform active:scale-95 transition-all text-white disabled:opacity-50 disabled:grayscale disabled:pointer-events-none ${selectedLevel === 3 ? 'bg-gradient-to-r from-cyan-600 to-emerald-600 shadow-glow-cyan' : 'bg-gradient-to-r from-gold-600 to-gold-400 shadow-glow-gold'}`}
           >
             {isSaving ? (
               <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto" />
             ) : (
               <>ASIGNAR COMO SEDE</>
             )}
           </button>
        </div>

      </div>
    </div>
  )
}
