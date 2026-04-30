import InfoRow from './InfoRow';
export default function InfoHeader({
  alumno,
  profesor,
  titulo,
  fecha_revision,
}) {
  return (
    <div
      className="mt-6 flex justify-center space-x-8 scale-105"
      style={{ transform: 'scale(1.05)', marginTop: '2.5rem' }}
    >
      <InfoRow label="Alumno:" value={alumno} />
      <InfoRow label="Profesor:" value={profesor} />
      <InfoRow label="Título:" value={titulo} />
      <InfoRow label="Revisión:" value={fecha_revision} />
    </div>
  );
}
