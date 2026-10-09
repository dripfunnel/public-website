// Small flags for the region menu (simple drawings, no image files to download).
export default function Flag({ code, width = 24, height = 16 }) {
  const common = { width, height, viewBox: '0 0 24 16', 'aria-hidden': 'true', focusable: 'false', style: { flex: 'none', borderRadius: '2px', boxShadow: '0 0 0 1px rgba(10,42,74,0.18)' } };
  if (code === 'in') {
    return (
      <svg {...common}>
        <rect width="24" height="16" fill="#FFFFFF" />
        <rect width="24" height="5.34" fill="#FF9933" />
        <rect y="10.66" width="24" height="5.34" fill="#138808" />
        <circle cx="12" cy="8" r="2" fill="none" stroke="#000080" strokeWidth="0.7" />
      </svg>
    );
  }
  if (code === 'us') {
    return (
      <svg {...common}>
        <rect width="24" height="16" fill="#FFFFFF" />
        {[0, 2, 4, 6, 8, 10, 12].map((i) => (
          <rect key={i} y={i * (16 / 13)} width="24" height={16 / 13} fill="#B22234" />
        ))}
        <rect width="10.5" height={(16 / 13) * 7} fill="#3C3B6E" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect width="24" height="5.34" fill="#00732F" />
      <rect y="5.34" width="24" height="5.33" fill="#FFFFFF" />
      <rect y="10.67" width="24" height="5.33" fill="#000000" />
      <rect width="6.2" height="16" fill="#FF0000" />
    </svg>
  );
}
