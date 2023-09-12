import * as React from "react";
import { createContext, useEffect, useState } from "react";

export const basketContext = createContext({});

const STORAGE_CART_NAME = "QR_scanner_cart";

const BasketProvider = (props) => {
  const { children } = props;

  const [data, setData] = useState([]);

  useEffect(() => {
    const cart = localStorage.getItem(STORAGE_CART_NAME);
    if (cart) {
      setData(JSON.parse(cart));
    }
  }, []);

  const incrementItemCount = (id) => {
    setData((prevState) => {
      const itemIndex = prevState.findIndex((item) => item.id === id);
      if (itemIndex === -1) return prevState;
      const newItem = prevState[itemIndex];
      const count = newItem.count + 1;
      const newState = [
        ...prevState.slice(0, itemIndex),
        { ...newItem, count },
        ...prevState.slice(itemIndex + 1),
      ];
      localStorage.setItem(STORAGE_CART_NAME, JSON.stringify(newState));
      return newState;
    });
  };

  const decrementItemCount = (id) => {
    setData((prevState) => {
      const itemIndex = prevState.findIndex((item) => item.id === id);
      if (itemIndex === -1) return prevState;
      const newItem = prevState[itemIndex];
      const count = newItem.count > 1 ? newItem.count - 1 : 1;
      const newState = [
        ...prevState.slice(0, itemIndex),
        { ...newItem, count },
        ...prevState.slice(itemIndex + 1),
      ];
      localStorage.setItem(STORAGE_CART_NAME, JSON.stringify(newState));
      return newState;
    });
  };

  const setItemCount = (id, count) => {
    setData((prevState) => {
      const itemIndex = prevState.findIndex((item) => item.id === id);
      if (itemIndex === -1) return prevState;
      const newItem = prevState[itemIndex];
      const newState = [
        ...prevState.slice(0, itemIndex),
        { ...newItem, count },
        ...prevState.slice(itemIndex + 1),
      ];
      localStorage.setItem(STORAGE_CART_NAME, JSON.stringify(newState));
      return newState;
    });
  };

  const checkItemCount = (id) => {
    setData((prevState) => {
      const itemIndex = prevState.findIndex((item) => item.id === id);
      if (itemIndex === -1) return prevState;
      const newItem = prevState[itemIndex];
      if (newItem.count) return prevState;
      const newState = [
        ...prevState.slice(0, itemIndex),
        { ...newItem, count: 1 },
        ...prevState.slice(itemIndex + 1),
      ];
      localStorage.setItem(STORAGE_CART_NAME, JSON.stringify(newState));
      return newState;
    });
  };

  const deleteItem = (id) => {
    setData((prevState) => {
      const newState = prevState.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_CART_NAME, JSON.stringify(newState));
      return newState;
    });
  };

  const addItemToBasket = (newProduct) => {
    setData((prevState) => {
      const itemIndex = prevState.findIndex(
        (item) => item.id === newProduct.id
      );
      let newState = [];
      if (itemIndex === -1) newState = [newProduct, ...prevState];
      else
        newState = [
          ...prevState.slice(0, itemIndex),
          {
            ...newProduct,
            count: prevState[itemIndex].count + newProduct.count,
          },
          ...prevState.slice(itemIndex + 1),
        ];
      localStorage.setItem(STORAGE_CART_NAME, JSON.stringify(newState));
      return newState;
    });
  };

  const clearAllBasket = () => {
    setData([]);
    localStorage.setItem(STORAGE_CART_NAME, JSON.stringify([]));
  };

  return (
    <basketContext.Provider
      value={{
        basket: data,
        deleteItem,
        decrementItemCount,
        incrementItemCount,
        addItemToBasket,
        clearAllBasket,
        setItemCount,
        checkItemCount,
      }}
    >
      {children}
    </basketContext.Provider>
  );
};

export default BasketProvider;
