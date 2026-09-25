'use client'

import { usePathname } from 'next/navigation'

export default function FrontendTemplate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div key={pathname} className="page-transition">
      <div className="page-wipe" aria-hidden="true" />
      {children}
    </div>
  )
}
