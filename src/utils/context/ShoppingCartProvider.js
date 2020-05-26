import React, { useReducer } from "react";
import { addAction, removeAction, updateCountAction } from "../actions/ShoppingCart";
import { shoppingCartReducer, initialState } from "../reducers/ShoppingCart";

const ShoppingCartContext = React.createContext(null);

export const ShoppingCartProvider = ({ children }) => {
  const [cartInfo, dispatch] = useReducer(shoppingCartReducer, initialState);

  const actions = {
    addToCart(jersey, jerseyCount) {
      dispatch(addAction(jersey, jerseyCount));
    },
    removeFromCart(taskId, count) {
      dispatch(removeAction(taskId, count));
    },
    updateCounter(itemIndex, updateCount) {
      dispatch(updateCountAction(itemIndex, updateCount));
    }
  };

  return (
    <ShoppingCartContext.Provider value={{ cartInfo, actions }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

export const ShoppingCartConsumer = ShoppingCartContext.Consumer;

export default ShoppingCartContext;
