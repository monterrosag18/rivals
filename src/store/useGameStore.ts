import { create } from 'zustand'

export type Page = 'splash' | 'dashboard' | 'squad' | 'match' | 'league-details' | 'competitions' | 'trophy-room' | 'profile' | 'crest-editor' | 'pre-match' | 'kit-editor' | 'stadium-selector'

interface GameState {
  currentPage: Page
  setPage: (page: Page) => void
  user: {
    username: string
    level: number
    gold: number
    energy: number
    xp: number
    maxXp: number
  }
  club: {
    name: string
    primaryColor: string
    secondaryColor: string
    stadiumLevel: number
    stars: number
    crest: {
      shape: 'shield' | 'circle' | 'modern' | 'wings' | 'oval' | 'classic-spain' | 'hexagon' | 'pentagon-sharp' | 'rounded-square' | 'diamond' | 'walled' | 'double-circle'
      pattern: 'solid' | 'stripes' | 'diagonal' | 'quarters' | 'cross' | 'diagonal-sash' | 'hoops'
      primaryColor: string
      secondaryColor: string
      accentColor: string
      icon: string
      text: string
      hasCrown: boolean
      decoration: 'none' | 'lion' | 'eagle' | 'star-ring' | 'crown' | 'swords' | 'anchor'
    }
    kit: {
      primaryColor: string
      secondaryColor: string
      accentColor: string
      pattern: 'solid' | 'stripes' | 'hoops' | 'diagonal-sash' | 'halves' | 'halves-horizontal'
      collarType: 'round' | 'v-neck'
    }
    stadium: {
      level: 1 | 2 | 3
      name: string
      image: string
    }
  }
  updateCrest: (crestConfig: any) => void
  updateKit: (kitConfig: any) => void
  updateStadium: (level: 1 | 2 | 3) => void
  leagues: {
    id: string
    name: string
    active: boolean
    teams: {
      name: string
      played: number
      won: number
      drawn: number
      lost: number
      gf: number
      ga: number
      points: number
      isUser?: boolean
      crest?: any
    }[]
  }[]
  trophies: {
    id: string
    name: string
    type: 'club' | 'personal'
    earned: boolean
    date?: string
    icon: string
  }[]
  players: any[]
  opponent: {
    name: string
    players: any[]
    rating: number
    stars: number
    crest: any
  }
  currentMatch: {
    log: string[]
    score: [number, number]
    time: number
  } | null
  visualStyle: 'classic' | 'futuristic'
  setVisualStyle: (style: 'classic' | 'futuristic') => void
}

