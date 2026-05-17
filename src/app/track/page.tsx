'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import type { Shipment, TrackingHistory } from '@/lib/supabase'
import {
  Search, Package, MapPin, Clock, CheckCircle,
  Truck, AlertCircle, X, Phone, Mail,
  Calendar, Globe, ShoppingBag,
} from 'lucide-react'

function TrackingContent() {
  const searchParams = useSearchParams()
  const [trackingNumber, setTrackingNumber] = useState('')
  const [shipment, setShipment] = useState<Shipment | null>(null)
  const [history, setHistory] = useState<TrackingHistory[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const number = searchParams.get('number')
    if (number) {
      setTrackingNumber(number)
      handleSearch(number)
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showModal])

  const closeModal = () => {
    setShowModal(false)
    setShipment(null)
    setHistory([])
    setError('')
  }

  const handleSearch = async (num?: string) => {
    const searchNum = (num || trackingNumber).trim().toUpperCase()
    if (!searchNum) return
    setLoading(true)
    setError('')
    setShipment(null)
    setHistory([])
    setShowModal(true)
    try {
      const { data: shipmentData, error: shipmentError } = await supabase
        .from('shipments')
        .select('*')
        .eq('tracking_number', searchNum)
        .single()
      if (shipmentError || !shipmentData) {
        setError('No shipment found with this tracking number. Please check and try again.')
        setLoading(false)
        return
      }
      setShipment(shipmentData)
      const { data: historyData } = await supabase
        .from('tracking_history')
        .select('*')
        .eq('shipment_id', shipmentData.id)
        .order('timestamp', { ascending: true })
      setHistory(historyData || [])
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch()
  }

  const steps = [
    { key: 'pending', label: 'Order Placed', icon: ShoppingBag },
    { key: 'picked_up', label: 'Preparing to Ship', icon: Package },
    { key: 'in_transit', label: 'In Transit', icon: Truck },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: MapPin },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle },
  ]

  const getStepIndex = (status: string) => steps.findIndex((s) => s.key === status)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return { bg: '#dcfce7', color: '#16a34a', border: '#bbf7d0' }
      case 'out_for_delivery': return { bg: '#dbeafe', color: '#2563eb', border: '#bfdbfe' }
      case 'in_transit': return { bg: '#fef9c3', color: '#ca8a04', border: '#fef08a' }
      case 'picked_up': return { bg: '#ffedd5', color: '#ea580c', border: '#fed7aa' }
      default: return { bg: '#f3f4f6', color: '#6b7280', border: '#e5e7eb' }
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'delivered': return 'Delivered'
      case 'out_for_delivery': return 'Out for Delivery'
      case 'in_transit': return 'In Transit'
      case 'picked_up': return 'Preparing to Ship'
      case 'pending': return 'Order Placed'
      default: return status
    }
  }

  // Only show location for Order Placed and Delivered
  const showLocation = (status: string) => status === 'pending' || status === 'delivered'

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
  })

  const currentStepIndex = shipment ? getStepIndex(shipment.status) : -1
  const statusColors = shipment ? getStatusColor(shipment.status) : null

  return (
    <main style={{ minHeight: '100vh', fontFamily: 'system-ui,-apple-system,sans-serif' }}>
      <Navbar />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.8; }
          70% { transform: scale(1.7); opacity: 0; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(0.88); }
        }
        @keyframes modal-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes floatOrb1 {
          0%,100% { transform: translate(0,0); }
          50% { transform: translate(-20px,-30px); }
        }
        @keyframes floatOrb2 {
          0%,100% { transform: translate(0,0); }
          50% { transform: translate(20px,-20px); }
        }
        .modal-scroll::-webkit-scrollbar { width: 4px; }
        .modal-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 2px; }
        @media (max-width: 600px) {
          .modal-inner { margin: 0 !important; border-radius: 20px 20px 0 0 !important; max-height: 92vh !important; }
          .modal-wrap { align-items: flex-end !important; padding: 0 !important; }
          .step-label { font-size: 8px !important; }
          .hero-title { font-size: 36px !important; }
          .info-cols { grid-template-columns: 1fr !important; }
          .pkg-grid { grid-template-columns: 1fr !important; }
          .mini-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg,#052e16 0%,#14532d 50%,#052e16 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(22,163,74,0.28) 0%,transparent 70%)', borderRadius: '50%', animation: 'floatOrb1 10s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '420px', height: '420px', background: 'radial-gradient(circle,rgba(220,38,38,0.15) 0%,transparent 70%)', borderRadius: '50%', animation: 'floatOrb2 12s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(74,222,128,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(74,222,128,0.04) 1px,transparent 1px)', backgroundSize: '56px 56px', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '680px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px', textAlign: 'center', position: 'relative', zIndex: 1, paddingTop: '120px', paddingBottom: '80px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(74,222,128,0.3)', color: '#86efac', fontSize: '13px', fontWeight: 500, padding: '7px 18px', borderRadius: '999px', marginBottom: '28px' }}>
            <span style={{ width: '7px', height: '7px', background: '#4ade80', borderRadius: '50%', display: 'inline-block' }} />
            Real-time shipment tracking
          </div>

          <h1 className="hero-title" style={{ fontSize: '56px', fontWeight: 900, color: 'white', margin: '0 0 18px 0', lineHeight: 1.05, letterSpacing: '-1px' }}>
            Track Your<br />
            <span style={{ color: '#4ade80' }}>Shipment</span>
          </h1>

          <p style={{ fontSize: '16px', color: 'rgba(187,247,208,0.8)', margin: '0 0 40px', lineHeight: 1.75 }}>
            Enter your tracking number to get real-time updates on your package location and estimated delivery.
          </p>

          <form onSubmit={submit} style={{ display: 'flex', gap: '10px', alignItems: 'stretch', marginBottom: '20px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} color="rgba(134,239,172,0.7)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                placeholder="Enter tracking number e.g. SWL-2024-001"
                style={{ width: '100%', boxSizing: 'border-box', paddingLeft: '50px', paddingRight: '16px', paddingTop: '17px', paddingBottom: '17px', background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: '14px', color: 'white', fontSize: '15px', outline: 'none', backdropFilter: 'blur(10px)' }}
              />
            </div>
            <button type="submit" style={{ background: 'linear-gradient(135deg,#dc2626,#b91c1c)', color: 'white', fontWeight: 700, fontSize: '14px', padding: '17px 20px', borderRadius: '14px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', boxShadow: '0 4px 24px rgba(220,38,38,0.4)', flexShrink: 0 }}>
              Track Now
            </button>
          </form>


          <div className="mini-cards" style={{ marginTop: '64px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
            {[
              { icon: Search, title: 'Enter Number', desc: 'Type your tracking number above' },
              { icon: Globe, title: 'Live Status', desc: 'See real-time shipment updates' },
              { icon: CheckCircle, title: 'Get Delivered', desc: 'Know exactly when it arrives' },
            ].map((item) => (
              <div key={item.title} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px 14px', backdropFilter: 'blur(8px)' }}>
                <div style={{ background: 'rgba(22,163,74,0.2)', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <item.icon size={20} color="#4ade80" />
                </div>
                <p style={{ fontSize: '13px', fontWeight: 700, color: 'white', margin: '0 0 4px 0' }}>{item.title}</p>
                <p style={{ fontSize: '11px', color: 'rgba(187,247,208,0.6)', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* MODAL OVERLAY */}
      {showModal && (
        <div
          className="modal-wrap"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px', animation: 'modal-in 0.25s ease',
          }}
        >
          <div className="modal-inner modal-scroll" style={{
            background: 'white', borderRadius: '24px',
            width: '100%', maxWidth: '820px',
            maxHeight: '88vh', overflowY: 'auto',
            position: 'relative', animation: 'slide-up 0.3s ease',
            boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
          }}>
            <button onClick={closeModal} style={{ position: 'absolute', top: '20px', right: '20px', background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
              <X size={18} color="#64748b" />
            </button>

            {/* LOADING */}
            {loading && (
              <div style={{ padding: '80px 40px', textAlign: 'center' }}>
                <div style={{ width: '52px', height: '52px', border: '4px solid #f1f5f9', borderTop: '4px solid #16a34a', borderRadius: '50%', margin: '0 auto 20px', animation: 'spin 0.8s linear infinite' }} />
                <p style={{ color: '#64748b', fontSize: '16px', fontWeight: 500 }}>Searching for your shipment...</p>
                <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '8px' }}>{trackingNumber}</p>
              </div>
            )}

            {/* ERROR */}
            {error && !loading && (
              <div style={{ padding: '60px 40px', textAlign: 'center' }}>
                <div style={{ width: '72px', height: '72px', background: '#fee2e2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <AlertCircle size={32} color="#dc2626" />
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0' }}>Shipment Not Found</h3>
                <p style={{ color: '#64748b', fontSize: '15px', margin: '0 0 32px 0', lineHeight: 1.7 }}>{error}</p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={closeModal} style={{ background: '#16a34a', color: 'white', fontWeight: 700, padding: '12px 24px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '14px' }}>Try Again</button>
                  <Link href="/contact" style={{ background: '#f8fafc', color: '#374151', fontWeight: 600, padding: '12px 24px', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', border: '1px solid #e2e8f0' }}>Contact Support</Link>
                </div>
              </div>
            )}

            {/* SUCCESS */}
            {shipment && !loading && (
              <div style={{ padding: '32px' }}>

                {/* Header */}
                <div style={{ marginBottom: '24px', paddingRight: '40px' }}>
                  <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 6px 0' }}>Tracking Number</p>
                  <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', margin: '0 0 12px 0', letterSpacing: '0.04em' }}>{shipment.tracking_number}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: statusColors?.bg, color: statusColors?.color, border: '1px solid ' + statusColors?.border, padding: '6px 14px', borderRadius: '999px', fontWeight: 700, fontSize: '13px' }}>
                      {getStatusLabel(shipment.status)}
                    </div>
                    {shipment.estimated_delivery && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '13px' }}>
                        <Calendar size={14} color="#16a34a" />
                        Est. Delivery: <strong style={{ color: '#0f172a', marginLeft: '4px' }}>{formatDate(shipment.estimated_delivery)}</strong>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Steps */}
                <div style={{ background: '#f8fafc', borderRadius: '20px', padding: '28px 20px', marginBottom: '24px', border: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '19px', left: '5%', right: '5%', height: '3px', background: '#e2e8f0', zIndex: 0 }}>
                      <div style={{
                        height: '100%', background: 'linear-gradient(90deg,#16a34a,#4ade80)', borderRadius: '2px', transition: 'width 0.6s ease',
                        width: currentStepIndex <= 0 ? '0%' : currentStepIndex === 1 ? '25%' : currentStepIndex === 2 ? '50%' : currentStepIndex === 3 ? '75%' : '100%',
                      }} />
                    </div>

                    {steps.map((step, i) => {
                      const isCompleted = i < currentStepIndex
                      const isActive = i === currentStepIndex
                      const isPending = i > currentStepIndex
                      const Icon = step.icon
                      return (
                        <div key={step.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, position: 'relative', zIndex: 1 }}>
                          <div style={{ position: 'relative', marginBottom: '10px' }}>
                            {isActive && (
                              <>
                                <div style={{ position: 'absolute', inset: '-7px', borderRadius: '50%', background: 'rgba(22,163,74,0.2)', animation: 'pulse-ring 1.8s ease-out infinite' }} />
                                <div style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', background: 'rgba(22,163,74,0.15)', animation: 'pulse-ring 1.8s ease-out 0.5s infinite' }} />
                              </>
                            )}
                            <div style={{
                              width: '38px', height: '38px', borderRadius: '50%',
                              background: isCompleted || isActive ? '#16a34a' : '#e2e8f0',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              border: isCompleted || isActive ? '3px solid #16a34a' : '3px solid #e2e8f0',
                              boxShadow: isActive ? '0 0 0 4px rgba(22,163,74,0.15)' : 'none',
                              animation: isActive ? 'pulse-dot 1.5s ease infinite' : 'none',
                            }}>
                              {isCompleted ? <CheckCircle size={17} color="white" /> : <Icon size={15} color={isPending ? '#94a3b8' : 'white'} />}
                            </div>
                          </div>
                          <p className="step-label" style={{ fontSize: '10px', fontWeight: isActive ? 700 : isCompleted ? 600 : 400, color: isActive ? '#16a34a' : isCompleted ? '#0f172a' : '#94a3b8', textAlign: 'center', margin: 0, lineHeight: 1.4, maxWidth: '65px' }}>
                            {step.label}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Details */}
                <div className="info-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

                  {/* History */}
                  <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '20px', border: '1px solid #f1f5f9' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: '0 0 18px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={15} color="#16a34a" /> Tracking History
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {history.map((h, i) => {
                        const c = getStatusColor(h.status)
                        const showLoc = showLocation(h.status)
                        const isLatest = i === history.length - 1
                        return (
                          <div key={h.id} style={{ display: 'flex', gap: '12px', paddingBottom: i < history.length - 1 ? '16px' : '0', position: 'relative' }}>
                            {i < history.length - 1 && <div style={{ position: 'absolute', left: '10px', top: '22px', bottom: 0, width: '2px', background: '#e2e8f0' }} />}
                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: isLatest ? '#16a34a' : '#e2e8f0', flexShrink: 0, zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {isLatest && <div style={{ width: '6px', height: '6px', background: 'white', borderRadius: '50%' }} />}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'inline-flex', background: c.bg, color: c.color, fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', marginBottom: '4px' }}>
                                {getStatusLabel(h.status)}
                              </div>
                              <p style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', margin: '0 0 3px 0' }}>{h.description}</p>
                              {showLoc && h.location && (
                                <span style={{ fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                  <MapPin size={10} /> {h.location}
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                      {history.length === 0 && <p style={{ fontSize: '13px', color: '#94a3b8', textAlign: 'center', padding: '16px' }}>No history yet.</p>}
                    </div>
                  </div>

                  {/* Right */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Route */}
                    <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '20px', border: '1px solid #f1f5f9' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Truck size={15} color="#16a34a" /> Route
                      </h3>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px' }}>
                        <div style={{ width: '32px', height: '32px', background: '#dcfce7', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Package size={14} color="#16a34a" />
                        </div>
                        <div>
                          <p style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 1px 0' }}>From</p>
                          <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: '0 0 1px 0' }}>{shipment.origin_city}, {shipment.origin_country}</p>
                          <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>{shipment.sender_name}</p>
                        </div>
                      </div>
                      <div style={{ height: '16px', width: '2px', background: '#e2e8f0', marginLeft: '15px', marginBottom: '10px' }} />
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ width: '32px', height: '32px', background: '#fee2e2', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <MapPin size={14} color="#dc2626" />
                        </div>
                        <div>
                          <p style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 1px 0' }}>To</p>
                          <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: '0 0 1px 0' }}>{shipment.destination_city}, {shipment.destination_country}</p>
                          <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>{shipment.receiver_name}</p>
                        </div>
                      </div>
                    </div>

                    {/* Package Details */}
                    <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '20px', border: '1px solid #f1f5f9' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Package size={15} color="#16a34a" /> Package Details
                      </h3>
                      <div className="pkg-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {[
                          { label: 'Service', value: shipment.service_type?.replace('_', ' ').toUpperCase() || 'N/A' },
                          { label: 'Weight', value: shipment.package_weight ? shipment.package_weight + ' kg' : 'N/A' },
                          { label: 'Contents', value: shipment.package_description || 'N/A' },
                          { label: 'Booked', value: formatDate(shipment.created_at) },
                        ].map((item) => (
                          <div key={item.label} style={{ background: 'white', borderRadius: '10px', padding: '12px', border: '1px solid #f1f5f9' }}>
                            <p style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 4px 0' }}>{item.label}</p>
                            <p style={{ fontSize: '12px', fontWeight: 600, color: '#0f172a', margin: 0 }}>{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Help */}
                    <div style={{ background: 'linear-gradient(135deg,#052e16,#14532d)', borderRadius: '16px', padding: '20px', color: 'white' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 6px 0' }}>Need Help?</h3>
                      <p style={{ fontSize: '12px', color: 'rgba(187,247,208,0.8)', margin: '0 0 14px 0', lineHeight: 1.6 }}>Our team is available 24/7.</p>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <Link href="/contact" style={{ flex: 1, background: '#16a34a', color: 'white', fontWeight: 600, padding: '10px', borderRadius: '10px', textDecoration: 'none', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <Mail size={13} /> Email Us
                        </Link>
                        <Link href="/contact" style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: 600, padding: '10px', borderRadius: '10px', textDecoration: 'none', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', border: '1px solid rgba(255,255,255,0.15)' }}>
                          <Phone size={13} /> Call Us
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

export default function TrackPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '48px', height: '48px', border: '4px solid #f1f5f9', borderTop: '4px solid #16a34a', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    }>
      <TrackingContent />
    </Suspense>
  )
}