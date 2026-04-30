export default function SignatureBlock({ nombre, rol }) {
  return (
    <div>
      <div className="font-bold">{rol}</div>
      <div>{nombre}</div>
      <div>{rol}</div>
    </div>
  );
}
