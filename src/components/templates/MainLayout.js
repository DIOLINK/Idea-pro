export default function MainLayout({ header, children, footer }) {
  return (
    <div className="container mx-auto p-4 font-sans">
      {header}
      {children}
      {footer}
    </div>
  );
}
