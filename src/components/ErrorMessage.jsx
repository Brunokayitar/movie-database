export default function ErrorMessage({ message }) {
  return (
    <div className="text-center text-red-500 py-8">
      <p>{message}</p>
    </div>
  );
}
