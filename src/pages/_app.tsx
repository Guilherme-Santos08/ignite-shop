import { AppProps } from 'next/app'
import * as Dialog from '@radix-ui/react-dialog'

import { globalStyles } from '../styles/global'

import iconShop from '../assets/car-icon.svg'
import logoImg from '../assets/logo.svg'

import { Container, Header, OpenSidebarButton } from '../styles/pages/app'
import Image from 'next/future/image'
import { SideBarModal } from '../components/SideBarModal'
import { useState } from 'react'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const [open, setOpen] = useState(false)

  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />

        <Dialog.Root onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <OpenSidebarButton>
              <Image src={iconShop} alt="" />
              <span>1</span>
            </OpenSidebarButton>
          </Dialog.Trigger>

          <SideBarModal open={open} />
        </Dialog.Root>
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
