"use client";

import { CartContext } from "@/contexts/cart-context";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import Nav from "../Nav";
import CartItem from "./Cart";
import { AuthContext } from "@/contexts/auth-context";

export default function Cart() {
  const { authState } = useContext(AuthContext);
  const { clearCart, removeItem, cart } = useContext(CartContext);
  const router = useRouter();

  const handleRemoveItem = (itemId: number) => {
    removeItem(itemId);
  };

  const placeOrder = () => {
    if (!authState.isLoggedIn) {
      router.push("/login?redirect=cart");
    }
    console.log("place order");
  };

  return (
    <div>
      <Nav />

      <div className="pt-32  bg-white">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          All Cart Products
        </h1>
      </div>

      <div className="container m-auto max-w-6xl px-4">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} onRemoveItem={handleRemoveItem} />
        ))}
      </div>

      {/* Generate a place order button with green bg and align center of the screen */}
      {cart.length !== 0 && (
        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={placeOrder}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Place Order
          </button>

          {/* Generate a clear cart button with red bg and align center of the screen */}
          <button
            type="button"
            onClick={clearCart}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Clear Cart
          </button>

          {/* Generate a continue shopping button with blue bg and align center of the screen */}
          <button
            type="button"
            onClick={() => router.push("/")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}
