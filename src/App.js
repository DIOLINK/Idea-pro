import { useEffect, useState } from 'react';
import HomePage from './components/pages/HomePage';
import Avatar from './components/atoms/Avatar';
import InfoHeader from './components/molecules/InfoHeader';
import SectionsList from './components/organisms/SectionsList';
import ControlCambiosBlock from './components/organisms/ControlCambiosBlock';
import SignatureBlock from './components/molecules/SignatureBlock';
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
    fetch(process.env.PUBLIC_URL + '/markdowns/index.json')
      .then(res => (res.ok ? res.json() : []))
      .then(secs => {
        setMarkdownSections(secs);
        return Promise.all(
          secs.map(section =>
            fetch(process.env.PUBLIC_URL + '/markdowns/' + section)
              .then(r => (r.ok ? r.text() : null))
              .then(text => [section, text])
          )
        );
      })
      .then(results => {
        setSections(Object.fromEntries(results.filter(([_, t]) => t)));
        fetch(process.env.PUBLIC_URL + '/markdowns/control-cambios.md')
          .then(r => (r.ok ? r.text() : null))
          .then(setControlCambios);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center">Cargando...</div>;
  if (settings.error) {
    return (
      <div className="p-8 text-center text-red-600 bg-red-50 border border-red-200 rounded">
        ⚠️ {settings.error}
      </div>
    );
  }

  // Compose Header (logo + InfoHeader)
  const header = (
    <div className="flex items-center border rounded p-2 mb-4">
      <Avatar src={logo} alt="Logo" />
      <div className="flex-1 text-center">
        <h1 className="text-2xl font-semibold">Idea Proyecto</h1>
        <InfoHeader
          alumno={settings.alumno}
          profesor={settings.profesor}
          titulo={settings.titulo}
          fecha_revision={settings.fecha_revision}
        />
      </div>
    </div>
  );

  // Body: markdow sections list
  const sectionsComponent = (
    <SectionsList markdownSections={markdownSections} sections={sections} />
  );

  // Control de Cambios
  const cambiosComponent = (
    <ControlCambiosBlock markdown={controlCambios} />
  );

  // Footer: Signature blocks
  const footer = (
    <footer className="mt-8 border-t pt-4 text-sm grid grid-cols-2 gap-4">
      <SignatureBlock nombre={settings.alumno} rol="Alumno" />
      <SignatureBlock nombre={settings.profesor} rol="Profesor" />
    </footer>
  );

  return (
    <HomePage
      header={header}
      sections={sectionsComponent}
      controlCambios={cambiosComponent}
      footer={footer}
    />
  );
}

export default App;
