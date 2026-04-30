import InfoRow from './InfoRow';
export default function InfoHeader({
  alumno,
  profesor,
  titulo,
  fecha_revision,
}) {
  return (
    <div
      className="mt-6 flex justify-center items-center space-x-8 scale-105"
      style={{ transform: 'scale(1.0)', marginTop: '2.5rem' }}
    >
      <InfoRow label="Alumno:" value={alumno} />
      <div className="h-8 border-l border-gray-400 mx-1" />
      <InfoRow label="Profesor:" value={profesor} />
      <div className="h-8 border-l border-gray-400 mx-1" />
      <InfoRow label="Título:" value={titulo} />
      <div className="h-8 border-l border-gray-400 mx-1" />
      <InfoRow label="Revisión:" value={fecha_revision} />
    </div>
  );
}
