import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { type RootState } from '../store/store';

const SellerDashboardScreen: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { userInfo } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo || (userInfo.role !== 'seller' && userInfo.role !== 'admin')) {
            navigate('/profile');
            return;
        }

        const fetchSellerOrders = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };
                const { data } = await axios.get('/api/orders/seller-orders', config);
                setOrders(data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchSellerOrders();
    }, [userInfo, navigate]);

    return (
        <div className="max-w-7xl mx-auto mt-10 p-6">
            <div className="flex items-center justify-between border-b pb-4 mb-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-800">🏪 Seller Dashboard</h1>
                    <p className="text-gray-500 mt-1">Manage the orders you received from your showcases.</p>
                </div>
                <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg font-bold text-lg shadow-sm">
                    Total Orders: {orders.length}
                </div>
            </div>

            {loading ? (
                <div className="text-xl font-bold text-center mt-10">Loading Your Orders... ⏳</div>
            ) : error ? (
                <div className="bg-red-100 text-red-700 p-4 rounded-xl border border-red-200">{error}</div>
            ) : orders.length === 0 ? (
                <div className="bg-indigo-50 text-indigo-800 p-8 rounded-2xl text-center shadow-sm border border-indigo-100 mt-8">
                    <span className="text-4xl block mb-4">📭</span>
                    <h2 className="text-2xl font-bold mb-2">No orders yet!</h2>
                    <p className="text-lg">Share your showcases to get more sales.</p>
                </div>
            ) : (
                <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 mt-6">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-800 text-white">
                                    <th className="p-4 font-semibold text-sm uppercase tracking-wider">Order ID</th>
                                    <th className="p-4 font-semibold text-sm uppercase tracking-wider">Customer</th>
                                    <th className="p-4 font-semibold text-sm uppercase tracking-wider">Date</th>
                                    <th className="p-4 font-semibold text-sm uppercase tracking-wider">Total</th>
                                    <th className="p-4 font-semibold text-sm uppercase tracking-wider">Paid</th>
                                    <th className="p-4 font-semibold text-sm uppercase tracking-wider">Delivered</th>
                                    <th className="p-4 font-semibold text-sm uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50 transition">
                                        <td className="p-4 text-sm font-medium text-gray-700">{order._id.substring(0, 8)}...</td>
                                        <td className="p-4 text-sm font-bold text-indigo-600">{order.user ? order.user.name : 'Unknown'}</td>
                                        <td className="p-4 text-sm text-gray-600">{order.createdAt.substring(0, 10)}</td>
                                        <td className="p-4 text-sm font-bold text-slate-800">Rs. {order.totalPrice.toLocaleString()}</td>
                                        <td className="p-4 text-sm">
                                            {order.isPaid ? (
                                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-bold text-xs">Paid</span>
                                            ) : (
                                                <span className="bg-red-100 text-red-700 px-2 py-1 rounded font-bold text-xs">No</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-sm">
                                            {order.isDelivered ? (
                                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-bold text-xs">Yes</span>
                                            ) : (
                                                <span className="bg-red-100 text-red-700 px-2 py-1 rounded font-bold text-xs">Pending</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-sm">
                                            <Link to={`/order/${order._id}`} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition shadow">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellerDashboardScreen;