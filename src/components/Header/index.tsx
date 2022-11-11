import Image from 'next/future/image'
import * as Dialog from '@radix-ui/react-dialog'

import { useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart'

import { SideBarModal } from '../SideBarModal'

import { Handbag } from 'phosphor-react'

import logoImg from '../../assets/logo.svg'

import { HeaderContainer, OpenSidebarButton } from './styles'

export function Header() {
  const [open, setOpen] = useState(false)
  const { cartCount } = useShoppingCart()

  return (
    <HeaderContainer>
      <Image src={logoImg} alt="" />

      <Dialog.Root onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <OpenSidebarButton>
            <Handbag size={24} color="#8D8D99" weight="bold" />
            {cartCount > 0 && <span>{cartCount}</span>}
          </OpenSidebarButton>
        </Dialog.Trigger>

        <SideBarModal open={open} />
      </Dialog.Root>
    </HeaderContainer>
  )
}
