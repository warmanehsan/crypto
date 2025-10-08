export const Sparkline = ({ data }) => {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data
    .map(
      (value, i) =>
        `${(i / (data.length - 1)) * 100},${
          100 - ((value - min) / (max - min)) * 100
        }`
    )
    .join(" ");
  return (
    <svg viewBox="0 0 100 100" className="w-16 h-6" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        points={points}
        className="text-blue-500"
      />
    </svg>
  );
};
