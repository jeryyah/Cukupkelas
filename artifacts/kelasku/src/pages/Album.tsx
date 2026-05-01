import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const albums = [
  { id: 1, title: 'Perpisahan 2024', desc: 'Momen haru bersama kakak kelas', date: 'Mei 2024', style: 'from-blue-600/80 to-purple-600/80', height: 'h-64' },
  { id: 2, title: 'Study Tour Bali', desc: 'Petualangan di Pulau Dewata', date: 'Februari 2024', style: 'from-orange-500/80 to-red-500/80', height: 'h-80' },
  { id: 3, title: 'Class Meeting', desc: 'Juara Umum Futsal', date: 'Desember 2023', style: 'from-green-500/80 to-teal-500/80', height: 'h-56' },
  { id: 4, title: 'Ultah Wali Kelas', desc: 'Kejutan untuk Bu Rina', date: 'November 2023', style: 'from-pink-500/80 to-rose-500/80', height: 'h-72' },
  { id: 5, title: 'Lomba 17an', desc: 'Semangat Kemerdekaan', date: 'Agustus 2023', style: 'from-red-600/80 to-red-800/80', height: 'h-64' },
  { id: 6, title: 'Praktikum Kimia', desc: 'Ledakan kecil di Lab', date: 'Oktober 2023', style: 'from-cyan-500/80 to-blue-500/80', height: 'h-80' },
  { id: 7, title: 'Bukber Ramadhan', desc: 'Indahnya kebersamaan', date: 'Maret 2024', style: 'from-amber-500/80 to-orange-600/80', height: 'h-56' },
  { id: 8, title: 'Field Trip Museum', desc: 'Belajar sejarah bangsa', date: 'September 2023', style: 'from-indigo-500/80 to-purple-600/80', height: 'h-72' },
];

export default function Album() {
  const [selectedImg, setSelectedImg] = useState<typeof albums[0] | null>(null);

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="text-center pt-8">
        <h1 className="text-4xl font-bold mb-4">Album Kenangan</h1>
        <p className="text-white/60 max-w-lg mx-auto">Setiap detik berharga, terabadikan dalam piksel. Cerita perjalanan XII IPA 1.</p>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {albums.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelectedImg(item)}
            className={`relative rounded-3xl overflow-hidden cursor-pointer group break-inside-avoid shadow-lg ${item.height} bg-gradient-to-br ${item.style}`}
          >
            {/* Abstract decorative elements to make it look like a photo placeholder */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiLz48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwIi8+PC9zdmc+')]"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/20 rounded-full blur-2xl transform -translate-x-10 translate-y-10"></div>

            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-500"></div>
            
            <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 mb-2">
                <ZoomIn className="text-white/80" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{item.desc}</p>
              <div className="text-xs font-medium text-white/50 mt-2 uppercase tracking-wider">{item.date}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br ${selectedImg.style}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiLz48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwIi8+PC9zdmc+')]"></div>
              
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-6 right-6 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-md transition-colors z-10"
              >
                <X size={24} />
              </button>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-10">
                <h2 className="text-4xl font-bold text-white mb-2">{selectedImg.title}</h2>
                <p className="text-xl text-white/80 mb-4">{selectedImg.desc}</p>
                <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium">
                  {selectedImg.date}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
