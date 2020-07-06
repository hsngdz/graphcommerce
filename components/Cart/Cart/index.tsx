import React from 'react'
import MagentoDynamic from 'components/MagentoDynamic/MagentoDynamic'
import CartSkeleton from './CartSkeleton'

export default function CartLoader() {
  return (
    <>
      <MagentoDynamic
        loader={() => import('./Cart')}
        skeleton={(ref) => <CartSkeleton ref={ref}>loading</CartSkeleton>}
      />
    </>
  )
}
