interface ChartProps {
  data: { name: string; value: number; color: string }[];
  type: 'bar' | 'donut';
  height?: number;
  centerLabel?: string;
  centerValue?: string;
}

export function Chart({ data, type, height = 200, centerLabel, centerValue }: ChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  if (type === 'donut') {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;

    return (
      <div className="flex items-center gap-6 flex-wrap">
        <div className="relative" style={{ width: 180, height: 180 }}>
          <svg width="180" height="180" viewBox="0 0 180 180" className="-rotate-90">
            {data.map((d, i) => {
              const stroke = (d.value / total) * circumference;
              const circle = (
                <circle
                  key={i}
                  cx="90"
                  cy="90"
                  r={radius}
                  fill="none"
                  stroke={d.color}
                  strokeWidth="22"
                  strokeDasharray={`${stroke} ${circumference - stroke}`}
                  strokeDashoffset={-offset}
                  className="transition-all duration-700"
                />
              );
              offset += stroke;
              return circle;
            })}
          </svg>
          {(centerLabel || centerValue) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-extrabold text-surface-800">{centerValue}</span>
              <span className="text-xs text-surface-500">{centerLabel}</span>
            </div>
          )}
        </div>
        <div className="space-y-2 flex-1 min-w-[120px]">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="text-surface-600 flex-1">{d.name}</span>
              <span className="font-semibold text-surface-800">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Bar chart
  const maxVal = Math.max(...data.map(d => d.value));
  return (
    <div className="flex items-end justify-between gap-2" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full flex-1 flex items-end">
            <div
              className="w-full rounded-t-lg transition-all duration-700 hover:opacity-80 group relative"
              style={{
                height: `${(d.value / maxVal) * 100}%`,
                backgroundColor: d.color,
                minHeight: '4px',
              }}
            >
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-surface-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {d.value}
              </span>
            </div>
          </div>
          <span className="text-xs text-surface-500 font-medium">{d.name}</span>
        </div>
      ))}
    </div>
  );
}

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  height?: string;
  showLabel?: boolean;
}

export function ProgressBar({ value, max, color = 'bg-primary-500', height = 'h-3', showLabel }: ProgressBarProps) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full">
      <div className={`w-full ${height} bg-surface-200 rounded-full overflow-hidden`}>
        <div
          className={`h-full ${color} rounded-full transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-1 text-xs text-surface-500">
          <span>{value} / {max}</span>
          <span>{Math.round(pct)}%</span>
        </div>
      )}
    </div>
  );
}

interface LineChartProps {
  data: { month: string; hours: number }[];
  height?: number;
}

export function LineChart({ data, height = 180 }: LineChartProps) {
  const max = Math.max(...data.map(d => d.hours));
  const min = Math.min(...data.map(d => d.hours));
  const range = max - min || 1;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((d.hours - min) / range) * 70 - 15;
    return { x, y, ...d };
  });
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L 100 100 L 0 100 Z`;

  return (
    <div className="relative" style={{ height }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#lineGrad)" />
        <path d={pathD} fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1.5" fill="#22c55e" />
        ))}
      </svg>
      <div className="flex justify-between mt-1">
        {data.map((d, i) => (
          <span key={i} className="text-[10px] text-surface-400">{d.month}</span>
        ))}
      </div>
    </div>
  );
}
