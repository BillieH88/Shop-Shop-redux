import React, { useEffect } from "react"; 
import { loadStripe } from "@stripe/stripe-js"; 
import { useLazyQuery } from '@apollo/react-hooks'; 
import { QUERY_CHECKOUT } from "../../utils/queries" 
import { idbPromise } from "../../utils/helpers" 
import CartItem from "../CartItem"; 
import Auth from "../../utils/auth"; 
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../features/cartSlice";
import "./style.css";
import {useDispatch, useSelector} from "react-redux";

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = ({

}) => {
  // const [state, dispatch] = useStoreContext();
  // not really needed deleting soon
  const dispatch = useDispatch() 
  const state = useSelector(state => state)
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session })
      })
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
   
      dispatch({ type: ADD_MULTIPLE_TO_CART,  products: [...cart] });
    };

    if (!state.cart.cart.length) {
      getCart();
    }
  }, [state.cart.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.cart.forEach(item => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds }
    });
  }

  if (!state.cart.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span
          role="img"
          aria-label="trash">🛒</span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>[close]</div>
      <h2>Shopping Cart</h2>
      {state.cart.cart.length ? (
        <div>
          {state.cart.cart.map(item => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {
              Auth.loggedIn() ?
                <button onClick={submitCheckout}>
                  Checkout
              </button>
                :
                <span>(log in to check out)</span>
            }
          </div>
        </div>
      ) : (
          <h3>
            <span role="img" aria-label="shocked">
              😱
          </span>
          You haven't added anything to your cart yet!
          </h3>
        )}
    </div>
  );
};
// const mapStateToProps = (state) => {
//   const {  cart } = state
//   const { cart, cartOpen } = cart

//   return {
//    cart, cartOpen
//   }
// }
// export default connect(mapStateToProps)(UploadRecordingModal)
// const mapDispatchToProps = dispatch => {
//   return {
//     addMultipleToCart: (data) => dispatch(updateProfile(data)),
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Cart);

export default Cart