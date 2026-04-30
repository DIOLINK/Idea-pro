export default function Card({ children, className = "" }) {
  return <div className={`bg-white border rounded p-4 shadow ${className}`}>{children}</div>;
}
