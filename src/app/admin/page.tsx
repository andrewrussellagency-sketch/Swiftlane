'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Shipment } from '@/lib/supabase'
import {
  Package, Truck, CheckCircle, Clock, Search,
  Plus, X, LogOut, Edit,
  MapPin, User, Globe,
  BarChart3, AlertCircle, Download,
} from 'lucide-react'

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'swiftlane2024'

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Order Placed', color: '#6b7280', bg: '#f3f4f6' },
  { value: 'picked_up', label: 'Preparing to Ship', color: '#ea580c', bg: '#ffedd5' },
  { value: 'in_transit', label: 'In Transit', color: '#ca8a04', bg: '#fef9c3' },
  { value: 'out_for_delivery', label: 'Out for Delivery', color: '#2563eb', bg: '#dbeafe' },
  { value: 'delivered', label: 'Delivered', color: '#16a34a', bg: '#dcfce7' },
]

const STATUS_DESCRIPTIONS: Record<string, string> = {
  pending: 'Order placed and confirmed',
  picked_up: 'Package picked up from sender',
  in_transit: 'Package in transit to destination',
  out_for_delivery: 'Package out for delivery',
  delivered: 'Package delivered successfully',
}

const generateTrackingNumber = () => {
  const year = new Date().getFullYear()
  const rand = Math.floor(Math.random() * 90000) + 10000
  return `SWL-${year}-${rand}`
}

