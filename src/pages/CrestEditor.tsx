import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Icons from 'lucide-react'
import { ChevronLeft, Save, Palette, Layers, Box, Star, Shield, Trophy, Target, Zap, Waves, Cross, Landmark, Globe2, Sparkles, Award, Anchor, Swords } from 'lucide-react'
import { useGameStore } from '../store/useGameStore'
import { ClubCrest } from '../components/ClubCrest'

const SHAPES = [
  { id: 'shield', name: 'Escudo Clásico', desc: 'Tradición Europea', cat: 'Europa' },
  { id: 'classic-spain', name: 'Círculo Real', desc: 'Legado de Castilla', cat: 'Europa' },
  { id: 'oval', name: 'Óvalo Serie A', desc: 'Herencia Italiana', cat: 'Europa' },
  { id: 'pentagon-sharp', name: 'Penta Avanzado', desc: 'Mística LatAm', cat: 'América' },
  { id: 'rounded-square', name: 'Blasón Curvo', desc: 'Estilo Carioca', cat: 'América' },
  { id: 'diamond', name: 'Diamante del Sur', desc: 'Pasión Argentina', cat: 'América' },
  { id: 'walled', name: 'Escudo Amurallado', desc: 'Fortaleza Inexpugnable', cat: 'Legendario' },
  { id: 'double-circle', name: 'Esfera de Alianza', desc: 'Círculo de Poder', cat: 'Legendario' },
  { id: 'wings', name: 'Alas de Victoria', desc: 'Dinastía Heroica', cat: 'Legendario' }
]

const PATTERNS = [
  { id: 'solid', name: 'Sólido' },
  { id: 'stripes', name: 'Franjas Verticales' },
  { id: 'diagonal-sash', name: 'Banda Diagonal' },
  { id: 'hoops', name: 'Aros Horizontales' },
  { id: 'quarters', name: 'Cuadrantes' },
  { id: 'cross', name: 'Cruz de Élite' }
]

const ICONS = ['Shield', 'Star', 'Trophy', 'Target', 'Zap', 'Waves', 'Cross', 'Globe2', 'Award', 'Landmark', 'Anchor', 'Swords']
const COLORS = ['#00FF87', '#00E5FF', '#FFB800', '#FF2D55', '#AF52DE', '#FFFFFF', '#05060F']

const PRESETS = [
  {
    id: 'castilla',
    name: 'Castilla Galáctico',
    config: { shape: 'classic-spain', pattern: 'diagonal-sash', primaryColor: '#FFFFFF', secondaryColor: '#AF52DE', accentColor: '#FFB800', icon: 'shield', text: 'MD', hasCrown: true, decoration: 'crown' }
  },
  {
    id: 'blaugrana',
    name: 'Mística Blau',
    config: { shape: 'shield', pattern: 'stripes', primaryColor: '#FF2D55', secondaryColor: '#004170', accentColor: '#FFB800', icon: 'star', text: 'FCB', hasCrown: false, decoration: 'none' }
  },
  {
    id: 'paisa',
    name: 'Avanzada Paisa',
    config: { shape: 'pentagon-sharp', pattern: 'stripes', primaryColor: '#00FF87', secondaryColor: '#FFFFFF', accentColor: '#00FF87', icon: 'award', text: 'NAC', hasCrown: false, decoration: 'star-ring' }
  },
  {
    id: 'banda',
    name: 'Banda Monumental',
    config: { shape: 'shield', pattern: 'diagonal-sash', primaryColor: '#FFFFFF', secondaryColor: '#FF2D55', accentColor: '#FFB800', icon: 'trophy', text: 'CARP', hasCrown: false, decoration: 'none' }
  },
  {
    id: 'azteca',
    name: 'Alianza Azteca',
    config: { shape: 'double-circle', pattern: 'solid', primaryColor: '#FFB800', secondaryColor: '#004170', accentColor: '#FFB800', icon: 'globe2', text: 'AME', hasCrown: false, decoration: 'star-ring' }
  }
]

