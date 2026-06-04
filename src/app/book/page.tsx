'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import {
  Package, User, MapPin, Phone, Mail,
  Weight, Truck, CheckCircle, Copy, ArrowRight,
  ChevronRight, Globe, Zap, Shield,
} from 'lucide-react'

type FormData = {
  sender_name: string
  sender_email: string
  sender_phone: string
  sender_address: string
  origin_city: string
  origin_country: string
  receiver_name: string
  receiver_email: string
  receiver_phone: string
  receiver_address: string
  destination_city: string
  destination_country: string
  package_weight: string
  package_description: string
  service_type: string
}

const empty: FormData = {
  sender_name: '', sender_email: '', sender_phone: '', sender_address: '',
  origin_city: '', origin_country: '',
  receiver_name: '', receiver_email: '', receiver_phone: '', receiver_address: '',
  destination_city: '', destination_country: '',
  package_weight: '', package_description: '', service_type: 'standard',
}

const generateTrackingNumber = () => {
  const year = new Date().getFullYear()
  const rand = Math.floor(Math.random() * 90000) + 10000
  return `SWL-${year}-${rand}`
}

export default function BookPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(empty)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [trackingNumber, setTrackingNumber] = useState('')
  const [copied, setCopied] = useState(false)

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    setError('')
    if (step === 1) {
      if (!form.sender_name || !form.sender_email || !form.sender_phone || !form.origin_city || !form.origin_country) {
        setError('Please fill in all sender fields.')
        return
      }
    }
    if (step === 2) {
      if (!form.receiver_name || !form.receiver_email || !form.receiver_phone || !form.destination_city || !form.destination_country) {
        setError('Please fill in all receiver fields.')
        return
      }
    }
    if (step === 3) {
      if (!form.package_description || !form.package_weight) {
        setError('Please fill in all package fields.')
        return
      }
    }
    setStep((s) => s + 1)
  }

  const submit = async () => {
    setLoading(true)
    setError('')
    try {
      const tracking = generateTrackingNumber()
      const estimatedDelivery = new Date()
      estimatedDelivery.setDate(estimatedDelivery.getDate() + (form.service_type === 'express' ? 2 : form.service_type === 'same_day' ? 1 : 5))

      const { error: insertError } = await supabase.from('shipments').insert({
        tracking_number: tracking,
        sender_name: form.sender_name,
        sender_email: form.sender_email,
        sender_phone: form.sender_phone,
        sender_address: form.sender_address,
        receiver_name: form.receiver_name,
        receiver_email: form.receiver_email,
        receiver_phone: form.receiver_phone,
        receiver_address: form.receiver_address,
        origin_city: form.origin_city,
        origin_country: form.origin_country,
        destination_city: form.destination_city,
        destination_country: form.destination_country,
        package_weight: parseFloat(form.package_weight) || 0,
        package_description: form.package_description,
        service_type: form.service_type,
        status: 'pending',
        estimated_delivery: estimatedDelivery.toISOString().split('T')[0],
      })

      if (insertError) throw insertError

      // Add initial tracking history
      const { data: shipmentData } = await supabase
        .from('shipments')
        .select('id')
        .eq('tracking_number', tracking)
        .single()

      if (shipmentData) {
        await supabase.from('tracking_history').insert({
          shipment_id: shipmentData.id,
          status: 'pending',
          location: `${form.origin_city}, ${form.origin_country}`,
          description: 'Order placed and confirmed',
        })
      }

      // Send confirmation emails
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tracking_number: tracking,
          sender_name: form.sender_name,
          sender_email: form.sender_email,
          receiver_name: form.receiver_name,
          receiver_email: form.receiver_email,
          origin_city: form.origin_city,
          origin_country: form.origin_country,
          destination_city: form.destination_city,
          destination_country: form.destination_country,
          service_type: form.service_type,
          package_description: form.package_description,
          package_weight: form.package_weight,
         estimated_delivery: estimatedDelivery.toISOString().split('T')[0],
        }),
      })

      setTrackingNumber(tracking)
      setStep(5)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const copyTracking = () => {
    navigator.clipboard.writeText(trackingNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const inputStyle = {
    width: '100%', boxSizing: 'border-box' as const,
    padding: '13px 16px',
    border: '1.5px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '14px',
    color: '#0f172a',
    outline: 'none',
    background: 'white',
    transition: 'border-color 0.2s',
  }

  const labelStyle = {
    fontSize: '13px',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '6px',
    display: 'block' as const,
  }

  const services = [
    { key: 'standard', label: 'Standard', desc: '3-5 business days', icon: Package, color: '#16a34a', bg: '#dcfce7', days: '3-5 days' },
    { key: 'express', label: 'Express', desc: '1-2 business days', icon: Zap, color: '#2563eb', bg: '#dbeafe', days: '1-2 days' },
    { key: 'same_day', label: 'Same Day', desc: 'Delivered today', icon: Truck, color: '#dc2626', bg: '#fee2e2', days: 'Today' },
    { key: 'international', label: 'International', desc: '7-14 business days', icon: Globe, color: '#7c3aed', bg: '#ede9fe', days: '7-14 days' },
  ]

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui,-apple-system,sans-serif' }}>
      <Navbar />

      <style>{`
        .input-field:focus { border-color: #16a34a !important; box-shadow: 0 0 0 3px rgba(22,163,74,0.1); }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .service-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 600px) {
          .form-grid { grid-template-columns: 1fr !important; }
          .service-grid { grid-template-columns: 1fr !important; }
          .hero-section { padding: 100px 20px 40px !important; }
          .form-card { padding: 24px 20px !important; }
        }
        @keyframes floatOrb1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,-25px); } }
        @keyframes floatOrb2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px,-15px); } }
        @keyframes success-pop { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* HERO */}
      <section style={{
        background: 'linear-gradient(135deg,#052e16 0%,#14532d 100%)',
        paddingTop: '120px', paddingBottom: '60px',
        position: 'relative', overflow: 'hidden',
      }} className="hero-section">
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '400px', height: '400px', background: 'radial-gradient(circle,rgba(22,163,74,0.25) 0%,transparent 70%)', borderRadius: '50%', animation: 'floatOrb1 9s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '350px', height: '350px', background: 'radial-gradient(circle,rgba(220,38,38,0.12) 0%,transparent 70%)', borderRadius: '50%', animation: 'floatOrb2 11s ease-in-out infinite', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '700px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(74,222,128,0.3)', color: '#86efac', fontSize: '13px', fontWeight: 500, padding: '7px 18px', borderRadius: '999px', marginBottom: '20px' }}>
            <span style={{ width: '7px', height: '7px', background: '#4ade80', borderRadius: '50%', display: 'inline-block' }} />
            Fast and reliable shipping worldwide
          </div>
          <h1 style={{ fontSize: 'clamp(32px,6vw,52px)', fontWeight: 900, color: 'white', margin: '0 0 14px 0', lineHeight: 1.1 }}>
            Book a Shipment
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(187,247,208,0.8)', margin: '0 0 36px 0', lineHeight: 1.7 }}>
            Fill in your details below and we will take care of the rest. Get your tracking number instantly!
          </p>

          {/* Step Indicators */}
          {step < 5 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0' }}>
              {['Sender', 'Receiver', 'Package', 'Review'].map((label, i) => {
                const num = i + 1
                const isActive = step === num
                const isDone = step > num
                return (
                  <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '50%',
                        background: isDone ? '#16a34a' : isActive ? 'white' : 'rgba(255,255,255,0.15)',
                        color: isDone ? 'white' : isActive ? '#16a34a' : 'rgba(255,255,255,0.5)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: '14px',
                        border: isActive ? '3px solid white' : isDone ? '3px solid #16a34a' : '3px solid rgba(255,255,255,0.2)',
                        transition: 'all 0.3s',
                      }}>
                        {isDone ? <CheckCircle size={16} /> : num}
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: isActive ? 700 : 400, color: isActive ? 'white' : 'rgba(255,255,255,0.5)' }}>
                        {label}
                      </span>
                    </div>
                    {i < 3 && (
                      <div style={{ width: '40px', height: '2px', background: step > num ? '#16a34a' : 'rgba(255,255,255,0.2)', margin: '0 4px 18px', transition: 'background 0.3s' }} />
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* FORM AREA */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 20px 80px' }}>

        {/* STEP 1 — SENDER */}
        {step === 1 && (
          <div className="form-card" style={{ background: 'white', borderRadius: '24px', padding: '36px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <div style={{ background: '#dcfce7', padding: '10px', borderRadius: '12px' }}>
                <User size={20} color="#16a34a" />
              </div>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Sender Information</h2>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Who is sending the package?</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-grid">
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input className="input-field" style={inputStyle} placeholder="John Smith" value={form.sender_name} onChange={(e) => update('sender_name', e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input className="input-field" style={inputStyle} placeholder="+234 800 000 0000" value={form.sender_phone} onChange={(e) => update('sender_phone', e.target.value)} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Email Address *</label>
                <input className="input-field" style={inputStyle} type="email" placeholder="john@example.com" value={form.sender_email} onChange={(e) => update('sender_email', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Pickup Address</label>
                <input className="input-field" style={inputStyle} placeholder="123 Main Street, Lagos" value={form.sender_address} onChange={(e) => update('sender_address', e.target.value)} />
              </div>
              <div className="form-grid">
                <div>
                  <label style={labelStyle}>Origin City *</label>
                  <input className="input-field" style={inputStyle} placeholder="Lagos" value={form.origin_city} onChange={(e) => update('origin_city', e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Country *</label>
                  <input className="input-field" style={inputStyle} placeholder="Nigeria" value={form.origin_country} onChange={(e) => update('origin_country', e.target.value)} />
                </div>
              </div>
            </div>

            {error && <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '16px', background: '#fee2e2', padding: '12px 16px', borderRadius: '10px' }}>{error}</p>}

            <button onClick={nextStep} style={{ width: '100%', marginTop: '24px', background: 'linear-gradient(135deg,#16a34a,#15803d)', color: 'white', fontWeight: 700, fontSize: '15px', padding: '16px', borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 16px rgba(22,163,74,0.3)' }}>
              Continue to Receiver <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* STEP 2 — RECEIVER */}
        {step === 2 && (
          <div className="form-card" style={{ background: 'white', borderRadius: '24px', padding: '36px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <div style={{ background: '#dbeafe', padding: '10px', borderRadius: '12px' }}>
                <MapPin size={20} color="#2563eb" />
              </div>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Receiver Information</h2>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Who is receiving the package?</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-grid">
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input className="input-field" style={inputStyle} placeholder="Jane Doe" value={form.receiver_name} onChange={(e) => update('receiver_name', e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input className="input-field" style={inputStyle} placeholder="+234 800 000 0001" value={form.receiver_phone} onChange={(e) => update('receiver_phone', e.target.value)} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Email Address *</label>
                <input className="input-field" style={inputStyle} type="email" placeholder="jane@example.com" value={form.receiver_email} onChange={(e) => update('receiver_email', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Delivery Address</label>
                <input className="input-field" style={inputStyle} placeholder="456 Delivery Road, Abuja" value={form.receiver_address} onChange={(e) => update('receiver_address', e.target.value)} />
              </div>
              <div className="form-grid">
                <div>
                  <label style={labelStyle}>Destination City *</label>
                  <input className="input-field" style={inputStyle} placeholder="Abuja" value={form.destination_city} onChange={(e) => update('destination_city', e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Country *</label>
                  <input className="input-field" style={inputStyle} placeholder="Nigeria" value={form.destination_country} onChange={(e) => update('destination_country', e.target.value)} />
                </div>
              </div>
            </div>

            {error && <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '16px', background: '#fee2e2', padding: '12px 16px', borderRadius: '10px' }}>{error}</p>}

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, background: '#f8fafc', color: '#374151', fontWeight: 600, fontSize: '15px', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
                Back
              </button>
              <button onClick={nextStep} style={{ flex: 2, background: 'linear-gradient(135deg,#16a34a,#15803d)', color: 'white', fontWeight: 700, fontSize: '15px', padding: '16px', borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 16px rgba(22,163,74,0.3)' }}>
                Continue to Package <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 — PACKAGE */}
        {step === 3 && (
          <div className="form-card" style={{ background: 'white', borderRadius: '24px', padding: '36px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <div style={{ background: '#ffedd5', padding: '10px', borderRadius: '12px' }}>
                <Package size={20} color="#ea580c" />
              </div>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Package Details</h2>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Tell us about your package</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="form-grid">
                <div>
                  <label style={labelStyle}>Package Weight (kg) *</label>
                  <div style={{ position: 'relative' }}>
                    <Weight size={16} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    <input className="input-field" style={{ ...inputStyle, paddingLeft: '40px' }} type="number" placeholder="0.5" min="0.1" step="0.1" value={form.package_weight} onChange={(e) => update('package_weight', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Package Contents *</label>
                  <input className="input-field" style={inputStyle} placeholder="Electronics, Clothing..." value={form.package_description} onChange={(e) => update('package_description', e.target.value)} />
                </div>
              </div>

              {/* Service Type */}
              <div>
                <label style={{ ...labelStyle, marginBottom: '12px' }}>Select Service *</label>
                <div className="service-grid">
                  {services.map((s) => (
                    <div
                      key={s.key}
                      onClick={() => update('service_type', s.key)}
                      style={{
                        padding: '16px',
                        borderRadius: '14px',
                        border: form.service_type === s.key ? '2px solid #16a34a' : '2px solid #e2e8f0',
                        background: form.service_type === s.key ? '#f0fdf4' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        position: 'relative',
                      }}
                    >
                      {form.service_type === s.key && (
                        <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#16a34a', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <CheckCircle size={12} color="white" />
                        </div>
                      )}
                      <div style={{ background: s.bg, width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                        <s.icon size={18} color={s.color} />
                      </div>
                      <p style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: '0 0 3px 0' }}>{s.label}</p>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 3px 0' }}>{s.desc}</p>
                      <p style={{ fontSize: '11px', fontWeight: 700, color: s.color, margin: 0 }}>{s.days}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {error && <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '16px', background: '#fee2e2', padding: '12px 16px', borderRadius: '10px' }}>{error}</p>}

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button onClick={() => setStep(2)} style={{ flex: 1, background: '#f8fafc', color: '#374151', fontWeight: 600, fontSize: '15px', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
                Back
              </button>
              <button onClick={nextStep} style={{ flex: 2, background: 'linear-gradient(135deg,#16a34a,#15803d)', color: 'white', fontWeight: 700, fontSize: '15px', padding: '16px', borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 16px rgba(22,163,74,0.3)' }}>
                Review Order <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 — REVIEW */}
        {step === 4 && (
          <div className="form-card" style={{ background: 'white', borderRadius: '24px', padding: '36px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <div style={{ background: '#dcfce7', padding: '10px', borderRadius: '12px' }}>
                <Shield size={20} color="#16a34a" />
              </div>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Review Your Order</h2>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Please confirm all details before submitting</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Sender */}
              <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '20px', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <User size={15} color="#16a34a" /> Sender
                  </h3>
                  <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#16a34a', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Edit</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {[
                    { l: 'Name', v: form.sender_name },
                    { l: 'Phone', v: form.sender_phone },
                    { l: 'Email', v: form.sender_email },
                    { l: 'From', v: `${form.origin_city}, ${form.origin_country}` },
                  ].map((item) => (
                    <div key={item.l}>
                      <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 2px 0' }}>{item.l}</p>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', margin: 0 }}>{item.v || '—'}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Receiver */}
              <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '20px', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={15} color="#2563eb" /> Receiver
                  </h3>
                  <button onClick={() => setStep(2)} style={{ background: 'none', border: 'none', color: '#16a34a', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Edit</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {[
                    { l: 'Name', v: form.receiver_name },
                    { l: 'Phone', v: form.receiver_phone },
                    { l: 'Email', v: form.receiver_email },
                    { l: 'To', v: `${form.destination_city}, ${form.destination_country}` },
                  ].map((item) => (
                    <div key={item.l}>
                      <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 2px 0' }}>{item.l}</p>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', margin: 0 }}>{item.v || '—'}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Package */}
              <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '20px', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Package size={15} color="#ea580c" /> Package
                  </h3>
                  <button onClick={() => setStep(3)} style={{ background: 'none', border: 'none', color: '#16a34a', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Edit</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  {[
                    { l: 'Weight', v: form.package_weight + ' kg' },
                    { l: 'Contents', v: form.package_description },
                    { l: 'Service', v: services.find((s) => s.key === form.service_type)?.label || '' },
                  ].map((item) => (
                    <div key={item.l}>
                      <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 2px 0' }}>{item.l}</p>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', margin: 0 }}>{item.v || '—'}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {error && <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '16px', background: '#fee2e2', padding: '12px 16px', borderRadius: '10px' }}>{error}</p>}

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button onClick={() => setStep(3)} style={{ flex: 1, background: '#f8fafc', color: '#374151', fontWeight: 600, fontSize: '15px', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
                Back
              </button>
              <button
                onClick={submit}
                disabled={loading}
                style={{ flex: 2, background: loading ? '#94a3b8' : 'linear-gradient(135deg,#dc2626,#b91c1c)', color: 'white', fontWeight: 700, fontSize: '15px', padding: '16px', borderRadius: '12px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: loading ? 'none' : '0 4px 16px rgba(220,38,38,0.3)' }}
              >
                {loading ? (
                  <><div style={{ width: '18px', height: '18px', border: '3px solid rgba(255,255,255,0.3)', borderTop: '3px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Processing...</>
                ) : (
                  <><ArrowRight size={18} /> Confirm and Book</>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 5 — SUCCESS */}
        {step === 5 && (
          <div className="form-card" style={{ background: 'white', borderRadius: '24px', padding: '48px 36px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', animation: 'success-pop 0.5s ease' }}>
              <CheckCircle size={40} color="#16a34a" />
            </div>

            <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', margin: '0 0 10px 0' }}>
              Shipment Booked!
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b', margin: '0 0 32px 0', lineHeight: 1.7 }}>
              Your shipment has been successfully booked. Use the tracking number below to monitor your package.
            </p>

            {/* Tracking Number Box */}
            <div style={{ background: 'linear-gradient(135deg,#052e16,#14532d)', borderRadius: '20px', padding: '28px', marginBottom: '28px' }}>
              <p style={{ fontSize: '12px', color: 'rgba(187,247,208,0.7)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px 0' }}>Your Tracking Number</p>
              <p style={{ fontSize: '32px', fontWeight: 900, color: 'white', margin: '0 0 20px 0', letterSpacing: '0.06em' }}>{trackingNumber}</p>
              <button
                onClick={copyTracking}
                style={{ background: copied ? '#16a34a' : 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 24px', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
              >
                {copied ? <><CheckCircle size={15} /> Copied!</> : <><Copy size={15} /> Copy Number</>}
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link
                href={'/track?number=' + trackingNumber}
                style={{ background: 'linear-gradient(135deg,#16a34a,#15803d)', color: 'white', fontWeight: 700, fontSize: '15px', padding: '16px', borderRadius: '12px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 16px rgba(22,163,74,0.3)' }}
              >
                <Package size={18} /> Track My Shipment
              </Link>
              <button
                onClick={() => { setStep(1); setForm(empty); setTrackingNumber('') }}
                style={{ background: '#f8fafc', color: '#374151', fontWeight: 600, fontSize: '15px', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', cursor: 'pointer' }}
              >
                Book Another Shipment
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}