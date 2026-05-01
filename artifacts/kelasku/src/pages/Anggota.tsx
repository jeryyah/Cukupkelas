import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, User } from 'lucide-react';

const members = [
  { id: 1, name: 'Ahmad Rizky Pratama', role: 'Ketua Kelas', type: 'pengurus' },
  { id: 2, name: 'Siti Nurhaliza', role: 'Wakil Ketua', type: 'pengurus' },
  { id: 3, name: 'Budi Santoso', role: 'Sekretaris', type: 'pengurus' },
  { id: 4, name: 'Dewi Rahayu', role: 'Bendahara', type: 'pengurus' },
  { id: 5, name: 'Aditya Pratama', role: 'Siswa', type: 'siswa' },
  { id: 6, name: 'Aisyah Putri', role: 'Siswa', type: 'siswa' },
  { id: 7, name: 'Bagas Firmansyah', role: 'Siswa', type: 'siswa' },
  { id: 8, name: 'Cinta Lestari', role: 'Siswa', type: 'siswa' },
  { id: 9, name: 'Dimas Anggara', role: 'Siswa', type: 'siswa' },
  { id: 10, name: 'Eka Saputra', role: 'Siswa', type: 'siswa' },
  { id: 11, name: 'Fajar Nugroho', role: 'Siswa', type: 'siswa' },
  { id: 12, name: 'Gita Permatasari', role: 'Siswa', type: 'siswa' },
  { id: 13, name: 'Hadi Wijaya', role: 'Siswa', type: 'siswa' },
  { id: 14, name: 'Indah Kusuma', role: 'Siswa', type: 'siswa' },
  { id: 15, name: 'Joko Susanto', role: 'Siswa', type: 'siswa' },
  { id: 16, name: 'Kartika Sari', role: 'Siswa', type: 'siswa' },
  { id: 17, name: 'Lukman Hakim', role: 'Siswa', type: 'siswa' },
  { id: 18, name: 'Maya Andriani', role: 'Siswa', type: 'siswa' },
  { id: 19, name: 'Nadia Salsabila', role: 'Siswa', type: 'siswa' },
  { id: 20, name: 'Oky Pratama', role: 'Siswa', type: 'siswa' },
  { id: 21, name: 'Putri Maharani', role: 'Siswa', type: 'siswa' },
  { id: 22, name: 'Rangga Saputra', role: 'Siswa', type: 'siswa' },
  { id: 23, name: 'Rini Yulianti', role: 'Siswa', type: 'siswa' },
  { id: 24, name: 'Satria Baja', role: 'Siswa', type: 'siswa' },
  { id: 25, name: 'Tia Amanda', role: 'Siswa', type: 'siswa' },
  { id: 26, name: 'Umar Hidayat', role: 'Siswa', type: 'siswa' },
  { id: 27, name: 'Vina Panduwinata', role: 'Siswa', type: 'siswa' },
  { id: 28, name: 'Wira Kusuma', role: 'Siswa', type: 'siswa' },
  { id: 29, name: 'Xenia Larasati', role: 'Siswa', type: 'siswa' },
  { id: 30, name: 'Yusuf Maulana', role: 'Siswa', type: 'siswa' },
  { id: 31, name: 'Zahra Nabila', role: 'Siswa', type: 'siswa' },
  { id: 32, name: 'Zidan Alfarizi', role: 'Siswa', type: 'siswa' },
];

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
}

const colors = [
  'from-blue-500 to-cyan-400',
  'from-purple-500 to-indigo-400',
  'from-pink-500 to-rose-400',
  'from-orange-500 to-amber-400',
  'from-green-500 to-emerald-400'
];

export default function Anggota() {
  const [filter, setFilter] = useState('semua');

  const filteredMembers = members.filter(m => filter === 'semua' || m.type === filter);

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="text-center pt-8">
        <h1 className="text-4xl font-bold mb-4">Anggota Kelas</h1>
        <p className="text-white/60 mb-8 max-w-lg mx-auto">Mengenal lebih dekat keluarga besar XII IPA 1. Bersama meraih masa depan.</p>
        
        <div className="inline-flex glass-panel p-1 rounded-full mb-8">
          {['semua', 'pengurus', 'siswa'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                filter === f ? 'bg-white text-black shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredMembers.map((member, i) => {
          const colorClass = colors[i % colors.length];
          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-3xl p-5 flex flex-col items-center text-center group relative overflow-hidden"
            >
              <div className={`w-20 h-20 rounded-full mb-4 flex items-center justify-center text-2xl font-bold bg-gradient-to-br ${colorClass} text-white shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform duration-500 relative`}>
                {getInitials(member.name)}
                {member.type === 'pengurus' && (
                  <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1 border-2 border-background">
                    <Shield size={14} className="text-yellow-400" fill="currentColor" />
                  </div>
                )}
              </div>
              
              <h3 className="text-sm md:text-base font-semibold text-white mb-1 truncate w-full">{member.name}</h3>
              <span className={`text-xs px-3 py-1 rounded-full ${
                member.type === 'pengurus' 
                  ? 'bg-primary/20 text-primary border border-primary/30' 
                  : 'bg-white/5 text-white/50 border border-white/10'
              }`}>
                {member.role}
              </span>

              <div className="absolute inset-x-0 -bottom-10 h-10 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bottom-0 transition-all duration-300">
                <span className="text-xs font-medium text-green-400 flex items-center gap-1">
                  Status: Aktif <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
