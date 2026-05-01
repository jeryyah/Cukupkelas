import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Plus, Upload, Image as ImageIcon, Trash2, Camera } from 'lucide-react';

interface AlbumItem {
  id: string;
  title: string;
  desc: string;
  date: string;
  style: string;
  imageUrl?: string;
  height: string;
  addedBy?: string;
}

const gradients = [
  'from-blue-600/80 to-purple-600/80',
  'from-orange-500/80 to-red-500/80',
  'from-green-500/80 to-teal-500/80',
  'from-pink-500/80 to-rose-500/80',
  'from-cyan-500/80 to-blue-500/80',
  'from-amber-500/80 to-orange-600/80',
  'from-indigo-500/80 to-purple-600/80',
  'from-emerald-500/80 to-green-600/80',
  'from-violet-500/80 to-fuchsia-500/80',
  'from-sky-500/80 to-indigo-500/80',
];

const heights = ['h-56', 'h-64', 'h-72', 'h-80'];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const STORAGE_KEY = 'kelasku-album';

function loadAlbums(): AlbumItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveAlbums(albums: AlbumItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(albums));
}

export default function Album() {
  const [albums, setAlbums] = useState<AlbumItem[]>(loadAlbums);
  const [selectedImg, setSelectedImg] = useState<AlbumItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', desc: '', addedBy: '' });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    saveAlbums(albums);
  }, [albums]);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 600));

    const newItem: AlbumItem = {
      id: Date.now().toString(),
      title: form.title.trim(),
      desc: form.desc.trim() || 'Momen bersama XII IPA 1',
      date: new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }),
      style: getRandomItem(gradients),
      height: getRandomItem(heights),
      imageUrl: imagePreview || undefined,
      addedBy: form.addedBy.trim() || 'Anonim',
    };

    setAlbums(prev => [newItem, ...prev]);
    setForm({ title: '', desc: '', addedBy: '' });
    setImagePreview(null);
    setIsSubmitting(false);
    setShowForm(false);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAlbums(prev => prev.filter(a => a.id !== id));
    if (selectedImg?.id === id) setSelectedImg(null);
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold mb-2">Album Kenangan</h1>
          <p className="text-white/60 max-w-lg">Abadikan setiap momen. Kirim foto dan cerita kamu!</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-primary to-accent shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] transition-shadow"
        >
          <Plus size={20} /> Tambah Foto
        </motion.button>
      </div>

      {albums.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-3xl p-16 flex flex-col items-center justify-center text-center gap-4"
        >
          <Camera size={56} className="text-white/20" />
          <h3 className="text-2xl font-bold text-white/50">Belum ada foto</h3>
          <p className="text-white/30 max-w-sm">Jadilah yang pertama menambahkan kenangan kelas!</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-2 px-6 py-3 rounded-2xl bg-primary/20 hover:bg-primary/30 text-primary font-semibold transition-colors"
          >
            Tambah Foto Pertama
          </button>
        </motion.div>
      )}

      {albums.length > 0 && (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {albums.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: Math.min(i * 0.08, 0.5) }}
              onClick={() => setSelectedImg(item)}
              className={`relative rounded-3xl overflow-hidden cursor-pointer group break-inside-avoid shadow-lg ${item.height} ${item.imageUrl ? '' : `bg-gradient-to-br ${item.style}`}`}
            >
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl transform translate-x-10 -translate-y-10" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/20 rounded-full blur-2xl transform -translate-x-10 translate-y-10" />
                </>
              )}

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-500" />

              <button
                onClick={(e) => handleDelete(item.id, e)}
                className="absolute top-4 right-4 p-2 bg-red-500/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-600"
              >
                <Trash2 size={14} />
              </button>

              <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 mb-2">
                  <ZoomIn className="text-white/80" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">{item.title}</h3>
                <p className="text-sm text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{item.desc}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs font-medium text-white/50 uppercase tracking-wider">{item.date}</div>
                  {item.addedBy && (
                    <div className="text-xs text-white/40">oleh {item.addedBy}</div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

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
              className={`relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-2xl ${selectedImg.imageUrl ? '' : `bg-gradient-to-br ${selectedImg.style}`}`}
              onClick={(e) => e.stopPropagation()}
            >
              {selectedImg.imageUrl ? (
                <img src={selectedImg.imageUrl} alt={selectedImg.title} className="w-full h-full object-contain bg-black" />
              ) : (
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              )}
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-6 right-6 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-md transition-colors z-10"
              >
                <X size={24} />
              </button>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8">
                <h2 className="text-3xl font-bold text-white mb-1">{selectedImg.title}</h2>
                <p className="text-lg text-white/80 mb-3">{selectedImg.desc}</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium">{selectedImg.date}</span>
                  {selectedImg.addedBy && (
                    <span className="text-white/50 text-sm">Dikirim oleh {selectedImg.addedBy}</span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg glass-card rounded-3xl p-6 flex flex-col gap-5"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Tambah Kenangan</h2>
                <button onClick={() => setShowForm(false)} className="p-2 rounded-xl hover:bg-white/10 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className={`relative rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 overflow-hidden
                  ${isDragging ? 'border-primary bg-primary/10 scale-105' : 'border-white/20 hover:border-primary/50 hover:bg-white/5'}`}
              >
                {imagePreview ? (
                  <div className="relative h-48">
                    <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <span className="text-white font-medium">Ganti Foto</span>
                    </div>
                  </div>
                ) : (
                  <div className="h-40 flex flex-col items-center justify-center gap-3 text-white/50">
                    <Upload size={32} className="text-primary/60" />
                    <div className="text-center">
                      <p className="font-medium text-white/70">Upload Foto</p>
                      <p className="text-sm">Klik atau drag & drop di sini</p>
                    </div>
                  </div>
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-sm text-white/60 mb-1 block">Judul Foto <span className="text-accent">*</span></label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))}
                    placeholder="Contoh: Study Tour Bali 2024"
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/10 focus:border-primary/50 focus:outline-none focus:bg-white/15 placeholder-white/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-1 block">Deskripsi</label>
                  <input
                    value={form.desc}
                    onChange={(e) => setForm(p => ({ ...p, desc: e.target.value }))}
                    placeholder="Ceritakan momen ini..."
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/10 focus:border-primary/50 focus:outline-none focus:bg-white/15 placeholder-white/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-1 block">Nama Kamu</label>
                  <input
                    value={form.addedBy}
                    onChange={(e) => setForm(p => ({ ...p, addedBy: e.target.value }))}
                    placeholder="Nama siswa (opsional)"
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/10 focus:border-primary/50 focus:outline-none focus:bg-white/15 placeholder-white/30 transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 rounded-2xl border border-white/20 hover:bg-white/10 font-semibold transition-colors"
                >
                  Batal
                </button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSubmit}
                  disabled={!form.title.trim() || isSubmitting}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-semibold disabled:opacity-40 shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-opacity flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <><ImageIcon size={18} /> Kirim Foto</>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
