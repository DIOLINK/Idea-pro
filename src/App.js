import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import logo from './assets/logo.png';
import { fetchSettings } from './utils/settingsParser';

function App() {
  const [settings, setSettings] = useState({});
  const [sections, setSections] = useState({});
  const [markdownSections, setMarkdownSections] = useState([]);
  const [controlCambios, setControlCambios] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings().then(setSettings);
    // Cargar sección de índices sólo válidos desde index.json
    fetch(process.env.PUBLIC_URL + '/markdowns/index.json')
      .then(res => res.ok ? res.json() : [])
      .then(secs => {
        setMarkdownSections(secs);
        return Promise.all(
          secs.map(section =>
            fetch(process.env.PUBLIC_URL + '/markdowns/' + section)
              .then(r => r.ok ? r.text() : null)
              .then(text => [section, text])
          )
        );
      })
      .then(results => {
        setSections(Object.fromEntries(results.filter(([_, t]) => t)));
        // Cargar control-cambios.md al final
        fetch(process.env.PUBLIC_URL + '/markdowns/control-cambios.md')
          .then(r => r.ok ? r.text() : null)
          .then(setControlCambios);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center">Cargando...</div>;

  if (settings.error) return <div className="p-8 text-center text-red-600 bg-red-50 border border-red-200 rounded">⚠️ {settings.error}</div>;
  return (
    <div className="container mx-auto p-4 font-sans">
      {/* Header */}
      <div className="flex items-center border rounded p-2 mb-4">
        <img src={logo} alt="Logo" className="w-40 h-40 rounded-full" />
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-semibold">Idea Proyecto</h1>
          <div className="mt-2 flex justify-center space-x-8">
            <div>
              <span className="font-bold">Alumno:</span> {settings.alumno}
            </div>
            <div>
              <span className="font-bold">Profesor:</span> {settings.profesor}
            </div>
            <div>
              <span className="font-bold">Título:</span> {settings.titulo}
            </div>
            <div>
              <span className="font-bold">Revisión:</span> {settings.fecha_revision}
            </div>
          </div>
        </div>
      </div>
      {/* Secciones renderizadas */}
      <div className="space-y-6">
        {markdownSections.map(sec =>
          sections[sec]
            ? <section key={sec} className="bg-white border rounded p-4 shadow">
                <ReactMarkdown>{sections[sec]}</ReactMarkdown>
              </section>
            : null
        )}
        {controlCambios && (
          <section className="bg-yellow-50 border-2 border-yellow-300 rounded p-4 shadow mt-10">
            <h2 className="font-bold text-lg mb-2 text-yellow-700">Control de Cambios</h2>
            <ReactMarkdown>{controlCambios}</ReactMarkdown>
          </section>
        )}
      </div>
      {/* Pie de página tabla de firmas */}
      <footer className="mt-8 border-t pt-4 text-sm grid grid-cols-2 gap-4">
        <div>
          <div className="font-bold">Confeccionó</div>
          <div>{settings.alumno}</div>
          <div>Alumno</div>
        </div>
        <div>
          <div className="font-bold">Aprobó</div>
          <div>{settings.profesor}</div>
          <div>Profesor</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
