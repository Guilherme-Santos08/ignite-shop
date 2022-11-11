import * as Dialog from '@radix-ui/react-dialog'
import { styled } from '../../styles'

export const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0)',
})

export const Content = styled(Dialog.Content, {
  position: 'fixed',
  top: 0,
  right: 0,
  zIndex: 100,
  visibility: 'hidden',
  width: '480px',
  height: '100%',
  backgroundColor: '$gray800',
  transition: 'all 0.5s',

  padding: '4.5rem 3rem 3rem',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  variants: {
    position: {
      positionNotVisible: {
        visibility: 'visible',
        transform: 'translate3d(100%, 0, 0)',
      },

      positionVisible: {
        visibility: 'visible',
        transform: 'translate3d(0, 0, 0)',
      },
    },
  },
})

export const DialogTitle = styled(Dialog.Title, {
  color: '$gray100',
  fontWeight: 'bold',
  fontSize: '$lg',
})

export const ShoppingCartList = styled('div', {
  '.list-empty': {
    marginTop: '1.4rem',
    color: '$gray100',
    fontWeight: 'bold',
    fontSize: 15,
  },
})

export const StoreItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  marginTop: '32px',

  '.info-item': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.825rem',
    marginLeft: '1.25rem',

    h2: {
      fontSize: '$md',
      color: '$gray300',
      fontWeight: 'normal',
    },

    span: {
      color: '$gray100',
      fontSize: '$md',
      fontWeight: 'bold',
    },

    button: {
      backgroundColor: 'transparent',
      color: '$green500',
      border: 'none',
      fontSize: '1rem',
      fontWeight: 'bold',
      textAlign: 'start',
      cursor: 'pointer',
    },
  },
})

export const ImageItem = styled('div', {
  width: '100%',
  maxWidth: 100,
  height: 93,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
})

export const ShoppingInfo = styled('div', {
  'div + div': {
    marginTop: '1.125rem',
  },

  '.quantity': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    color: '$gray100',
    fontSize: '1rem',

    '.quantity__item': {
      fontSize: '$md',
      color: '$gray300',
    },
  },

  '.amount': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    color: '$gray100',
    fontSize: '$md',
    fontWeight: 'bold',

    '.amount__price': {
      fontSize: '$xl',
    },
  },
})

export const CheckoutButton = styled('button', {
  fontSize: '$md',
  fontWeight: 'bold',
  color: '$white',

  height: 69,
  width: '100%',
  marginTop: '3.563rem',
  backgroundColor: '$green300',

  border: 'none',
  borderRadius: 8,
  cursor: 'pointer',
  transition: '.1s background',

  '&:not(:disabled):hover': {
    backgroundColor: '$green500',
  },

  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.6,
  },
})

export const IconButton = styled('button', {
  position: 'absolute',
  backgroundColor: 'transparent',
  border: 0,
  top: '1.5rem',
  right: '1.5rem',
  lineHeight: 0,
  cursor: 'pointer',
})
