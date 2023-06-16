"use client";

import Image from "next/image";
import React from "react";

type CartItemProps = {
  item: {
    id: number;
    title: string;
    photo: string;
    price: number;
    quantity: number;
  };
  onRemoveItem: (id: number) => void;
};

export default function CartItem({ item, onRemoveItem }: CartItemProps) {
  const { id, title, photo, price, quantity } = item;

  const handleRemoveItem = () => {
    onRemoveItem(id);
  };

  return (
    <div className="flex items-center mb-4">
      <Image
        src={photo}
        alt={title}
        height={100}
        width={100}
        className="w-16 h-16 mr-4"
      />
      <div className="flex-grow">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-gray-600">${price}</p>
        <p className="text-gray-600">Quantity: {quantity}</p>
      </div>
      <button
        onClick={handleRemoveItem}
        className="ml-4 text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
}
