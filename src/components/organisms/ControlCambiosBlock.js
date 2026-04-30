import React from 'react';
import Card from '../atoms/Card';
import ReactMarkdown from 'react-markdown';
// --- reutiliza el headingMap para enriquecer headings también en control de cambios ---
function headingRenderer(level) {
  return function Heading({ node, children }) {
    const text = String(children[0]);
    const match = text.match(/^(\d+(\.\d+)*)(\s|:)?.*$/);
    const indexNum = match ? match[1] : undefined;
    const id = indexNum ? `h-${indexNum.replace(/\./g, '-')}` : undefined;
    return (
      <>{
        id && <span id={id} data-index-number={indexNum} className="invisible absolute"/>
      }{
        React.createElement(
          `h${level}`,
          { id, 'data-index-number': indexNum, className: 'scroll-mt-24' },
          children
        )
      }</>
    );
  }
}
const headingMap = {};
for(let i=1; i<=6; ++i) headingMap[`h${i}`]=headingRenderer(i);

export default function ControlCambiosBlock({ markdown }) {
  if (!markdown) return null;
  return (
    <Card className="bg-yellow-50 border-yellow-300">
      <h2 className="font-bold text-lg mb-2 text-yellow-700">Control de Cambios</h2>
      <ReactMarkdown components={headingMap}>{markdown}</ReactMarkdown>
    </Card>
  );
}
