import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Users, Clock, Image as ImageIcon, User, ArrowUp } from 'lucide-react';
import HomeSection from './pages/Home';
import AnggotaSection from './pages/Anggota';
import JadwalSection from './pages/Jadwal';
import AlbumSection from './pages/Album';
import ProfilSection from './pages/Profil';

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'anggota', label: 'Anggota', icon: Users },
  { id: 'jadwal', label: 'Jadwal', icon: Clock },
  { id: 'album', label: 'Album', icon: ImageIcon },
  { id: 'profil', label: 'Profil', icon: User },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeSection setActiveTab={setActiveTab} />;
      case 'anggota': return <AnggotaSection />;
      case 'jadwal': return <JadwalSection />;
      case 'album': return <AlbumSection />;
      case 'profil': return <ProfilSection />;
      default: return <HomeSection setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground pb-24 overflow-x-hidden relative">
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-orb" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px] animate-orb" style={{ animationDelay: '-7.5s' }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="container mx-auto px-4 py-6 md:py-10 max-w-5xl"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-28 right-6 p-3 rounded-full bg-primary/80 backdrop-blur-md text-white shadow-[0_0_15px_rgba(124,58,237,0.5)] z-50"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none">
        <div className="max-w-md mx-auto glass-card rounded-3xl p-2 flex justify-between items-center pointer-events-auto relative overflow-hidden">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  scrollToTop();
                }}
                className={`relative flex flex-col items-center justify-center w-16 h-14 rounded-2xl transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 bg-white/10 rounded-2xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon size={22} className={`mb-1 transition-transform duration-300 ${isActive ? 'scale-110 shadow-primary drop-shadow-[0_0_8px_rgba(124,58,237,0.8)]' : ''}`} />
                <span className="text-[10px] font-medium tracking-wide">{tab.label}</span>
                {isActive && (
                  <div className="absolute -bottom-1 w-8 h-1 rounded-full bg-gradient-to-r from-primary to-accent shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
