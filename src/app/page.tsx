'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  ArrowRight, Package, Truck, Globe, Shield,
  Clock, Star, CheckCircle, Search, MapPin,
  Zap, HeadphonesIcon, BarChart3, Leaf,
} from 'lucide-react'

export default function HomePage() {
  const [tracking, setTracking] = useState('')
  const [mounted, setMounted] = useState(false)
  const [typedText, setTypedText] = useState('')
  const router = useRouter()

  const fullText = 'SWL-2024-001'

  // Mount animation trigger
  useEffect(() => {
    setMounted(true)
  }, [])

  // Typewriter effect
  useEffect(() => {
    if (!mounted) return
    let i = 0
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i))
        i++
      } else {
        clearInterval(timer)
      }
    }, 120)
    return () => clearInterval(timer)
  }, [mounted])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (tracking.trim()) router.push('/track?number=' + tracking.trim())
  }

  const wrap: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    paddingLeft: '40px',
    paddingRight: '40px',
  }

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  })

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'white', overflowX: 'hidden', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Navbar />

      {/* ═══════════════════════════════════════
          HERO — ANIMATED
      ═══════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #052e16 0%, #14532d 50%, #052e16 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Animated floating orbs */}
        <div style={{
          position: 'absolute', top: '10%', right: '5%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(22,163,74,0.35) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'floatOrb1 8s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '5%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(220,38,38,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'floatOrb2 10s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(74,222,128,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'floatOrb3 12s ease-in-out infinite',
          pointerEvents: 'none',
        }} />

        {/* Grid pattern overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(74,222,128,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74,222,128,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />

        {/* Floating package icons */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {[
            { top: '15%', left: '8%', size: 20, delay: '0s', duration: '6s' },
            { top: '70%', left: '3%', size: 14, delay: '2s', duration: '8s' },
            { top: '30%', right: '6%', size: 18, delay: '1s', duration: '7s' },
            { top: '80%', right: '10%', size: 12, delay: '3s', duration: '9s' },
            { top: '50%', left: '15%', size: 10, delay: '1.5s', duration: '6.5s' },
          ].map((p, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: p.top,
              left: (p as any).left,
              right: (p as any).right,
              opacity: 0.2,
              animation: `floatIcon ${p.duration} ease-in-out ${p.delay} infinite`,
            }}>
              <Package size={p.size} color="#4ade80" />
            </div>
          ))}
        </div>

        <div style={{ ...wrap, textAlign: 'center', paddingTop: '140px', paddingBottom: '80px', position: 'relative', zIndex: 1, width: '100%', boxSizing: 'border-box' }}>

          {/* Animated badge */}
          <div style={{ ...fadeUp(0), display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(74,222,128,0.3)', color: '#86efac', fontSize: '14px', fontWeight: 500, padding: '8px 20px', borderRadius: '999px', marginBottom: '32px' }}>
            <span style={{ width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s ease infinite' }} />
            Trusted by 50,000+ customers worldwide
          </div>

          {/* Animated headline */}
          <div style={fadeUp(150)}>
            <h1 style={{ fontSize: 'clamp(42px, 7vw, 84px)', fontWeight: 900, color: 'white', lineHeight: 1.05, margin: '0 0 24px 0', letterSpacing: '-1px' }}>
              Ship Anywhere,
              <br />
              <span style={{
                color: '#4ade80',
                textShadow: '0 0 40px rgba(74,222,128,0.4)',
                display: 'inline-block',
                animation: 'shimmer 3s ease infinite',
              }}>
                Anytime.
              </span>
            </h1>
          </div>

          {/* Subtext */}
          <div style={fadeUp(300)}>
            <p style={{ fontSize: '18px', color: 'rgba(187,247,208,0.85)', maxWidth: '540px', margin: '0 auto 40px', lineHeight: 1.75 }}>
              Fast, safe, and reliable courier services worldwide.
              Real-time tracking from pickup to your door.
            </p>
          </div>

          {/* Track form */}
          <div style={{ ...fadeUp(450), maxWidth: '560px', margin: '0 auto 28px' }}>
            <form onSubmit={submit} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
                <Search size={18} color="rgba(134,239,172,0.7)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type="text"
                  value={tracking}
                  onChange={(e) => setTracking(e.target.value)}
                  placeholder={`e.g. ${typedText}|`}
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    paddingLeft: '44px', paddingRight: '16px',
                    paddingTop: '16px', paddingBottom: '16px',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1.5px solid rgba(255,255,255,0.2)',
                    borderRadius: '12px', color: 'white',
                    fontSize: '14px', outline: 'none',
                    backdropFilter: 'blur(10px)',
                    transition: 'border-color 0.3s',
                  }}
                />
              </div>
              <button type="submit" style={{
                background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                color: 'white', fontWeight: 700, fontSize: '15px',
                padding: '16px 28px', borderRadius: '12px',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '8px',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 20px rgba(220,38,38,0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}>
                Track Now <ArrowRight size={16} />
              </button>
            </form>
          </div>

          {/* CTA buttons */}
          <div style={{ ...fadeUp(600), display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}>
            <Link href="/book" style={{
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              color: 'white', fontWeight: 700, fontSize: '15px',
              padding: '16px 36px', borderRadius: '12px',
              textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 4px 20px rgba(22,163,74,0.4)',
              transition: 'transform 0.2s',
            }}>
              Book a Shipment <ArrowRight size={18} />
            </Link>
            <Link href="#services" style={{
              border: '2px solid rgba(255,255,255,0.25)',
              color: 'white', fontWeight: 600, fontSize: '15px',
              padding: '16px 36px', borderRadius: '12px',
              textDecoration: 'none',
              backdropFilter: 'blur(10px)',
              background: 'rgba(255,255,255,0.05)',
            }}>
              View Services
            </Link>
          </div>

          {/* Stats */}
          <div style={{ ...fadeUp(750), display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', maxWidth: '680px', margin: '0 auto' }}>
            {[
              { n: '50K+', l: 'Deliveries Made' },
              { n: '120+', l: 'Countries Served' },
              { n: '99.8%', l: 'On-Time Rate' },
              { n: '24/7', l: 'Live Support' },
            ].map((s, i) => (
              <div key={s.l} style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px', padding: '20px 10px', textAlign: 'center',
                backdropFilter: 'blur(10px)',
                animation: `countUp 0.6s ease ${800 + i * 150}ms both`,
              }}>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#4ade80', textShadow: '0 0 20px rgba(74,222,128,0.3)' }}>{s.n}</div>
                <div style={{ fontSize: '11px', color: 'rgba(187,247,208,0.7)', marginTop: '4px' }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div style={{ ...fadeUp(1000), marginTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', color: 'rgba(187,247,208,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Scroll to explore</span>
            <div style={{
              width: '24px', height: '40px',
              border: '2px solid rgba(74,222,128,0.3)',
              borderRadius: '12px',
              display: 'flex', justifyContent: 'center',
              paddingTop: '6px',
            }}>
              <div style={{
                width: '4px', height: '8px',
                background: '#4ade80',
                borderRadius: '2px',
                animation: 'scrollDot 2s ease infinite',
              }} />
            </div>
          </div>
        </div>

        {/* CSS animations */}
        <style>{`
          @keyframes floatOrb1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(-30px, -40px) scale(1.05); }
            66% { transform: translate(20px, -20px) scale(0.95); }
          }
          @keyframes floatOrb2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(40px, -30px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          @keyframes floatOrb3 {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.3); }
          }
          @keyframes floatIcon {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
            50% { transform: translateY(-20px) rotate(10deg); opacity: 0.35; }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(0.85); }
          }
          @keyframes shimmer {
            0%, 100% { text-shadow: 0 0 40px rgba(74,222,128,0.4); }
            50% { text-shadow: 0 0 80px rgba(74,222,128,0.8), 0 0 120px rgba(74,222,128,0.3); }
          }
          @keyframes scrollDot {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(16px); opacity: 0; }
          }
          @keyframes countUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>

      {/* ═══════════════════════════════════════
          SERVICES
      ═══════════════════════════════════════ */}
      <section id="services" style={{ padding: '100px 0', background: '#f8fafc' }}>
        <div style={wrap}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{ color: '#16a34a', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 12px 0' }}>What We Offer</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#0f172a', margin: '0 0 16px 0' }}>Our Services</h2>
            <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
              From local express delivery to international freight, we have the right solution.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {[
              { icon: Zap, title: 'Express Delivery', desc: 'Same day and next day delivery for your most urgent shipments nationwide.', iconBg: '#dcfce7', color: '#16a34a', tag: 'Most Popular', tagBg: '#dcfce7', tagColor: '#15803d' },
              { icon: Globe, title: 'International', desc: 'Reliable worldwide shipping to over 120 countries with full customs support.', iconBg: '#dbeafe', color: '#2563eb', tag: 'Worldwide', tagBg: '#dbeafe', tagColor: '#1d4ed8' },
              { icon: Package, title: 'Standard Shipping', desc: 'Affordable and dependable solutions for all your everyday delivery needs.', iconBg: '#ffedd5', color: '#ea580c', tag: 'Best Value', tagBg: '#ffedd5', tagColor: '#c2410c' },
              { icon: Shield, title: 'Secure Handling', desc: 'Every package is fully insured and handled with the utmost professional care.', iconBg: '#fee2e2', color: '#dc2626', tag: 'Insured', tagBg: '#fee2e2', tagColor: '#b91c1c' },
            ].map((s) => (
              <div key={s.title} style={{ background: 'white', borderRadius: '18px', padding: '28px', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'default' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
                  <div style={{ background: s.iconBg, width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <s.icon size={26} color={s.color} />
                  </div>
                  <span style={{ background: s.tagBg, color: s.tagColor, fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px' }}>{s.tag}</span>
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px 0' }}>{s.title}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, margin: '0 0 18px 0' }}>{s.desc}</p>
                <Link href="/book" style={{ fontSize: '13px', fontWeight: 700, color: s.color, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Get Started <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════ */}
      <section style={{ padding: '100px 0', background: 'linear-gradient(135deg, #14532d 0%, #052e16 100%)' }}>
        <div style={wrap}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{ color: '#4ade80', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 12px 0' }}>Simple Process</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: 'white', margin: '0 0 16px 0' }}>How It Works</h2>
            <p style={{ fontSize: '16px', color: 'rgba(187,247,208,0.75)', maxWidth: '400px', margin: '0 auto' }}>Ship your package in just 3 simple steps</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px' }}>
            {[
              { step: '01', icon: Package, title: 'Book Online', desc: 'Fill in your shipment details and choose your preferred delivery service in minutes.' },
              { step: '02', icon: Truck, title: 'We Pick Up', desc: 'Our professional courier arrives at your location to collect your package safely.' },
              { step: '03', icon: MapPin, title: 'Track and Receive', desc: 'Track your shipment live and receive it safely at the destination.' },
            ].map((item) => (
              <div key={item.step} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '64px', fontWeight: 900, color: 'rgba(5,46,22,0.7)', lineHeight: 1, marginBottom: '14px' }}>{item.step}</div>
                <div style={{ background: 'rgba(22,163,74,0.2)', border: '1px solid rgba(74,222,128,0.2)', width: '72px', height: '72px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
                  <item.icon size={32} color="#4ade80" />
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: 700, color: 'white', margin: '0 0 10px 0' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(187,247,208,0.75)', lineHeight: 1.7, maxWidth: '240px', margin: '0 auto' }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '52px' }}>
            <Link href="/book" style={{ background: '#dc2626', color: 'white', fontWeight: 700, fontSize: '15px', padding: '14px 36px', borderRadius: '10px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              Start Shipping Today <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHY CHOOSE US
      ═══════════════════════════════════════ */}
      <section style={{ padding: '100px 0', background: 'white' }}>
        <div style={wrap}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#16a34a', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 12px 0' }}>Why SwiftLane</p>
              <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 800, color: '#0f172a', margin: '0 0 18px 0', lineHeight: 1.2 }}>Logistics You Can Always Count On</h2>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.8, margin: '0 0 32px 0' }}>We combine cutting-edge technology with professional service to give you the best shipping experience. Every package matters to us.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '36px' }}>
                {['Real-time shipment tracking', 'Instant booking confirmation', 'Door-to-door delivery', 'Fragile item handling', 'Full insurance coverage', '24/7 customer support'].map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '10px 12px' }}>
                    <CheckCircle size={16} color="#16a34a" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', fontWeight: 500, color: '#1e3a29' }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link href="/book" style={{ background: '#16a34a', color: 'white', fontWeight: 700, fontSize: '15px', padding: '14px 32px', borderRadius: '10px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Get Started Now <ArrowRight size={18} />
              </Link>
            </div>

            <div style={{ background: 'linear-gradient(145deg, #052e16, #14532d)', borderRadius: '24px', padding: '32px', border: '1px solid rgba(74,222,128,0.15)', boxShadow: '0 30px 60px rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ background: '#16a34a', padding: '10px', borderRadius: '12px' }}>
                    <Package size={20} color="white" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'white', fontSize: '15px' }}>Live Tracking</div>
                    <div style={{ fontSize: '12px', color: '#4ade80' }}>SWL-2024-001</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(22,163,74,0.2)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ade80', fontSize: '12px', fontWeight: 600, padding: '6px 12px', borderRadius: '999px' }}>
                  <span style={{ width: '6px', height: '6px', background: '#4ade80', borderRadius: '50%', animation: 'pulse 2s ease infinite' }} />
                  Live
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '24px' }}>
                {[
                  { label: 'Package Picked Up', loc: 'Lagos, Nigeria', time: '8:00 AM', done: true },
                  { label: 'In Transit', loc: 'Ibadan, Nigeria', time: '11:30 AM', done: true },
                  { label: 'Out for Delivery', loc: 'Abuja, Nigeria', time: '2:00 PM', done: true },
                  { label: 'Awaiting Delivery', loc: 'Final Destination', time: 'Tomorrow', done: false },
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', flexShrink: 0, background: step.done ? '#4ade80' : '#374151', boxShadow: step.done ? '0 0 8px rgba(74,222,128,0.5)' : 'none' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: step.done ? 'white' : '#6b7280' }}>{step.label}</div>
                      <div style={{ fontSize: '12px', color: 'rgba(74,222,128,0.7)' }}>{step.loc}</div>
                    </div>
                    <span style={{ fontSize: '12px', color: '#4b5563', flexShrink: 0 }}>{step.time}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: 'rgba(22,163,74,0.12)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '14px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ background: 'rgba(22,163,74,0.2)', padding: '10px', borderRadius: '12px' }}>
                  <Clock size={20} color="#4ade80" />
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#4ade80', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Estimated Delivery</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: 'white' }}>Tomorrow, 2:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURE STRIP
      ═══════════════════════════════════════ */}
      <section style={{ padding: '64px 0', background: '#f8fafc', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
        <div style={wrap}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '36px' }}>
            {[
              { icon: BarChart3, title: 'Live Analytics', desc: 'Track every shipment with real-time data and live updates.', color: '#16a34a', bg: '#dcfce7' },
              { icon: HeadphonesIcon, title: '24/7 Support', desc: 'Our team is always ready to help with any issue.', color: '#2563eb', bg: '#dbeafe' },
              { icon: Shield, title: 'Fully Insured', desc: 'Every package is insured against damage or loss.', color: '#dc2626', bg: '#fee2e2' },
              { icon: Leaf, title: 'Eco Friendly', desc: 'We use carbon-neutral delivery options where possible.', color: '#059669', bg: '#d1fae5' },
            ].map((f) => (
              <div key={f.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ background: f.bg, padding: '12px', borderRadius: '12px', flexShrink: 0 }}>
                  <f.icon size={22} color={f.color} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: '0 0 6px 0' }}>{f.title}</h3>
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════ */}
      <section style={{ padding: '100px 0', background: 'white' }}>
        <div style={wrap}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{ color: '#16a34a', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 12px 0' }}>Testimonials</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#0f172a', margin: '0 0 16px 0' }}>What Customers Say</h2>
            <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '460px', margin: '0 auto' }}>Thousands of businesses and individuals trust SwiftLane every day.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '22px' }}>
            {[
              { name: 'Chidi Okafor', role: 'Business Owner, Lagos', msg: 'SwiftLane completely transformed how I ship products. Fast, reliable, and professional every single time. I would not use anyone else.', av: 'C' },
              { name: 'Amina Hassan', role: 'Online Retailer, Abuja', msg: 'The real-time tracking is absolutely amazing. My customers always know exactly where their packages are. Zero complaints since switching.', av: 'A' },
              { name: 'David Mensah', role: 'Import Manager, Accra', msg: 'Best logistics company I have worked with. Their international freight service is truly world class. Always on time, always perfect.', av: 'D' },
            ].map((t) => (
              <div key={t.name} style={{ background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '20px', padding: '28px' }}>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '18px' }}>
                  {[1,2,3,4,5].map((s) => <Star key={s} size={15} color="#16a34a" fill="#16a34a" />)}
                </div>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.8, margin: '0 0 22px 0' }}>{t.msg}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '18px', borderTop: '1px solid #e2e8f0' }}>
                  <div style={{ width: '42px', height: '42px', background: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>{t.av}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>{t.name}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA
      ═══════════════════════════════════════ */}
      <section style={{ padding: '100px 0', background: 'linear-gradient(135deg, #14532d 0%, #052e16 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(220,38,38,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ ...wrap, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(74,222,128,0.3)', color: '#86efac', fontSize: '13px', fontWeight: 600, padding: '8px 20px', borderRadius: '999px', marginBottom: '28px' }}>
            Get started for free today
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 900, color: 'white', lineHeight: 1.1, margin: '0 0 20px 0' }}>
            Ready to Ship Your<br /><span style={{ color: '#4ade80' }}>Package?</span>
          </h2>
          <p style={{ fontSize: '17px', color: 'rgba(187,247,208,0.75)', maxWidth: '460px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Join thousands of satisfied customers who trust SwiftLane Logistics every day.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/book" style={{ background: 'white', color: '#14532d', fontWeight: 800, fontSize: '15px', padding: '16px 40px', borderRadius: '12px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
              Book a Shipment <ArrowRight size={18} />
            </Link>
            <Link href="/track" style={{ border: '2px solid rgba(255,255,255,0.25)', color: 'white', fontWeight: 600, fontSize: '15px', padding: '16px 40px', borderRadius: '12px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Search size={16} /> Track a Shipment
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}