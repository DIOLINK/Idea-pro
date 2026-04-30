import React from 'react';
import Card from '../atoms/Card';
import ReactMarkdown from 'react-markdown';

// Header renderer para jerarquía tipo 1.0,1.1,2.0
function headingRenderer(level) {
  return function Heading({ node, children }) {
    // Espera "1.0 Título" o similar como children[0]
    const text = String(children[0]);
    const match = text.match(/^(\d+(\.\d+)*)(\s|:)?.*$/);
    const indexNum = match ? match[1] : undefined;
    const id = indexNum ? `h-${indexNum.replace(/\./g, '-')}` : undefined;
    return (
      <>{
        // Ancla de scroll invisible
        id && <span id={id} data-index-number={indexNum} className="invisible absolute"/>
      }{
        // Heading visual
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

export default function SectionsList({ markdownSections, sections }) {
  return (
    <div className="space-y-6">
      {markdownSections.map(sec =>
        sections[sec]
          ? <Card key={sec}><ReactMarkdown components={headingMap}>{sections[sec]}</ReactMarkdown></Card>
          : null
      )}
    </div>
  );
}
