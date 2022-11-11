import axios from 'axios'
import { useState } from 'react'

import Image from 'next/future/image'
import * as Dialog from '@radix-ui/react-dialog'
import { useShoppingCart } from 'use-shopping-cart'

import {
  CheckoutButton,
  Content,
  DialogTitle,
  IconButton,
  ImageItem,
  Overlay,
  ShoppingCartList,
  ShoppingInfo,
  StoreItem,
} from './styles'
import iconClose from '../../assets/close-icon.svg'

interface SideBarModalProps {
  open: boolean
}

export function SideBarModal({ open }: SideBarModalProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const { cartDetails, clearCart, cartCount, removeItem, formattedTotalPrice } =
    useShoppingCart()

  const productsList = Object.keys(cartDetails)
  const listEmpty = cartCount === 0

  async function handleBuyButton() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        products: cartDetails,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
      clearCart()
    } catch (err) {
      setIsCreatingCheckoutSession(false)
      alert('falha ao redirecionar')
    }
  }

  function handleRemoveItemList(id: string) {
    removeItem(id)
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content position={open ? 'positionVisible' : 'positionNotVisible'}>
        <ShoppingCartList>
          <DialogTitle>Sacola de compras</DialogTitle>

          {listEmpty && <p className="list-empty">Nenhum produto adicionado</p>}

          {productsList.map(index => {
            console.log(cartDetails[index].name)
            return (
              <StoreItem key={cartDetails[index].id}>
                <ImageItem>
                  <Image
                    src={cartDetails[index].image}
                    blurDataURL={cartDetails[index].image}
                    placeholder="blur"
                    width={100}
                    height={93}
                    alt=""
                  />
                </ImageItem>

                <div className="info-item">
                  <h2>{cartDetails[index].name}</h2>
                  <span>{cartDetails[index].priceFormatted}</span>
                  <button
                    onClick={() => handleRemoveItemList(cartDetails[index].id)}
                  >
                    Remover
                  </button>
                </div>
              </StoreItem>
            )
          })}
        </ShoppingCartList>

        <ShoppingInfo>
          <div className="quantity">
            <span>Quantidade</span>
            <span className="quantity__item">{cartCount} itens</span>
          </div>
          <div className="amount">
            <span>Valor total</span>
            <span className="amount__price">{formattedTotalPrice}</span>
          </div>
          <CheckoutButton
            disabled={isCreatingCheckoutSession || listEmpty}
            onClick={handleBuyButton}
          >
            Finalizar compra
          </CheckoutButton>
        </ShoppingInfo>

        <Dialog.Close asChild>
          <IconButton aria-label="Close">
            <Image src={iconClose} alt="Icone de X" />
          </IconButton>
        </Dialog.Close>
      </Content>
    </Dialog.Portal>
  )
}
