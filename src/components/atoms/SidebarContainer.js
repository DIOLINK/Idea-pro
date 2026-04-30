export default function SidebarContainer({ open, onClose, children }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-72 bg-card-light dark:bg-card-dark shadow-2xl z-40 transition-transform duration-300 border-r border-border-light dark:border-border-dark ${open ? 'translate-x-0' : '-translate-x-full'}`}
      role="navigation"
      aria-label="Índice del documento"
    >
      <button
        className="absolute top-4 right-4 text-primary-light dark:text-primary-dark hover:text-accent-light dark:hover:text-accent-dark text-lg"
        onClick={onClose}
        aria-label="Cerrar menú de navegación"
      >
        ×
      </button>
      <div className="mt-14 overflow-y-auto h-[92%] px-4">{children}</div>
    </div>
  );
}
