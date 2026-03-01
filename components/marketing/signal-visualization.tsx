export function SignalVisualization() {
  return (
    <div className="relative mx-auto w-full max-w-[480px] sm:max-w-[480px]">
      <svg
        viewBox="0 0 480 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full"
        role="img"
        aria-label="Diagram showing AI engine processing CRM, website, and news signals into email, CRM updates, and alerts"
      >
        {/* Definitions */}
        <defs>
          {/* Gradient for paths */}
          <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--mkt-gradient-start)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--mkt-gradient-end)" stopOpacity="0.4" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Dot gradient */}
          <radialGradient id="dotGlow">
            <stop offset="0%" stopColor="var(--mkt-accent)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--mkt-accent)" stopOpacity="0" />
          </radialGradient>

          {/* Animated dots along paths */}
          {[
            { id: "input1", path: "M60,100 Q160,100 240,200", dur: "3s", delay: "0s" },
            { id: "input2", path: "M40,200 Q140,200 240,200", dur: "2.5s", delay: "0.5s" },
            { id: "input3", path: "M60,300 Q160,300 240,200", dur: "3.2s", delay: "1s" },
            { id: "output1", path: "M240,200 Q340,100 420,100", dur: "2.8s", delay: "1.5s" },
            { id: "output2", path: "M240,200 Q340,200 440,200", dur: "2.5s", delay: "2s" },
            { id: "output3", path: "M240,200 Q340,300 420,300", dur: "3s", delay: "1.2s" },
          ].map((p) => (
            <path key={p.id} id={p.id} d={p.path} />
          ))}
        </defs>

        {/* Background glow behind center */}
        <circle cx="240" cy="200" r="60" fill="var(--mkt-accent)" opacity="0.05" filter="url(#glow)" />

        {/* Input signal paths */}
        <path d="M60,100 Q160,100 240,200" stroke="url(#pathGrad)" strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M40,200 Q140,200 240,200" stroke="url(#pathGrad)" strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M60,300 Q160,300 240,200" stroke="url(#pathGrad)" strokeWidth="1.5" fill="none" opacity="0.5" />

        {/* Output signal paths */}
        <path d="M240,200 Q340,100 420,100" stroke="url(#pathGrad)" strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M240,200 Q340,200 440,200" stroke="url(#pathGrad)" strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M240,200 Q340,300 420,300" stroke="url(#pathGrad)" strokeWidth="1.5" fill="none" opacity="0.5" />

        {/* Animated dots traveling along paths */}
        {[
          { href: "#input1", dur: "3s", delay: "0s" },
          { href: "#input2", dur: "2.5s", delay: "0.5s" },
          { href: "#input3", dur: "3.2s", delay: "1s" },
          { href: "#output1", dur: "2.8s", delay: "1.5s" },
          { href: "#output2", dur: "2.5s", delay: "2s" },
          { href: "#output3", dur: "3s", delay: "1.2s" },
        ].map((dot, i) => (
          <circle key={i} r="4" fill="var(--mkt-accent)" opacity="0.9">
            <animateMotion
              dur={dot.dur}
              begin={dot.delay}
              repeatCount="indefinite"
              fill="freeze"
            >
              <mpath href={dot.href} />
            </animateMotion>
          </circle>
        ))}

        {/* Center AI hub — pulsing rings */}
        <circle cx="240" cy="200" r="40" stroke="var(--mkt-accent)" strokeWidth="1" fill="var(--mkt-bg-card)" opacity="0.8">
          <animate attributeName="r" values="38;42;38" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="240" cy="200" r="28" stroke="var(--mkt-accent)" strokeWidth="0.5" fill="none" opacity="0.3">
          <animate attributeName="r" values="26;30;26" dur="2.5s" repeatCount="indefinite" />
        </circle>

        {/* AI text in center */}
        <text x="240" y="196" textAnchor="middle" fill="var(--mkt-accent)" fontSize="14" fontWeight="bold" fontFamily="var(--font-mono)">
          AI
        </text>
        <text x="240" y="212" textAnchor="middle" fill="var(--mkt-text-secondary)" fontSize="8" fontFamily="var(--font-mono)">
          ENGINE
        </text>

        {/* Input labels */}
        <g opacity="0.7">
          {/* CRM */}
          <rect x="10" y="85" width="50" height="28" rx="6" fill="var(--mkt-bg-card)" stroke="var(--mkt-border)" strokeWidth="1" />
          <text x="35" y="103" textAnchor="middle" fill="var(--mkt-text-secondary)" fontSize="9" fontFamily="var(--font-mono)">
            CRM
          </text>

          {/* Website */}
          <rect x="2" y="185" width="58" height="28" rx="6" fill="var(--mkt-bg-card)" stroke="var(--mkt-border)" strokeWidth="1" />
          <text x="31" y="203" textAnchor="middle" fill="var(--mkt-text-secondary)" fontSize="9" fontFamily="var(--font-mono)">
            WEB
          </text>

          {/* News */}
          <rect x="10" y="285" width="50" height="28" rx="6" fill="var(--mkt-bg-card)" stroke="var(--mkt-border)" strokeWidth="1" />
          <text x="35" y="303" textAnchor="middle" fill="var(--mkt-text-secondary)" fontSize="9" fontFamily="var(--font-mono)">
            NEWS
          </text>
        </g>

        {/* Output labels */}
        <g opacity="0.7">
          {/* Email */}
          <rect x="410" y="85" width="58" height="28" rx="6" fill="var(--mkt-bg-card)" stroke="var(--mkt-border)" strokeWidth="1" />
          <text x="439" y="103" textAnchor="middle" fill="var(--mkt-text-secondary)" fontSize="9" fontFamily="var(--font-mono)">
            EMAIL
          </text>

          {/* CRM Update */}
          <rect x="420" y="185" width="55" height="28" rx="6" fill="var(--mkt-bg-card)" stroke="var(--mkt-border)" strokeWidth="1" />
          <text x="447" y="203" textAnchor="middle" fill="var(--mkt-text-secondary)" fontSize="8" fontFamily="var(--font-mono)">
            UPDATE
          </text>

          {/* Alert */}
          <rect x="410" y="285" width="58" height="28" rx="6" fill="var(--mkt-bg-card)" stroke="var(--mkt-border)" strokeWidth="1" />
          <text x="439" y="303" textAnchor="middle" fill="var(--mkt-text-secondary)" fontSize="9" fontFamily="var(--font-mono)">
            ALERT
          </text>
        </g>
      </svg>
    </div>
  );
}
