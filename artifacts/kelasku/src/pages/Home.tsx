import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, Image as ImageIcon, CheckSquare, Bell, Network, ChevronDown } from 'lucide-react';

const quotes = [
  "Future Leaders in the Making",
  "Science Class with Style",
  "Breaking Boundaries, Setting Records",
  "Innovate. Create. Elevate."
];

export default function Home({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Total Siswa', value: '32' },
    { label: 'Pelajaran Hari Ini', value: '6' },
    { label: 'Kehadiran', value: '94%' },
    { label: 'Status Kelas', value: 'Aktif' },
  ];

  const features = [
    { id: 'anggota', label: 'Anggota Kelas', icon: Users, desc: 'Lihat profil seluruh anggota kelas' },
    { id: 'jadwal', label: 'Jadwal Real-Time', icon: Clock, desc: 'Jadwal pelajaran hari ini' },
    { id: 'album', label: 'Album Kenangan', icon: ImageIcon, desc: 'Kumpulan momen berharga' },
    { id: 'tugas', label: 'Tugas & Deadline', icon: CheckSquare, desc: 'Track tugas yang belum selesai' },
    { id: 'pengumuman', label: 'Pengumuman', icon: Bell, desc: 'Informasi terbaru kelas' },
    { id: 'struktur', label: 'Struktur Organisasi', icon: Network, desc: 'Susunan pengurus kelas' },
  ];

  return (
    <div className="flex flex-col gap-16 pb-10">
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center pt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-medium uppercase tracking-widest text-primary-foreground/80">
            Angkatan 2025
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-primary to-accent drop-shadow-[0_0_25px_rgba(124,58,237,0.3)]">
            Kelas XII IPA 1
          </h1>
          
          <div className="h-8 mb-10 overflow-hidden">
            <motion.p 
              key={quoteIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="text-lg md:text-xl text-white/60 font-light"
            >
              {quotes[quoteIndex]}
            </motion.p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setActiveTab('anggota')}
              className="px-8 py-4 rounded-2xl bg-white text-black font-semibold tracking-wide hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
            >
              Lihat Anggota
            </button>
            <button 
              onClick={() => setActiveTab('jadwal')}
              className="px-8 py-4 rounded-2xl glass-panel font-semibold tracking-wide hover:bg-white/10 transition-all duration-300 neon-border"
            >
              Jadwal Hari Ini
            </button>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-0 text-white/30"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <span className="w-8 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></span>
          Quick Stats
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-white/50 mb-2">
                {stat.value}
              </div>
              <div className="text-xs text-white/50 uppercase tracking-wider font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <span className="w-8 h-1 bg-gradient-to-r from-accent to-orange-500 rounded-full"></span>
          Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => ['anggota', 'jadwal', 'album'].includes(feature.id) && setActiveTab(feature.id)}
              className="glass-panel p-6 rounded-2xl group cursor-pointer hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(124,58,237,0.2)]">
                <feature.icon className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.label}</h3>
              <p className="text-sm text-white/50">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
