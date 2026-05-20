'use client'

import Link from 'next/link'
import { Package, Mail, MapPin, ArrowRight, Phone } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ backgroundColor: '#030712', color: '#9ca3af', fontFamily: 'system-ui,-apple-system,sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '40px', paddingRight: '40px', paddingTop: '72px', paddingBottom: '48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '48px' }}>

          {/* BRAND */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '16px' }}>
              <div style={{ background: '#16a34a', padding: '8px', borderRadius: '10px' }}>
                <Package size={20} color="white" />
              </div>
              <div style={{ lineHeight: 1.2 }}>
                <span style={{ fontSize: '18px', fontWeight: 800, color: 'white' }}>
                  Swift<span style={{ color: '#4ade80' }}>Lane</span>
                </span>
                <p style={{ fontSize: '11px', color: '#4b5563', margin: '2px 0 0 0' }}>Logistics</p>
              </div>
            </Link>
            <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#6b7280', margin: '0 0 20px 0', maxWidth: '220px' }}>
              Fast, reliable, and professional courier services. Delivering your packages safely worldwide.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['f', 'tw', 'in', 'ig'].map((s) => (
                <div key={s} style={{ width: '34px', height: '34px', background: '#111827', border: '1px solid #1f2937', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <span style={{ fontSize: '11px', color: '#4ade80', fontWeight: 700 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SERVICES */}
          <div>
            <h3 style={{ color: 'white', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px', margin: '0 0 20px 0' }}>Services</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Express Delivery', 'Standard Shipping', 'International Freight', 'Warehousing', 'Same Day Delivery'].map((item) => (
                <li key={item}>
                  <Link href="/#services" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}>
                    <ArrowRight size={12} color="#4ade80" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 style={{ color: 'white', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 20px 0' }}>Company</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Track Shipment', href: '/track' },
                { name: 'Book Shipment', href: '/book' },
                { name: 'Contact Us', href: '/contact' },
                { name: 'Admin Panel', href: '/admin' },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}>
                    <ArrowRight size={12} color="#4ade80" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 style={{ color: 'white', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 20px 0' }}>Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <MapPin size={15} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.65 }}>
                  123 Logistics Avenue,<br />New York, NY 10001<br />United States
                </span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Phone size={15} color="#16a34a" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '14px', color: '#6b7280' }}>+1 800 000 0000</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Mail size={15} color="#16a34a" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '14px', color: '#6b7280' }}>info@swiftlanelogs.com</span>
              </div>
            </div>

            <div style={{ background: '#0d1f13', border: '1px solid #1a3d22', borderRadius: '14px', padding: '16px' }}>
              <p style={{ fontSize: '12px', color: '#4b5563', margin: '0 0 10px 0' }}>Quick Track</p>
              <Link href="/track" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#16a34a', color: 'white', padding: '10px 16px', borderRadius: '10px', textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}>
                <span>Track Shipment</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div style={{ borderTop: '1px solid #111827', padding: '20px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '13px', color: '#374151', margin: 0 }}>
            © {year} SwiftLane Logistics. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link href="/privacy" style={{ fontSize: '13px', color: '#374151', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="/terms" style={{ fontSize: '13px', color: '#374151', textDecoration: 'none' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}