import Image from 'next/future/image'
import * as Dialog from '@radix-ui/react-dialog'

import { useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart'

import { SideBarModal } from '../SideBarModal'

import { Handbag } from 'phosphor-react'

import logoImg from '../../assets/logo.svg'

import { HeaderContainer, OpenSidebarButton } from './styles'
import Link from 'next/link'
import { useRouter } from 'next/router'

export function Header() {
  const [open, setOpen] = useState(false)
  const { cartCount } = useShoppingCart()

  const route = useRouter()
  const verifyRouteSuccess = !route.route.includes('/success')

  return (
    <HeaderContainer verifyRouteSuccess={verifyRouteSuccess}>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>

      <Dialog.Root onOpenChange={setOpen}>
        {verifyRouteSuccess ? (
          <Dialog.Trigger asChild>
            <OpenSidebarButton>
              <Handbag size={24} color="#8D8D99" weight="bold" />
              {cartCount > 0 && <span>{cartCount}</span>}
            </OpenSidebarButton>
          </Dialog.Trigger>
        ) : (
          <div />
        )}

        <SideBarModal open={open} />
      </Dialog.Root>
    </HeaderContainer>
  )
}
