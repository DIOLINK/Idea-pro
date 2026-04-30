import Card from '../atoms/Card';
import ReactMarkdown from 'react-markdown';
export default function ControlCambiosBlock({ markdown }) {
  if (!markdown) return null;
  return (
    <Card className="bg-yellow-50 border-yellow-300">
      <h2 className="font-bold text-lg mb-2 text-yellow-700">Control de Cambios</h2>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </Card>
  );
}
