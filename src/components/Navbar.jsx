import { Link } from 'react-router-dom'

export default function Navbar({ dark, setDark }) {
  return (
    <nav className="nav">
      <Link to="/" className="nav-logo">MED<span>&middot;</span>LOC</Link>
      <ul className="nav-links">
        <li><a href="/#problem">Problem</a></li>
        <li><a href="/#solution">Solution</a></li>
        <li><a href="/#features">Features</a></li>
        <li><a href="/#demo">Live Demo</a></li>
      </ul>
      <div className="nav-right">
        <span className="nav-tag">Wire We Here</span>
        <button
          className="theme-toggle"
          onClick={() => setDark(d => !d)}
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {dark ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  )
}
