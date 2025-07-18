import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const PaymentHistory = () => {
    const { user, loading } = useContext(AuthContext);

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['paymentHistory', user?.email],
        enabled: !loading && !!user,
        queryFn: async () => {
            const token = await user.getIdToken(true);  // force-refresh token
            const res = await axios.get('http://localhost:3000/payments/user', {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        },
    });

    console.log("Frontend - User:", user);
    console.log("Frontend - AuthContext loading:", loading);
    console.log("Frontend - useQuery isLoading:", isLoading);
    console.log("Frontend - Payments received:", payments, payments.length);

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <h2 className="text-3xl font-bold mb-6 text-purple-700">💳 My Payment History</h2>

            {isLoading ? (
                <p className="text-gray-600">Loading...</p>
            ) : payments.length === 0 ? (
                <p className="text-gray-500">You have no payments yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 text-sm">
                        <thead className="bg-purple-100 text-purple-800">
                            <tr>
                                <th className="px-4 py-2 text-left">Package</th>
                                <th className="px-4 py-2 text-center">Amount</th>
                                <th className="px-4 py-2 text-center">Date</th>
                                <th className="px-4 py-2 text-center">Transaction ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment._id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2 capitalize">{payment.package}</td>
                                    <td className="px-4 py-2 text-center">৳{payment.amount}</td>
                                    <td className="px-4 py-2 text-center">
                                        {payment.date ? new Date(payment.date).toLocaleString() : 'N/A'}
                                    </td>
                                    <td className="px-4 py-2 text-center">{payment.transactionId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;
