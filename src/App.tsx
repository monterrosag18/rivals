import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SplashPage } from './pages/SplashPage'
import { Dashboard } from './pages/Dashboard'
import { SquadPage } from './pages/SquadPage'
import { MatchPage } from './pages/MatchPage'
import { CrestEditor } from './pages/CrestEditor'
import { CompetitionsPage } from './pages/CompetitionsPage'
import { LeagueDetails } from './pages/LeagueDetails'
import { TrophyRoom } from './pages/TrophyRoom'
import { ProfilePage } from './pages/ProfilePage'
import { PreMatchPage } from './pages/PreMatchPage'
import { KitEditor } from './pages/KitEditor'
import { StadiumSelector } from './pages/StadiumSelector'
import { useGameStore } from './store/useGameStore'

function App() {
  const { currentPage, setPage, visualStyle } = useGameStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading for extra cinematic feel
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="h-screen w-screen bg-bg flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 border-4 border-cyan border-t-transparent rounded-full shadow-glow-cyan"
        />
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-bg text-gray-100 font-inter relative overflow-hidden theme-${visualStyle}`}>
      {/* Global Legendary Effects (Only in Futuristic) */}
      {visualStyle === 'futuristic' && (
        <>
          <div className="crt-overlay" />
          <div className="scanline" />
        </>
      )}
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)', scale: 0.9 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="h-full w-full"
        >
          {currentPage === 'splash' && (
            <SplashPage key="splash" onStart={() => setPage('dashboard')} />
          )}
          {currentPage === 'dashboard' && (
            <Dashboard key="dashboard" />
          )}
          {currentPage === 'squad' && (
            <SquadPage key="squad" />
          )}
          {currentPage === 'match' && (
            <MatchPage key="match" />
          )}
          {currentPage === 'crest-editor' && (
            <CrestEditor key="crest-editor" />
          )}
          {currentPage === 'competitions' && (
            <CompetitionsPage key="competitions" />
          )}
          {currentPage === 'league-details' && (
            <LeagueDetails key="league-details" />
          )}
          {currentPage === 'trophy-room' && (
            <TrophyRoom key="trophy-room" />
          )}
          {currentPage === 'profile' && (
            <ProfilePage key="profile" />
          )}
          {currentPage === 'pre-match' && (
            <PreMatchPage key="pre-match" />
          )}
          {currentPage === 'kit-editor' && (
            <KitEditor key="kit-editor" />
          )}
          {currentPage === 'stadium-selector' && (
            <StadiumSelector key="stadium-selector" />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default App
