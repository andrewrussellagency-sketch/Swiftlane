'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  Package, Truck, Globe, Shield, Users,
  Award, Heart, Target, ArrowRight, CheckCircle,
  Clock, Star,
} from 'lucide-react'

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui,-apple-system,sans-serif' }}>
      <Navbar />

      <style>{`
        @keyframes floatOrb1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,-25px); } }
        @keyframes floatOrb2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px,-15px); } }
        .values-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        .stats-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
        .team-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        .story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .milestone-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; }
        @media (max-width: 900px) {
          .values-grid { grid-template-columns: 1fr 1fr !important; }
          .team-grid { grid-template-columns: 1fr 1fr !important; }
          .story-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 600px) {
          .values-grid { grid-template-columns: 1fr !important; }
          .team-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .milestone-grid { grid-template-columns: 1fr !important; }
          .hero-pad { padding: 100px 20px 40px !important; }
          .section-pad { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>

      {/* HERO */}
      <section style={{
        background: 'linear-gradient(135deg,#052e16 0%,#14532d 100%)',
        paddingTop: '120px', paddingBottom: '80px',
        position: 'relative', overflow: 'hidden',
      }} className="hero-pad">
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '400px', height: '400px', background: 'radial-gradient(circle,rgba(22,163,74,0.25) 0%,transparent 70%)', borderRadius: '50%', animation: 'floatOrb1 9s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '350px', height: '350px', background: 'radial-gradient(circle,rgba(220,38,38,0.12) 0%,transparent 70%)', borderRadius: '50%', animation: 'floatOrb2 11s ease-in-out infinite', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '700px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(74,222,128,0.3)', color: '#86efac', fontSize: '13px', fontWeight: 500, padding: '7px 18px', borderRadius: '999px', marginBottom: '20px' }}>
            <span style={{ width: '7px', height: '7px', background: '#4ade80', borderRadius: '50%', display: 'inline-block' }} />
            Our Story
          </div>
          <h1 style={{ fontSize: 'clamp(36px,6vw,60px)', fontWeight: 900, color: 'white', margin: '0 0 20px 0', lineHeight: 1.1 }}>
            About SwiftLane Logistics
          </h1>
          <p style={{ fontSize: '17px', color: 'rgba(187,247,208,0.85)', margin: '0 0 36px 0', lineHeight: 1.8 }}>
            We are a modern logistics company built on the belief that shipping should be simple, fast, and transparent. From our humble beginnings in Lagos to serving customers across the world, our mission has always been the same — deliver with care.
          </p>
          <Link href="/book" style={{ background: '#16a34a', color: 'white', fontWeight: 700, fontSize: '15px', padding: '14px 32px', borderRadius: '12px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 20px rgba(22,163,74,0.4)' }}>
            Ship With Us <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: 'white', padding: '60px 0', borderBottom: '1px solid #f1f5f9' }}>
        <div className="section-pad" style={{ maxWidth: '1100px', margin: '0 auto', paddingLeft: '40px', paddingRight: '40px' }}>
          <div className="stats-grid">
            {[
              { number: '2018', label: 'Year Founded', icon: Award, color: '#16a34a', bg: '#dcfce7' },
              { number: '50K+', label: 'Happy Customers', icon: Users, color: '#2563eb', bg: '#dbeafe' },
              { number: '120+', label: 'Countries Served', icon: Globe, color: '#7c3aed', bg: '#ede9fe' },
              { number: '99.8%', label: 'On-Time Delivery', icon: Clock, color: '#dc2626', bg: '#fee2e2' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#f8fafc', borderRadius: '20px', padding: '28px 20px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                <div style={{ background: stat.bg, width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <stat.icon size={24} color={stat.color} />
                </div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', marginBottom: '6px' }}>{stat.number}</div>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section style={{ padding: '80px 0', background: '#f8fafc' }}>
        <div className="section-pad story-grid" style={{ maxWidth: '1100px', margin: '0 auto', paddingLeft: '40px', paddingRight: '40px' }}>
          <div>
            <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Our Story</span>
            <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#0f172a', margin: '12px 0 20px 0', lineHeight: 1.2 }}>
              Built to Make Shipping Simple
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.85, marginBottom: '20px' }}>
              SwiftLane Logistics was founded in 2018 by a team of logistics professionals who saw a gap in the market — customers deserved better visibility into where their packages were and when they would arrive.
            </p>
            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.85, marginBottom: '20px' }}>
              Starting with just a small fleet of vehicles and a big dream, we built our platform from the ground up with technology at its core. Today, we operate across Africa and serve customers in over 120 countries worldwide.
            </p>
            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.85, marginBottom: '32px' }}>
              Every package we handle is treated with the same care we would give our own. That philosophy has earned us the trust of over 50,000 customers and counting.
            </p>
            <div className="milestone-grid">
              {[
                { year: '2018', event: 'Founded in Lagos, Nigeria' },
                { year: '2019', event: 'Expanded to 5 major cities' },
                { year: '2021', event: 'Launched international shipping' },
                { year: '2023', event: 'Reached 50,000+ customers' },
              ].map((m) => (
                <div key={m.year} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: 'white', borderRadius: '12px', padding: '14px', border: '1px solid #f1f5f9' }}>
                  <div style={{ background: '#dcfce7', color: '#16a34a', fontSize: '12px', fontWeight: 800, padding: '4px 10px', borderRadius: '8px', flexShrink: 0 }}>{m.year}</div>
                  <span style={{ fontSize: '13px', color: '#374151', fontWeight: 500, lineHeight: 1.5 }}>{m.event}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'linear-gradient(145deg,#052e16,#14532d)', borderRadius: '24px', padding: '36px', color: 'white' }}>
            <div style={{ background: 'rgba(22,163,74,0.2)', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Target size={28} color="#4ade80" />
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 16px 0' }}>Our Mission</h3>
            <p style={{ fontSize: '14px', color: 'rgba(187,247,208,0.85)', lineHeight: 1.8, marginBottom: '28px' }}>
              To make logistics accessible, transparent, and reliable for every business and individual — no matter how big or small the shipment.
            </p>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '28px' }} />
            <h3 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 16px 0' }}>Our Vision</h3>
            <p style={{ fontSize: '14px', color: 'rgba(187,247,208,0.85)', lineHeight: 1.8, marginBottom: '28px' }}>
              To become Africa's most trusted logistics company, connecting businesses and communities across the continent and beyond.
            </p>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '28px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Customer satisfaction above all',
                'Transparency in every shipment',
                'Technology-driven operations',
                'Sustainable and eco-friendly',
              ].map((v) => (
                <div key={v} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={16} color="#4ade80" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: 'rgba(187,247,208,0.9)', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="section-pad" style={{ maxWidth: '1100px', margin: '0 auto', paddingLeft: '40px', paddingRight: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.14em' }}>What We Stand For</span>
            <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#0f172a', margin: '12px 0 14px 0' }}>Our Core Values</h2>
            <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '480px', margin: '0 auto' }}>The principles that guide everything we do at SwiftLane Logistics.</p>
          </div>
          <div className="values-grid">
            {[
              { icon: Heart, title: 'Customer First', desc: 'Every decision we make starts with asking how it benefits our customers. Their success is our success.', color: '#dc2626', bg: '#fee2e2' },
              { icon: Shield, title: 'Trust and Safety', desc: 'We handle every package as if it were our own. Full insurance and secure handling guaranteed.', color: '#16a34a', bg: '#dcfce7' },
              { icon: Truck, title: 'Speed and Reliability', desc: 'We understand that time matters. Our network is built for fast, dependable deliveries every time.', color: '#2563eb', bg: '#dbeafe' },
              { icon: Globe, title: 'Global Reach', desc: 'From your doorstep to anywhere in the world. We make international shipping simple and affordable.', color: '#7c3aed', bg: '#ede9fe' },
              { icon: Award, title: 'Excellence', desc: 'We never settle for good enough. We constantly improve our processes to deliver the best experience.', color: '#ca8a04', bg: '#fef9c3' },
              { icon: Users, title: 'Community', desc: 'We invest in the communities we serve, creating jobs and supporting local businesses across Africa.', color: '#059669', bg: '#d1fae5' },
            ].map((v) => (
              <div key={v.title} style={{ background: '#f8fafc', borderRadius: '20px', padding: '28px', border: '1px solid #f1f5f9' }}>
                <div style={{ background: v.bg, width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <v.icon size={22} color={v.color} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px 0' }}>{v.title}</h3>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.75, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section style={{ padding: '80px 0', background: '#f8fafc' }}>
        <div className="section-pad" style={{ maxWidth: '1100px', margin: '0 auto', paddingLeft: '40px', paddingRight: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.14em' }}>The People</span>
            <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#0f172a', margin: '12px 0 14px 0' }}>Meet Our Team</h2>
            <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '480px', margin: '0 auto' }}>The passionate people behind SwiftLane Logistics.</p>
          </div>
          <div className="team-grid">
            {[
              { name: 'Emeka Okafor', role: 'Chief Executive Officer', initial: 'E', color: '#16a34a', bg: '#dcfce7', desc: 'Logistics veteran with 15 years of experience building supply chains across Africa.' },
              { name: 'Aisha Mohammed', role: 'Chief Operations Officer', initial: 'A', color: '#2563eb', bg: '#dbeafe', desc: 'Operations expert passionate about using technology to solve logistics challenges.' },
              { name: 'Kwame Asante', role: 'Head of Technology', initial: 'K', color: '#7c3aed', bg: '#ede9fe', desc: 'Software engineer who built our real-time tracking platform from scratch.' },
              { name: 'Ngozi Adeyemi', role: 'Head of Customer Success', initial: 'N', color: '#dc2626', bg: '#fee2e2', desc: 'Dedicated to ensuring every customer has an exceptional experience with SwiftLane.' },
              { name: 'David Mensah', role: 'Head of International', initial: 'D', color: '#ca8a04', bg: '#fef9c3', desc: 'Customs and international trade specialist with expertise in 50+ countries.' },
              { name: 'Fatima Diallo', role: 'Head of Finance', initial: 'F', color: '#059669', bg: '#d1fae5', desc: 'Financial strategist ensuring SwiftLane delivers value to customers and stakeholders.' },
            ].map((member) => (
              <div key={member.name} style={{ background: 'white', borderRadius: '20px', padding: '28px', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', textAlign: 'center' }}>
                <div style={{ width: '72px', height: '72px', background: member.bg, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '28px', fontWeight: 900, color: member.color }}>
                  {member.initial}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>{member.name}</h3>
                <p style={{ fontSize: '12px', color: '#16a34a', fontWeight: 600, margin: '0 0 12px 0' }}>{member.role}</p>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.7, margin: 0 }}>{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="section-pad" style={{ maxWidth: '1100px', margin: '0 auto', paddingLeft: '40px', paddingRight: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Testimonials</span>
            <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#0f172a', margin: '12px 0 14px 0' }}>What People Say</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '20px' }}>
            {[
              { name: 'Chidi Okafor', role: 'Business Owner, Lagos', msg: 'SwiftLane completely transformed how I manage deliveries. Professional, fast, and always on time.', av: 'C' },
              { name: 'Amina Hassan', role: 'Online Retailer, Abuja', msg: 'The tracking system is incredible. My customers love knowing exactly where their orders are.', av: 'A' },
              { name: 'David Mensah', role: 'Import Manager, Accra', msg: 'Best international freight service I have used. Customs clearance is handled seamlessly.', av: 'D' },
            ].map((t) => (
              <div key={t.name} style={{ background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '20px', padding: '28px' }}>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
                  {[1,2,3,4,5].map((s) => <Star key={s} size={14} color="#16a34a" fill="#16a34a" />)}
                </div>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.8, margin: '0 0 20px 0' }}>{t.msg}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                  <div style={{ width: '40px', height: '40px', background: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '15px' }}>{t.av}</div>
                  <div>
                    <p style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px', margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg,#14532d 0%,#052e16 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', background: 'radial-gradient(circle,rgba(220,38,38,0.15) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div className="section-pad" style={{ maxWidth: '700px', margin: '0 auto', paddingLeft: '40px', paddingRight: '40px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, color: 'white', margin: '0 0 16px 0' }}>
            Ready to Ship With Us?
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(187,247,208,0.8)', margin: '0 0 36px 0', lineHeight: 1.7 }}>
            Join over 50,000 satisfied customers who trust SwiftLane for their logistics needs.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/book" style={{ background: 'white', color: '#14532d', fontWeight: 800, fontSize: '15px', padding: '14px 36px', borderRadius: '12px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Book a Shipment <ArrowRight size={18} />
            </Link>
            <Link href="/contact" style={{ border: '2px solid rgba(255,255,255,0.25)', color: 'white', fontWeight: 600, fontSize: '15px', padding: '14px 36px', borderRadius: '12px', textDecoration: 'none' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}