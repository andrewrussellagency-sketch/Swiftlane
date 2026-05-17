'use client'

import Link from 'next/link'
import { Package, Mail, MapPin, ArrowRight, Phone } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  const services = ['Express Delivery', 'Standard Shipping', 'International Freight', 'Warehousing', 'Same Day Delivery']
  const company = [
    { name: 'Track Shipment', href: '/track' },
    { name: 'Book Shipment', href: '/book' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'About Us', href: '/about' },
    { name: 'Admin Panel', href: '/admin' },
  ]

  return (
    <footer style={{ backgroundColor: '#030712', color: '#9ca3af' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '64px 24px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
        }}>
          {/* BRAND */}
          <div>
            <Link href="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              marginBottom: '16px',
            }}>
              <div style={{
                backgroundColor: '#16a34a',
                padding: '8px',
                borderRadius: '8px',
              }}>
                <Package size={20} color="white" />
              </div>
              <div style={{ lineHeight: 1.2 }}>
                <div style={{ fontSize: '18px', fontWeight: 700, color: 'white' }}>
                  Swift<span style={{ color: '#4ade80' }}>Lane</span>
                </div>
                <div style={{ fontSize: '11px', color: '#6b7280' }}>Logistics</div>
              </div>
            </Link>
            <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#6b7280' }}>
              Fast, reliable, and professional courier services. Delivering your packages safely worldwide.
            </p>
          </div>

          {/* SERVICES */}
          <div>
            <h3 style={{
              color: 'white',
              fontWeight: 600,
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '20px',
            }}>Services</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {services.map((item) => (
                <li key={item} style={{ marginBottom: '12px' }}>
                  <Link href="/#services" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    color: '#6b7280',
                    textDecoration: 'none',
                  }}>
                    <ArrowRight size={12} />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 style={{
              color: 'white',
              fontWeight: 600,
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '20px',
            }}>Company</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {company.map((item) => (
                <li key={item.name} style={{ marginBottom: '12px' }}>
                  <Link href={item.href} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    color: '#6b7280',
                    textDecoration: 'none',
                  }}>
                    <ArrowRight size={12} />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 style={{
              color: 'white',
              fontWeight: 600,
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '20px',
            }}>Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <MapPin size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>
                  123 Logistics Avenue,<br />Lagos, Nigeria
                </span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Phone size={16} color="#16a34a" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '14px', color: '#6b7280' }}>+234 800 000 0000</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Mail size={16} color="#16a34a" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '14px', color: '#6b7280' }}>info@swiftlanelogs.com</span>
              </div>
            </div>

            <div style={{
              marginTop: '24px',
              backgroundColor: '#052e16',
              border: '1px solid #14532d',
              borderRadius: '12px',
              padding: '16px',
            }}>
              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px' }}>Quick Track</p>
              <Link href="/track" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#16a34a',
                color: 'white',
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
              }}>
                <span>Track Shipment</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div style={{
        borderTop: '1px solid #111827',
        padding: '20px 24px',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ fontSize: '12px', color: '#4b5563' }}>
            © {year} SwiftLane Logistics. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link href="/privacy" style={{ fontSize: '12px', color: '#4b5563', textDecoration: 'none' }}>
              Privacy Policy
            </Link>
            <Link href="/terms" style={{ fontSize: '12px', color: '#4b5563', textDecoration: 'none' }}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}