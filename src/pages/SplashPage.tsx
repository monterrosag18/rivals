import { motion } from 'framer-motion'
import { Trophy, ChevronRight } from 'lucide-react'

interface SplashPageProps {
  onStart: () => void
}

export const SplashPage: React.FC<SplashPageProps> = ({ onStart }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative h-screen w-screen flex flex-col items-center justify-center bg-bg overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/20 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="z-10 flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Trophy className="w-20 h-20 text-gold mb-6 drop-shadow-glow-gold" />
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-6xl md:text-8xl font-rajdhani font-bold tracking-tighter"
        >
          LEAGUE <span className="text-cyan">RIVALS</span>
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gold font-rajdhani text-2xl tracking-[0.2em] mb-12 uppercase"
        >
          Legendary Edition
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="group relative flex items-center gap-3 bg-white text-black font-rajdhani font-bold text-xl py-4 px-12 rounded-full overflow-hidden transition-all shadow-xl hover:shadow-cyan/20"
        >
          <div className="absolute inset-0 bg-cyan opacity-0 group-hover:opacity-10 transition-opacity" />
          ENTRAR AL CAMPO
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5 }}
          className="mt-20 text-xs text-gray-500 uppercase tracking-widest"
        >
          Versión 0.1.0 Alpha • Desarrollado con Antigravity
        </motion.p>
      </div>
    </motion.div>
  )
}
