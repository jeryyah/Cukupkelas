import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Star, Bell, Settings, Moon, Sun } from 'lucide-react';

const quotes = [
  "Kejarlah mimpimu meski itu setinggi langit.",
  "Usaha tidak akan pernah mengkhianati hasil.",
  "Pendidikan adalah senjata paling mematikan di dunia.",
  "Jangan takut salah, takutlah tidak pernah mencoba.",
  "Satu kelas, sejuta kenangan, tak terhingga harapan.",
];

export default function Profil() {
  const [quote, setQuote] = useState('');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Select quote based on day of month to rotate daily
    const day = new Date().getDate();
    setQuote(quotes[day % quotes.length]);
    
    // Check current theme
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    } else {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-64 rounded-3xl overflow-hidden mt-8"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-accent opacity-80"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+Cjwvc3ZnPg==')] opacity-30 mix-blend-overlay"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white drop-shadow-lg">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/40 mb-4 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            <span className="text-3xl font-black">XII</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-wider mb-2">IPA 1 Superior</h1>
          <p className="text-white/80 font-medium">SMA Negeri 1 • Tahun Ajaran 2024/2025</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Info Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2 space-y-6"
        >
          <div className="glass-card rounded-3xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Award className="text-primary" />
              Identitas Kelas
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="glass-panel p-4 rounded-2xl">
                <p className="text-white/50 text-sm mb-1">Wali Kelas</p>
                <p className="font-semibold text-lg">Dra. Hj. Rina Mariana, M.Pd.</p>
              </div>
              <div className="glass-panel p-4 rounded-2xl">
                <p className="text-white/50 text-sm mb-1">Ruangan</p>
                <p className="font-semibold text-lg text-accent">Gedung Timur - Lab 1</p>
              </div>
              <div className="glass-panel p-4 rounded-2xl sm:col-span-2">
                <p className="text-white/50 text-sm mb-2">Moto Kelas</p>
                <p className="font-medium text-xl italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  "Scientia est Potentia - Pengetahuan adalah Kekuatan"
                </p>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <p className="font-semibold">Rata-rata Kehadiran</p>
                <span className="text-2xl font-bold text-green-400">94%</span>
              </div>
              <div className="h-4 bg-white/10 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '94%' }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-400 relative"
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </motion.div>
              </div>
              <p className="text-xs text-white/50 mt-2 text-right">Diperbarui minggu ini</p>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
              <Star className="text-accent" />
              Quote of the Day
            </h2>
            <blockquote className="text-xl md:text-2xl font-light leading-relaxed border-l-4 border-accent pl-6 py-2">
              {quote}
            </blockquote>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="glass-card rounded-3xl p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2 border-b border-white/10 pb-4">
              <Bell size={18} className="text-orange-400" /> 
              Notifikasi
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-3 items-start p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 flex-shrink-0 animate-pulse"></div>
                <div>
                  <p className="text-sm font-semibold">PR Fisika Bab 4</p>
                  <p className="text-xs text-white/60">Due: Besok, 07:00</p>
                </div>
              </div>
              
              <div className="flex gap-3 items-start p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-semibold text-white/90">Ulangan Harian Kimia</p>
                  <p className="text-xs text-white/60">Senin depan</p>
                </div>
              </div>
              
              <div className="flex gap-3 items-start p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-semibold text-white/90">Rapat Panitia Pensi</p>
                  <p className="text-xs text-white/60">Jumat sepulang sekolah</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2 border-b border-white/10 pb-4">
              <Settings size={18} className="text-white/60" /> 
              Pengaturan
            </h3>
            
            <div className="flex items-center justify-between p-3 rounded-xl glass-panel">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? <Moon size={18} className="text-purple-400" /> : <Sun size={18} className="text-yellow-400" />}
                <span className="text-sm font-medium">Tema Aplikasi</span>
              </div>
              <button 
                onClick={toggleTheme}
                className="w-12 h-6 rounded-full bg-white/10 relative border border-white/20 transition-colors"
              >
                <motion.div 
                  layout
                  className="w-4 h-4 bg-white rounded-full absolute top-1"
                  initial={false}
                  animate={{ 
                    left: theme === 'dark' ? '28px' : '4px',
                    backgroundColor: theme === 'dark' ? '#7C3AED' : '#FBBF24'
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
            <p className="text-[10px] text-center text-white/40 mt-4">v1.0.0 • KelasKu SPA</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
