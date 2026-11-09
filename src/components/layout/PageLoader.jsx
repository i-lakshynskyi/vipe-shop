export default function PageLoader() {
  const smokePaths = [
    {
      d: 'M94 132 C74 112 117 98 88 77 C69 63 87 43 100 18',
      width: 2.5,
      opacity: 0.65,
      duration: '3.8s',
      dash: '100 180',
    },
    {
      d: 'M112 135 C137 114 91 99 126 75 C146 59 130 36 139 15',
      width: 2,
      opacity: 0.5,
      duration: '4.4s',
      dash: '90 180',
    },
    {
      d: 'M104 134 C85 115 119 105 105 83 C93 63 113 47 110 25',
      width: 3,
      opacity: 0.8,
      duration: '3.2s',
      dash: '110 180',
    },
    {
      d: 'M76 132 C53 111 88 95 68 74 C54 59 69 43 78 29',
      width: 1.8,
      opacity: 0.4,
      duration: '4.8s',
      dash: '80 180',
    },
    {
      d: 'M132 133 C158 111 119 98 148 78 C166 63 150 47 160 28',
      width: 2.5,
      opacity: 0.55,
      duration: '3.6s',
      dash: '100 180',
    },
    {
      d: 'M87 135 C66 124 100 111 82 91 C69 76 83 58 91 42',
      width: 2,
      opacity: 0.7,
      duration: '4.2s',
      dash: '95 180',
    },
    {
      d: 'M122 136 C143 119 108 108 134 88 C151 74 138 59 145 43',
      width: 1.7,
      opacity: 0.45,
      duration: '5s',
      dash: '85 180',
    },
    {
      d: 'M62 133 C46 116 72 103 59 86 C49 72 61 59 67 47',
      width: 1.5,
      opacity: 0.3,
      duration: '4.6s',
      dash: '75 180',
    },
    {
      d: 'M150 134 C171 116 143 104 163 87 C177 74 165 62 174 49',
      width: 2,
      opacity: 0.4,
      duration: '3.9s',
      dash: '90 180',
    },
    {
      d: 'M99 135 C115 118 90 108 112 92 C124 82 115 69 122 56',
      width: 3.5,
      opacity: 0.3,
      duration: '4.5s',
      dash: '105 180',
    },
    {
      d: 'M116 133 C100 119 130 108 115 94 C101 82 124 67 117 51',
      width: 2.2,
      opacity: 0.6,
      duration: '3.5s',
      dash: '95 180',
    },
  ];

  return (
    <div className="fixed inset-0 z-999 flex justify-center w-full h-full bg-black/90">
      <div className="relative top-1/2 translate-y-[-60%] flex flex-col items-center justify-center w-max h-max">
        {/* Smoke Atmosphere */}
        <div className="absolute bottom-[calc(100%-110px)] h-28 w-64 rounded-full bg-white/[0.035] blur-3xl" />

        {/* Animated Smoke */}
        <div className="relative mb-2 h-[140px] w-[240px] [filter:drop-shadow(0_0_12px_rgba(220,220,220,0.16))]">
          <svg
            viewBox="0 0 240 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="vapeSmokeGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="140"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#777777" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#F5F5F5" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#999999" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            <g>
              {smokePaths.map((path, index) => (
                <path
                  key={index}
                  d={path.d}
                  fill="none"
                  stroke="url(#vapeSmokeGradient)"
                  strokeWidth={path.width}
                  strokeLinecap="round"
                  strokeDasharray={path.dash}
                  opacity={path.opacity}
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="180"
                    to="0"
                    dur={path.duration}
                    repeatCount="indefinite"
                  />

                  <animate
                    attributeName="opacity"
                    values={`${path.opacity * 0.15};${path.opacity};${path.opacity * 0.15}`}
                    dur={path.duration}
                    repeatCount="indefinite"
                  />
                </path>
              ))}

              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 3; 0 -4; 0 3"
                dur="4s"
                repeatCount="indefinite"
              />
            </g>
          </svg>
        </div>

        {/* Brand */}
        <div className="text-[36px] font-semibold leading-none tracking-[0.22em] text-[#F5F5F5]">
          VAPE<span className="text-[#C0C0C0] animate-pulse">+</span>
        </div>

        <div className="mt-[13px] text-[9px] font-medium tracking-[0.28em] text-[#777777]">
          A MOMENT OF PATIENCE
        </div>

        {/* Loading Progress */}
        <div className="relative mt-[38px] h-px w-[150px] overflow-hidden bg-white/10">
          <svg
            viewBox="0 0 150 1"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="loaderProgressGradient">
                <stop offset="0%" stopColor="#C0C0C0" stopOpacity="0" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="100%" stopColor="#C0C0C0" stopOpacity="0" />
              </linearGradient>
            </defs>

            <rect x="-60" y="0" width="60" height="1" fill="url(#loaderProgressGradient)">
              <animate attributeName="x" from="-60" to="150" dur="1.8s" repeatCount="indefinite" />
            </rect>
          </svg>
        </div>

        <div className="mt-3 text-[9px] font-medium tracking-[0.3em] text-[#666666]">LOADING</div>
      </div>
    </div>
  );
}
