import { AppProps } from 'next/app'

import { globalStyles } from '../styles/global'

import { Container } from '../styles/pages/app'
import { useState } from 'react'
import { CartProvider, useShoppingCart } from 'use-shopping-cart'
import { Header } from '../components/Header'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <CartProvider
        cartMode="checkout-session"
        stripe={process.env.STRIPE_PUBLIC_KEY}
        currency="BRL"
        shouldPersist
      >
        <Header />
        <Component {...pageProps} />
      </CartProvider>
    </Container>
  )
}