const downloadReceipt = (shipment: Shipment) => {
  const serviceLabels: Record<string, string> = {
    standard: 'Standard Shipping (3-5 days)',
    express: 'Express Delivery (1-2 days)',
    same_day: 'Same Day Delivery',
    international: 'International Freight (7-14 days)',
  }
  const statusLabels: Record<string, string> = {
    pending: 'Order Placed',
    picked_up: 'Preparing to Ship',
    in_transit: 'In Transit',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
  }
  const date = new Date(shipment.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const estDelivery = shipment.estimated_delivery ? new Date(shipment.estimated_delivery).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Receipt - ${shipment.tracking_number}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: system-ui, -apple-system, sans-serif; color: #0f172a; background: white; padding: 40px; max-width: 700px; margin: 0 auto; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; padding-bottom: 24px; border-bottom: 2px solid #f1f5f9; }
  .logo { font-size: 24px; font-weight: 900; color: #052e16; }
  .logo span { color: #16a34a; }
  .receipt-badge { background: #dcfce7; color: #16a34a; font-size: 12px; font-weight: 700; padding: 6px 14px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.08em; }
  .tracking { background: linear-gradient(135deg, #052e16, #14532d); color: white; border-radius: 16px; padding: 24px; margin-bottom: 28px; }
  .tracking-label { font-size: 11px; color: rgba(187,247,208,0.7); font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px; }
  .tracking-number { font-size: 28px; font-weight: 900; letter-spacing: 0.05em; margin-bottom: 12px; }
  .tracking-meta { display: flex; gap: 24px; font-size: 13px; color: rgba(187,247,208,0.85); flex-wrap: wrap; }
  .section { background: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 1px solid #f1f5f9; }
  .section-title { font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 14px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .field-label { font-size: 11px; color: #94a3b8; font-weight: 600; text-transform: uppercase; margin-bottom: 3px; }
  .field-value { font-size: 14px; font-weight: 600; color: #0f172a; }
  .route { display: flex; gap: 16px; align-items: center; margin-bottom: 16px; }
  .route-box { flex: 1; background: white; border-radius: 10px; padding: 14px; border: 1px solid #f1f5f9; }
  .route-arrow { font-size: 20px; color: #16a34a; font-weight: 900; }
  .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 12px; line-height: 1.8; }
  .footer strong { color: #16a34a; }
  @media print { body { padding: 20px; } }
</style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">Swift<span>Lane</span></div>
      <div style="font-size:11px;color:#94a3b8;margin-top:2px;">Logistics</div>
      <div style="font-size:12px;color:#64748b;margin-top:6px;">123 Logistics Avenue, New York, NY 10001</div>
      <div style="font-size:12px;color:#64748b;">info@swiftlanelogs.com • +1 800 000 0000</div>
    </div>
    <div style="text-align:right;">
      <div class="receipt-badge">Shipment Receipt</div>
      <div style="font-size:12px;color:#94a3b8;margin-top:8px;">Issued: ${date}</div>
    </div>
  </div>
  <div class="tracking">
    <div class="tracking-label">Tracking Number</div>
    <div class="tracking-number">${shipment.tracking_number}</div>
    <div class="tracking-meta">
      <span>Status: <strong style="color:#4ade80;">${statusLabels[shipment.status] || shipment.status}</strong></span>
      <span>Est. Delivery: <strong>${estDelivery}</strong></span>
    </div>
  </div>
  <div class="route">
    <div class="route-box">
      <div class="field-label">From</div>
      <div class="field-value">${shipment.sender_name}</div>
      <div style="font-size:13px;color:#64748b;margin-top:2px;">${shipment.origin_city}, ${shipment.origin_country}</div>
      ${shipment.sender_address ? `<div style="font-size:12px;color:#94a3b8;margin-top:2px;">${shipment.sender_address}</div>` : ''}
    </div>
    <div class="route-arrow">→</div>
    <div class="route-box">
      <div class="field-label">To</div>
      <div class="field-value">${shipment.receiver_name}</div>
      <div style="font-size:13px;color:#64748b;margin-top:2px;">${shipment.destination_city}, ${shipment.destination_country}</div>
      ${shipment.receiver_address ? `<div style="font-size:12px;color:#94a3b8;margin-top:2px;">${shipment.receiver_address}</div>` : ''}
    </div>
  </div>
  <div class="section">
    <div class="section-title">Package Details</div>
    <div class="grid">
      <div><div class="field-label">Service Type</div><div class="field-value">${serviceLabels[shipment.service_type] || shipment.service_type}</div></div>
      <div><div class="field-label">Package Weight</div><div class="field-value">${shipment.package_weight ? shipment.package_weight + ' kg' : 'N/A'}</div></div>
      <div><div class="field-label">Contents</div><div class="field-value">${shipment.package_description || 'N/A'}</div></div>
      <div><div class="field-label">Booking Date</div><div class="field-value">${date}</div></div>
    </div>
  </div>
  <div class="section">
    <div class="section-title">Contact Information</div>
    <div class="grid">
      <div><div class="field-label">Sender Email</div><div class="field-value">${shipment.sender_email || 'N/A'}</div></div>
      <div><div class="field-label">Sender Phone</div><div class="field-value">${shipment.sender_phone || 'N/A'}</div></div>
      <div><div class="field-label">Receiver Email</div><div class="field-value">${shipment.receiver_email || 'N/A'}</div></div>
      <div><div class="field-label">Receiver Phone</div><div class="field-value">${shipment.receiver_phone || 'N/A'}</div></div>
    </div>
  </div>
  <div class="footer">
    <p>Thank you for choosing <strong>SwiftLane Logistics</strong></p>
    <p>For support, contact us at <strong>info@swiftlanelogs.com</strong> or call <strong>+1 800 000 0000</strong></p>
    <p style="margin-top:8px;font-size:11px;">This is an automatically generated receipt. Please keep it for your records.</p>
    <p style="font-size:11px;">© ${new Date().getFullYear()} SwiftLane Logistics. All rights reserved.</p>
  </div>
</body>
</html>`

  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `SwiftLane-Receipt-${shipment.tracking_number}.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

type Tab = 'dashboard' | 'shipments' | 'create'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [pwError, setPwError] = useState('')
  const [tab, setTab] = useState<Tab>('dashboard')
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null)
  const [showDetail, setShowDetail] = useState(false)
  const [newStatus, setNewStatus] = useState('')
  const [customLocation, setCustomLocation] = useState('')
  const [customNote, setCustomNote] = useState('')
  const [updateLoading, setUpdateLoading] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [stats, setStats] = useState({ total: 0, pending: 0, in_transit: 0, delivered: 0 })

  const emptyForm = {
    sender_name: '', sender_email: '', sender_phone: '', sender_address: '',
    origin_city: '', origin_country: '',
    receiver_name: '', receiver_email: '', receiver_phone: '', receiver_address: '',
    destination_city: '', destination_country: '',
    package_weight: '', package_description: '', service_type: 'standard',
  }
  const [createForm, setCreateForm] = useState(emptyForm)
  const [createLoading, setCreateLoading] = useState(false)
  const [createSuccess, setCreateSuccess] = useState('')
  const [createError, setCreateError] = useState('')

  useEffect(() => {
    const saved = sessionStorage.getItem('swiftlane_admin')
    if (saved === 'true') setAuthed(true)
  }, [])

  useEffect(() => {
    if (authed) fetchShipments()
  }, [authed])

  const login = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true)
      sessionStorage.setItem('swiftlane_admin', 'true')
      setPwError('')
    } else {
      setPwError('Incorrect password. Please try again.')
    }
  }

  const logout = () => {
    setAuthed(false)
    sessionStorage.removeItem('swiftlane_admin')
    setPassword('')
  }

  const fetchShipments = async () => {
    setLoading(true)
    const { data } = await supabase.from('shipments').select('*').order('created_at', { ascending: false })
    if (data) {
      setShipments(data)
      setStats({
        total: data.length,
        pending: data.filter((s) => s.status === 'pending' || s.status === 'picked_up').length,
        in_transit: data.filter((s) => s.status === 'in_transit' || s.status === 'out_for_delivery').length,
        delivered: data.filter((s) => s.status === 'delivered').length,
      })
    }
    setLoading(false)
  }

  const openDetail = (shipment: Shipment) => {
    setSelectedShipment(shipment)
    setNewStatus(shipment.status)
    setCustomLocation(`${shipment.origin_city}, ${shipment.origin_country}`)
    setCustomNote(STATUS_DESCRIPTIONS[shipment.status] || '')
    setUpdateSuccess(false)
    setShowDetail(true)
  }

  const updateStatus = async () => {
    if (!selectedShipment || !newStatus) return
    setUpdateLoading(true)
    try {
      await supabase.from('shipments').update({ status: newStatus, updated_at: new Date().toISOString() }).eq('id', selectedShipment.id)
      await supabase.from('tracking_history').insert({
        shipment_id: selectedShipment.id,
        status: newStatus,
        location: customLocation || `${selectedShipment.origin_city}, ${selectedShipment.origin_country}`,
        description: customNote || STATUS_DESCRIPTIONS[newStatus],
        timestamp: new Date().toISOString(),
      })
      setUpdateSuccess(true)
      setSelectedShipment({ ...selectedShipment, status: newStatus })
      fetchShipments()
      setTimeout(() => setUpdateSuccess(false), 3000)
    } catch {
      alert('Update failed. Please try again.')
    } finally {
      setUpdateLoading(false)
    }
  }

  const createOrder = async () => {
    if (!createForm.sender_name || !createForm.receiver_name || !createForm.origin_city || !createForm.destination_city) {
      setCreateError('Please fill in all required fields.')
      return
    }
    setCreateLoading(true)
    setCreateError('')
    try {
      const tracking = generateTrackingNumber()
      const estimated = new Date()
      estimated.setDate(estimated.getDate() + (createForm.service_type === 'express' ? 2 : createForm.service_type === 'same_day' ? 1 : 5))
      await supabase.from('shipments').insert({
        tracking_number: tracking,
        sender_name: createForm.sender_name, sender_email: createForm.sender_email,
        sender_phone: createForm.sender_phone, sender_address: createForm.sender_address,
        receiver_name: createForm.receiver_name, receiver_email: createForm.receiver_email,
        receiver_phone: createForm.receiver_phone, receiver_address: createForm.receiver_address,
        origin_city: createForm.origin_city, origin_country: createForm.origin_country,
        destination_city: createForm.destination_city, destination_country: createForm.destination_country,
        package_weight: parseFloat(createForm.package_weight) || 0,
        package_description: createForm.package_description,
        service_type: createForm.service_type, status: 'pending',
        estimated_delivery: estimated.toISOString().split('T')[0],
      })
      await new Promise(r => setTimeout(r, 500))
      const { data: newShipment } = await supabase.from('shipments').select('id').eq('tracking_number', tracking).single()
      if (newShipment) {
        await supabase.from('tracking_history').insert({
          shipment_id: newShipment.id, status: 'pending',
          location: `${createForm.origin_city}, ${createForm.origin_country}`,
          description: 'Order placed and confirmed by admin',
        })
      }
      setCreateSuccess(tracking)
      setCreateForm(emptyForm)
      await fetchShipments()
    } catch {
      setCreateError('Something went wrong. Please try again.')
    } finally {
      setCreateLoading(false)
    }
  }

  const filtered = shipments.filter((s) => {
    const matchSearch = s.tracking_number.toLowerCase().includes(search.toLowerCase()) ||
      s.sender_name.toLowerCase().includes(search.toLowerCase()) ||
      s.receiver_name.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || s.status === filterStatus
    return matchSearch && matchStatus
  })

  const getStatusStyle = (status: string) => STATUS_OPTIONS.find((s) => s.value === status) || STATUS_OPTIONS[0]

  const inputStyle = {
    width: '100%', boxSizing: 'border-box' as const,
    padding: '11px 14px', border: '1.5px solid #e2e8f0',
    borderRadius: '10px', fontSize: '13px', color: '#0f172a',
    outline: 'none', background: 'white',
    fontFamily: 'system-ui,-apple-system,sans-serif',
  }
  const labelStyle = { fontSize: '12px', fontWeight: 600 as const, color: '#374151', marginBottom: '5px', display: 'block' as const }

  // LOGIN
  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#052e16,#14532d)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'system-ui,-apple-system,sans-serif' }}>
        <div style={{ background: 'white', borderRadius: '24px', padding: '48px 36px', width: '100%', maxWidth: '420px', boxShadow: '0 40px 80px rgba(0,0,0,0.3)', textAlign: 'center' }}>
          <div style={{ background: '#dcfce7', width: '64px', height: '64px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Package size={32} color="#16a34a" />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '0 0 6px 0' }}>Admin Dashboard</h1>
          <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 32px 0' }}>SwiftLane Logistics</p>
          <div style={{ textAlign: 'left', marginBottom: '16px' }}>
            <label style={labelStyle}>Admin Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && login()} placeholder="Enter password" style={{ ...inputStyle, padding: '14px 16px', fontSize: '15px' }} />
          </div>
          {pwError && (
            <div style={{ background: '#fee2e2', color: '#dc2626', fontSize: '13px', padding: '10px 14px', borderRadius: '10px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={15} /> {pwError}
            </div>
          )}
          <button onClick={login} style={{ width: '100%', background: 'linear-gradient(135deg,#16a34a,#15803d)', color: 'white', fontWeight: 700, fontSize: '15px', padding: '15px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>
            Login to Dashboard
          </button>
          <Link href="/" style={{ display: 'block', marginTop: '20px', fontSize: '13px', color: '#94a3b8', textDecoration: 'none' }}>Back to website</Link>
        </div>
      </div>
    )
  }

  const navItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
    { id: 'shipments', icon: Package, label: 'Shipments' },
    { id: 'create', icon: Plus, label: 'Create' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'system-ui,-apple-system,sans-serif' }}>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes success-pop { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .nav-btn:hover { background: rgba(22,163,74,0.1) !important; color: #16a34a !important; }
        .nav-btn.active { background: #16a34a !important; color: white !important; }
        .action-btn:hover { background: #16a34a !important; color: white !important; }
        .ship-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important; }

        /* DESKTOP layout */
        .admin-sidebar { display: flex; }
        .admin-bottom-nav { display: none; }
        .admin-main { margin-left: 220px; padding: 32px; }
        .stats-grid { grid-template-columns: repeat(4,1fr); }
        .create-grid { grid-template-columns: 1fr 1fr 1fr; }
        .desktop-table { display: block; }
        .mobile-cards { display: none; }

        /* MOBILE layout */
        @media (max-width: 768px) {
          .admin-sidebar { display: none !important; }
          .admin-bottom-nav { display: flex !important; }
          .admin-main { margin-left: 0 !important; padding: 16px 16px 80px 16px !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
          .create-grid { grid-template-columns: 1fr !important; }
          .desktop-table { display: none !important; }
          .mobile-cards { display: flex !important; }
          .modal-inner { border-radius: 20px 20px 0 0 !important; max-height: 92vh !important; }
          .modal-wrap { align-items: flex-end !important; padding: 0 !important; }
          .page-title { font-size: 20px !important; }
          .filters-row { flex-direction: column !important; }
          .filters-row > * { width: 100% !important; min-width: unset !important; }
        }
      `}</style>

      {/* DESKTOP SIDEBAR */}
      <div className="admin-sidebar" style={{ width: '220px', background: 'white', borderRight: '1px solid #f1f5f9', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50, boxShadow: '2px 0 12px rgba(0,0,0,0.04)' }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#16a34a', padding: '8px', borderRadius: '10px' }}>
              <Package size={18} color="white" />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>Swift<span style={{ color: '#16a34a' }}>Lane</span></div>
              <div style={{ fontSize: '10px', color: '#94a3b8' }}>Admin Panel</div>
            </div>
          </div>
        </div>
        <nav style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setTab(item.id as Tab)} className={`nav-btn ${tab === item.id ? 'active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 14px', borderRadius: '10px', border: 'none', cursor: 'pointer', background: 'none', color: '#64748b', fontWeight: 600, fontSize: '13px', width: '100%', textAlign: 'left', transition: 'all 0.2s' }}>
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '16px 12px', borderTop: '1px solid #f1f5f9' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '10px', textDecoration: 'none', color: '#64748b', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>
            <Globe size={18} /> View Website
          </Link>
          <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '10px', border: 'none', cursor: 'pointer', background: 'none', color: '#dc2626', fontSize: '13px', fontWeight: 600, width: '100%' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <div className="admin-bottom-nav" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, background: 'white', borderTop: '1px solid #f1f5f9', padding: '8px 0', justifyContent: 'space-around', boxShadow: '0 -4px 20px rgba(0,0,0,0.08)' }}>
        {navItems.map((item) => (
          <button key={item.id} onClick={() => setTab(item.id as Tab)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '6px 20px', border: 'none', background: 'none', cursor: 'pointer', color: tab === item.id ? '#16a34a' : '#94a3b8', fontWeight: tab === item.id ? 700 : 500, fontSize: '11px', flex: 1 }}>
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
        <button onClick={logout}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '6px 20px', border: 'none', background: 'none', cursor: 'pointer', color: '#dc2626', fontWeight: 500, fontSize: '11px', flex: 1 }}>
          <LogOut size={20} />
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="admin-main">

        {/* DASHBOARD */}
        {tab === 'dashboard' && (
          <div>
            <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h1 className="page-title" style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '0 0 4px 0' }}>Dashboard</h1>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Overview of your shipments</p>
              </div>
              <Link href="/" style={{ fontSize: '12px', color: '#16a34a', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Globe size={14} /> Website
              </Link>
            </div>

            {/* Stats */}
            <div className="stats-grid" style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
              {[
                { label: 'Total Shipments', value: stats.total, icon: Package, color: '#16a34a', bg: '#dcfce7' },
                { label: 'Pending', value: stats.pending, icon: Clock, color: '#ea580c', bg: '#ffedd5' },
                { label: 'In Transit', value: stats.in_transit, icon: Truck, color: '#2563eb', bg: '#dbeafe' },
                { label: 'Delivered', value: stats.delivered, icon: CheckCircle, color: '#16a34a', bg: '#dcfce7' },
              ].map((stat) => (
                <div key={stat.label} style={{ background: 'white', borderRadius: '16px', padding: '18px', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div style={{ background: stat.bg, padding: '9px', borderRadius: '10px' }}>
                      <stat.icon size={18} color={stat.color} />
                    </div>
                    <span style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a' }}>{stat.value}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: 0, fontWeight: 500 }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent - Desktop Table */}
            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Recent Shipments</h3>
                <button onClick={() => setTab('shipments')} style={{ background: 'none', border: 'none', color: '#16a34a', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>View All</button>
              </div>

              {/* Desktop Table */}
              <div className="desktop-table" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc' }}>
                      {['Tracking #', 'Sender', 'Receiver', 'Route', 'Status', 'Date'].map((h) => (
                        <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {shipments.slice(0, 5).map((s) => {
                      const st = getStatusStyle(s.status)
                      return (
                        <tr key={s.id} style={{ borderTop: '1px solid #f1f5f9', cursor: 'pointer' }} onClick={() => openDetail(s)}>
                          <td style={{ padding: '13px 16px', fontSize: '13px', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>{s.tracking_number}</td>
                          <td style={{ padding: '13px 16px', fontSize: '13px', color: '#374151' }}>{s.sender_name}</td>
                          <td style={{ padding: '13px 16px', fontSize: '13px', color: '#374151' }}>{s.receiver_name}</td>
                          <td style={{ padding: '13px 16px', fontSize: '12px', color: '#64748b', whiteSpace: 'nowrap' }}>{s.origin_city} → {s.destination_city}</td>
                          <td style={{ padding: '13px 16px' }}>
                            <span style={{ background: st.bg, color: st.color, fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '999px', whiteSpace: 'nowrap' }}>
                              {STATUS_OPTIONS.find((o) => o.value === s.status)?.label}
                            </span>
                          </td>
                          <td style={{ padding: '13px 16px', fontSize: '12px', color: '#94a3b8', whiteSpace: 'nowrap' }}>{new Date(s.created_at).toLocaleDateString()}</td>
                        </tr>
                      )
                    })}
                    {shipments.length === 0 && !loading && (
                      <tr><td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No shipments yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="mobile-cards" style={{ flexDirection: 'column', gap: '1px', background: '#f1f5f9' }}>
                {shipments.slice(0, 5).map((s) => {
                  const st = getStatusStyle(s.status)
                  return (
                    <div key={s.id} className="ship-card" onClick={() => openDetail(s)}
                      style={{ background: 'white', padding: '16px', cursor: 'pointer', transition: 'box-shadow 0.2s' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>{s.tracking_number}</span>
                        <span style={{ background: st.bg, color: st.color, fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '999px' }}>
                          {STATUS_OPTIONS.find((o) => o.value === s.status)?.label}
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>
                        <span style={{ fontWeight: 600, color: '#374151' }}>{s.sender_name}</span> → <span style={{ fontWeight: 600, color: '#374151' }}>{s.receiver_name}</span>
                      </div>
                      <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>{s.origin_city} → {s.destination_city}</div>
                    </div>
                  )
                })}
                {shipments.length === 0 && !loading && (
                  <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', background: 'white' }}>No shipments yet.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SHIPMENTS TAB */}
        {tab === 'shipments' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h1 className="page-title" style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '0 0 4px 0' }}>All Shipments</h1>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Manage and update all shipments</p>
            </div>

            <div className="filters-row" style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input type="text" placeholder="Search tracking, sender, receiver..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ ...inputStyle, paddingLeft: '36px' }} />
              </div>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ ...inputStyle, width: 'auto', minWidth: '140px', cursor: 'pointer' }}>
                <option value="all">All Statuses</option>
                {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
              <button onClick={() => setTab('create')} style={{ background: '#16a34a', color: 'white', fontWeight: 700, fontSize: '13px', padding: '11px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                <Plus size={16} /> New Order
              </button>
            </div>

            {/* Desktop Table */}
            <div className="desktop-table" style={{ background: 'white', borderRadius: '16px', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc' }}>
                      {['Tracking #', 'Sender', 'Receiver', 'Route', 'Service', 'Status', 'Delivery', 'Action'].map((h) => (
                        <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={8} style={{ padding: '48px', textAlign: 'center' }}>
                        <div style={{ width: '28px', height: '28px', border: '3px solid #f1f5f9', borderTop: '3px solid #16a34a', borderRadius: '50%', margin: '0 auto', animation: 'spin 0.8s linear infinite' }} />
                      </td></tr>
                    ) : filtered.length === 0 ? (
                      <tr><td colSpan={8} style={{ padding: '48px', textAlign: 'center', color: '#94a3b8' }}>No shipments found.</td></tr>
                    ) : filtered.map((s) => {
                      const st = getStatusStyle(s.status)
                      return (
                        <tr key={s.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '13px 14px', fontSize: '13px', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>{s.tracking_number}</td>
                          <td style={{ padding: '13px 14px', fontSize: '13px', color: '#374151' }}>{s.sender_name}</td>
                          <td style={{ padding: '13px 14px', fontSize: '13px', color: '#374151' }}>{s.receiver_name}</td>
                          <td style={{ padding: '13px 14px', fontSize: '12px', color: '#64748b', whiteSpace: 'nowrap' }}>{s.origin_city} → {s.destination_city}</td>
                          <td style={{ padding: '13px 14px', fontSize: '12px', color: '#64748b', textTransform: 'capitalize' }}>{s.service_type}</td>
                          <td style={{ padding: '13px 14px' }}>
                            <span style={{ background: st.bg, color: st.color, fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '999px', whiteSpace: 'nowrap' }}>
                              {STATUS_OPTIONS.find((o) => o.value === s.status)?.label}
                            </span>
                          </td>
                          <td style={{ padding: '13px 14px', fontSize: '12px', color: '#94a3b8', whiteSpace: 'nowrap' }}>{s.estimated_delivery ? new Date(s.estimated_delivery).toLocaleDateString() : 'N/A'}</td>
                          <td style={{ padding: '13px 14px' }}>
                            <div style={{ display: 'flex', gap: '5px' }}>
                              <button onClick={() => openDetail(s)} className="action-btn"
                                style={{ background: '#f1f5f9', color: '#374151', border: 'none', padding: '6px 10px', borderRadius: '7px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
                                <Edit size={12} /> Update
                              </button>
                              <button onClick={() => downloadReceipt(s)}
                                style={{ background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', padding: '6px 8px', borderRadius: '7px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px', whiteSpace: 'nowrap' }}>
                                <Download size={12} /> Receipt
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="mobile-cards" style={{ flexDirection: 'column', gap: '10px' }}>
              {loading && (
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <div style={{ width: '28px', height: '28px', border: '3px solid #f1f5f9', borderTop: '3px solid #16a34a', borderRadius: '50%', margin: '0 auto', animation: 'spin 0.8s linear infinite' }} />
                </div>
              )}
              {!loading && filtered.length === 0 && (
                <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', background: 'white', borderRadius: '16px', border: '1px solid #f1f5f9' }}>No shipments found.</div>
              )}
              {!loading && filtered.map((s) => {
                const st = getStatusStyle(s.status)
                return (
                  <div key={s.id} className="ship-card" style={{ background: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'box-shadow 0.2s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>{s.tracking_number}</span>
                      <span style={{ background: st.bg, color: st.color, fontSize: '10px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px' }}>
                        {STATUS_OPTIONS.find((o) => o.value === s.status)?.label}
                      </span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#374151', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 600 }}>{s.sender_name}</span>
                      <span style={{ color: '#94a3b8', margin: '0 6px' }}>→</span>
                      <span style={{ fontWeight: 600 }}>{s.receiver_name}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>
                      {s.origin_city}, {s.origin_country} → {s.destination_city}, {s.destination_country}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => openDetail(s)}
                        style={{ flex: 1, background: '#16a34a', color: 'white', border: 'none', padding: '9px', borderRadius: '9px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                        <Edit size={14} /> Update
                      </button>
                      <button onClick={() => downloadReceipt(s)}
                        style={{ flex: 1, background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', padding: '9px', borderRadius: '9px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                        <Download size={14} /> Receipt
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* CREATE ORDER */}
        {tab === 'create' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h1 className="page-title" style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '0 0 4px 0' }}>Create New Order</h1>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Manually create a shipment order</p>
            </div>

            {createSuccess ? (
              <div style={{ background: 'white', borderRadius: '20px', padding: '40px 24px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
                <div style={{ width: '68px', height: '68px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', animation: 'success-pop 0.4s ease' }}>
                  <CheckCircle size={34} color="#16a34a" />
                </div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0' }}>Order Created!</h2>
                <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 20px 0' }}>Tracking number generated successfully</p>
                <div style={{ background: 'linear-gradient(135deg,#052e16,#14532d)', borderRadius: '14px', padding: '20px', marginBottom: '20px' }}>
                  <p style={{ fontSize: '11px', color: 'rgba(187,247,208,0.7)', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 6px 0' }}>Tracking Number</p>
                  <p style={{ fontSize: '24px', fontWeight: 900, color: 'white', margin: 0, letterSpacing: '0.06em' }}>{createSuccess}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button onClick={() => { setCreateSuccess(''); setTab('shipments') }} style={{ flex: 1, background: '#16a34a', color: 'white', fontWeight: 700, padding: '12px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '14px', minWidth: '140px' }}>
                    View Shipments
                  </button>
                  <button onClick={() => setCreateSuccess('')} style={{ flex: 1, background: '#f8fafc', color: '#374151', fontWeight: 600, padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', cursor: 'pointer', fontSize: '14px', minWidth: '140px' }}>
                    Create Another
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ background: 'white', borderRadius: '20px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                  {/* Sender */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                      <div style={{ background: '#dcfce7', padding: '8px', borderRadius: '10px' }}>
                        <User size={15} color="#16a34a" />
                      </div>
                      <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Sender Information</h3>
                    </div>
                    <div className="create-grid" style={{ display: 'grid', gap: '12px' }}>
                      {[
                        { label: 'Full Name *', field: 'sender_name', placeholder: 'John Smith' },
                        { label: 'Email', field: 'sender_email', placeholder: 'john@email.com' },
                        { label: 'Phone', field: 'sender_phone', placeholder: '+1 800 000 0000' },
                        { label: 'Address', field: 'sender_address', placeholder: '123 Main St' },
                        { label: 'Origin City *', field: 'origin_city', placeholder: 'New York' },
                        { label: 'Origin Country *', field: 'origin_country', placeholder: 'United States' },
                      ].map((item) => (
                        <div key={item.field}>
                          <label style={labelStyle}>{item.label}</label>
                          <input style={inputStyle} placeholder={item.placeholder} value={(createForm as any)[item.field]} onChange={(e) => setCreateForm((p) => ({ ...p, [item.field]: e.target.value }))} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Receiver */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                      <div style={{ background: '#dbeafe', padding: '8px', borderRadius: '10px' }}>
                        <MapPin size={15} color="#2563eb" />
                      </div>
                      <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Receiver Information</h3>
                    </div>
                    <div className="create-grid" style={{ display: 'grid', gap: '12px' }}>
                      {[
                        { label: 'Full Name *', field: 'receiver_name', placeholder: 'Jane Doe' },
                        { label: 'Email', field: 'receiver_email', placeholder: 'jane@email.com' },
                        { label: 'Phone', field: 'receiver_phone', placeholder: '+1 800 000 0001' },
                        { label: 'Address', field: 'receiver_address', placeholder: '456 Delivery Rd' },
                        { label: 'Destination City *', field: 'destination_city', placeholder: 'Los Angeles' },
                        { label: 'Destination Country *', field: 'destination_country', placeholder: 'United States' },
                      ].map((item) => (
                        <div key={item.field}>
                          <label style={labelStyle}>{item.label}</label>
                          <input style={inputStyle} placeholder={item.placeholder} value={(createForm as any)[item.field]} onChange={(e) => setCreateForm((p) => ({ ...p, [item.field]: e.target.value }))} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Package */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                      <div style={{ background: '#ffedd5', padding: '8px', borderRadius: '10px' }}>
                        <Package size={15} color="#ea580c" />
                      </div>
                      <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Package Details</h3>
                    </div>
                    <div className="create-grid" style={{ display: 'grid', gap: '12px' }}>
                      <div>
                        <label style={labelStyle}>Weight (kg)</label>
                        <input style={inputStyle} type="number" placeholder="2.5" value={createForm.package_weight} onChange={(e) => setCreateForm((p) => ({ ...p, package_weight: e.target.value }))} />
                      </div>
                      <div>
                        <label style={labelStyle}>Contents *</label>
                        <input style={inputStyle} placeholder="Electronics, Clothing..." value={createForm.package_description} onChange={(e) => setCreateForm((p) => ({ ...p, package_description: e.target.value }))} />
                      </div>
                      <div>
                        <label style={labelStyle}>Service Type</label>
                        <select style={{ ...inputStyle, cursor: 'pointer' }} value={createForm.service_type} onChange={(e) => setCreateForm((p) => ({ ...p, service_type: e.target.value }))}>
                          <option value="standard">Standard (3-5 days)</option>
                          <option value="express">Express (1-2 days)</option>
                          <option value="same_day">Same Day</option>
                          <option value="international">International (7-14 days)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {createError && (
                  <div style={{ background: '#fee2e2', color: '#dc2626', fontSize: '13px', padding: '12px 16px', borderRadius: '10px', marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertCircle size={15} /> {createError}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
                  <button onClick={() => setTab('shipments')} style={{ flex: 1, background: '#f8fafc', color: '#374151', fontWeight: 600, fontSize: '14px', padding: '13px', borderRadius: '12px', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
                    Cancel
                  </button>
                  <button onClick={createOrder} disabled={createLoading}
                    style={{ flex: 2, background: createLoading ? '#94a3b8' : 'linear-gradient(135deg,#16a34a,#15803d)', color: 'white', fontWeight: 700, fontSize: '14px', padding: '13px', borderRadius: '12px', border: 'none', cursor: createLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    {createLoading ? (
                      <><div style={{ width: '16px', height: '16px', border: '3px solid rgba(255,255,255,0.3)', borderTop: '3px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Creating...</>
                    ) : (
                      <><Plus size={16} /> Create Order</>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* DETAIL MODAL */}
      {showDetail && selectedShipment && (
        <div className="modal-wrap" onClick={(e) => { if (e.target === e.currentTarget) setShowDetail(false) }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="modal-inner" style={{ background: 'white', borderRadius: '20px', width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>

            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: 'white', zIndex: 1 }}>
              <div>
                <p style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 3px 0' }}>Update Shipment</p>
                <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: 0 }}>{selectedShipment.tracking_number}</h2>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button onClick={() => downloadReceipt(selectedShipment)}
                  style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a', borderRadius: '10px', padding: '7px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: 600 }}>
                  <Download size={14} /> Receipt
                </button>
                <button onClick={() => setShowDetail(false)} style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '34px', height: '34px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={16} color="#64748b" />
                </button>
              </div>
            </div>

            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Info */}
              <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '16px', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {[
                    { label: 'From', value: `${selectedShipment.sender_name}\n${selectedShipment.origin_city}, ${selectedShipment.origin_country}` },
                    { label: 'To', value: `${selectedShipment.receiver_name}\n${selectedShipment.destination_city}, ${selectedShipment.destination_country}` },
                    { label: 'Service', value: selectedShipment.service_type },
                    { label: 'Weight', value: selectedShipment.package_weight ? selectedShipment.package_weight + ' kg' : 'N/A' },
                  ].map((item) => (
                    <div key={item.label}>
                      <p style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', margin: '0 0 2px 0' }}>{item.label}</p>
                      {item.value.split('\n').map((line, i) => (
                        <p key={i} style={{ fontSize: '12px', fontWeight: i === 0 ? 700 : 500, color: i === 0 ? '#0f172a' : '#64748b', margin: '0 0 1px 0' }}>{line}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <label style={{ ...labelStyle, fontSize: '13px', marginBottom: '8px' }}>Update Status</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {STATUS_OPTIONS.map((option) => (
                    <button key={option.value}
                      onClick={() => { setNewStatus(option.value); setCustomNote(STATUS_DESCRIPTIONS[option.value]) }}
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 14px', borderRadius: '10px', border: newStatus === option.value ? `2px solid ${option.color}` : '2px solid #f1f5f9', background: newStatus === option.value ? option.bg : 'white', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
                      <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: option.color, flexShrink: 0 }} />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: option.color, flex: 1 }}>{option.label}</span>
                      {selectedShipment.status === option.value && (
                        <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 500 }}>Current</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <label style={labelStyle}>Current Location</label>
                <input style={inputStyle} placeholder="e.g. New York, United States" value={customLocation} onChange={(e) => setCustomLocation(e.target.value)} />
              </div>

              {/* Note */}
              <div>
                <label style={labelStyle}>Tracking Note</label>
                <input style={inputStyle} placeholder="e.g. Package arrived at sorting facility" value={customNote} onChange={(e) => setCustomNote(e.target.value)} />
              </div>

              {updateSuccess && (
                <div style={{ background: '#dcfce7', color: '#16a34a', fontSize: '13px', padding: '12px 16px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                  <CheckCircle size={16} /> Status and tracking history updated!
                </div>
              )}

              <button onClick={updateStatus} disabled={updateLoading}
                style={{ background: updateLoading ? '#94a3b8' : 'linear-gradient(135deg,#16a34a,#15803d)', color: 'white', fontWeight: 700, fontSize: '14px', padding: '14px', borderRadius: '12px', border: 'none', cursor: updateLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                {updateLoading ? (
                  <><div style={{ width: '16px', height: '16px', border: '3px solid rgba(255,255,255,0.3)', borderTop: '3px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Updating...</>
                ) : (
                  <><Edit size={16} /> Update Status + Tracking History</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}