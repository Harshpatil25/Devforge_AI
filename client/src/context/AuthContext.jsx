import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../services/supabaseClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = useCallback(async (userId) => {
    if (!userId) {
      setProfile(null)
      return
    }

    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle()

    if (!error && data) {
      setProfile(data)
      return
    }

    setProfile(null)
  }, [])

  useEffect(() => {
    let isMounted = true

    const initializeSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (!isMounted) return

      if (error) {
        console.error('Session initialization failed', error)
      }

      setSession(data.session)
      setUser(data.session?.user ?? null)
      if (data.session?.access_token) {
        localStorage.setItem('devforge-auth-token', data.session.access_token)
      } else {
        localStorage.removeItem('devforge-auth-token')
      }
      if (data.session?.user) {
        await fetchProfile(data.session.user.id)
      } else {
        setProfile(null)
      }
      setLoading(false)
    }

    initializeSession()

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      if (!isMounted) return

      setSession(currentSession)
      setUser(currentSession?.user ?? null)
      if (currentSession?.access_token) {
        localStorage.setItem('devforge-auth-token', currentSession.access_token)
      } else {
        localStorage.removeItem('devforge-auth-token')
      }
      if (currentSession?.user) {
        await fetchProfile(currentSession.user.id)
      } else {
        setProfile(null)
      }
      setLoading(false)
    })

    return () => {
      isMounted = false
      authListener.subscription.unsubscribe()
    }
  }, [fetchProfile])

  const login = useCallback(async (email, password) => {
    const result = await supabase.auth.signInWithPassword({ email, password })
    if (result.data?.session?.user) {
      setSession(result.data.session)
      setUser(result.data.session.user)
      await fetchProfile(result.data.session.user.id)
    }
    return result
  }, [fetchProfile])

  const register = useCallback(async (email, password, metadata) => {
    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (result.data?.user) {
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: result.data.user.id,
        full_name: metadata?.full_name ?? '',
        username: metadata?.username ?? '',
        email,
        avatar_url: null,
        bio: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' })

      if (profileError) {
        console.error('Profile creation failed', profileError)
      } else {
        await fetchProfile(result.data.user.id)
      }
    }

    return result
  }, [fetchProfile])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('devforge-auth-token')
    setSession(null)
    setUser(null)
    setProfile(null)
  }, [])

  const resetPassword = useCallback(async ({ email, password, redirectTo = `${window.location.origin}/reset-password` }) => {
    if (password) {
      return supabase.auth.updateUser({ password })
    }

    return supabase.auth.resetPasswordForEmail(email, { redirectTo })
  }, [])

  const updateProfile = useCallback(async (updates) => {
    if (!user?.id) {
      return { error: new Error('Missing user') }
    }

    const payload = {
      id: user.id,
      updated_at: new Date().toISOString(),
      ...updates,
    }

    const { data, error } = await supabase.from('profiles').upsert(payload, { onConflict: 'id' }).select().single()

    if (!error && data) {
      setProfile(data)
    }

    return { data, error }
  }, [user?.id])

  const value = useMemo(() => ({
    session,
    user,
    profile,
    loading,
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
  }), [loading, login, logout, profile, register, resetPassword, session, updateProfile, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
