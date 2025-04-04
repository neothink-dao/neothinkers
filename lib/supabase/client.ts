import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { Database } from "@/types/supabase"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

export const createClient = () => {
  return createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: "pkce",
      storageKey: "joinneothinkers.auth.token",
      storage: {
        getItem: (key) => {
          try {
            return localStorage.getItem(key)
          } catch (error) {
            return null
          }
        },
        setItem: (key, value) => {
          try {
            localStorage.setItem(key, value)
          } catch (error) {
            // Handle storage errors
          }
        },
        removeItem: (key) => {
          try {
            localStorage.removeItem(key)
          } catch (error) {
            // Handle storage errors
          }
        },
      },
    },
    global: {
      headers: {
        "x-site-name": "Neothinkers",
        "x-site-url": "https://www.joinneothinkers.org",
        "x-site-platform": "neothinkers",
        "x-sender-name": "Neothinkers"
      },
    },
  })
}

