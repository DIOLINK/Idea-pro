# markdown-viewer

## Descripción

SPA en React que visualiza secciones de documentos Markdown estructurados, usa el contenido de `/markdowns`, y variables de `/markdowns/Setting.md`, para mostrar propuestas o proyectos de manera profesional, siguiendo Atomic Design. Cada vez que actualices los `.md` y hagas deploy, la web se actualizará.

---

## ¿Cómo configurar el repo para usar GitHub Pages?

1. **Repositorio público en GitHub**
   - Sube todo tu proyecto (incluyendo `/markdowns/*`, `/src`, etc.) a un nuevo repo en GitHub.

2. **Instala dependencias y verifica build local (opcional)**
   ```bash
   npm install
   npm run build
   ```

3. **Agrega la propiedad `homepage` a `package.json`:**
   - Por ejemplo, si tu repo es `https://github.com/usuario/tu-repo`, pon esto en `package.json`:
     ```json
     "homepage": "https://usuario.github.io/tu-repo"
     ```

4. **Agrega o completa el workflow de GitHub Actions** en `.github/workflows/build.yml`:

   ```yaml
   name: Build and Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - name: Instalar dependencias
           run: npm install
         - name: Generar Control de Cambios
           run: node scripts/generate-control-cambios.js || true
         - name: Build
           run: npm run build
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./build
   ```

5. **Activa GitHub Pages**
   - En la configuración del repo (Settings → Pages), selecciona como fuente la rama `gh-pages`. El workflow creará automáticamente esa rama.

6. **Espera a que la acción termine y accede a tu web desde:**
   - `https://usuario.github.io/tu-repo/`

### Notas importantes
- Edita/agrega tus archivos `.md` y haz `push` para que el Action vuelva a desplegar (incluido el control de cambios automático).
- Cualquier cambio en `markdowns/Setting.md` o cualquier otro `.md` se refleja en el siguiente deploy.

---

¡Listo! Tu SPA servirá la documentación markdown actualizada y profesional desde GitHub Pages, con todo el flujo automatizado.
