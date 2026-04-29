import yaml from "js-yaml";

export async function fetchSettings() {
  try {
    const res = await fetch(process.env.PUBLIC_URL + "/markdowns/Setting.md");
    if (!res.ok) {
      console.warn('No se encontró Setting.md');
      return { error: 'El archivo Setting.md no existe.' };
    }
    const text = await res.text();
    try {
      return yaml.load(text) || {};
    } catch (err) {
      console.error('YAML inválido en Setting.md:', err);
      return { error: 'El archivo Setting.md contiene YAML inválido.' };
    }
  } catch (err) {
    console.error('Error cargando Setting.md:', err);
    return { error: 'Error general cargando Setting.md.' };
  }
}
