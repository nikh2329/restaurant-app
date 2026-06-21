import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import { Package, CheckCircle } from 'lucide-react';
const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const fetchOrders = async () => { try { const { data } = await axiosInstance.get('/orders'); setOrders(data); } catch (err) {} };
    useEffect(() => { fetchOrders(); }, []);
    const updateStatus = async (id, status) => {
        try { await axiosInstance.put(`/orders/${id}/status`, { orderStatus: status }); toast.success("Status updated"); fetchOrders(); } catch (err) { toast.error("Update failed"); }
    };
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-playfair font-bold">Order <span className="text-primary">Tracking</span></h1>
            <div className="grid grid-cols-1 gap-4">
                {orders.map(order => (
                    <div key={order._id} className="bg-white p-6 rounded-3xl border shadow-sm flex justify-between items-center">
                        <div className="flex items-center gap-4"><div className="p-3 bg-gray-100 rounded-full text-gray-500"><Package size={24}/></div><div><p className="font-bold">{order.user?.name}</p><p className="text-sm text-gray-400">ID: {order._id}</p></div></div>
                        <div className="text-center"><p className="text-sm text-gray-500 mb-1">Total</p><p className="text-xl font-bold text-primary">₹{order.totalPrice}</p></div>
                        <div className="flex items-center gap-3">
                            <select value={order.orderStatus} onChange={(e) => updateStatus(order._id, e.target.value)} className="p-2 border rounded-lg bg-gray-50 font-medium outline-none">
                                <option>Processing</option><option>Preparing</option><option>Out for Delivery</option><option>Delivered</option><option>Cancelled</option>
                            </select>
                            <CheckCircle className="text-green-500" size={24} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ManageOrders;
