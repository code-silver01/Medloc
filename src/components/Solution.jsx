const states = [
  {
    cls: 's-normal',
    icon: '✓',
    label: 'State 1',
    title: 'NORMAL',
    text: "Vitals are within the soldier's personal learned baseline. The device classifies continuously — but transmits nothing. Zero emissions. Zero exposure.",
    badge: 'Nothing sent',
  },
  {
    cls: 's-strain',
    icon: '⚠',
    label: 'State 2',
    title: 'STRAIN',
    text: "Elevated readings detected. The device triggers a local haptic or audio alert to the soldier and their immediate team. Still no transmission — network stays clean.",
    badge: 'Local alert only',
  },
  {
    cls: 's-critical',
    icon: '🚨',
    label: 'State 3',
    title: 'CRITICAL',
    text: "A genuine deviation from the personal baseline is confirmed. A single minimal burst is sent: severity, HR, SpO₂, model confidence, last-known location.",
    badge: 'Single burst · 4 fields',
  },
]

export default function Solution() {
  return (
    <section className="solution" id="solution">
      <div className="container">
        <div className="section-tag">How MEDLOC Works</div>
        <h2 className="solution-h2">Three states. Two of them stay silent.</h2>

        <div className="solution-states">
          {states.map(s => (
            <div className={`state-card ${s.cls}`} key={s.title}>
              <div className="state-dot">{s.icon}</div>
              <div className="state-label">{s.label}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <span className="state-badge">{s.badge}</span>
            </div>
          ))}
        </div>

        <div className="solution-callout">
          <div className="callout-icon">🧠</div>
          <div>
            <p>
              <strong>MEDLOC doesn't diagnose injuries</strong> — it learns each soldier's own normal,
              and reveals status and location only when it detects a genuine deviation. A 130 BPM reading
              means something different for a trained soldier mid-sprint than it does for the same soldier
              at rest after impact. Personalised baselines eliminate false alerts and ensure every
              transmission is actionable.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
