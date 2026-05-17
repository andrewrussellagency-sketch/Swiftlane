'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Shield, ArrowRight } from 'lucide-react'

export default function PrivacyPage() {
  const sections = [
    {
      title: '1. Information We Collect',
      content: `We collect information you provide directly to us when you use our services, including:
      
• Personal identification information (name, email address, phone number)
• Shipping and delivery addresses (sender and recipient details)
• Package information (weight, description, contents)
• Payment information (processed securely through our payment partners)
• Account credentials if you create an account
• Communication records when you contact our support team

We also automatically collect certain information when you use our website, including IP address, browser type, operating system, referring URLs, and pages visited.`,
    },
    {
      title: '2. How We Use Your Information',
      content: `We use the information we collect to:

• Process and fulfill your shipment orders
• Generate and send tracking numbers
• Provide real-time shipment updates and notifications
• Process payments and prevent fraud
• Communicate with you about your orders and our services
• Respond to your questions and provide customer support
• Improve our services and develop new features
• Comply with legal obligations and enforce our terms`,
    },
    {
      title: '3. Information Sharing',
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with:

• Delivery partners and courier services necessary to complete your shipment
• Payment processors to handle transactions securely
• Technology service providers who help us operate our platform
• Legal authorities when required by law or to protect our rights

All third parties we work with are bound by strict data protection agreements.`,
    },
    {
      title: '4. Data Security',
      content: `We take the security of your personal information seriously. We implement industry-standard security measures including:

• SSL/TLS encryption for all data transmission
• Secure database storage with access controls
• Regular security audits and vulnerability assessments
• Limited employee access to personal information on a need-to-know basis

While we strive to protect your information, no method of transmission over the internet is 100% secure.`,
    },
    {
      title: '5. Cookies and Tracking',
      content: `We use cookies and similar tracking technologies to enhance your experience on our website. These help us:

• Remember your preferences and settings
• Understand how you use our website
• Improve our services and content
• Provide relevant information

You can control cookie settings through your browser settings. Disabling cookies may affect some functionality of our website.`,
    },
    {
      title: '6. Your Rights',
      content: `You have the following rights regarding your personal information:

• Access: Request a copy of the personal information we hold about you
• Correction: Request correction of inaccurate or incomplete information
• Deletion: Request deletion of your personal information where applicable
• Portability: Request transfer of your data to another service
• Objection: Object to certain types of processing of your information

To exercise any of these rights, please contact us at privacy@swiftlanelogs.com`,
    },
    {
      title: '7. Data Retention',
      content: `We retain your personal information for as long as necessary to:

• Fulfill the purposes described in this Privacy Policy
• Comply with legal obligations (including tax and accounting requirements)
• Resolve disputes and enforce our agreements

Shipment records are typically retained for 7 years for legal and accounting purposes. You may request deletion of your account data at any time.`,
    },
    {
      title: '8. Changes to This Policy',
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of significant changes by:

• Posting the updated policy on our website
• Sending an email notification to registered users
• Displaying a prominent notice on our website

Your continued use of our services after changes constitutes acceptance of the updated policy.`,
    },
    {
      title: '9. Contact Us',
      content: `If you have questions or concerns about this Privacy Policy or our data practices, please contact us:

Email: privacy@swiftlanelogs.com
Phone: +234 800 000 0000
Address: 123 Logistics Avenue, Lagos Island, Lagos, Nigeria

We will respond to your inquiry within 5 business days.`,
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
            <Shield size={28} color="#4ade80" />
          </div>
          <h1 style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 900, color: 'white', margin: '0 0 16px 0', lineHeight: 1.1 }}>Privacy Policy</h1>
          <p style={{ fontSize: '15px', color: 'rgba(187,247,208,0.8)', margin: '0 0 12px 0', lineHeight: 1.7 }}>
            Your privacy is important to us. This policy explains how SwiftLane Logistics collects, uses, and protects your personal information.
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
          <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 10px 0' }}>Have Questions About Your Privacy?</h3>
          <p style={{ fontSize: '14px', color: 'rgba(187,247,208,0.8)', margin: '0 0 20px 0' }}>Our team is happy to help with any privacy-related questions.</p>
          <Link href="/contact" style={{ background: '#16a34a', color: 'white', fontWeight: 700, padding: '12px 28px', borderRadius: '10px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            Contact Us <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}