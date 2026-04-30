import InfoRow from './InfoRow';
export default function InfoHeader({ alumno, profesor, titulo, fecha_revision }) {
  return (
    <div className="mt-2 flex justify-center space-x-8">
      <InfoRow label="Alumno:" value={alumno} />
      <InfoRow label="Profesor:" value={profesor} />
      <InfoRow label="Título:" value={titulo} />
      <InfoRow label="Revisión:" value={fecha_revision} />
    </div>
  );
}
