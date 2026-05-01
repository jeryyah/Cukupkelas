import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Calendar as CalendarIcon, User } from 'lucide-react';

const schedule = {
  1: [ // Monday
    { time: '07:00 - 08:30', subject: 'Matematika', teacher: 'Bu Sari' },
    { time: '08:30 - 10:00', subject: 'Fisika', teacher: 'Pak Dani' },
    { time: '10:00 - 10:15', subject: 'Istirahat', type: 'break' },
    { time: '10:15 - 11:45', subject: 'Kimia', teacher: 'Bu Rina' },
    { time: '11:45 - 12:30', subject: 'Ishoma', type: 'break' },
    { time: '12:30 - 14:00', subject: 'Bahasa Indonesia', teacher: 'Bu Maya' },
    { time: '14:00 - 15:30', subject: 'Biologi', teacher: 'Pak Joko' },
  ],
  2: [ // Tuesday
    { time: '07:00 - 08:30', subject: 'Bahasa Inggris', teacher: 'Bu Lisa' },
    { time: '08:30 - 10:00', subject: 'Sejarah', teacher: 'Pak Budi' },
    { time: '10:00 - 10:15', subject: 'Istirahat', type: 'break' },
    { time: '10:15 - 11:45', subject: 'Ekonomi', teacher: 'Bu Tuti' },
    { time: '11:45 - 12:30', subject: 'Ishoma', type: 'break' },
    { time: '12:30 - 14:00', subject: 'PJOK', teacher: 'Pak Agus' },
    { time: '14:00 - 15:30', subject: 'Seni Budaya', teacher: 'Bu Wati' },
  ],
  3: [ // Wednesday
    { time: '07:00 - 08:30', subject: 'Matematika', teacher: 'Bu Sari' },
    { time: '08:30 - 10:00', subject: 'Kimia', teacher: 'Bu Rina' },
    { time: '10:00 - 10:15', subject: 'Istirahat', type: 'break' },
    { time: '10:15 - 11:45', subject: 'Fisika', teacher: 'Pak Dani' },
    { time: '11:45 - 12:30', subject: 'Ishoma', type: 'break' },
    { time: '12:30 - 14:00', subject: 'Biologi', teacher: 'Pak Joko' },
    { time: '14:00 - 15:30', subject: 'Prakarya', teacher: 'Bu Dewi' },
  ],
  4: [ // Thursday
    { time: '07:00 - 08:30', subject: 'Bahasa Indonesia', teacher: 'Bu Maya' },
    { time: '08:30 - 10:00', subject: 'Bahasa Inggris', teacher: 'Bu Lisa' },
    { time: '10:00 - 10:15', subject: 'Istirahat', type: 'break' },
    { time: '10:15 - 11:45', subject: 'Matematika', teacher: 'Bu Sari' },
    { time: '11:45 - 12:30', subject: 'Ishoma', type: 'break' },
    { time: '12:30 - 14:00', subject: 'PKn', teacher: 'Pak Hadi' },
    { time: '14:00 - 15:30', subject: 'Agama', teacher: 'Pak Umar' },
  ],
  5: [ // Friday
    { time: '07:00 - 08:30', subject: 'Biologi', teacher: 'Pak Joko' },
    { time: '08:30 - 09:30', subject: 'Kimia', teacher: 'Bu Rina' },
    { time: '09:30 - 10:30', subject: 'Sholat Jumat / Istirahat', type: 'break' },
    { time: '10:30 - 12:00', subject: 'Fisika', teacher: 'Pak Dani' },
    { time: '12:00 - 12:30', subject: 'Istirahat', type: 'break' },
    { time: '12:30 - 14:00', subject: 'Bahasa Inggris', teacher: 'Bu Lisa' },
  ],
  6: [ // Saturday
    { time: '07:00 - 08:30', subject: 'Matematika', teacher: 'Bu Sari' },
    { time: '08:30 - 11:00', subject: 'Ekstrakulikuler', type: 'special' },
  ]
};

const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

