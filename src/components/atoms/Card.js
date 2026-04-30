export default function Card({ children, className = '' }) {
  return (
    <div className={`card-theme border rounded p-4 shadow ${className}`}>
      {children}
    </div>
  );
}
