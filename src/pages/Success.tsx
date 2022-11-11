import Link from 'next/link'
import Image from 'next/future/image'
import {
  ImageContainer,
  ImageContent,
  SuccessContainer,
} from '../styles/pages/success'
import { GetServerSideProps } from 'next'
import { stripe } from '../lib/stripe'
import Stripe from 'stripe'
import Head from 'next/head'

interface SuccessProps {
  costumerName: string
  product: Stripe.Product[]
}

export default function Success({ costumerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <ImageContainer>
          {product.map(item => {
            return (
              <ImageContent key={item.id}>
                <Image
                  placeholder="blur"
                  blurDataURL={item.images[0]}
                  src={item.images[0]}
                  width={120}
                  height={110}
                  alt=""
                />
              </ImageContent>
            )
          })}
        </ImageContainer>

        <h1>Compra efetuada</h1>

        <p>
          Uhuul <strong>{costumerName}</strong>, sua compra de{' '}
          <strong>{product.length}</strong>{' '}
          {product.length > 1 ? 'camisetas' : 'camiseta'} já está a caminho da
          sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const costumerName = session.customer_details.name
  const products = session.line_items.data.map(
    item => item.price.product
  ) as Stripe.Product[]

  return {
    props: {
      costumerName,
      product: products,
    },
  }
}
