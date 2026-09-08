import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow">Edge AI &middot; Physiological Monitoring &middot; Field Deployed</div>
            <h1 className="hero-title">
              MED<span className="hero-title-red">&middot;</span>LOC
            </h1>
            <p className="hero-subtitle">Edge AI Physiological State Monitor for Soldiers</p>
            <p className="hero-tagline">
              Zero cloud. Zero standing transmission. A soldier's condition and location stay
              private until the moment intervention is genuinely needed.
            </p>
            <div className="hero-ctas">
              <Link to="/command-center" className="btn-primary">Try the Command Center Live</Link>
              <a href="https://wokwi.com" target="_blank" rel="noopener noreferrer" className="btn-link">
                View Wokwi Simulation
              </a>
            </div>
          </div>

          {/* Hero visual panel */}
          <div className="hero-visual">
            <div className="hv-header">
              <div className="hv-title">FIELD STATUS &middot; ALPHA SQUAD</div>
              <div className="hv-badge">SYSTEM ONLINE</div>
            </div>
            <div className="hv-soldiers">
              {[
                { id: 'ALPHA-01', vitals: 'On-device classification only', state: 'normal', label: 'NORMAL' },
                { id: 'ALPHA-02', vitals: 'Local alert — no transmission',  state: 'strain',   label: 'STRAIN' },
                { id: 'ALPHA-03', vitals: 'Burst transmitted · 4 fields',   state: 'critical', label: 'CRITICAL' },
              ].map(s => (
                <div className="hv-soldier" key={s.id}>
                  <div>
                    <div className="hv-soldier-id">{s.id}</div>
                    <div className="hv-soldier-vitals">{s.vitals}</div>
                  </div>
                  <div className={`hv-state ${s.state}`}>{s.label}</div>
                </div>
              ))}
            </div>
            <div className="hv-footer">NO CONTINUOUS STREAM &middot; ON-DEVICE INFERENCE &middot; BURST ON ESCALATION</div>
          </div>
        </div>
      </div>
    </section>
  )
}
