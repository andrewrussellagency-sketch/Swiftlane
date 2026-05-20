'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  ArrowRight, Package, Truck, Globe, Shield,
  Clock, Star, CheckCircle, Search, MapPin,
  Zap, HeadphonesIcon, BarChart3, Leaf, Play,
} from 'lucide-react'

export default function HomePage() {
  const [tracking, setTracking] = useState('')
  const [mounted, setMounted] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const router = useRouter()
  const fullText = 'SWL-2024-001'

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    let i = 0
    const timer = setInterval(() => {
      if (i <= fullText.length) { setTypedText(fullText.slice(0, i)); i++ }
      else clearInterval(timer)
    }, 120)
    return () => clearInterval(timer)
  }, [mounted])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (tracking.trim()) router.push('/track?number=' + tracking.trim())
  }

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  })

  const testimonials = [
    { name: 'James Carter', role: 'Business Owner, New York', msg: 'SwiftLane completely transformed how I ship products. Fast, reliable, and professional every single time. I would not use anyone else.', av: 'J' },
    { name: 'Sarah Mitchell', role: 'Online Retailer, Los Angeles', msg: 'The real-time tracking is absolutely amazing. My customers always know exactly where their packages are. Zero complaints since switching.', av: 'S' },
    { name: 'David Chen', role: 'Import Manager, Chicago', msg: 'Best logistics company I have worked with. Their international freight service is truly world class. Always on time and in perfect condition.', av: 'D' },
  ]

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'white', overflowX: 'hidden', fontFamily: 'system-ui,-apple-system,sans-serif' }}>
      <Navbar />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes floatOrb1 { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(-30px,-40px) scale(1.05); } 66% { transform: translate(20px,-20px) scale(0.95); } }
        @keyframes floatOrb2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(30px,-30px); } }
        @keyframes floatIcon { 0%,100% { transform: translateY(0px) rotate(0deg); opacity:0.15; } 50% { transform: translateY(-18px) rotate(8deg); opacity:0.3; } }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(0.8); } }
        @keyframes shimmer { 0%,100% { text-shadow: 0 0 40px rgba(74,222,128,0.4); } 50% { text-shadow: 0 0 80px rgba(74,222,128,0.9), 0 0 120px rgba(74,222,128,0.4); } }
        @keyframes scrollDot { 0% { transform:translateY(0); opacity:1; } 100% { transform:translateY(14px); opacity:0; } }
        @keyframes slideIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes countUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes gradientMove { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .service-card:hover { transform: translateY(-8px) !important; box-shadow: 0 20px 48px rgba(0,0,0,0.12) !important; }
        .service-card { transition: transform 0.3s ease, box-shadow 0.3s ease !important; }
        .feature-item:hover .feature-icon { transform: scale(1.1); }
        .feature-icon { transition: transform 0.3s ease; }
        .cta-btn:hover { transform: scale(1.04) !important; }
        .cta-btn { transition: transform 0.2s ease !important; }
        .testimonial-dot { transition: all 0.3s ease; }
        @media (max-width: 768px) {
          .hero-form { flex-direction: column !important; }
          .stats-row { grid-template-columns: repeat(2,1fr) !important; }
          .services-row { grid-template-columns: 1fr !important; }
          .steps-row { grid-template-columns: 1fr !important; }
          .why-row { grid-template-columns: 1fr !important; }
          .features-row { grid-template-columns: repeat(2,1fr) !important; }
          .hero-title { font-size: 44px !important; }
          .section-title { font-size: 30px !important; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: 36px !important; }
          .features-row { grid-template-columns: 1fr !important; }
          .stats-row { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>

      {/* ═══════════ HERO ═══════════ */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #020d07 0%, #052e16 40%, #0a3d20 70%, #052e16 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Animated orbs */}
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(22,163,74,0.3) 0%, transparent 70%)', borderRadius: '50%', animation: 'floatOrb1 10s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-120px', left: '-120px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(220,38,38,0.15) 0%, transparent 70%)', borderRadius: '50%', animation: 'floatOrb2 13s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '40%', left: '40%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        {/* Grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(74,222,128,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(74,222,128,0.05) 1px,transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

        {/* Floating icons */}
        {[
          { top: '18%', left: '6%', size: 18, delay: '0s', dur: '7s' },
          { top: '65%', left: '4%', size: 13, delay: '2s', dur: '9s' },
          { top: '28%', right: '5%', size: 16, delay: '1s', dur: '8s' },
          { top: '75%', right: '8%', size: 11, delay: '3s', dur: '6s' },
          { top: '50%', left: '12%', size: 9, delay: '1.5s', dur: '10s' },
        ].map((p, i) => (
          <div key={i} style={{ position: 'absolute', top: p.top, left: (p as any).left, right: (p as any).right, animation: `floatIcon ${p.dur} ease-in-out ${p.delay} infinite`, pointerEvents: 'none' }}>
            <Package size={p.size} color="#4ade80" />
          </div>
        ))}

        <div style={{ maxWidth: '1100px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px', textAlign: 'center', paddingTop: '120px', paddingBottom: '80px', position: 'relative', zIndex: 1, width: '100%', boxSizing: 'border-box' }}>

          {/* Badge */}
          <div style={{ ...fadeUp(0), display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(22,163,74,0.12)', border: '1px solid rgba(74,222,128,0.25)', color: '#86efac', fontSize: '13px', fontWeight: 500, padding: '8px 20px', borderRadius: '999px', marginBottom: '32px' }}>
            <span style={{ width: '7px', height: '7px', background: '#4ade80', borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s ease infinite' }} />
            Trusted by 50,000+ customers worldwide
          </div>

          {/* Headline */}
          <div style={fadeUp(150)}>
            <h1 className="hero-title" style={{ fontSize: '72px', fontWeight: 900, color: 'white', lineHeight: 1.05, margin: '0 0 8px 0', letterSpacing: '-2px' }}>
              Ship Anywhere,
            </h1>
            <h1 className="hero-title" style={{ fontSize: '72px', fontWeight: 900, lineHeight: 1.05, margin: '0 0 28px 0', letterSpacing: '-2px', background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #4ade80 100%)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'gradientMove 3s ease infinite' }}>
              Anytime.
            </h1>
          </div>

          {/* Subtext */}
          <div style={fadeUp(300)}>
            <p style={{ fontSize: '19px', color: 'rgba(187,247,208,0.8)', maxWidth: '560px', margin: '0 auto 44px', lineHeight: 1.75 }}>
              Fast, safe, and reliable courier services worldwide. Real-time tracking from pickup to your door — guaranteed.
            </p>
          </div>

          {/* Track Form */}
          <div style={{ ...fadeUp(450), maxWidth: '580px', margin: '0 auto 32px' }}>
            <form onSubmit={submit} className="hero-form" style={{ display: 'flex', gap: '10px', alignItems: 'stretch' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={18} color="rgba(134,239,172,0.6)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type="text"
                  value={tracking}
                  onChange={(e) => setTracking(e.target.value)}
                  placeholder={`e.g. ${typedText}|`}
                  style={{ width: '100%', boxSizing: 'border-box', paddingLeft: '48px', paddingRight: '16px', paddingTop: '18px', paddingBottom: '18px', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '14px', color: 'white', fontSize: '15px', outline: 'none', backdropFilter: 'blur(12px)', transition: 'border-color 0.2s' }}
                />
              </div>
              <button type="submit" className="cta-btn" style={{ background: 'linear-gradient(135deg,#dc2626,#b91c1c)', color: 'white', fontWeight: 700, fontSize: '15px', padding: '18px 24px', borderRadius: '14px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', boxShadow: '0 4px 24px rgba(220,38,38,0.4)', flexShrink: 0 }}>
                Track Now <ArrowRight size={16} />
              </button>
            </form>
          </div>

          {/* CTA */}
          <div style={{ ...fadeUp(600), textAlign: 'center', marginBottom: '64px' }}>
            <Link href="/book" className="cta-btn" style={{ background: 'linear-gradient(135deg,#16a34a,#15803d)', color: 'white', fontWeight: 700, fontSize: '16px', padding: '16px 44px', borderRadius: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 24px rgba(22,163,74,0.45)' }}>
              Book a Shipment <ArrowRight size={20} />
            </Link>
          </div>

          {/* Stats */}
          <div style={{ ...fadeUp(750) }}>
            <div className="stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', maxWidth: '720px', margin: '0 auto' }}>
              {[
                { n: '50K+', l: 'Deliveries Made' },
                { n: '120+', l: 'Countries Served' },
                { n: '99.8%', l: 'On-Time Rate' },
                { n: '24/7', l: 'Live Support' },
              ].map((s, i) => (
                <div key={s.l} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '18px', padding: '22px 12px', textAlign: 'center', backdropFilter: 'blur(12px)', animation: `countUp 0.6s ease ${900 + i * 100}ms both` }}>
                  <div style={{ fontSize: '28px', fontWeight: 900, background: 'linear-gradient(135deg,#4ade80,#22c55e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.n}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(187,247,208,0.65)', marginTop: '5px', fontWeight: 500 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{ ...fadeUp(1000), marginTop: '56px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '10px', color: 'rgba(187,247,208,0.35)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Scroll to explore</span>
            <div style={{ width: '22px', height: '36px', border: '2px solid rgba(74,222,128,0.25)', borderRadius: '11px', display: 'flex', justifyContent: 'center', paddingTop: '5px' }}>
              <div style={{ width: '3px', height: '7px', background: '#4ade80', borderRadius: '2px', animation: 'scrollDot 2s ease infinite' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ MARQUEE STRIP ═══════════ */}
      <section style={{ background: '#16a34a', padding: '14px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '48px', animation: 'marquee 20s linear infinite', whiteSpace: 'nowrap' }}>
          {[...Array(3)].map((_, ri) => (
            <div key={ri} style={{ display: 'flex', gap: '48px', flexShrink: 0 }}>
              {['Express Delivery', 'International Shipping', 'Real-Time Tracking', 'Door-to-Door', 'Fully Insured', '24/7 Support', '120+ Countries'].map((item) => (
                <span key={item} style={{ color: 'white', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '5px', height: '5px', background: 'rgba(255,255,255,0.5)', borderRadius: '50%', display: 'inline-block' }} />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }`}</style>
      </section>

      {/* ═══════════ SERVICES ═══════════ */}
      <section id="services" style={{ padding: '100px 0', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '40px', paddingRight: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.16em' }}>What We Offer</span>
            <h2 className="section-title" style={{ fontSize: '44px', fontWeight: 900, color: '#0f172a', margin: '12px 0 16px 0', letterSpacing: '-0.5px' }}>Our Services</h2>
            <p style={{ fontSize: '17px', color: '#64748b', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
              From local express delivery to international freight, we have the right solution.
            </p>
          </div>

          <div className="services-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '22px' }}>
            {[
              { icon: Zap, title: 'Express Delivery', desc: 'Same day and next day delivery for urgent shipments nationwide.', iconBg: '#dcfce7', color: '#16a34a', tag: 'Most Popular', tagBg: '#dcfce7', tagColor: '#15803d', border: '#bbf7d0' },
              { icon: Globe, title: 'International', desc: 'Reliable shipping to 120+ countries with full customs support.', iconBg: '#dbeafe', color: '#2563eb', tag: 'Worldwide', tagBg: '#dbeafe', tagColor: '#1d4ed8', border: '#bfdbfe' },
              { icon: Package, title: 'Standard Shipping', desc: 'Affordable and dependable solutions for everyday delivery needs.', iconBg: '#ffedd5', color: '#ea580c', tag: 'Best Value', tagBg: '#ffedd5', tagColor: '#c2410c', border: '#fed7aa' },
              { icon: Shield, title: 'Secure Handling', desc: 'Every package is fully insured and handled with professional care.', iconBg: '#fee2e2', color: '#dc2626', tag: 'Insured', tagBg: '#fee2e2', tagColor: '#b91c1c', border: '#fecaca' },
            ].map((s) => (
              <div key={s.title} className="service-card" style={{ background: 'white', borderRadius: '22px', padding: '28px', border: `1px solid ${s.border}`, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div style={{ background: s.iconBg, width: '54px', height: '54px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <s.icon size={26} color={s.color} />
                  </div>
                  <span style={{ background: s.tagBg, color: s.tagColor, fontSize: '10px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px' }}>{s.tag}</span>
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0' }}>{s.title}</h3>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.75, margin: '0 0 18px 0' }}>{s.desc}</p>
                <Link href="/book" style={{ fontSize: '13px', fontWeight: 700, color: s.color, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  Get Started <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section style={{ padding: '100px 0', background: 'linear-gradient(135deg,#020d07 0%,#052e16 50%,#0a3d20 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(74,222,128,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(74,222,128,0.04) 1px,transparent 1px)', backgroundSize: '50px 50px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '40px', paddingRight: '40px', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ color: '#4ade80', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.16em' }}>Simple Process</span>
            <h2 className="section-title" style={{ fontSize: '44px', fontWeight: 900, color: 'white', margin: '12px 0 16px 0', letterSpacing: '-0.5px' }}>How It Works</h2>
            <p style={{ fontSize: '17px', color: 'rgba(187,247,208,0.75)', maxWidth: '420px', margin: '0 auto' }}>Ship your package in just 3 simple steps</p>
          </div>
          <div className="steps-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '48px' }}>
            {[
              { step: '01', icon: Package, title: 'Book Online', desc: 'Fill in your shipment details and choose your preferred delivery service in minutes.' },
              { step: '02', icon: Truck, title: 'We Pick Up', desc: 'Our professional courier arrives at your location to collect your package safely.' },
              { step: '03', icon: MapPin, title: 'Track and Receive', desc: 'Track your shipment live and receive it safely at the destination.' },
            ].map((item, i) => (
              <div key={item.step} style={{ textAlign: 'center', position: 'relative' }}>
                {i < 2 && <div style={{ position: 'absolute', top: '28px', left: '65%', width: '70%', height: '2px', background: 'linear-gradient(90deg,rgba(74,222,128,0.4),transparent)', display: 'none' }} />}
                <div style={{ fontSize: '72px', fontWeight: 900, color: 'rgba(5,46,22,0.6)', lineHeight: 1, marginBottom: '16px', letterSpacing: '-2px' }}>{item.step}</div>
                <div style={{ background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(74,222,128,0.2)', width: '76px', height: '76px', borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <item.icon size={34} color="#4ade80" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'white', margin: '0 0 12px 0' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(187,247,208,0.7)', lineHeight: 1.75, maxWidth: '260px', margin: '0 auto' }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '56px' }}>
            <Link href="/book" className="cta-btn" style={{ background: '#dc2626', color: 'white', fontWeight: 700, fontSize: '15px', padding: '16px 40px', borderRadius: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 24px rgba(220,38,38,0.4)' }}>
              Start Shipping Today <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section style={{ padding: '100px 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '40px', paddingRight: '40px' }}>
          <div className="why-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.16em' }}>Why SwiftLane</span>
              <h2 className="section-title" style={{ fontSize: '44px', fontWeight: 900, color: '#0f172a', margin: '12px 0 18px 0', lineHeight: 1.15, letterSpacing: '-0.5px' }}>
                Logistics You Can Always Count On
              </h2>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.85, margin: '0 0 32px 0' }}>
                We combine cutting-edge technology with professional service to deliver the best shipping experience. Every package matters to us.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '40px' }}>
                {[
                  'Real-time shipment tracking',
                  'Instant booking confirmation',
                  'Door-to-door delivery',
                  'Fragile item handling',
                  'Full insurance coverage',
                  '24/7 customer support',
                ].map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '12px 14px' }}>
                    <CheckCircle size={16} color="#16a34a" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e3a29' }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link href="/book" className="cta-btn" style={{ background: '#16a34a', color: 'white', fontWeight: 700, fontSize: '15px', padding: '15px 36px', borderRadius: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 20px rgba(22,163,74,0.35)' }}>
                Get Started Now <ArrowRight size={18} />
              </Link>
            </div>

            {/* Live Tracking Card */}
            <div style={{ background: 'linear-gradient(145deg,#020d07,#052e16,#0a3d20)', borderRadius: '28px', padding: '36px', color: 'white', boxShadow: '0 32px 64px rgba(0,0,0,0.25)', border: '1px solid rgba(74,222,128,0.12)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ background: '#16a34a', padding: '11px', borderRadius: '14px' }}>
                    <Package size={20} color="white" />
                  </div>
                  <div>
                    <p style={{ fontWeight: 800, color: 'white', fontSize: '15px', margin: 0 }}>Live Tracking</p>
                    <p style={{ fontSize: '12px', color: '#4ade80', margin: 0 }}>SWL-2024-001</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(22,163,74,0.18)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ade80', fontSize: '12px', fontWeight: 700, padding: '6px 14px', borderRadius: '999px' }}>
                  <span style={{ width: '6px', height: '6px', background: '#4ade80', borderRadius: '50%', animation: 'pulse 2s ease infinite' }} />
                  Live
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '24px' }}>
                {[
                  { label: 'Package Picked Up', loc: 'New York, United States', time: '8:00 AM', done: true },
                  { label: 'In Transit', loc: 'Chicago, United States', time: '11:30 AM', done: true },
                  { label: 'Out for Delivery', loc: 'Los Angeles, United States', time: '2:00 PM', done: true },
                  { label: 'Awaiting Delivery', loc: 'Final Destination', time: 'Tomorrow', done: false },
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '11px', height: '11px', borderRadius: '50%', flexShrink: 0, background: step.done ? '#4ade80' : '#1e3a29', boxShadow: step.done ? '0 0 10px rgba(74,222,128,0.5)' : 'none' }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: step.done ? 'white' : '#4b6858', margin: 0 }}>{step.label}</p>
                      <p style={{ fontSize: '11px', color: 'rgba(74,222,128,0.6)', margin: 0 }}>{step.loc}</p>
                    </div>
                    <span style={{ fontSize: '11px', color: '#2d5a3d', flexShrink: 0 }}>{step.time}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: 'rgba(22,163,74,0.1)', border: '1px solid rgba(74,222,128,0.18)', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ background: 'rgba(22,163,74,0.2)', padding: '10px', borderRadius: '12px' }}>
                  <Clock size={20} color="#4ade80" />
                </div>
                <div>
                  <p style={{ fontSize: '10px', color: '#4ade80', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', margin: 0 }}>Estimated Delivery</p>
                  <p style={{ fontSize: '15px', fontWeight: 800, color: 'white', margin: 0 }}>Tomorrow, 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURES STRIP ═══════════ */}
      <section style={{ padding: '72px 0', background: '#f8fafc', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '40px', paddingRight: '40px' }}>
          <div className="features-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '40px' }}>
            {[
              { icon: BarChart3, title: 'Live Analytics', desc: 'Track every shipment with real-time data and updates.', color: '#16a34a', bg: '#dcfce7' },
              { icon: HeadphonesIcon, title: '24/7 Support', desc: 'Our team is always ready to help with any issue.', color: '#2563eb', bg: '#dbeafe' },
              { icon: Shield, title: 'Fully Insured', desc: 'Every package is insured against damage or loss.', color: '#dc2626', bg: '#fee2e2' },
              { icon: Leaf, title: 'Eco Friendly', desc: 'Carbon-neutral delivery options where possible.', color: '#059669', bg: '#d1fae5' },
            ].map((f) => (
              <div key={f.title} className="feature-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div className="feature-icon" style={{ background: f.bg, padding: '13px', borderRadius: '14px', flexShrink: 0 }}>
                  <f.icon size={22} color={f.color} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>{f.title}</h3>
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section style={{ padding: '100px 0', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '40px', paddingRight: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.16em' }}>Testimonials</span>
            <h2 className="section-title" style={{ fontSize: '44px', fontWeight: 900, color: '#0f172a', margin: '12px 0 16px 0', letterSpacing: '-0.5px' }}>What Customers Say</h2>
            <p style={{ fontSize: '17px', color: '#64748b', maxWidth: '460px', margin: '0 auto' }}>Thousands of businesses and individuals trust SwiftLane every day.</p>
          </div>

          {/* Testimonial Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '24px', marginBottom: '36px' }}>
            {testimonials.map((t, i) => (
              <div key={t.name} style={{
                background: i === activeTestimonial ? 'linear-gradient(145deg,#052e16,#0a3d20)' : '#f8fafc',
                borderRadius: '24px', padding: '32px',
                border: i === activeTestimonial ? '1px solid rgba(74,222,128,0.2)' : '1px solid #f1f5f9',
                transition: 'all 0.5s ease',
                boxShadow: i === activeTestimonial ? '0 20px 48px rgba(5,46,22,0.25)' : '0 2px 8px rgba(0,0,0,0.04)',
              }}>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '18px' }}>
                  {[1,2,3,4,5].map((s) => <Star key={s} size={15} color={i === activeTestimonial ? '#4ade80' : '#16a34a'} fill={i === activeTestimonial ? '#4ade80' : '#16a34a'} />)}
                </div>
                <p style={{ fontSize: '14px', color: i === activeTestimonial ? 'rgba(187,247,208,0.9)' : '#475569', lineHeight: 1.85, margin: '0 0 24px 0' }}>{t.msg}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '20px', borderTop: `1px solid ${i === activeTestimonial ? 'rgba(74,222,128,0.15)' : '#e2e8f0'}` }}>
                  <div style={{ width: '44px', height: '44px', background: i === activeTestimonial ? '#16a34a' : '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: i === activeTestimonial ? 'white' : '#16a34a', fontWeight: 800, fontSize: '16px', flexShrink: 0 }}>{t.av}</div>
                  <div>
                    <p style={{ fontWeight: 800, color: i === activeTestimonial ? 'white' : '#0f172a', fontSize: '14px', margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: '12px', color: i === activeTestimonial ? 'rgba(187,247,208,0.6)' : '#94a3b8', margin: 0 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className="testimonial-dot"
                style={{ width: i === activeTestimonial ? '28px' : '8px', height: '8px', borderRadius: '4px', background: i === activeTestimonial ? '#16a34a' : '#e2e8f0', border: 'none', cursor: 'pointer', padding: 0 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section style={{ padding: '100px 0', background: 'linear-gradient(135deg,#020d07 0%,#052e16 50%,#0a3d20 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', background: 'radial-gradient(circle,rgba(220,38,38,0.12) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(74,222,128,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(74,222,128,0.04) 1px,transparent 1px)', backgroundSize: '50px 50px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingLeft: '40px', paddingRight: '40px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', background: 'rgba(22,163,74,0.12)', border: '1px solid rgba(74,222,128,0.25)', color: '#86efac', fontSize: '13px', fontWeight: 600, padding: '8px 20px', borderRadius: '999px', marginBottom: '28px' }}>
            Get started for free today
          </div>
          <h2 style={{ fontSize: 'clamp(36px,6vw,64px)', fontWeight: 900, color: 'white', lineHeight: 1.05, margin: '0 0 20px 0', letterSpacing: '-1px' }}>
            Ready to Ship Your<br />
            <span style={{ background: 'linear-gradient(135deg,#4ade80,#22c55e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Package?</span>
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(187,247,208,0.75)', maxWidth: '480px', margin: '0 auto 44px', lineHeight: 1.7 }}>
            Join thousands of satisfied customers who trust SwiftLane Logistics every day.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/book" className="cta-btn" style={{ background: 'white', color: '#052e16', fontWeight: 800, fontSize: '15px', padding: '16px 44px', borderRadius: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 24px rgba(0,0,0,0.25)' }}>
              Book a Shipment <ArrowRight size={18} />
            </Link>
            <Link href="/track" className="cta-btn" style={{ border: '2px solid rgba(255,255,255,0.2)', color: 'white', fontWeight: 600, fontSize: '15px', padding: '16px 44px', borderRadius: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Search size={16} /> Track Shipment
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}