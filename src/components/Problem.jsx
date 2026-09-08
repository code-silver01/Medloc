const cards = [
  {
    icon: '🔓',
    title: 'Privacy & OPSEC',
    text: 'Continuous biometric transmission exposes exact positions and health data — a real-time intelligence feed for adversaries.',
  },
  {
    icon: '⚡',
    title: 'Latency',
    text: 'Round-tripping data to a cloud for classification adds critical seconds. On the battlefield, classification must happen on-device, instantly.',
  },
  {
    icon: '📡',
    title: 'Bandwidth',
    text: 'Streaming raw physiological signals from dozens of soldiers overwhelms tactical radio bandwidth and degrades command communications.',
  },
  {
    icon: '🌐',
    title: 'Contested Connectivity',
    text: 'Cloud-dependent systems fail the moment comms are jammed or contested. The classification loop must never depend on a live link to HQ.',
  },
]

export default function Problem() {
  return (
    <section className="problem" id="problem">
      <div className="container">
        <div className="section-tag">The Problem</div>
        <h2 className="problem-headline">
          A wounded soldier broadcasting status and location is a liability, not just a data point.
        </h2>
        <div className="problem-cards">
          {cards.map(c => (
            <div className="problem-card" key={c.title}>
              <div className="problem-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
