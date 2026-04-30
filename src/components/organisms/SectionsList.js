import Card from '../atoms/Card';
import ReactMarkdown from 'react-markdown';
export default function SectionsList({ markdownSections, sections }) {
  return (
    <div className="space-y-6">
      {markdownSections.map(sec =>
        sections[sec]
          ? <Card key={sec}><ReactMarkdown>{sections[sec]}</ReactMarkdown></Card>
          : null
      )}
    </div>
  );
}
