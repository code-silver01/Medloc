export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">MED<span>&middot;</span>LOC</div>
      <div className="footer-team">
        Built by <strong>Wire We Here</strong> &mdash; Omi Agarwal &middot; Jiya Agarwal &middot; Ishi Jain &middot; Aditya Goel
      </div>
      <div>
        <a href="https://wokwi.com" target="_blank" rel="noopener noreferrer" className="footer-wokwi">
          🔗 View the Wokwi Device Simulation →
        </a>
      </div>
      <div className="footer-disclaimer">
        This dashboard is a scripted simulation of the command-center receiving end &mdash; the physiological
        state classification itself runs on the physical/simulated device shown in the linked Wokwi project.
      </div>
    </footer>
  )
}