export const CrestEditor = () => {
  const { club, updateCrest, setPage } = useGameStore()
  const [config, setConfig] = useState(club.crest)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
     setIsSaving(true)
     setTimeout(() => {
        updateCrest(config)
        setIsSaving(false)
        setPage('dashboard')
     }, 1500)
  }

  return (
    <div className="min-h-screen bg-bg text-white flex flex-col items-center pt-24 pb-12 px-6 overflow-x-hidden">
      
      {/* HUD (Top) */}
      <div className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5 py-4 px-12 flex justify-between items-center bg-black/60 shadow-2xl">
        <button onClick={() => setPage('dashboard')} className="flex items-center gap-2 font-rajdhani font-bold text-gray-400 hover:text-white transition-all uppercase tracking-widest text-sm">
          <ChevronLeft className="w-5 h-5" /> VOLVER
        </button>
        <h2 className="text-2xl font-rajdhani font-bold italic tracking-tighter text-gradient-legendary uppercase">BRANDING DE ÉLITE MUNDIAL</h2>
        <div className="w-10 h-10" />
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
        
        {/* Preview Section (Sticky) */}
        <div className="lg:col-span-5 space-y-8 flex flex-col items-center">
           <div className="relative group p-12 bg-surface/20 rounded-[48px] border-4 border-white/5 backdrop-blur-3xl shadow-glow transition-all ">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 to-gold/10 opacity-30 pointer-events-none rounded-[44px]" />
              <ClubCrest crest={config} size={320} animate />
           </div>
           
           <div className="text-center space-y-2">
              <h3 className="text-4xl font-rajdhani font-black uppercase tracking-[0.2em] italic">{club.name}</h3>
              <p className="text-gold font-mono text-xs tracking-[0.5em] font-bold uppercase opacity-60">Identidad Visual Premium</p>
           </div>

           {/* Quick Style Presets */}
           <div className="w-full space-y-4">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">PRESETS DE ESTILO GLOBAL</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                 {PRESETS.map(p => (
                   <button 
                     key={p.id} 
                     onClick={() => setConfig({ ...p.config } as any)} 
                     className="p-3 glass rounded-xl border border-white/5 hover:border-gold/50 transition-all text-[8px] font-black uppercase tracking-widest text-center"
                   >
                      {p.name}
                   </button>
                 ))}
              </div>
           </div>

           <button 
             onClick={handleSave}
             disabled={isSaving}
             className="w-full btn-gold py-6 text-xl font-black italic tracking-widest transform active:scale-95 transition-all shadow-glow-gold"
           >
             {isSaving ? (
               <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto" />
             ) : (
               <>GUARDAR BRANDING</>
             )}
           </button>
        </div>

        {/* Controls Section (Scrollable) */}
        <div className="lg:col-span-7 space-y-12 pr-4 scrollbar-hide pb-24">
           
           {/* Initials & Crown Toggle */}
           <div className="glass p-8 rounded-[40px] border border-white/5 space-y-4 shadow-xl mb-4">
              <div className="flex items-center gap-2 text-cyan font-rajdhani font-black uppercase text-sm tracking-[0.3em]">
                <Layers className="w-4 h-4" /> SIGLAS DEL CLUB
              </div>
              <div className="flex gap-4">
                 <input 
                   type="text" 
                   maxLength={3}
                   value={config.text}
                   onChange={(e) => setConfig({ ...config, text: e.target.value.toUpperCase() })}
                   className="flex-1 bg-black/40 border-2 border-white/10 p-5 rounded-2xl font-rajdhani font-black text-3xl uppercase tracking-widest focus:border-cyan shadow-inner outline-none text-white placeholder-white/20"
                   placeholder="SIG"
                 />
                 <div className="flex items-center gap-3 glass p-2 rounded-2xl border border-white/5">
                    <button onClick={() => setConfig({ ...config, hasCrown: !config.hasCrown, decoration: !config.hasCrown ? 'crown' : 'none' })} className={`p-4 rounded-xl font-black italic text-[10px] tracking-widest transition-all ${config.hasCrown ? 'bg-gold text-black shadow-glow-gold' : 'bg-surface text-gray-500 hover:text-white'}`}>
                       {config.hasCrown ? 'DIADEMA REAL ON' : 'AÑADIR CORONA'}
                    </button>
                 </div>
              </div>
           </div>

           {/* Shapes Categorized */}
           <div className="space-y-6">
              <p className="text-xs font-rajdhani font-black text-gold uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                 <Globe2 size={16} /> HERMANDAD DE FORMAS (GLOBAL)
              </p>
              
              {['Europa', 'América', 'Legendario'].map(cat => (
                <div key={cat} className="space-y-3">
                   <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest border-l-2 border-gold pl-3">{cat}</p>
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {SHAPES.filter(s => s.cat === cat).map(s => (
                        <button 
                          key={s.id} 
                          onClick={() => setConfig({ ...config, shape: s.id as any })} 
                          className={`relative p-5 glass rounded-2xl border transition-all group overflow-hidden ${config.shape === s.id ? 'border-cyan bg-cyan/5' : 'border-white/5 hover:border-white/30'}`}
                        >
                          <div className="relative z-10 text-left">
                             <h4 className={`font-black italic text-sm uppercase tracking-tighter ${config.shape === s.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{s.name}</h4>
                             <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mt-1 opacity-60 line-clamp-1">{s.desc}</p>
                          </div>
                        </button>
                      ))}
                   </div>
                </div>
              ))}
           </div>

           {/* Historical Patterns */}
           <div className="space-y-4">
              <p className="text-xs font-rajdhani font-black text-purple-400 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                 <Waves size={16} /> PATRONES DE TRADICIÓN
              </p>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {PATTERNS.map(p => (
                  <button 
                    key={p.id} 
                    onClick={() => setConfig({ ...config, pattern: p.id as any })} 
                    className={`p-4 glass rounded-2xl border-2 transition-all group ${config.pattern === p.id ? 'border-purple-400 bg-purple-400/5' : 'border-transparent hover:bg-white/5'}`}
                  >
                     <div className={`text-[8px] font-black uppercase text-center tracking-tighter ${config.pattern === p.id ? 'text-white' : 'text-gray-500'}`}>{p.name}</div>
                  </button>
                ))}
              </div>
           </div>

           {/* Symbols of Power */}
           <div className="space-y-4">
              <p className="text-xs font-rajdhani font-black text-green uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                 <Sparkles size={16} /> SÍMBOLO MAESTRO
              </p>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {ICONS.map(i => {
                   const Icon = (Icons as any)[i]
                   return (
                     <button 
                       key={i} 
                       onClick={() => setConfig({ ...config, icon: i.toLowerCase() })} 
                       className={`p-4 glass rounded-xl border-2 transition-all ${config.icon === i.toLowerCase() ? 'border-green bg-green/10' : 'border-transparent hover:bg-white/5'}`}
                     >
                       <Icon className={`w-6 h-6 mx-auto ${config.icon === i.toLowerCase() ? 'text-white' : 'text-gray-400'}`} />
                     </button>
                   )
                })}
              </div>
           </div>

           {/* Prestige Decor (Stars, Swords, etc) */}
           <div className="space-y-4">
              <p className="text-xs font-rajdhani font-black text-gold uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                 <Award size={16} /> PRESTIGIO & DECORACIÓN
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                 {[
                   { id: 'none', label: 'Ninguno' },
                   { id: 'star-ring', label: 'Estrellas' },
                   { id: 'swords', label: 'Espadas' },
                   { id: 'anchor', label: 'Ancla' },
                   { id: 'lion', label: 'Emblema Superior' }
                 ].map(d => (
                   <button 
                     key={d.id} 
                     onClick={() => setConfig({ ...config, decoration: d.id as any, hasCrown: d.id === 'crown' })} 
                     className={`p-4 glass rounded-2xl border font-black italic tracking-widest text-[9px] uppercase transition-all ${config.decoration === d.id ? 'border-gold text-gold bg-gold/5 shadow-glow-gold' : 'border-white/5 text-gray-500 hover:text-white'}`}
                   >
                      {d.label}
                   </button>
                 ))}
              </div>
           </div>

           {/* Professional Palettes */}
           <div className="glass p-10 rounded-[40px] border border-white/5 space-y-10">
              <div className="flex items-center gap-2 text-red font-rajdhani font-black uppercase text-sm tracking-[0.4em]">
                 <Palette className="w-4 h-4" /> PALETA DE COLORES DE ÉLITE
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="space-y-5">
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest border-b border-white/5 pb-2">Base del Club</p>
                    <div className="flex flex-wrap gap-3">
                       {COLORS.map(c => (
                         <button key={c} onClick={() => setConfig({ ...config, primaryColor: c })} className={`w-12 h-12 rounded-full border-4 shadow-2xl transition-all ${config.primaryColor === c ? 'border-white scale-125 z-10' : 'border-black/50 hover:scale-110'}`} style={{ backgroundColor: c }} />
                       ))}
                    </div>
                 </div>
                 <div className="space-y-5">
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest border-b border-white/5 pb-2">Metales & Glow</p>
                    <div className="flex flex-wrap gap-3">
                       {COLORS.map(c => (
                         <button key={c} onClick={() => setConfig({ ...config, accentColor: c })} className={`w-12 h-12 rounded-full border-4 shadow-2xl transition-all ${config.accentColor === c ? 'border-white scale-125 z-10' : 'border-black/50 hover:scale-110'}`} style={{ backgroundColor: c }} />
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
