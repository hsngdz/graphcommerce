import React from 'react'
import { useGuestCartLazyQuery, useCartIdQuery } from 'generated/apollo'
import {
  ListItem,
  ListItemText,
  Divider,
  Theme,
  ListItemSecondaryAction,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Money from 'components/Money'
import GQLRenderType, { GQLTypeRenderer } from 'components/GQLRenderType'
import { motion, AnimatePresence, MotionProps } from 'framer-motion'
import CartSkeleton from './CartSkeleton'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    buttonContainer: {
      position: 'sticky',
      bottom: 8,
    },
    button: {
      width: '100%',
    },
  }),
  { name: 'Cart' },
)

type CartItemRenderer = GQLTypeRenderer<GQLGuestCartQuery['cart']['items'][0]>

type CartProps = { renderer: CartItemRenderer }

export default function Cart(props: CartProps) {
  const { renderer } = props
  const { data: cartIdData } = useCartIdQuery()
  const classes = useStyles()
  const [loadCart, { data, loading, called }] = useGuestCartLazyQuery()

  if (!cartIdData?.cartId) return <CartSkeleton>nothing in your cart</CartSkeleton>

  if (!called) loadCart({ variables: { cartId: cartIdData.cartId } })

  if (loading || !data) {
    return <CartSkeleton>loading your cart</CartSkeleton>
  }

  const { cart } = data

  const animation: MotionProps = {
    initial: { opacity: 0, y: 50, scale: 0.3 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.5, transition: { type: 'inertia' } },
    layout: true,
  }

  return (
    <AnimatePresence>
      {cart.items.map<React.ReactNode>((item) => {
        return (
          <motion.div key={item.id} {...animation}>
            <GQLRenderType renderer={renderer} {...item} />
            <Divider variant='inset' component='li' />
          </motion.div>
        )
      })}

      {(cart.shipping_addresses.length > 0 || cart.prices.discounts) && (
        <motion.div {...animation} key='subtotal'>
          <ListItem>
            <ListItemText inset>Subtotal</ListItemText>
            <ListItemSecondaryAction>
              <Money {...cart.prices.subtotal_including_tax} />
            </ListItemSecondaryAction>
          </ListItem>
        </motion.div>
      )}

      {cart.prices.discounts?.map((discount, idx) => (
        <motion.div {...animation} key={`price${idx}`}>
          <ListItem>
            <ListItemText inset>{discount.label}</ListItemText>
            <ListItemSecondaryAction>
              <Money {...discount.amount} key={idx} />
            </ListItemSecondaryAction>
          </ListItem>
        </motion.div>
      ))}

      {cart.shipping_addresses?.map((address, idx) => (
        <motion.div {...animation} key={`shipping_addresses_${idx}`}>
          <ListItem>
            <ListItemText inset>{address.selected_shipping_method.carrier_title}</ListItemText>
            <ListItemSecondaryAction>
              <Money {...address.selected_shipping_method.amount} key={idx} />
            </ListItemSecondaryAction>
          </ListItem>
        </motion.div>
      ))}

      <motion.div {...animation} key='total'>
        <ListItem key='total'>
          <ListItemText inset>Total</ListItemText>
          <ListItemSecondaryAction>
            <Money {...cart.prices.grand_total} />
          </ListItemSecondaryAction>
        </ListItem>
      </motion.div>

      <motion.div {...animation} key='checkout'>
        <ListItem className={classes.buttonContainer}>
          <Button variant='contained' color='primary' size='large' className={classes.button}>
            Proceed to checkout
          </Button>
        </ListItem>
      </motion.div>
    </AnimatePresence>
  )
}
