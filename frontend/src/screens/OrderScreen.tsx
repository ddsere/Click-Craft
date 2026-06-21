import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { type RootState } from '../store/store';

const OrderScreen: React.FC = () => {
    const { id: orderId } = useParams<{ id: string }>();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { userInfo } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };
                const { data } = await axios.get(`/api/orders/${orderId}`, config);
                setOrder(data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch order');
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId, userInfo]);

    if (loading) return <div className="text-center mt-20 text-2xl font-bold">Loading Order Details... ⏳</div>;
    if (error) return <div className="text-center mt-20 text-red-600 text-xl">Error: {error}</div>;

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6">
            <h1 className="text-3xl font-extrabold mb-8 text-slate-800 break-words">
                Order <span className="text-indigo-600">#{order._id}</span>
            </h1>

            <div className="flex flex-col lg:flex-row gap-10 mt-8">
                <div className="w-full lg:w-2/3 space-y-8">
                    
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b pb-2">Shipping</h2>
                        <p className="text-gray-700 mb-2"><strong>Name: </strong> {order.user.name}</p>
                        <p className="text-gray-700 mb-4"><strong>Email: </strong> {order.user.email}</p>
                        <p className="text-gray-700 mb-4">
                            <strong>Address: </strong> 
                            {order.shippingAddress.address}, {order.shippingAddress.city}, {' '}
                            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? (
                            <div className="bg-green-100 text-green-800 p-3 rounded-lg font-semibold">Delivered on {order.deliveredAt.substring(0, 10)}</div>
                        ) : (
                            <div className="bg-red-100 text-red-800 p-3 rounded-lg font-semibold">Not Delivered Yet</div>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b pb-2">Payment Method</h2>
                        <p className="text-gray-700 mb-4">
                            <strong>Method: </strong> 
                            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-semibold text-sm ml-2">{order.paymentMethod}</span>
                        </p>
                        {order.isPaid ? (
                            <div className="bg-green-100 text-green-800 p-3 rounded-lg font-semibold">Paid on {order.paidAt.substring(0, 10)}</div>
                        ) : (
                            <div className="bg-red-100 text-red-800 p-3 rounded-lg font-semibold">Not Paid</div>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b pb-2">Order Items</h2>
                        <div className="divide-y divide-gray-200">
                            {order.orderItems.map((item: any, index: number) => (
                                <div key={index} className="py-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        {item.image && <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md shadow" />}
                                        <Link to={`/`} className="text-lg font-bold text-indigo-600 hover:underline">{item.name}</Link>
                                    </div>
                                    <div className="text-lg font-medium text-gray-700">
                                        {item.qty} x {item.price} = <span className="font-bold text-slate-900">Rs. {(Number(item.price.replace(/[^0-9.-]+/g, "")) * item.qty).toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/3">
                    <div className="bg-slate-50 p-8 rounded-2xl shadow-lg border border-slate-200 sticky top-10">
                        <h2 className="text-2xl font-extrabold mb-6 text-slate-800 border-b pb-4">Order Summary</h2>
                        <div className="space-y-4 text-lg text-gray-700">
                            <div className="flex justify-between">
                                <span>Items:</span>
                                <span className="font-semibold">Rs. {order.itemsPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery:</span>
                                <span className="font-semibold">Rs. {order.shippingPrice.toLocaleString()}</span>
                            </div>
                            <hr className="my-4 border-gray-300" />
                            <div className="flex justify-between text-2xl font-extrabold text-indigo-700">
                                <span>Total:</span>
                                <span>Rs. {order.totalPrice.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderScreen;