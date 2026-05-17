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

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Track', href: '/track' },
    { name: 'Book', href: '/book' },
    { name: 'Services', href: '/#services' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backgroundColor: scrolled ? '#052e16' : 'transparent',
      boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.3)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px',
      }}>
        {/* LOGO */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
          flexShrink: 0,
        }}>
          <div style={{
            backgroundColor: '#16a34a',
            padding: '8px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Package size={20} color="white" />
          </div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'white' }}>
              Swift<span style={{ color: '#4ade80' }}>Lane</span>
            </div>
            <div style={{ fontSize: '11px', color: '#86efac' }}>Logistics</div>
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
        }} className="hidden-mobile">
          {links.map((link) => (
            <Link key={link.name} href={link.href} style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#bbf7d0',
              textDecoration: 'none',
            }}>
              {link.name}
            </Link>
          ))}
        </div>

        {/* RIGHT BUTTONS */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <button
            onClick={() => setDark(!dark)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#bbf7d0',
              padding: '8px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link href="/book" style={{
            backgroundColor: '#dc2626',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 700,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}>
            Ship Now
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#bbf7d0',
              padding: '8px',
              display: 'none',
            }}
            className="show-mobile"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div style={{
          backgroundColor: '#052e16',
          borderTop: '1px solid #14532d',
          padding: '16px 24px',
        }}>
          {links.map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} style={{
              display: 'block',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#bbf7d0',
              textDecoration: 'none',
              borderRadius: '8px',
              marginBottom: '4px',
            }}>
              {link.name}
            </Link>
          ))}
          <Link href="/book" onClick={() => setIsOpen(false)} style={{
            display: 'block',
            backgroundColor: '#dc2626',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 700,
            textDecoration: 'none',
            textAlign: 'center',
            marginTop: '8px',
          }}>
            Ship Now
          </Link>
        </div>
      )}
    </nav>
  )
}