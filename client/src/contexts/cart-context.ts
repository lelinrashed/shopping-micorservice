import { createContext } from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  photo: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

export const initialCartState: CartContextType = {
  cart: [],
  addToCart: () => {},
  removeItem: () => {},
  clearCart: () => {},
};

export const CartContext = createContext<CartContextType>(initialCartState);
