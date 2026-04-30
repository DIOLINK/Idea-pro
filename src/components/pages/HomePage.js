import MainLayout from '../templates/MainLayout';

export default function HomePage({ header, sections, controlCambios, footer }) {
  return (
    <MainLayout header={header} footer={footer}>
      {sections}
      {controlCambios}
    </MainLayout>
  );
}
