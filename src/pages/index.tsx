import Image from 'next/future/image'
import { GetStaticProps } from 'next'
import Link from 'next/link'

import { Handbag } from 'phosphor-react'
import { useKeenSlider } from 'keen-slider/react'

import { stripe } from '../lib/stripe'
import { AddCartItemButton, HomeContainer, Product } from '../styles/pages/home'

import 'keen-slider/keen-slider.min.css'
import Stripe from 'stripe'
import Head from 'next/head'
import { useShoppingCart } from 'use-shopping-cart'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
    priceFormatted: string
    description: string
    defaultPriceId: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const { addItem } = useShoppingCart()

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  function handleAddCartItem(product) {
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
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            <Product className="keen-slider__slide" key={product.id}>
              <Link href={`/product/${product.id}`} prefetch={false}>
                <Image src={product.imageUrl} width={520} height={480} alt="" />
              </Link>
              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.priceFormatted}</span>
                </div>

                <AddCartItemButton onClick={() => handleAddCartItem(product)}>
                  <Handbag size={24} color="#ffffff" weight="bold" />
                </AddCartItemButton>
              </footer>
            </Product>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
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
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours,
  }
}
