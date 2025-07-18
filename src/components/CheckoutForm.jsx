import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { AuthContext } from '../provider/AuthProvider';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

const packagePrice = {
    Silver: 199,
    Gold: 399,
    Platinum: 599
};

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const { plan } = useParams();
    const navigate = useNavigate();

    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);

    const amount = packagePrice[plan?.toLowerCase()] || 0;

    useEffect(() => {
        if (!amount) return;

        axios.post('http://localhost:3000/create-payment-intent', { amount: amount * 100 })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            });
    }, [amount]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setProcessing(true);
        const card = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            toast.error(error.message);
            setProcessing(false);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: user?.displayName || 'Anonymous',
                    email: user?.email || 'unknown@example.com'
                }
            }
        });

        if (confirmError) {
            toast.error(confirmError.message);
            setProcessing(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            const paymentData = {
                name: user.displayName,
                email: user.email,
                package: plan,
                amount,
                transactionId: paymentIntent.id,
                date: new Date()
            };

            const token = await user.getIdToken();

            await axios.post('http://localhost:3000/payments', paymentData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success(`🎉 ${plan} package activated!`);
            navigate('/dashboard/profile');
        }

        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow max-w-lg mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4 text-purple-700">
                Checkout - {plan?.charAt(0).toUpperCase() + plan?.slice(1)} Package
            </h2>

            <p className="mb-4 text-gray-600">Amount: ৳{amount}</p>

            <div className="border p-4 rounded mb-4">
                <CardElement options={{ hidePostalCode: true }} />
            </div>

            <button
                type="submit"
                disabled={!stripe || !clientSecret || processing}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded disabled:opacity-50"
            >
                {processing ? 'Processing...' : `Pay ৳${amount}`}
            </button>
        </form>
    );
};

export default CheckoutForm;
