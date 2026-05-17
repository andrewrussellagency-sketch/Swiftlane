'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  Mail, Phone, MapPin, Clock, Send,
  CheckCircle, MessageSquare, Headphones,
  ChevronDown, ChevronUp,
} from 'lucide-react'

const faqs = [
  { q: 'How do I track my shipment?', a: 'Go to our Track page and enter your tracking number. You will see real-time updates on your package location and estimated delivery time.' },
  { q: 'How long does standard shipping take?', a: 'Standard shipping takes 3-5 business days within Nigeria. International shipments typically take 7-14 business days depending on the destination.' },
  { q: 'What items are prohibited from shipping?', a: 'We do not ship hazardous materials, illegal substances, firearms, or perishable items without special arrangements. Contact us for specific queries.' },
  { q: 'Can I change my delivery address after booking?', a: 'Yes, you can change your delivery address up to 24 hours after booking. Contact our support team immediately with your tracking number.' },
  { q: 'What happens if my package is lost or damaged?', a: 'All shipments are fully insured. If your package is lost or damaged, contact us within 48 hours with your tracking number and we will resolve it immediately.' },
  { q: 'Do you offer same-day delivery?', a: 'Yes! We offer same-day delivery within select cities. Book before 10 AM for same-day delivery. Check availability when booking your shipment.' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in your name, email and message.')
      return
    }
    setLoading(true)
    setError('')
    // Simulate sending (you can connect to email service later)
    await new Promise((r) => setTimeout(r, 1500))
    setSuccess(true)
    setLoading(false)
    setForm({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const inputStyle = {
    width: '100%', boxSizing: 'border-box' as const,
    padding: '13px 16px',
    border: '1.5px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '14px', color: '#0f172a',
    outline: 'none', background: 'white',
    fontFamily: 'system-ui,-apple-system,sans-serif',
  }

  const labelStyle = {
    fontSize: '13px', fontWeight: 600 as const,
    color: '#374151', marginBottom: '6px',
    display: 'block' as const,
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui,-apple-system,sans-serif' }}>
      <Navbar />

      <style>{`
        .input-field:focus { border-color: #16a34a !important; box-shadow: 0 0 0 3px rgba(22,163,74,0.1) !important; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 32px; }
        .faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @keyframes floatOrb1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,-25px); } }
        @keyframes floatOrb2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px,-15px); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes success-pop { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .faq-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .hero-pad { padding: 100px 20px 40px !important; }
          .section-pad { padding: 20px !important; }
          .hero-title { font-size: 36px !important; }
        }
      `}</style>

      {/* HERO */}
      <section style={{
        background: 'linear-gradient(135deg,#052e16 0%,#14532d 100%)',
        paddingTop: '120px', paddingBottom: '60px',
        position: 'relative', overflow: 'hidden',
      }} className="hero-pad">
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '400px', height: '400px', background: 'radial-gradient(circle,rgba(22,163,74,0.25) 0%,transparent 70%)', borderRadius: '50%', animation: 'floatOrb1 9s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '350px', height: '350px', background: 'radial-gradient(circle,rgba(220,38,38,0.12) 0%,transparent 70%)', borderRadius: '50%', animation: 'floatOrb2 11s ease-in-out infinite', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '700px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(74,222,128,0.3)', color: '#86efac', fontSize: '13px', fontWeight: 500, padding: '7px 18px', borderRadius: '999px', marginBottom: '20px' }}>
            <span style={{ width: '7px', height: '7px', background: '#4ade80', borderRadius: '50%', display: 'inline-block' }} />
            We are here to help
          </div>
          <h1 className="hero-title" style={{ fontSize: '52px', fontWeight: 900, color: 'white', margin: '0 0 16px 0', lineHeight: 1.1 }}>
            Contact Us
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(187,247,208,0.8)', margin: '0 0 40px 0', lineHeight: 1.75 }}>
            Have a question or need help with your shipment? Our team is available 24/7 and ready to assist you.
          </p>

          {/* Quick contact cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
            {[
              { icon: Phone, title: 'Call Us', value: '+234 800 000 0000', sub: 'Mon-Sun, 24/7' },
              { icon: Mail, title: 'Email Us', value: 'info@swiftlanelogs.com', sub: 'Reply within 2 hours' },
              { icon: MessageSquare, title: 'Live Chat', value: 'Chat with us', sub: 'Available now' },
            ].map((item) => (
              <div key={item.title} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px', padding: '20px 14px', backdropFilter: 'blur(8px)' }}>
                <div style={{ background: 'rgba(22,163,74,0.2)', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                  <item.icon size={20} color="#4ade80" />
                </div>
                <p style={{ fontSize: '12px', fontWeight: 700, color: 'white', margin: '0 0 3px 0' }}>{item.title}</p>
                <p style={{ fontSize: '11px', color: '#4ade80', margin: '0 0 2px 0', fontWeight: 600 }}>{item.value}</p>
                <p style={{ fontSize: '10px', color: 'rgba(187,247,208,0.6)', margin: 0 }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 20px 80px' }}>

        <div className="contact-grid">

          {/* LEFT — Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Office Info */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 20px 0' }}>Our Office</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { icon: MapPin, color: '#16a34a', bg: '#dcfce7', label: 'Address', value: '123 Logistics Avenue\nLagos Island, Lagos\nNigeria' },
                  { icon: Phone, color: '#2563eb', bg: '#dbeafe', label: 'Phone', value: '+234 800 000 0000\n+234 800 000 0001' },
                  { icon: Mail, color: '#ea580c', bg: '#ffedd5', label: 'Email', value: 'info@swiftlanelogs.com\nsupport@swiftlanelogs.com' },
                  { icon: Clock, color: '#7c3aed', bg: '#ede9fe', label: 'Hours', value: 'Monday - Sunday\n24 hours a day' },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ background: item.bg, padding: '10px', borderRadius: '12px', flexShrink: 0 }}>
                      <item.icon size={18} color={item.color} />
                    </div>
                    <div>
                      <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 3px 0' }}>{item.label}</p>
                      {item.value.split('\n').map((line, i) => (
                        <p key={i} style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', margin: '0 0 1px 0' }}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Card */}
            <div style={{ background: 'linear-gradient(135deg,#052e16,#14532d)', borderRadius: '20px', padding: '28px', color: 'white' }}>
              <div style={{ background: 'rgba(22,163,74,0.2)', width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Headphones size={24} color="#4ade80" />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 8px 0' }}>24/7 Customer Support</h3>
              <p style={{ fontSize: '13px', color: 'rgba(187,247,208,0.8)', margin: '0 0 20px 0', lineHeight: 1.7 }}>
                Our dedicated support team is always available to help you with tracking, bookings, or any other questions.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 16px' }}>
                  <div style={{ width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%' }} />
                  <span style={{ fontSize: '13px', color: 'white', fontWeight: 500 }}>Average response time: 5 minutes</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 16px' }}>
                  <div style={{ width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%' }} />
                  <span style={{ fontSize: '13px', color: 'white', fontWeight: 500 }}>98% customer satisfaction rate</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 16px' }}>
                  <div style={{ width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%' }} />
                  <span style={{ fontSize: '13px', color: 'white', fontWeight: 500 }}>Available in English & French</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Contact Form */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '36px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>

            {success ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ width: '72px', height: '72px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', animation: 'success-pop 0.5s ease' }}>
                  <CheckCircle size={36} color="#16a34a" />
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 10px 0' }}>Message Sent!</h3>
                <p style={{ fontSize: '15px', color: '#64748b', margin: '0 0 28px 0', lineHeight: 1.7 }}>
                  Thank you for reaching out. Our team will get back to you within 2 hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  style={{ background: '#16a34a', color: 'white', fontWeight: 700, padding: '12px 28px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '14px' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                  <div style={{ background: '#dcfce7', padding: '10px', borderRadius: '12px' }}>
                    <Send size={20} color="#16a34a" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Send Us a Message</h2>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>We will reply within 2 hours</p>
                  </div>
                </div>

                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input className="input-field" style={inputStyle} placeholder="John Smith" value={form.name} onChange={(e) => update('name', e.target.value)} />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone Number</label>
                      <input className="input-field" style={inputStyle} placeholder="+234 800 000 0000" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input className="input-field" style={inputStyle} type="email" placeholder="john@example.com" value={form.email} onChange={(e) => update('email', e.target.value)} />
                  </div>

                  <div>
                    <label style={labelStyle}>Subject</label>
                    <select
                      className="input-field"
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      value={form.subject}
                      onChange={(e) => update('subject', e.target.value)}
                    >
                      <option value="">Select a subject...</option>
                      <option value="tracking">Shipment Tracking Issue</option>
                      <option value="booking">Booking Help</option>
                      <option value="delivery">Delivery Problem</option>
                      <option value="damaged">Damaged Package</option>
                      <option value="refund">Refund Request</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Message *</label>
                    <textarea
                      className="input-field"
                      style={{ ...inputStyle, minHeight: '140px', resize: 'vertical' as const, lineHeight: 1.6 }}
                      placeholder="Tell us how we can help you..."
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                    />
                  </div>

                  {error && (
                    <p style={{ color: '#dc2626', fontSize: '13px', background: '#fee2e2', padding: '12px 16px', borderRadius: '10px', margin: 0 }}>{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    style={{ background: loading ? '#94a3b8' : 'linear-gradient(135deg,#16a34a,#15803d)', color: 'white', fontWeight: 700, fontSize: '15px', padding: '16px', borderRadius: '12px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: loading ? 'none' : '0 4px 16px rgba(22,163,74,0.3)' }}
                  >
                    {loading ? (
                      <><div style={{ width: '18px', height: '18px', border: '3px solid rgba(255,255,255,0.3)', borderTop: '3px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Sending...</>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* FAQ SECTION */}
        <div style={{ marginTop: '60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ color: '#16a34a', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.14em', margin: '0 0 10px 0' }}>FAQ</p>
            <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: '#0f172a', margin: '0 0 12px 0' }}>Frequently Asked Questions</h2>
            <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '460px', margin: '0 auto' }}>
              Find quick answers to the most common questions about our services.
            </p>
          </div>

          <div className="faq-grid">
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{ background: 'white', borderRadius: '16px', border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', padding: '20px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', textAlign: 'left' }}
                >
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', lineHeight: 1.4 }}>{faq.q}</span>
                  <div style={{ flexShrink: 0, background: openFaq === i ? '#16a34a' : '#f1f5f9', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                    {openFaq === i
                      ? <ChevronUp size={16} color="white" />
                      : <ChevronDown size={16} color="#64748b" />
                    }
                  </div>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 20px 20px' }}>
                    <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.75, margin: 0 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}