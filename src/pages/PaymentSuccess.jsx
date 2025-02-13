
import React from 'react';
import { useEffect, useState } from "react";
import { CheckCircle, Package, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getPaymentBySessionId } from '@/Service/apiServices';
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const [paymentStatus, setPaymentStatus] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("useEffect triggered");
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (sessionId) {
      console.log("Session ID found:", sessionId);
      verifyPayment(sessionId);
    } else {
      console.log("No session ID found");
      setError("No session ID found");
      setIsLoading(false);
    }
  }, []);
  const notification = (msg) => {
    toast(msg, {
      autoClose: 2000,
      style: { background: "#000000", color: "white" },
    });
    
  };

  const verifyPayment = async (sessionId) => {
    console.log("Verifying payment for session:", sessionId);
    try {
      setIsLoading(true);
      const response = await getPaymentBySessionId(sessionId);
      console.log("Payment verification response:", response);

      if (response.status === 200 && response.data) {
        notification("Payment verified successfully");
        setOrderNumber(response.data.orderId);
        setPaymentStatus(response.data.status);
        setError(null);
        console.log("=============================================>");
      } else {
        console.log("Payment verification failed");
        toast.warning("Payment verification failed");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      notification("Something went wrong while verifying the payment");
    } finally {
      console.log("Payment verification process completed");
      setIsLoading(false);
    }
  };



  const handleReturnHome = (e) => {
    e.preventDefault();
    navigate("/")
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-lg">
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-lg">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-bold text-gray-900">Payment Verification Failed</h1>
              {/* <p className="text-gray-600">{error}</p> */}
              <Button 
                variant="outline"
                className="mt-4"
                onClick={handleReturnHome}
              >
                Return to Homepage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <ToastContainer/>
      <Card className="w-full max-w-lg">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-black mx-auto" />
            <h1 className="text-2xl font-bold text-gray-900">Thank You!</h1>
            <p className="text-gray-600">
              Your payment was successful and your order is being processed.
            </p>
          </div>

          <div className="mt-8 space-y-4 bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium text-gray-900">{orderNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="inline-flex items-center gap-1.5">
                <Package className="w-4 h-4 text-green-500" />
                <span className="font-medium text-green-500">{paymentStatus}</span>
              </span>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <p className="text-sm text-blue-600 font-semibold text-center">
              A confirmation email has been sent to your email address with the order details.
            </p>
            
            <div className="flex flex-col gap-3"> 
              <Button 
                variant="outline"
                className="w-full inline-flex bg-black text-white items-center justify-center gap-2"
                onClick={handleReturnHome}
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Homepage
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    
  );
};

export default PaymentSuccess;