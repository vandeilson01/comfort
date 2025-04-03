'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Menu } from '@/components/Menu'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme])

  // Oculta o cabeçalho e o menu na rota `/posts`
  if (pathname.startsWith('/posts')) {
    return null
  }

  return (
    <div>
      <header className="container relative z-20 flex items-center justify-between py-6" {...(theme ? { 'data-theme': theme } : {})}>
        <div className="text-left">
          <h1 className="text-[#002f6c] text-2xl font-bold mb-2">
            Olá,<br /> <strong>Seja bem-vindo</strong>
          </h1>
          <p className="text-blue-600 text-lg max-w-md">
            Utilize o nosso totem interativo para conhecer os serviços do Comfort Mogi Guaçu e da nossa cidade.
          </p>
        </div>
        <div className="flex-shrink-0">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </div>
      </header>

      <div className='container menus'>
        <Menu />
      </div>
    </div>
  )
}
