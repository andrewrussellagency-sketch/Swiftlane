'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { FileText, ArrowRight } from 'lucide-react'

export default function TermsPage() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing or using the SwiftLane Logistics website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.

These terms apply to all users of our platform, including customers who book shipments, visitors who browse our website, and any other persons who access our services.`,
    },
    {
      title: '2. Our Services',
      content: `SwiftLane Logistics provides courier and logistics services including:

• Domestic shipment pickup and delivery
• International freight and shipping
• Real-time shipment tracking
• Express, standard, and same-day delivery options
• Package insurance and secure handling

We reserve the right to modify, suspend, or discontinue any part of our services at any time with reasonable notice.`,
    },
    {
      title: '3. Booking and Orders',
      content: `When you book a shipment with SwiftLane:

• You confirm that all information provided is accurate and complete
• You accept responsibility for proper packaging of your items
• You agree to pay all applicable fees and charges
• A tracking number will be issued upon successful booking confirmation
• Bookings are subject to availability in your area

We reserve the right to refuse any shipment that violates our prohibited items policy or applicable laws.`,
    },
    {
      title: '4. Prohibited Items',
      content: `The following items are strictly prohibited from shipping through SwiftLane Logistics:

• Illegal substances, narcotics, or controlled substances
• Weapons, firearms, or explosive materials
• Hazardous or flammable materials
• Counterfeit or stolen goods
• Live animals (without prior written approval)
• Currency, negotiable instruments, or precious metals above declared limits
• Perishable goods (without prior arrangement)

Violation of this policy may result in immediate cancellation, legal action, and forfeiture of any paid fees.`,
    },
    {
      title: '5. Liability and Insurance',
      content: `SwiftLane Logistics provides basic insurance coverage for all shipments. Our liability is limited as follows:

• Standard coverage up to the declared value of the package
• Claims must be filed within 48 hours of delivery or expected delivery date
• We are not liable for delays caused by customs, weather, or force majeure events
• Fragile items must be declared and properly packaged to qualify for full coverage
• We are not responsible for consequential or indirect damages

For high-value items, we recommend declaring the full value and purchasing additional insurance coverage.`,
    },
    {
      title: '6. Delivery and Timeframes',
      content: `Delivery timeframes are estimates and are not guaranteed unless expressly stated:

• Same Day: Orders placed before 10 AM in select cities
• Express: 1-2 business days for domestic shipments
• Standard: 3-5 business days for domestic shipments
• International: 7-14 business days depending on destination

Delays may occur due to customs clearance, weather conditions, holidays, or circumstances beyond our control. We will notify you of any significant delays.`,
    },
    {
      title: '7. Payment Terms',
      content: `All payments for services must be made at the time of booking unless otherwise agreed:

• We accept major credit and debit cards, bank transfers, and approved payment methods
• All prices are displayed in the applicable currency and include applicable taxes
• Refunds for cancelled bookings are subject to our cancellation policy
• Disputed charges must be reported within 30 days of the transaction date

We reserve the right to modify pricing at any time. Changes will be communicated in advance.`,
    },
    {
      title: '8. Cancellation and Refunds',
      content: `Our cancellation policy is as follows:

• Cancellations made before pickup: Full refund within 5-7 business days
• Cancellations after pickup but before delivery: 50% refund
• Cancellations after delivery attempt: No refund
• Failed deliveries due to incorrect address: Re-delivery fee applies

To cancel a booking, contact our support team with your tracking number as soon as possible.`,
    },
    {
      title: '9. Intellectual Property',
      content: `All content on the SwiftLane Logistics website, including text, graphics, logos, images, and software, is the property of SwiftLane Logistics and is protected by applicable intellectual property laws.

You may not reproduce, distribute, modify, or create derivative works from our content without our express written permission.`,
    },
    {
      title: '10. Governing Law',
      content: `These Terms of Service are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Lagos State, Nigeria.

If any provision of these terms is found to be unenforceable, the remaining provisions will continue in full force and effect.`,
    },
    {
      title: '11. Changes to Terms',
      content: `We reserve the right to update these Terms of Service at any time. We will notify users of significant changes via email or a prominent notice on our website.

Your continued use of our services after changes are posted constitutes your acceptance of the updated terms. We encourage you to review these terms periodically.`,
    },
    {
      title: '12. Contact Information',
      content: `For questions about these Terms of Service, please contact us:

Email: legal@swiftlanelogs.com
Phone: +234 800 000 0000
Address: 123 Logistics Avenue, Lagos Island, Lagos, Nigeria
Business Hours: Monday to Sunday, 24 hours`,
    },
  ]

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui,-apple-system,sans-serif' }}>
      <Navbar />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg,#052e16 0%,#14532d 100%)', paddingTop: '120px', paddingBottom: '60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '300px', height: '300px', background: 'radial-gradient(circle,rgba(22,163,74,0.2) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '700px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(74,222,128,0.3)', width: '64px', height: '64px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <FileText size={28} color="#4ade80" />
          </div>
          <h1 style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 900, color: 'white', margin: '0 0 16px 0', lineHeight: 1.1 }}>Terms of Service</h1>
          <p style={{ fontSize: '15px', color: 'rgba(187,247,208,0.8)', margin: '0 0 12px 0', lineHeight: 1.7 }}>
            Please read these terms carefully before using SwiftLane Logistics services.
          </p>
          <p style={{ fontSize: '13px', color: 'rgba(187,247,208,0.5)' }}>Last updated: May 2026</p>
        </div>
      </section>

      {/* CONTENT */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px 80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {sections.map((section, i) => (
            <div key={i} style={{ background: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0', paddingBottom: '12px', borderBottom: '2px solid #f1f5f9' }}>{section.title}</h2>
              <div style={{ fontSize: '14px', color: '#475569', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{section.content}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg,#052e16,#14532d)', borderRadius: '20px', padding: '32px', marginTop: '32px', textAlign: 'center', color: 'white' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 10px 0' }}>Questions About Our Terms?</h3>
          <p style={{ fontSize: '14px', color: 'rgba(187,247,208,0.8)', margin: '0 0 20px 0' }}>Our support team is happy to clarify anything in these terms.</p>
          <Link href="/contact" style={{ background: '#16a34a', color: 'white', fontWeight: 700, padding: '12px 28px', borderRadius: '10px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            Contact Us <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}