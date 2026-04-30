import Label from '../atoms/Label';
export default function InfoRow({ label, value }) {
  return <div><Label>{label}</Label> {value}</div>;
}