export const useGameStore = create<GameState>((set) => ({
  currentPage: 'splash',
  setPage: (page) => set({ currentPage: page }),
  user: {
    username: 'Monterrosa',
    level: 52,
    gold: 295,
    energy: 904,
    xp: 308000,
    maxXp: 2070000,
  },
  club: {
    name: 'Buffons fc',
    primaryColor: '#00FF87',
    secondaryColor: '#05060F',
    stadiumLevel: 3,
    stars: 144,
    crest: {
      shape: 'shield',
      pattern: 'stripes',
      primaryColor: '#00FF87',
      secondaryColor: '#05060F',
      accentColor: '#FFB800',
      icon: 'shield',
      text: 'BFC',
      hasCrown: true,
      decoration: 'crown'
    },
    kit: {
      primaryColor: '#00FF87',
      secondaryColor: '#05060F',
      accentColor: '#FFFFFF',
      pattern: 'stripes',
      collarType: 'v-neck'
    },
    stadium: {
      level: 3,
      name: 'Mega-Estadio Legendario',
      image: '/assets/stadium_premium.png'
    }
  },
  updateCrest: (crestConfig) => set((state) => ({ 
    club: { ...state.club, crest: crestConfig } 
  })),
  updateKit: (kitConfig) => set((state) => ({ 
    club: { ...state.club, kit: kitConfig } 
  })),
  updateStadium: (level) => set((state) => {
    const stadiums = {
      1: { name: 'Campo Vecinal', image: '/assets/stadium_basic.png' },
      2: { name: 'Arena Profesional', image: '/assets/stadium_medium.png' },
      3: { name: 'Mega-Estadio Legendario', image: '/assets/stadium_premium.png' }
    }
    return {
      club: {
        ...state.club,
        stadiumLevel: level,
        stadium: { level, ...stadiums[level] }
      }
    }
  }),
  leagues: [
    {
      id: 'master-league',
      name: 'LIGA MASTER ELITE',
      active: true,
      teams: [
        { name: 'PSG BRASIL', played: 12, won: 10, drawn: 1, lost: 1, gf: 32, ga: 12, points: 31, crest: { shape: 'rounded-square', pattern: 'stripes', primaryColor: '#004170', secondaryColor: '#FF2D55', accentColor: '#FFFFFF', icon: 'shield', text: 'PSG', hasCrown: false, decoration: 'none' } },
        { name: 'REAL MADRID AI', played: 12, won: 9, drawn: 2, lost: 1, gf: 28, ga: 10, points: 29, crest: { shape: 'classic-spain', pattern: 'diagonal-sash', primaryColor: '#FFFFFF', secondaryColor: '#AF52DE', accentColor: '#FFB800', icon: 'shield', text: 'RM', hasCrown: true, decoration: 'crown' } },
        { name: 'CITY NEXUS', played: 12, won: 8, drawn: 3, lost: 1, gf: 30, ga: 15, points: 27, crest: { shape: 'circle', pattern: 'solid', primaryColor: '#00E5FF', secondaryColor: '#FFFFFF', accentColor: '#FFFFFF', icon: 'globe2', text: 'CF', hasCrown: false, decoration: 'none' } },
        { name: 'BUFFONS FC', played: 12, won: 8, drawn: 2, lost: 2, gf: 25, ga: 14, points: 26, isUser: true, crest: { shape: 'shield', pattern: 'stripes', primaryColor: '#00FF87', secondaryColor: '#05060F', accentColor: '#FFB800', icon: 'shield', text: 'BFC', hasCrown: true, decoration: 'crown' } },
        { name: 'LARA BAND', played: 12, won: 7, drawn: 4, lost: 1, gf: 22, ga: 16, points: 25, crest: { shape: 'wings', pattern: 'solid', primaryColor: '#FF2D55', secondaryColor: '#FFFFFF', accentColor: '#FFD700', icon: 'zap', text: 'LB', hasCrown: false, decoration: 'star-ring' } },
        { name: 'FERIA FC', played: 12, won: 5, drawn: 2, lost: 5, gf: 18, ga: 20, points: 17, crest: { shape: 'hexagon', pattern: 'cross', primaryColor: '#AF52DE', secondaryColor: '#FFFFFF', accentColor: '#AF52DE', icon: 'target', text: 'FFC', hasCrown: false, decoration: 'none' } },
        { name: 'FLAMENGO RX', played: 12, won: 4, drawn: 3, lost: 5, gf: 15, ga: 22, points: 15, crest: { shape: 'pentagon-sharp', pattern: 'stripes', primaryColor: '#FF2D55', secondaryColor: '#05060F', accentColor: '#FFB800', icon: 'award', text: 'CRF', hasCrown: false, decoration: 'none' } },
        { name: 'MILAN 3.0', played: 12, won: 3, drawn: 2, lost: 7, gf: 12, ga: 25, points: 11, crest: { shape: 'oval', pattern: 'stripes', primaryColor: '#FF2D55', secondaryColor: '#05060F', accentColor: '#FFFFFF', icon: 'shield', text: 'ACM', hasCrown: false, decoration: 'none' } },
        { name: 'CELTICS B', played: 12, won: 2, drawn: 1, lost: 9, gf: 10, ga: 30, points: 7, crest: { shape: 'shield', pattern: 'hoops', primaryColor: '#00FF87', secondaryColor: '#FFFFFF', accentColor: '#FFB800', icon: 'star', text: 'CFC', hasCrown: false, decoration: 'none' } },
        { name: 'JUVENTUS V', played: 12, won: 1, drawn: 2, lost: 9, gf: 8, ga: 35, points: 5, crest: { shape: 'shield', pattern: 'stripes', primaryColor: '#FFFFFF', secondaryColor: '#05060F', accentColor: '#FFB800', icon: 'shield', text: 'JUVE', hasCrown: false, decoration: 'none' } },
      ]
    },
    { id: 'champions-cup', name: 'COPA DE CAMPEONES', active: false, teams: [] },
  ],
  trophies: [
    { id: 'master-elite-cup', name: 'COPA MASTER ELITE', type: 'club', earned: false, date: '-', icon: 'Cup' },
    { id: 't1', name: 'CAMPEÓN LIGA DÍA 10', type: 'club', earned: true, date: '2026-04-02', icon: 'Trophy' },
    { id: 't2', name: 'ASCENSO ELITE', type: 'club', earned: true, date: '2026-04-01', icon: 'Trophy' },
    { id: 't3', name: 'MÁNAGER DEL MES (MARZO)', type: 'personal', earned: true, date: '2026-03-30', icon: 'User' },
    { id: 't4', name: 'BALÓN DE ORO (ZRK)', type: 'club', earned: false, icon: 'RotateCw' },
    { id: 't5', name: 'CAMPEÓN COPA MUNDIAL', type: 'personal', earned: false, icon: 'Globe' },
  ],
  players: [
    { id: '1', name: 'Jose', rating: 88, tier: 'GOLD', position: 'GK', stats: { spd: 70, acc: 75, phy: 80, int: 90, ctl: 85, fin: 20, def: 92 } },
    { id: '2', name: 'David', rating: 85, tier: 'GOLD', position: 'DEF', stats: { spd: 78, acc: 80, phy: 88, int: 85, ctl: 82, fin: 45, def: 88 } },
    { id: '3', name: 'Pau', rating: 82, tier: 'SILVER', position: 'DEF', stats: { spd: 75, acc: 78, phy: 85, int: 80, ctl: 78, fin: 40, def: 85 } },
    { id: '4', name: 'Sergio', rating: 84, tier: 'SILVER', position: 'DEF', stats: { spd: 72, acc: 75, phy: 90, int: 82, ctl: 75, fin: 35, def: 88 } },
    { id: '5', name: 'Miki', rating: 80, tier: 'BRONZE', position: 'DEF', stats: { spd: 82, acc: 80, phy: 78, int: 75, ctl: 72, fin: 30, def: 80 } },
    { id: '6', name: 'Gavi', rating: 89, tier: 'GOLD', position: 'MID', stats: { spd: 85, acc: 88, phy: 75, int: 92, ctl: 90, fin: 75, def: 72 } },
    { id: '7', name: 'Pedri', rating: 90, tier: 'GOLD', position: 'MID', stats: { spd: 82, acc: 90, phy: 72, int: 95, ctl: 92, fin: 80, def: 65 } },
    { id: '8', name: 'Busi', rating: 86, tier: 'GOLD', position: 'MID', stats: { spd: 65, acc: 75, phy: 78, int: 98, ctl: 88, fin: 60, def: 85 } },
    { id: '9', name: 'Zrko', rating: 95, tier: 'LEGENDARY', position: 'FWD', stats: { spd: 96, acc: 92, phy: 88, int: 90, ctl: 94, fin: 98, def: 45 } },
    { id: '10', name: 'Jei', rating: 92, tier: 'LEGENDARY', position: 'FWD', stats: { spd: 94, acc: 95, phy: 75, int: 88, ctl: 98, fin: 90, def: 35 } },
    { id: '11', name: 'Lara', rating: 88, tier: 'GOLD', position: 'FWD', stats: { spd: 90, acc: 88, phy: 82, int: 85, ctl: 85, fin: 92, def: 40 } },
  ],
  opponent: {
    name: 'PSG BRASIL',
    rating: 84,
    stars: 3244,
    crest: { shape: 'rounded-square', pattern: 'stripes', primaryColor: '#004170', secondaryColor: '#FF2D55', accentColor: '#FFFFFF', icon: 'shield', text: 'PSG', hasCrown: false, decoration: 'none' },
    players: [
      { id: 'b1', name: 'Ederson Bot', rating: 89, tier: 'GOLD', position: 'GK', stats: { spd: 75, acc: 80, phy: 85, int: 90, ctl: 90, fin: 15, def: 95 } },
      { id: 'b2', name: 'Marqui Bot', rating: 88, tier: 'GOLD', position: 'DEF', stats: { spd: 82, acc: 85, phy: 88, int: 92, ctl: 80, fin: 30, def: 92 } },
      { id: 'b3', name: 'Silva Bot', rating: 86, tier: 'GOLD', position: 'DEF', stats: { spd: 75, acc: 78, phy: 85, int: 95, ctl: 78, fin: 25, def: 90 } },
      { id: 'b4', name: 'Danilo Bot', rating: 84, tier: 'SILVER', position: 'DEF', stats: { spd: 78, acc: 80, phy: 82, int: 85, ctl: 75, fin: 40, def: 85 } },
      { id: 'b5', name: 'Lodi Bot', rating: 82, tier: 'SILVER', position: 'DEF', stats: { spd: 88, acc: 85, phy: 75, int: 80, ctl: 82, fin: 45, def: 78 } },
      { id: 'b6', name: 'Casemiro Bot', rating: 89, tier: 'GOLD', position: 'MID', stats: { spd: 72, acc: 75, phy: 95, int: 92, ctl: 85, fin: 65, def: 92 } },
      { id: 'b7', name: 'Fred Bot', rating: 84, tier: 'SILVER', position: 'MID', stats: { spd: 82, acc: 80, phy: 85, int: 88, ctl: 80, fin: 70, def: 80 } },
      { id: 'b8', name: 'Paqueta Bot', rating: 86, tier: 'GOLD', position: 'MID', stats: { spd: 80, acc: 85, phy: 78, int: 90, ctl: 92, fin: 82, def: 65 } },
      { id: 'b9', name: 'Neymar Bot', rating: 94, tier: 'LEGENDARY', position: 'FWD', stats: { spd: 92, acc: 95, phy: 70, int: 88, ctl: 99, fin: 92, def: 35 } },
      { id: 'b10', name: 'Vini Bot', rating: 92, tier: 'LEGENDARY', position: 'FWD', stats: { spd: 98, acc: 99, phy: 75, int: 85, ctl: 95, fin: 88, def: 30 } },
      { id: 'b11', name: 'Jesus Bot', rating: 88, tier: 'GOLD', position: 'FWD', stats: { spd: 88, acc: 85, phy: 82, int: 85, ctl: 88, fin: 90, def: 40 } },
    ]
  },
  currentMatch: {
    log: ['¡EL ÁRBITRO PITA EL INICIO!', 'BUFFONS FC controla la posesión.'],
    score: [2, 2],
    time: 15,
  },
  visualStyle: 'futuristic',
  setVisualStyle: (style) => set({ visualStyle: style }),
}))
