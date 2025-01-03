import React from 'react';

interface DataPoint {
  x: number;
  tension: number;
  label: string;
}

interface KeyPoint extends DataPoint {
  description: string;
}

export const ThreeActStructureVisual: React.FC = () => {
  const styles = {
    container: {
      padding: '0',
      backgroundColor: 'white',
      borderRadius: '16px',
      width: '100%',
      margin: '0 auto'
    },
    chartWrapper: {
      position: 'relative' as const,
      height: '400px',
      backgroundColor: 'white'
    }
  };

  const data: DataPoint[] = [
    { x: 0, tension: 20, label: 'Start' },
    { x: 15, tension: 25, label: '' },
    { x: 25, tension: 40, label: 'Inciting Incident' },
    { x: 35, tension: 45, label: '' },
    { x: 50, tension: 60, label: 'Midpoint' },
    { x: 65, tension: 70, label: '' },
    { x: 75, tension: 90, label: 'Climax' },
    { x: 85, tension: 50, label: '' },
    { x: 100, tension: 30, label: 'Resolution' }
  ];

  const keyPoints: KeyPoint[] = [
    { x: 25, tension: 40, label: 'Inciting Incident', description: 'Event that sets the story in motion' },
    { x: 50, tension: 60, label: 'Midpoint', description: 'Major shift in the story direction' },
    { x: 75, tension: 90, label: 'Climax', description: 'Peak of conflict and tension' },
    { x: 100, tension: 30, label: 'Resolution', description: 'Story conclusion and new equilibrium' }
  ];

  // Convert data points to SVG path
  const getPath = () => {
    const height = 400;
    const width = 800;
    const scaleX = width / 100;
    const scaleY = height / 100;
    
    return data.map((point, i) => {
      const x = point.x * scaleX;
      const y = height - (point.tension * scaleY);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  return (
    <div style={styles.container} className="dark:bg-gray-800">
      <div style={styles.chartWrapper} className="dark:bg-gray-800">
        <svg
          viewBox="0 0 800 400"
          className="w-full h-full"
          style={{ overflow: 'visible' }}
        >
          {/* Background sections for acts */}
          <rect x="0" y="0" width={200} height="400" fill="#EFF6FF" className="dark:fill-gray-700/30" />
          <rect x={200} y="0" width={400} height="400" fill="#DBEAFE" className="dark:fill-gray-700/50" />
          <rect x={600} y="0" width={200} height="400" fill="#EFF6FF" className="dark:fill-gray-700/30" />

          {/* X-Axis */}
          <g transform="translate(0, 380)">
            {[0, 25, 50, 75, 100].map((tick) => {
              const x = (tick / 100) * 800;
              return (
                <g key={tick} transform={`translate(${x}, 0)`}>
                  <line y2="6" stroke="#94a3b8" />
                  <text
                    y="20"
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="12"
                  >
                    {tick}%
                  </text>
                </g>
              );
            })}
          </g>

          {/* Main tension curve */}
          <path
            d={getPath()}
            fill="none"
            stroke="#2563EB"
            strokeWidth="3"
            className="dark:stroke-blue-400"
          />

          {/* Key points */}
          {keyPoints.map((point, index) => {
            const x = (point.x / 100) * 800;
            const y = 400 - ((point.tension / 100) * 400);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="6"
                fill="#2563EB"
                stroke="#fff"
                strokeWidth="2"
                className="dark:fill-blue-400"
              />
            );
          })}
        </svg>

        {/* Act Labels */}
        <div style={{
          position: 'absolute',
          bottom: '4px',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 20px',
          fontSize: '20px',
          fontWeight: '500',
          color: '#1a2b3c'
        }} className="dark:text-white">
          <div style={{ width: '25%', textAlign: 'center' }}>Setup</div>
          <div style={{ width: '50%', textAlign: 'center' }}>Confrontation</div>
          <div style={{ width: '25%', textAlign: 'center' }}>Resolution</div>
        </div>
      </div>

      {/* Key Points Description */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {keyPoints.map((point, index) => (
          <div
            key={index}
            className="p-3 rounded-lg border border-blue-100 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-900/20"
          >
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">{point.label}</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">{point.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}; 