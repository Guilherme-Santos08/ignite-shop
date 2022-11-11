import Stripe from 'stripe'

import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/future/image'
import Head from 'next/head'

import { useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import { stripe } from '../../lib/stripe'

import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'

export interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
    priceFormatted: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)
  const { addItem, cartDetails } = useShoppingCart()

  async function handleBuyButton() {
    addItem({
      currency: 'BRL',
      id: product.id,
      name: product.name,
      price: product.price,
      priceFormatted: product.priceFormatted,
      image: product.imageUrl,
      description: product.description,
      price_id: product.defaultPriceId,
    })
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.priceFormatted}</span>

          <p>{product.description}</p>

          <button
            disabled={isCreatingCheckoutSession}
            onClick={handleBuyButton}
          >
            Adicionar ao carrinho
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: Number(price.unit_amount),
        priceFormatted: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hours
  }
}
