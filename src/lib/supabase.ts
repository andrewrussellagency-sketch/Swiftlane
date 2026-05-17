import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export type Shipment = {
  id: string
  tracking_number: string
  sender_name: string
  sender_email: string
  sender_phone: string
  sender_address: string
  receiver_name: string
  receiver_email: string
  receiver_phone: string
  receiver_address: string
  origin_city: string
  destination_city: string
  origin_country: string
  destination_country: string
  package_weight: number
  package_description: string
  service_type: string
  status: string
  estimated_delivery: string
  created_at: string
  updated_at: string
}

export type TrackingHistory = {
  id: string
  shipment_id: string
  status: string
  location: string
  description: string
  timestamp: string
}