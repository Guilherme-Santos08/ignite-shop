import { styled } from '../../styles'

export const HeaderContainer = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
})

export const OpenSidebarButton = styled('button', {
  backgroundColor: '$gray800',
  padding: '0.75rem',
  borderRadius: 6,
  border: 'none',
  cursor: 'pointer',
  position: 'relative',

  span: {
    position: 'absolute',
    top: -5,
    right: -5,
    fontSize: 14,
    color: '$white',
    backgroundColor: '$green300',
    borderRadius: 999,
    width: 24,
    height: 24,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '3px solid $gray900',
  },
})
