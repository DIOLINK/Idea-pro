const simpleGit = require('simple-git');
const fs = require('fs');
const path = require('path');

const repoPath = path.resolve(__dirname, '../');
const mdDir = path.join(repoPath, 'public/markdowns'); // Usa public/markdowns
const outFile = path.join(mdDir, 'control-cambios.md');
const indexFile = path.join(mdDir, 'index.json');

const git = simpleGit(repoPath);

(async () => {
  // Detecta todos los archivos .md válidos sección (1.0.md...10.0.md)
  const fileList = fs.readdirSync(mdDir)
    .filter(f => /^[1-9]\.0\.md$|^10\.0\.md$/.test(f));
  // Genera index.json
  fs.writeFileSync(indexFile, JSON.stringify(fileList, null, 2), 'utf8');

  // Genera tabla control de cambios
  let rows = [];
  for (let file of fileList) {
    const log = await git.log({ file: path.relative(repoPath, path.join(mdDir, file)) });
    log.all.forEach(entry => {
      if (entry.message.match(/\S/)) {
        rows.push({
          date: entry.date.split('T')[0],
          file,
          author: entry.author_name,
          message: entry.message
        });
      }
    });
  }
  rows = rows.filter(row => !row.file.startsWith('.')).sort((a, b) => a.date.localeCompare(b.date));
  let mdTable = `| Fecha       | Archivo     | Autor       | Mensaje Commit                      |\n|-------------|-------------|-------------|-------------------------------------|\n${rows.map(r => `| ${r.date} | ${r.file} | ${r.author} | ${r.message} |`).join('\n')}`;
  fs.writeFileSync(outFile, mdTable, 'utf8');
  console.log("Archivo control-cambios.md y index.json actualizados en /public/markdowns.");
})();
