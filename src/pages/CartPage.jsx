import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown, Trash2, RefreshCw, Search, House } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {
  addToCart,
  checkOutCart,
  getUserCart,
  removeFromCart,
  subtractFromCart,
} from "@/Service/apiServices";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingItems, setUpdatingItems] = useState(new Set());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate()
  const notification = (msg) => {
    toast(msg, {
      autoClose: 2000,
      style: { background: "#000000", color: "white" },
    });
    
  };

  useEffect(() => {
    fetchCartItems();
  }, []);



  const fetchCartItems = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getUserCart("R1813716x");
      setCartItems(response.data.body.items);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to fetch cart items. Please try again later."
      );
      console.error("Error fetching cart:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleAddToCart = async (productCode, productName) => {
    let request = {
      uniqueKey: uuidv4(), // ✅ No need for .toString
      productId: productCode,
      productName: productName, // ✅ Pass product name correctly
      userId: "R1813716x",
      quantity: 1,
    };

    console.log("====> This is Add to Cart Request Body", request);

    try {
      const response = await addToCart(request); // ✅ Ensure await is used
      if (response.status === 200) {
        notification("Added to Cart Successfully");
      } else {
        toast.error("Error in adding to Cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  const updateQuantity = async (id, delta) => {
    const item = cartItems.find((item) => item.productId === id);
    const newQuantity = item.quantity + delta;
    let request = {
      uniqueKey: uuidv4(), // ✅ No need for .toString
      productId: item?.productId,
      productName: item?.productName, // ✅ Pass product name correctly
      userId: "R1813716x",
      quantity: 1,
    };
    // Prevent invalid quantities
    if (newQuantity < 1 || newQuantity > (item.maxQuantity || 99)) return;

    try {
      setUpdatingItems((prev) => new Set(prev).add(id));
      if (delta == 1) {
        const response = await addToCart(request); // ✅ Ensure await is used
        if (response.status === 200) {
          notification("Added to Cart Successfully");
        } else {
        }

        if (response.status === 200) {
          setCartItems((items) =>
            items.map((item) =>
              item.productId === id ? { ...item, quantity: newQuantity } : item
            )
          );
        } else {
          toast.error("Error in adding to Cart");
        }
      } else {
        // mean we are removing from cat
        const response = await subtractFromCart(request); //
        if (response.status === 200) {
          notification("Successfully reduced quantity");
        } else {
        }

        if (response.status === 200) {
          setCartItems((items) =>
            items.map((item) =>
              item.productId === id ? { ...item, quantity: newQuantity } : item
            )
          );
        } else {
          toast.error("Error in adding to Cart");
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update quantity. Please try again."
      );
      console.error("Error updating quantity:", err);
    } finally {
      setUpdatingItems((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const removeItem = async (id) => {
    try {
      setUpdatingItems((prev) => new Set(prev).add(id));
      const response = await removeFromCart("R1813716x", id);

      if (response.status === 200) {
        setCartItems((items) => items.filter((item) => item?.productId !== id));
        setError(null);
        notification("Successfully removed Product from cart");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to remove item. Please try again."
      );
      console.error("Error removing item:", err);
    } finally {
      setUpdatingItems((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };
  const handleCheckout = async (userId) => {
    let request = {
      uniqueKey: uuidv4(),
      userId: userId,
      currency: "USD",
      shippingAddress: shippingAddress,
    };

    try{
        const response = await checkOutCart(request);
        if(response.data.statusCode==200){
          notification("Order Initiated Successfully ")

          let redirectURl= response.data.body.checkoutUrl;
          if (redirectURl) {
            window.location.href = redirectURl; // Redirects the user to stripe
          } else {
            toast.error("Checkout URL not found!");
          }

        }
        else{
          toast.error("Failed to initial Order")
        }
    }catch(error){

    }

  };
  const refreshCart = async () => {
    setIsRefreshing(true);
    await fetchCartItems();
    setIsRefreshing(false);
  };

  const calculateSubtotal = () => {
    return cartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const shipping = 0; // Free shipping
    return (subtotal + shipping).toFixed(2);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ToastContainer/>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <a href="/" className="hover:text-gray-700 transition-colors">
          Home
        </a>
        <span>/</span>
        <span className="text-gray-700">Cart</span>
      </nav>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Cart Content */}
      <div className="mb-8">
        {/* Header */}
        <div className="grid grid-cols-5 gap-4 pb-4 border-b">
          <div className="text-sm font-medium">Product</div>
          <div className="text-sm font-medium">Price</div>
          <div className="text-sm font-medium">Quantity</div>
          <div className="text-sm font-medium text-right">Subtotal</div>
          <div className="text-sm font-medium text-right">Actions</div>
        </div>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <div className="py-16 text-center">
            <div className="text-gray-500 mb-4">Your cart is empty</div>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
              className="mx-auto"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.productId}
              className={`grid grid-cols-5 gap-4 py-4 border-b items-center transition-opacity duration-200 ${
                updatingItems.has(item.id) ? "opacity-50" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={`http://localhost:8086/api/v1/products/uploads/${item?.productImage}`}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded bg-gray-100"
                />
                <div className="space-y-1">
                  <div className="font-medium">{item?.productName}</div>
                  {item.variant && (
                    <div className="text-sm text-gray-500">{item?.variant}</div>
                  )}
                </div>
              </div>
              <div className="text-gray-600">${item?.price?.toFixed(2)}</div>
              <div className="flex items-center">
                <div className="flex items-center border rounded">
                  <input
                    type="text"
                    value={item?.quantity.toString().padStart(2, "0")}
                    className="w-12 text-center border-none focus:outline-none"
                    readOnly
                  />
                  <div className="flex flex-col border-l">
                    <button
                      onClick={() => updateQuantity(item.productId, 1)}
                    
                      disabled={
                        updatingItems.has(item?.productId) ||
                        item.quantity >= (item?.maxQuantity || 99)
                      }
                      className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => updateQuantity(item.productId, -1)}
                      disabled={
                        updatingItems.has(item?.productId) ||
                        item?.quantity <= 1
                      }
                      className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right font-medium">
                ${(item?.price * item?.quantity).toFixed(2)}
              </div>
              <div className="text-right">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeItem(item?.productId)}
                  disabled={updatingItems.has(item?.productId)}
                  className="inline-flex items-center"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <>
          {/* Actions */}
          <div className="flex justify-between mb-8">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </Button>
            <Button
              variant="outline"
              onClick={refreshCart}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh Cart
            </Button>
          </div>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Shipping Address..."
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
            <House className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Cart Total */}
          <div className="ml-auto max-w-sm w-full pt-3">
            <div className="border rounded-lg p-6 space-y-4">
              <h2 className="text-lg font-bold">Cart Summary</h2>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${calculateSubtotal()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={() => handleCheckout("R1813716x")}
              >
                Proceed to Checkout
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Shipping & taxes calculated at checkout
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
