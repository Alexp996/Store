import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
  //find if cartItems, contains productToAdd
  const existingCart = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  //if found, increment quantity
  if (existingCart) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  //return new array with modified cartItemes/new cartItems
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};
const removeCartItem = (cartItems, cartItemToRemove) => {
  //find the cart item to remove
  const existingCart = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  //check if quantity is equal to 1, if it is it, remove that item from the cart
  if (existingCart.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  //return back cart items with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
const clearCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};
export const CartContext = createContext({
  isCartOpen: false,
  setisCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CART_ACTION_TYPE = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET__IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

export const cartReducer = (state,action)=>{
  const {type, payload} = action;
  switch(type){
    case CART_ACTION_TYPE.SET_CART_ITEMS:
      return{
        ...state,
        ...payload
      }
    case CART_ACTION_TYPE.SET__IS_CART_OPEN:
      return{
        ...state,
        isCartOpen : payload
      }
    default:
      throw new Error(`Error of type ${type} in cartReducer`)
      
  }
}

const INITIAL_STATE = {
  isCartOpen: false, 
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

export const CartProvider = ({ children }) => {
  const [{isCartOpen,cartItems,cartCount,cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE)
  
  const updateCartItemsReducer = (newCartItems) =>{
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const newCartTotal = newCartItems .reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    dispatch(
      createAction(CART_ACTION_TYPE.SET_CART_ITEMS,{cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount})
  )
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);

  };
  const removeItemToCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };
  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);

  };
  const setisCartOpen = (booleanValue)=>{
    dispatch(createAction(CART_ACTION_TYPE.SET__IS_CART_OPEN,booleanValue))
}
  const value = {
    isCartOpen,
    setisCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
