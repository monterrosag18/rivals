import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Save, Palette, Layers, Box, Star, Shield, Trophy, Target, Zap, Waves, Shirt, CheckCircle } from 'lucide-react'
import { useGameStore } from '../store/useGameStore'
import { SoccerKit } from '../components/SoccerKit'

const PATTERNS = ['solid', 'stripes', 'hoops', 'diagonal-sash', 'halves', 'halves-horizontal']
const COLLARS = ['round', 'v-neck']
const COLORS = ['#05060F', '#00FF87', '#00E5FF', '#FFB800', '#FF2D55', '#AF52DE', '#FFFFFF', '#3B82F6', '#EF4444', '#10B981']

export const KitEditor = () => {
  const { club, updateKit, setPage } = useGameStore()
  const [config, setConfig] = useState(club.kit)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
     setIsSaving(true)
     setTimeout(() => {
        updateKit(config)
        setIsSaving(false)
        setPage('profile')
     }, 1500)
  }

  return (
    <div className="min-h-screen bg-bg text-white flex flex-col items-center pt-24 pb-12 px-6 overflow-hidden">
      
      {/* HUD (Top) */}
      <div className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5 py-4 px-12 flex justify-between items-center bg-black/40">
        <button onClick={() => setPage('profile')} className="flex items-center gap-2 font-rajdhani font-bold text-gray-400 hover:text-white transition-all uppercase tracking-widest">
          <ChevronLeft className="w-5 h-5 font-black" /> VOLVER
        </button>
        <h2 className="text-2xl font-rajdhani font-bold italic tracking-tighter text-gradient-legendary uppercase">DISEÑADOR DE EQUIPACIÓN</h2>
        <div className="w-10 h-10" />
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-8">
        
        {/* Preview Section */}
        <div className="relative flex flex-col items-center gap-8 bg-surface/30 p-12 rounded-[32px] border border-white/5 backdrop-blur-2xl shadow-2xl sticky top-30">
           <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-gold/5 pointer-events-none" />
           
           <div className="relative group">
              <SoccerKit kit={config} size={320} animate />
              {/* Highlight active field */}
              <motion.div animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-blue-500/10 blur-3xl -z-10 rounded-full" />
           </div>
           
           <div className="text-center space-y-2">
              <h3 className="text-3xl font-rajdhani font-bold uppercase tracking-widest italic">{club.name}</h3>
              <p className="text-gray-500 font-mono text-[10px] tracking-[0.8em] font-black">LEGENDARY KIT SERIES</p>
           </div>

           {/* Save Button */}
           <button 
             onClick={handleSave}
             disabled={isSaving}
             className="w-full max-w-sm flex items-center justify-center gap-4 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 font-black italic tracking-widest text-lg shadow-glow-blue border-t border-white/20 hover:scale-[1.02] active:scale-95 transition-all text-white disabled:opacity-50"
           >
             {isSaving ? (
               <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
             ) : (
               <>
                 <Save className="w-5 h-5" /> GUARDAR EQUIPACIÓN
               </>
             )}
           </button>
        </div>

        {/* Controls Section */}
        <div className="space-y-10 pr-4 pb-20 scrollbar-hide">
           
           {/* Section: Patterns */}
           <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyan font-rajdhani font-bold uppercase text-xs tracking-[0.3em] font-black">
                <Shirt className="w-4 h-4" /> DISEÑO PRINCIPAL
              </div>
              <div className="grid grid-cols-3 gap-4">
                {PATTERNS.map(p => (
                  <button 
                    key={p} 
                    onClick={() => setConfig({ ...config, pattern: p as any })} 
                    className={`p-4 glass rounded-xl border-2 transition-all flex flex-col items-center gap-3 relative group ${config.pattern === p ? 'border-cyan shadow-glow-cyan bg-cyan/10' : 'border-white/5 hover:border-white/20'}`}
                  >
                    <div className="w-full h-12 flex items-center justify-center border border-white/10 rounded bg-black/40 overflow-hidden">
                       <SoccerKit kit={{ ...config, pattern: p as any }} size={40} />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-tighter opacity-60 group-hover:opacity-100">{p}</span>
                    {config.pattern === p && <CheckCircle size={14} className="absolute top-2 right-2 text-cyan" />}
                  </button>
                ))}
              </div>
           </div>

           {/* Section: Collar Type */}
           <div className="space-y-4">
              <div className="flex items-center gap-2 text-gold font-rajdhani font-bold uppercase text-xs tracking-[0.3em] font-black">
                <Layers className="w-4 h-4" /> ESTILO DE CUELLO
              </div>
              <div className="grid grid-cols-2 gap-4">
                {COLLARS.map(c => (
                  <button 
                    key={c} 
                    onClick={() => setConfig({ ...config, collarType: c as any })} 
                    className={`p-4 glass rounded-xl border-2 transition-all flex items-center justify-center gap-4 uppercase font-black italic tracking-widest text-xs ${config.collarType === c ? 'border-gold shadow-glow-gold bg-gold/10 text-gold' : 'border-white/5 text-gray-500 hover:border-white/20'}`}
                  >
                     {c === 'round' ? 'CUELLO REDONDO' : 'CUELLO EN V'}
                  </button>
                ))}
              </div>
           </div>

           {/* Section: Colors */}
           <div className="space-y-6">
              <div className="flex items-center gap-2 text-red font-rajdhani font-bold uppercase text-xs tracking-[0.3em] font-black">
                <Palette className="w-4 h-4" /> PALETA DE COLORES
              </div>
              
              <div className="space-y-8 glass p-6 rounded-2xl border border-white/5">
                {/* Primary Color */}
                <div>
                   <p className="text-[10px] text-gray-500 mb-3 uppercase tracking-[0.2em] font-black">COLOR DE BASE</p>
                   <div className="flex flex-wrap gap-3">
                     {COLORS.map(c => (
                       <button 
                         key={c} 
                         onClick={() => setConfig({ ...config, primaryColor: c })} 
                         className={`w-12 h-12 rounded-xl border-2 transition-all hover:scale-110 shadow-2xl ${config.primaryColor === c ? 'border-white ring-4 ring-white/10 scale-110' : 'border-transparent'}`} 
                         style={{ backgroundColor: c }} 
                       />
                     ))}
                   </div>
                </div>

                {/* Secondary Color */}
                <div>
                   <p className="text-[10px] text-gray-500 mb-3 uppercase tracking-[0.2em] font-black">COLOR DEL PATRÓN</p>
                   <div className="flex flex-wrap gap-3">
                     {COLORS.map(c => (
                       <button 
                         key={c} 
                         onClick={() => setConfig({ ...config, secondaryColor: c })} 
                         className={`w-12 h-12 rounded-xl border-2 transition-all hover:scale-110 shadow-2xl ${config.secondaryColor === c ? 'border-white ring-4 ring-white/10 scale-110' : 'border-transparent'}`} 
                         style={{ backgroundColor: c }} 
                       />
                     ))}
                   </div>
                </div>

                {/* Accent Color */}
                <div>
                   <p className="text-[10px] text-gray-500 mb-3 uppercase tracking-[0.2em] font-black">COLOR DE DETALLES / BORDES</p>
                   <div className="flex flex-wrap gap-3">
                     {COLORS.map(c => (
                       <button 
                         key={c} 
                         onClick={() => setConfig({ ...config, accentColor: c })} 
                         className={`w-12 h-12 rounded-xl border-2 transition-all hover:scale-110 shadow-2xl ${config.accentColor === c ? 'border-white ring-4 ring-white/10 scale-110' : 'border-transparent'}`} 
                         style={{ backgroundColor: c }} 
                       />
                     ))}
                   </div>
                </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  )
}