export default function Jadwal() {
  const [time, setTime] = useState(new Date());
  const [activeDay, setActiveDay] = useState(new Date().getDay());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getDresscode = (dayIdx: number) => {
    if (dayIdx >= 1 && dayIdx <= 4) return 'Putih Abu-abu';
    if (dayIdx === 5) return 'Batik / Pramuka';
    if (dayIdx === 6) return 'Olahraga';
    return 'Bebas Rapi';
  };

  const isCurrentTime = (timeStr: string) => {
    if (activeDay !== new Date().getDay()) return false;
    
    const [start, end] = timeStr.split(' - ');
    const nowStr = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
    
    return nowStr >= start && nowStr < end;
  };

  const currentSchedule = schedule[activeDay as keyof typeof schedule] || [];

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Jadwal Pelajaran</h1>
          <p className="text-white/60">Real-time tracker untuk XII IPA 1</p>
        </div>
        
        <div className="glass-panel px-6 py-4 rounded-2xl flex items-center gap-4">
          <Clock className="text-primary animate-pulse" size={28} />
          <div>
            <div className="text-2xl font-mono font-bold tracking-wider">
              {time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="text-sm text-white/50">{time.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
          </div>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-4 hide-scrollbar gap-2">
        {[1, 2, 3, 4, 5, 6].map((d) => (
          <button
            key={d}
            onClick={() => setActiveDay(d)}
            className={`min-w-[100px] px-4 py-3 rounded-2xl font-medium transition-all duration-300 ${
              activeDay === d 
                ? 'bg-gradient-to-br from-primary to-accent text-white shadow-lg' 
                : 'glass-panel text-white/60 hover:bg-white/10'
            }`}
          >
            {days[d]}
            {d === new Date().getDay() && <div className="text-[10px] uppercase mt-1 opacity-80">Hari Ini</div>}
          </button>
        ))}
      </div>

      {activeDay === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-3xl p-12 flex flex-col items-center justify-center text-center min-h-[400px]"
        >
          <div className="text-8xl mb-6">🎉</div>
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">Hari Libur!</h2>
          <p className="text-white/60">Waktunya istirahat dan merefresh pikiran. Sampai jumpa besok!</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {currentSchedule.map((item, i) => {
              const active = isCurrentTime(item.time);
              const isBreak = item.type === 'break';
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-5 rounded-2xl flex flex-col sm:flex-row gap-4 sm:items-center justify-between transition-all duration-300 ${
                    active 
                      ? 'bg-green-500/10 border-2 border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.2)]' 
                      : isBreak 
                        ? 'bg-white/5 border border-dashed border-white/10' 
                        : 'glass-panel hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-12 rounded-full ${active ? 'bg-green-500 animate-pulse' : isBreak ? 'bg-white/20' : 'bg-primary/50'}`}></div>
                    <div>
                      <h3 className={`text-lg font-bold ${isBreak ? 'text-white/60 italic' : 'text-white'}`}>
                        {item.subject}
                      </h3>
                      {!isBreak && item.teacher && (
                        <div className="text-sm text-white/50 flex items-center gap-2 mt-1">
                          <User size={14} /> {item.teacher}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-2 font-mono ${active ? 'text-green-400 font-bold' : 'text-white/70'}`}>
                    <Clock size={16} />
                    {item.time}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-3xl p-6"
            >
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-white/10 pb-4">
                <MapPin className="text-accent" /> Info Ruangan
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/60">Gedung</span>
                  <span className="font-semibold">Utama (Timur)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Lantai</span>
                  <span className="font-semibold">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Ruang</span>
                  <span className="font-semibold text-primary">Lab IPA 1</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-3xl p-6 relative overflow-hidden"
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-white/10 pb-4 relative z-10">
                <CalendarIcon className="text-primary" /> Dresscode
              </h3>
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 relative z-10">
                {getDresscode(activeDay)}
              </div>
              <p className="text-sm text-white/50 mt-2 relative z-10">
                Jangan lupa bawa ID Card dan perlengkapan sesuai jadwal.
              </p>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
