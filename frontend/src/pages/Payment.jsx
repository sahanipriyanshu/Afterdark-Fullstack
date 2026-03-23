import React from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, CreditCard, Smartphone, QrCode } from 'lucide-react';

const Payment = ({ user, onPaymentComplete, upiId }) => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_SURw1qFabMMyAW';

  const handleRazorpay = async () => {
    try {
      // 1. Create Order on Backend
      const res = await fetch(`${API_URL}/api/payment/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const order = await res.json();

      if (!res.ok) throw new Error(order.message || "Failed to create order");

      // 2. Open Razorpay Checkout
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "AfterDark Game",
        description: "Full Access Unlock",
        order_id: order.id,
        handler: async (response) => {
          // 3. Verify Payment on Backend
          try {
            const verifyRes = await fetch(`${API_URL}/api/payment/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: user.id
              })
            });

            const verifyData = await verifyRes.json();
            if (verifyData.status === 'success') {
              onPaymentComplete();
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            alert("Verification Error: " + err.message);
          }
        },
        prefill: {
          email: user.email
        },
        theme: {
          color: "#FF3C5F"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Order Error: " + err.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'var(--glass-bg)',
          padding: '2.5rem',
          borderRadius: '24px',
          border: '1px solid var(--glass-border)',
          textAlign: 'center',
          backdropFilter: 'blur(20px)'
        }}
      >
        <div style={{ 
          width: '70px', 
          height: '70px', 
          background: 'rgba(255, 60, 95, 0.1)', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto 1.5rem',
          color: 'var(--accent-red)'
        }}>
          <IndianRupee size={32} />
        </div>

        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>One-Time Access</h2>
        <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>
          Unlock AfterDark forever for just **₹10**. <br/>Support the creators and ignite the heat.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleRazorpay}
            style={{
              padding: '1.2rem',
              borderRadius: '16px',
              border: 'none',
              background: 'white',
              color: '#000',
              fontWeight: 800,
              fontSize: '1.1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              boxShadow: '0 10px 20px rgba(255,255,255,0.1)'
            }}
          >
            <Smartphone size={24} /> Pay via UPI / Razorpay
          </motion.button>

          <div style={{ margin: '1rem 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>OR PAY DIRECTLY</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }} />
          </div>

          <div style={{ 
            background: 'rgba(255,255,255,0.03)', 
            padding: '1.2rem', 
            borderRadius: '12px', 
            border: '1px dashed var(--glass-border)'
          }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>Direct UPI ID:</p>
            <p style={{ fontSize: '1.1rem', fontWeight: 600, letterSpacing: '1px', color: 'var(--accent-gold)' }}>
              {upiId || "sahanipriyanshu@upi"}
            </p>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '0.8rem', opacity: 0.6 }}>
               After paying, the app will auto-unlock (requires manual verification in dev).
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Payment;
