import Image from 'next/future/image'
import * as Dialog from '@radix-ui/react-dialog'
import iconClose from '../../assets/close-icon.svg'

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

interface SideBarModalProps {
  open: boolean
}

export function SideBarModal({ open }: SideBarModalProps) {
  function handleRemoveItemList() {}

  function handleCheckout() {}

  return (
    <Dialog.Portal>
      <Overlay />
      <Content position={open ? 'positionVisible' : 'positionNotVisible'}>
        <ShoppingCartList>
          <DialogTitle>Sacola de compras</DialogTitle>

          <StoreItem>
            <ImageItem>
              <Image src="" alt="" />
            </ImageItem>

            <div className="info-item">
              <h2>Camiseta Beyond the Limits</h2>
              <span>R$ 79,90</span>
              <button onClick={handleRemoveItemList}>Remover</button>
            </div>
          </StoreItem>
        </ShoppingCartList>

        <ShoppingInfo>
          <div className="quantity">
            <span>Quantidade</span>
            <span className="quantity__item">3 itens</span>
          </div>
          <div className="amount">
            <span>Valor total</span>
            <span className="amount__price">R$ 270</span>
          </div>
          <CheckoutButton onClick={handleCheckout}>
            Finalizar compra
          </CheckoutButton>
        </ShoppingInfo>

        <Dialog.Close asChild>
          <IconButton aria-label="Close">
            <Image src={iconClose} alt="" />
          </IconButton>
        </Dialog.Close>
      </Content>
    </Dialog.Portal>
  )
}
