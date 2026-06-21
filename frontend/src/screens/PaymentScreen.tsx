import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../store/store';
import { savePaymentMethod } from '../store/slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen: React.FC = () => {
    const navigate = useNavigate();
    const cart = useSelector((state: RootState) => state.cart);
    const { shippingAddress, paymentMethod: defaultPaymentMethod } = cart;

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const [paymentMethod, setPaymentMethod] = useState(defaultPaymentMethod || 'PayPal');
    const dispatch = useDispatch();

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-xl">
            <CheckoutSteps step1 step2 step3 />

            <h1 className="text-4xl font-extrabold mb-8 text-center text-slate-800">
                Payment Method 💳
            </h1>

            <form onSubmit={submitHandler} className="space-y-6">
                <div className="flex flex-col space-y-4">
                    <label className="text-lg font-semibold text-gray-700 mb-2">Select Method</label>
                    
                    <div className="flex items-center bg-gray-50 p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-indigo-50 transition">
                        <input
                            type="radio"
                            className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                            id="PayPal"
                            name="paymentMethod"
                            value="PayPal"
                            checked={paymentMethod === 'PayPal'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="PayPal" className="ml-3 text-lg font-medium text-gray-800 cursor-pointer flex-grow">
                            PayPal or Credit Card
                        </label>
                    </div>

                    <div className="flex items-center bg-gray-50 p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-indigo-50 transition">
                        <input
                            type="radio"
                            className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                            id="COD"
                            name="paymentMethod"
                            value="Cash On Delivery"
                            checked={paymentMethod === 'Cash On Delivery'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="COD" className="ml-3 text-lg font-medium text-gray-800 cursor-pointer flex-grow">
                            Cash On Delivery (COD)
                        </label>
                    </div>
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-1 text-lg mt-8"
                >
                    Continue to Place Order
                </button>
            </form>
        </div>
    );
};

export default PaymentScreen;