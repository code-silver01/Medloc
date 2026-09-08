const featureCards = [
  { icon: '🔬', title: 'On-Device Inference', text: "All physiological state classification runs locally on the soldier's vest node. No cloud dependency — the decision loop works in a Faraday cage, underground, or in a jammed zone." },
  { icon: '📏', title: 'Personalised Baseline Learning', text: "The model calibrates to each individual's resting and active norms during a short initialization window. Reduces false positives, increases confidence in CRITICAL classifications." },
  { icon: '📦', title: 'Burst-Only Transmission', text: "Only a 4-field minimal packet is ever sent over the air — and only on genuine CRITICAL escalation. Raw sensor streams are never transmitted." },
  { icon: '📍', title: 'GPS Queried on Escalation Only', text: 'GPS is powered off during normal and strain states. It is queried once, at the exact moment of escalation, included in the burst packet — never streamed.' },
  { icon: '🦺', title: 'Distributed Vest-Integrated Sensors', text: 'Sensor nodes at head, chest, and waist provide redundant physiological coverage. Modular BLE mesh between nodes keeps the vest self-contained.' },
  { icon: '📐', title: 'Explainable Rule-Based Fallback', text: 'A deterministic threshold-based classifier runs alongside the learned model. If model output is uncertain, the rule-based fallback ensures the system always produces a decision.' },
]

const techChips = [
  '🔴 Raspberry Pi / Pico', '📶 nRF52840 BLE Hub', '📶 ESP32 (alt hub)',
  '❤️ MAX30102 (HR/SpO₂)', '🌡️ MLX90614 (Temp)', '⚡ MPU6050 IMU',
  '🧠 TFLite Micro', '📡 LoRa / 433 MHz RF', '📍 u-blox GPS Module',
  '🔋 LiPo + Solar Backup', '🛡️ AES-128 Packet Encryption',
]

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-tag on-dark">Architecture &amp; Features</div>
        <h2 className="features-h2">Built to survive the edge — and the battlefield.</h2>
        <p className="features-sub">Every design decision starts with the same constraint: what happens when connectivity fails?</p>

        <div className="features-grid">
          {featureCards.map(f => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>

        <div className="tech-strip">
          <div className="tech-strip-label">Tech Stack &amp; Components</div>
          <div className="tech-chips">
            {techChips.map(c => (
              <div className="tech-chip" key={c}>{c}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
