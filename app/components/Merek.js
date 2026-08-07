export function Tanda({ ukuran = 40, warnaCincin = '#17372B', warnaEkor = '#E8622C' }) {
  return (
    <svg
      width={ukuran}
      height={ukuran}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Qelana"
      style={{ flexShrink: 0, display: 'block' }}
    >
      <circle
        cx="48" cy="48" r="29"
        fill="none" stroke={warnaCincin} strokeWidth="13"
        strokeDasharray="167 15.2" strokeDashoffset="-30.4"
      />
      <line x1="62.8" y1="62.8" x2="81.9" y2="81.9" stroke={warnaEkor} strokeWidth="13" />
    </svg>
  );
}

export default function Merek({ ukuran = 34, terang = false, teks = true }) {
  return (
    <span className={`merek ${terang ? 'merek-terang' : ''}`}>
      <Tanda ukuran={ukuran} warnaCincin={terang ? '#ECEFE7' : '#17372B'} />
      {teks && <span className="merek-nm">Qelana</span>}
    </span>
  );
}
