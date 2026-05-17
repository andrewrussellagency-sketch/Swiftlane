'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Package, Menu, X, Moon, Sun } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Track', href: '/track' },
    { name: 'Book', href: '/book' },
    { name: 'Services', href: '/#services' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        backgroundColor: scrolled ? 'rgba(5,46,22,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.3)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          paddingLeft: '20px',
          paddingRight: '20px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* LOGO */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }} onClick={() => setIsOpen(false)}>
            <div style={{ backgroundColor: '#16a34a', padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package size={18} color="white" />
            </div>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontSize: '17px', fontWeight: 800, color: 'white' }}>
                Swift<span style={{ color: '#4ade80' }}>Lane</span>
              </div>
              <div style={{ fontSize: '10px', color: '#86efac' }}>Logistics</div>
            </div>
          </Link>

          {/* DESKTOP LINKS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-nav">
            {links.map((link) => (
              <Link key={link.name} href={link.href} style={{ fontSize: '14px', fontWeight: 500, color: '#bbf7d0', textDecoration: 'none' }}>
                {link.name}
              </Link>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button onClick={() => setDark(!dark)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#bbf7d0', padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link href="/book" style={{ backgroundColor: '#dc2626', color: 'white', padding: '9px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }} className="desktop-nav">
              Ship Now
            </Link>
            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', padding: '6px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}
              className="mobile-nav"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* DESKTOP ONLY STYLES */}
        <style>{`
          @media (min-width: 768px) {
            .mobile-nav { display: none !important; }
          }
          @media (max-width: 767px) {
            .desktop-nav { display: none !important; }
          }
        `}</style>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: '64px', left: 0, right: 0, bottom: 0,
          backgroundColor: '#052e16',
          zIndex: 99,
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          overflowY: 'auto',
        }}>
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                display: 'block',
                padding: '16px 20px',
                fontSize: '16px',
                fontWeight: 600,
                color: '#bbf7d0',
                textDecoration: 'none',
                borderRadius: '12px',
                borderBottom: '1px solid rgba(74,222,128,0.1)',
              }}
            >
              {link.name}
            </Link>
          ))}
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link href="/book" onClick={() => setIsOpen(false)} style={{ display: 'block', backgroundColor: '#dc2626', color: 'white', padding: '16px', borderRadius: '12px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>
              Ship Now
            </Link>
            <Link href="/track" onClick={() => setIsOpen(false)} style={{ display: 'block', backgroundColor: '#16a34a', color: 'white', padding: '16px', borderRadius: '12px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>
              Track Shipment
            </Link>
          </div>
        </div>
      )}
    </>
  )
}