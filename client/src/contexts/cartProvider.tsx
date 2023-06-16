"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CartContext,
  CartContextType,
  CartItem,
  Product,
} from "./cart-context";

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (typeof storedCart === "string") {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = useCallback(
    (product: Product) => {
      const existingItem = cart.find((item) => item.id === product.id);
      if (existingItem) {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
      }
    },
    [cart]
  );

  const handleRemoveItem = useCallback((itemId: number) => {
    const updatedCartItems = cart.filter((item) => item.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    setCart(updatedCartItems);
  }, [cart]);

  const handleClearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const cartContextValue: CartContextType = useMemo(
    () => ({
      cart,
      addToCart,
      removeItem: handleRemoveItem,
      clearCart: handleClearCart,
    }),
    [cart, addToCart, handleRemoveItem]
  );

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
