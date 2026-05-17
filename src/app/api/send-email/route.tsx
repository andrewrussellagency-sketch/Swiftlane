import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      tracking_number,
      sender_name,
      sender_email,
      receiver_name,
      receiver_email,
      origin_city,
      origin_country,
      destination_city,
      destination_country,
      service_type,
      package_description,
      package_weight,
      estimated_delivery,
    } = body

    const serviceLabels: Record<string, string> = {
      standard: 'Standard Shipping (3-5 days)',
      express: 'Express Delivery (1-2 days)',
      same_day: 'Same Day Delivery',
      international: 'International Freight (7-14 days)',
    }

    const estDate = estimated_delivery
      ? new Date(estimated_delivery).toLocaleDateString('en-US', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        })
      : 'To be confirmed'

    const emailHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Shipment Confirmation - ${tracking_number}</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">

    <!-- HEADER -->
    <div style="background:linear-gradient(135deg,#052e16,#14532d);border-radius:20px;padding:36px;text-align:center;margin-bottom:24px;">
      <div style="font-size:28px;font-weight:900;color:white;margin-bottom:4px;">
        Swift<span style="color:#4ade80;">Lane</span>
      </div>
      <div style="font-size:12px;color:rgba(187,247,208,0.7);margin-bottom:24px;">Logistics</div>
      <div style="background:rgba(22,163,74,0.2);border:1px solid rgba(74,222,128,0.3);border-radius:999px;display:inline-block;padding:8px 20px;color:#4ade80;font-size:13px;font-weight:600;margin-bottom:20px;">
        ✅ Shipment Booked Successfully
      </div>
      <div style="font-size:13px;color:rgba(187,247,208,0.7);margin-bottom:8px;">Your Tracking Number</div>
      <div style="font-size:32px;font-weight:900;color:white;letter-spacing:0.06em;">${tracking_number}</div>
    </div>

    <!-- TRACKING LINK -->
    <div style="background:white;border-radius:16px;padding:24px;margin-bottom:16px;text-align:center;border:1px solid #f1f5f9;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
      <p style="font-size:14px;color:#64748b;margin:0 0 16px 0;">Track your shipment in real-time at any time</p>
      <a href="https://swiftlanelogs.com/track?number=${tracking_number}" style="background:#16a34a;color:white;font-weight:700;font-size:15px;padding:14px 32px;border-radius:12px;text-decoration:none;display:inline-block;">
        Track My Shipment →
      </a>
    </div>

    <!-- ESTIMATED DELIVERY -->
    <div style="background:#dcfce7;border:1px solid #bbf7d0;border-radius:16px;padding:20px;margin-bottom:16px;display:flex;align-items:center;gap:12px;">
      <div style="font-size:24px;">📅</div>
      <div>
        <div style="font-size:11px;color:#16a34a;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:3px;">Estimated Delivery</div>
        <div style="font-size:16px;font-weight:800;color:#052e16;">${estDate}</div>
      </div>
    </div>

    <!-- ROUTE -->
    <div style="background:white;border-radius:16px;padding:24px;margin-bottom:16px;border:1px solid #f1f5f9;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
      <div style="font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:16px;">Route</div>
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="flex:1;background:#f8fafc;border-radius:12px;padding:16px;">
          <div style="font-size:10px;color:#94a3b8;font-weight:600;text-transform:uppercase;margin-bottom:4px;">From</div>
          <div style="font-size:15px;font-weight:700;color:#0f172a;">${sender_name}</div>
          <div style="font-size:13px;color:#64748b;">${origin_city}, ${origin_country}</div>
        </div>
        <div style="font-size:20px;color:#16a34a;font-weight:900;">→</div>
        <div style="flex:1;background:#f8fafc;border-radius:12px;padding:16px;">
          <div style="font-size:10px;color:#94a3b8;font-weight:600;text-transform:uppercase;margin-bottom:4px;">To</div>
          <div style="font-size:15px;font-weight:700;color:#0f172a;">${receiver_name}</div>
          <div style="font-size:13px;color:#64748b;">${destination_city}, ${destination_country}</div>
        </div>
      </div>
    </div>

    <!-- PACKAGE DETAILS -->
    <div style="background:white;border-radius:16px;padding:24px;margin-bottom:16px;border:1px solid #f1f5f9;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
      <div style="font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:16px;">Package Details</div>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;">
            <div style="font-size:11px;color:#94a3b8;font-weight:600;text-transform:uppercase;">Service</div>
            <div style="font-size:14px;font-weight:600;color:#0f172a;margin-top:2px;">${serviceLabels[service_type] || service_type}</div>
          </td>
          <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;">
            <div style="font-size:11px;color:#94a3b8;font-weight:600;text-transform:uppercase;">Weight</div>
            <div style="font-size:14px;font-weight:600;color:#0f172a;margin-top:2px;">${package_weight ? package_weight + ' kg' : 'N/A'}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;" colspan="2">
            <div style="font-size:11px;color:#94a3b8;font-weight:600;text-transform:uppercase;">Contents</div>
            <div style="font-size:14px;font-weight:600;color:#0f172a;margin-top:2px;">${package_description || 'N/A'}</div>
          </td>
        </tr>
      </table>
    </div>

    <!-- WHAT HAPPENS NEXT -->
    <div style="background:white;border-radius:16px;padding:24px;margin-bottom:16px;border:1px solid #f1f5f9;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
      <div style="font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:16px;">What Happens Next</div>
      ${[
        { step: '1', text: 'Our team reviews your booking and prepares for pickup' },
        { step: '2', text: 'A courier is assigned and will collect your package' },
        { step: '3', text: 'Track your shipment in real-time using your tracking number' },
        { step: '4', text: 'Your package is delivered safely to the destination' },
      ].map((s) => `
        <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;">
          <div style="background:#dcfce7;color:#16a34a;font-size:12px;font-weight:800;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;text-align:center;line-height:24px;">${s.step}</div>
          <div style="font-size:14px;color:#374151;padding-top:3px;">${s.text}</div>
        </div>
      `).join('')}
    </div>

    <!-- SUPPORT -->
    <div style="background:linear-gradient(135deg,#052e16,#14532d);border-radius:16px;padding:24px;margin-bottom:24px;text-align:center;color:white;">
      <div style="font-size:15px;font-weight:700;margin-bottom:8px;">Need Help?</div>
      <div style="font-size:13px;color:rgba(187,247,208,0.8);margin-bottom:16px;">Our support team is available 24/7</div>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <a href="mailto:info@swiftlanelogs.com" style="background:rgba(255,255,255,0.1);color:white;font-size:13px;font-weight:600;padding:10px 20px;border-radius:10px;text-decoration:none;border:1px solid rgba(255,255,255,0.15);">
          📧 info@swiftlanelogs.com
        </a>
        <a href="https://swiftlanelogs.com/contact" style="background:#16a34a;color:white;font-size:13px;font-weight:600;padding:10px 20px;border-radius:10px;text-decoration:none;">
          Contact Support
        </a>
      </div>
    </div>

    <!-- FOOTER -->
    <div style="text-align:center;color:#94a3b8;font-size:12px;line-height:1.8;">
      <p>© ${new Date().getFullYear()} SwiftLane Logistics. All rights reserved.</p>
      <p>123 Logistics Avenue, Lagos Island, Lagos, Nigeria</p>
      <p>
        <a href="https://swiftlanelogs.com/privacy" style="color:#16a34a;text-decoration:none;">Privacy Policy</a>
        &nbsp;•&nbsp;
        <a href="https://swiftlanelogs.com/terms" style="color:#16a34a;text-decoration:none;">Terms of Service</a>
      </p>
    </div>
  </div>
</body>
</html>`

    // Send to sender
    if (sender_email) {
      await resend.emails.send({
        from: 'SwiftLane Logistics <onboarding@resend.dev>',
        to: sender_email,
        subject: `Shipment Confirmed — Tracking: ${tracking_number}`,
        html: emailHtml,
      })
    }

    // Send to receiver
    if (receiver_email && receiver_email !== sender_email) {
      await resend.emails.send({
        from: 'SwiftLane Logistics <onboarding@resend.dev>',
        to: receiver_email,
        subject: `A Package Is On Its Way To You — Tracking: ${tracking_number}`,
        html: emailHtml,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}