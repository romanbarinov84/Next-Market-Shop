export default function HighlightText({
  text,
  highLight,
}: {
  text: string;
  highLight: string;
}) {
  if (!highLight.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${highLight})`, "gi"));

  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highLight.toLowerCase() ? (
          <span key={i} className="font-bold">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
}