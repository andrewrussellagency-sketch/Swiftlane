'use client'

import Link from 'next/link'
import { Package, Home, Search, ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#052e16 0%,#14532d 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'system-ui,-apple-system,sans-serif', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '400px', height: '400px', background: 'radial-gradient(circle,rgba(22,163,74,0.2) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '350px', height: '350px', background: 'radial-gradient(circle,rgba(220,38,38,0.1) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(74,222,128,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(74,222,128,0.04) 1px,transparent 1px)', backgroundSize: '56px 56px', pointerEvents: 'none' }} />

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, maxWidth: '500px' }}>
        <div style={{ background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(74,222,128,0.3)', width: '80px', height: '80px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
          <Package size={40} color="#4ade80" />
        </div>

        <div style={{ fontSize: '96px', fontWeight: 900, color: 'rgba(74,222,128,0.3)', lineHeight: 1, marginBottom: '8px' }}>404</div>

        <h1 style={{ fontSize: 'clamp(24px,5vw,36px)', fontWeight: 900, color: 'white', margin: '0 0 16px 0' }}>
          Package Not Found!
        </h1>

        <p style={{ fontSize: '16px', color: 'rgba(187,247,208,0.75)', margin: '0 0 40px 0', lineHeight: 1.75 }}>
          Looks like this page got lost in transit. Don't worry — let's get you back on track.
        </p>

        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ background: '#16a34a', color: 'white', fontWeight: 700, fontSize: '15px', padding: '14px 28px', borderRadius: '12px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 20px rgba(22,163,74,0.4)' }}>
            <Home size={18} /> Go Home
          </Link>
          <Link href="/track" style={{ border: '2px solid rgba(255,255,255,0.2)', color: 'white', fontWeight: 600, fontSize: '15px', padding: '14px 28px', borderRadius: '12px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)' }}>
            <Search size={18} /> Track Shipment
          </Link>
        </div>

        <div style={{ marginTop: '48px', display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Book a Shipment', href: '/book' },
            { label: 'Contact Support', href: '/contact' },
            { label: 'About Us', href: '/about' },
          ].map((link) => (
            <Link key={link.label} href={link.href} style={{ fontSize: '13px', color: 'rgba(187,247,208,0.6)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
              {link.label} <ArrowRight size={12} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}