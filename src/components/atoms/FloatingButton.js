export default function FloatingButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="fixed left-0 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-blue-500/60 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-50 transition-all focus:outline-none border border-white/20 backdrop-blur"
      style={{ cursor: 'pointer', backdropFilter: 'blur(8px)' }}
      aria-label="Abrir menú de navegación"
    >
      {children}
    </button>
  );
}
