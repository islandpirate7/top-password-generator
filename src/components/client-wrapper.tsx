"use client"

import React from 'react'
import dynamic from 'next/dynamic'

// Use dynamic import with no SSR to avoid hydration issues
const PasswordStrengthChecker = dynamic(
  () => import('./password-strength-checker').then(mod => mod.PasswordStrengthChecker),
  { ssr: false }
)

export function ClientWrapper() {
  return <PasswordStrengthChecker />
}
