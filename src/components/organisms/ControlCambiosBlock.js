import Card from '../atoms/Card';

function parseMarkdownTable(markdown) {
  // Extrae filas de la tabla markdown
  const lines = markdown
    .split('\n')
    .filter((line) => line.trim() && !/^\|?[- ]+\|?$/g.test(line)); // ignora separadores
  if (lines.length < 2) return null;
  const headers = lines[0]
    .split('|')
    .map((h) => h.trim())
    .filter(Boolean);
  const rows = lines.slice(1).map((line) =>
    line
      .split('|')
      .map((cell) => cell.trim())
      .filter(Boolean),
  );
  return { headers, rows };
}

function reorderColumns(headers, rows) {
  const autorIdx = headers.findIndex((h) => h.toLowerCase().includes('autor'));
  if (autorIdx === -1) return { headers, rows };
  const newHeaders = headers
    .filter((_, i) => i !== autorIdx)
    .concat([headers[autorIdx]]);
  const newRows = rows.map((row) => {
    const autor = row[autorIdx];
    return row.filter((_, i) => i !== autorIdx).concat([autor]);
  });
  return { headers: newHeaders, rows: newRows };
}

export default function ControlCambiosBlock({ markdown }) {
  if (!markdown) return null;
  const tableRaw = parseMarkdownTable(
    Array.isArray(markdown) ? markdown.join('') : markdown.toString(),
  );
  const table = tableRaw
    ? reorderColumns(tableRaw.headers, tableRaw.rows)
    : null;
  return (
    <Card className="bg-yellow-50 border-yellow-300 mt-6">
      <h2 className="font-bold text-lg mb-2 text-yellow-700">
        Control de Cambios
      </h2>
      {table ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-separate border-spacing-y-2 rounded-lg overflow-hidden shadow-sm">
            <thead>
              <tr>
                {table.headers.map((header, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-2 bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100 border border-yellow-300 dark:border-yellow-700 font-semibold text-left first:rounded-tl-lg last:rounded-tr-lg"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, i) => (
                <tr
                  key={i}
                  className={
                    i % 2 === 0
                      ? 'bg-white dark:bg-yellow-900/10'
                      : 'bg-yellow-50 dark:bg-yellow-900/30'
                  }
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="px-4 py-2 border border-yellow-100 dark:border-yellow-800 text-gray-700 dark:text-gray-100"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          {Array.isArray(markdown)
            ? markdown.join('')
            : (markdown || '').toString()}
        </div>
      )}
    </Card>
  );
}
