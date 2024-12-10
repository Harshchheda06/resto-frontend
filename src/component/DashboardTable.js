import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardTable = () => {
  const [orders, setOrders] = useState([]); // Holds orders array
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const loadOrders = async () => {
      try {
        // Fetching orders from the backend API
        const ordersData = await axios.get("http://localhost:8080/api/orders/getAllOrders");

        // Setting the state to the array of orders
        setOrders(ordersData.data); // This ensures you're setting the actual array of orders
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err.message);
        setLoading(false);
      }
    };

    loadOrders();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) return <div className="text-center text-xl font-semibold text-gray-500">Loading...</div>; // Loading state

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Admin Dashboard - Orders</h2>
      <table className="min-w-full bg-gray-100 border-collapse rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Order ID</th>
            <th className="py-2 px-4 text-left">User</th>
            <th className="py-2 px-4 text-left">Items</th>
            <th className="py-2 px-4 text-left">Total Price</th>
            <th className="py-2 px-4 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="bg-white border-b hover:bg-gray-50">
              <td className="py-2 px-4">{order._id}</td>
              <td className="py-2 px-4">{`${order.user.firstName} ${order.user.lastName}`}</td>
              <td className="py-2 px-4">
                {order.items.map((item, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    {item.product.name} (x{item.quantity})
                  </div>
                ))}
              </td>
              <td className="py-2 px-4 text-red-500 font-semibold">
                ₹{order.totalPrice}
              </td>
              <td className="py-2 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
