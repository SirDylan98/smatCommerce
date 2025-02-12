import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'LCD Monitor',
      price: 650,
      quantity: 1,
      image: '/api/placeholder/80/80'
    },
    {
      id: 2,
      name: 'H1 Gamepad',
      price: 550,
      quantity: 2,
      image: '/api/placeholder/80/80'
    }
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <a href="/" className="hover:text-gray-700">Home</a>
        <span>/</span>
        <span className="text-gray-700">Cart</span>
      </div>

      {/* Cart Content */}
      <div className="mb-8">
        {/* Header */}
        <div className="grid grid-cols-4 gap-4 pb-4 border-b">
          <div className="text-sm font-medium">Product</div>
          <div className="text-sm font-medium">Price</div>
          <div className="text-sm font-medium">Quantity</div>
          <div className="text-sm font-medium text-right">Subtotal</div>
        </div>

        {/* Cart Items */}
        {cartItems.map((item) => (
          <div key={item.id} className="grid grid-cols-4 gap-4 py-4 border-b items-center">
            <div className="flex items-center gap-4">
          
              <span className="font-medium">{item.name}</span>
            </div>
            <div className="text-gray-600">
              ${item.price}
            </div>
            <div className="flex items-center">
              <div className="flex items-center border rounded">
                <input
                  type="text"
                  value={item.quantity.toString().padStart(2, '0')}
                  className="w-12 text-center border-none focus:outline-none"
                  readOnly
                />
                <div className="flex flex-col">
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-2 py-1 hover:bg-gray-100"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-2 py-1 hover:bg-gray-100"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="text-right font-medium">
              ${item.price * item.quantity}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-between mb-8">
        <Button
          variant="outline"
          onClick={() => window.history.back()}
        >
          Return To Shop
        </Button>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
        >
          Update Cart
        </Button>
      </div>

      {/* Cart Total */}
      <div className="ml-auto max-w-sm w-full">
        <div className="border rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Cart Total</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${calculateSubtotal()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Total:</span>
              <span>${calculateSubtotal()}</span>
            </div>
          </div>
          <Button className="w-full" onClick={() => alert('Proceeding to checkout')}>
            Proceed to checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;