import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Problem from '../components/Problem'
import Solution from '../components/Solution'
import Features from '../components/Features'
import Footer from '../components/Footer'

export default function LandingPage({ dark, setDark }) {
  return (
    <>
      <Navbar dark={dark} setDark={setDark} />
      <Hero />
      <Problem />
      <Solution />
      <Features />

      {/* Command Center CTA */}
      <section className="demo-cta-section" id="demo">
        <div className="container">
          <div className="section-tag on-dark">Interactive Simulation</div>
          <h2>Medical Command &amp; Control</h2>
          <p>
            A scripted state machine simulating what HQ sees when a MEDLOC device escalates.
            No backend &mdash; pure on-page JS. Opens in a dedicated command view.
          </p>
          <Link to="/command-center" className="btn-launch">
            ⚡ Open Command Center
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
