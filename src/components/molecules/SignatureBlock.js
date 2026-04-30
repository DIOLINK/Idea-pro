export default function SignatureBlock({ nombre, rol }) {
  return (
    <div className="border rounded p-2 text-center">
      <div className="font-bold border-b pb-1 mb-1">{rol}</div>
      <div className="border-b pb-1 mb-1">{nombre}</div>
      <div>{rol}</div>
    </div>
  );
}
