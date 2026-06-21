import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { type RootState } from "../store/store";

const ProfileScreen: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const { data } = await axios.get("/api/orders/myorders", config);
        setOrders(data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [userInfo, navigate]);

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/4">
          <h2 className="text-3xl font-bold mb-6 text-slate-800 border-b pb-2">
            User Profile
          </h2>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-1">
                Name
              </label>
              <p className="text-xl font-bold text-indigo-700">
                {userInfo?.name}
              </p>
            </div>
            <div>
              <label className="block text-gray-600 font-semibold mb-1">
                Email Address
              </label>
              <p className="text-lg text-slate-800">{userInfo?.email}</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-gray-600 font-semibold mb-1">
            Account Type
          </label>
          <span
            className={`px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${userInfo?.role === "admin" ? "bg-red-100 text-red-700" : userInfo?.role === "seller" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}
          >
            {userInfo?.role || "Customer"}
          </span>
        </div>

        {userInfo?.role === "customer" && (
          <div className="mt-8 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
            <h3 className="font-bold text-indigo-900 mb-2">
              Want to sell your own products?
            </h3>
            <Link
              to="/become-seller"
              className="block text-center bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Become a Seller
            </Link>
          </div>
        )}

        {(userInfo?.role === "seller" || userInfo?.role === "admin") && (
          <div className="mt-8 bg-purple-50 p-4 rounded-xl border border-purple-100">
            <h3 className="font-bold text-purple-900 mb-2">
              Manage Your Store
            </h3>
            <Link
              to="/seller-dashboard"
              className="block text-center bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition shadow"
            >
              Go to Seller Dashboard 📊
            </Link>
          </div>
        )}

        <div className="md:w-3/4">
          <h2 className="text-3xl font-bold mb-6 text-slate-800 border-b pb-2">
            My Orders
          </h2>

          {loading ? (
            <div className="text-xl font-bold">Loading Orders... ⏳</div>
          ) : error ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg">
              {error}
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-lg">
              You have no orders yet.{" "}
              <Link to="/" className="font-bold underline">
                Go Shopping!
              </Link>
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-800 text-white">
                      <th className="p-4 font-semibold text-sm uppercase tracking-wider">
                        ID
                      </th>
                      <th className="p-4 font-semibold text-sm uppercase tracking-wider">
                        Date
                      </th>
                      <th className="p-4 font-semibold text-sm uppercase tracking-wider">
                        Total
                      </th>
                      <th className="p-4 font-semibold text-sm uppercase tracking-wider">
                        Paid
                      </th>
                      <th className="p-4 font-semibold text-sm uppercase tracking-wider">
                        Delivered
                      </th>
                      <th className="p-4 font-semibold text-sm uppercase tracking-wider">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr
                        key={order._id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="p-4 text-sm text-gray-700 font-medium">
                          {order._id.substring(0, 8)}...
                        </td>
                        <td className="p-4 text-sm text-gray-700">
                          {order.createdAt.substring(0, 10)}
                        </td>
                        <td className="p-4 text-sm font-bold text-indigo-600">
                          Rs. {order.totalPrice.toLocaleString()}
                        </td>
                        <td className="p-4 text-sm">
                          {order.isPaid ? (
                            <span className="text-green-600 font-bold">
                              {order.paidAt.substring(0, 10)}
                            </span>
                          ) : (
                            <span className="text-red-500 font-bold">✕</span>
                          )}
                        </td>
                        <td className="p-4 text-sm">
                          {order.isDelivered ? (
                            <span className="text-green-600 font-bold">
                              {order.deliveredAt.substring(0, 10)}
                            </span>
                          ) : (
                            <span className="text-red-500 font-bold">✕</span>
                          )}
                        </td>
                        <td className="p-4 text-sm">
                          <Link
                            to={`/order/${order._id}`}
                            className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md font-semibold hover:bg-indigo-200 transition"
                          >
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
      </div>
    </div>
  );
};

export default ProfileScreen;
