import React, { useEffect, useState } from 'react';
import { DollarSign, ShoppingBag, Users, Utensils } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';
const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-3xl shadow-sm border flex items-center gap-6">
        <div className={`p-4 rounded-2xl ${color} text-white`}>{icon}</div>
        <div><p className="text-gray-500 text-sm">{title}</p><h3 className="text-3xl font-bold">{value}</h3></div>
    </div>
);
const AdminStats = () => {
    const [stats, setStats] = useState(null);
    useEffect(() => {
        const fetchStats = async () => { try { const { data } = await axiosInstance.get('/admin/stats'); setStats(data); } catch (err) {} };
        fetchStats();
    }, []);
    if (!stats) return <div>Loading Analytics...</div>;
    return (
        <div>
            <h1 className="text-3xl font-playfair font-bold mb-8">Business <span className="text-primary">Overview</span></h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value={`₹${stats.totalRevenue}`} icon={<DollarSign/>} color="bg-green-500" />
                <StatCard title="Total Orders" value={stats.totalOrders} icon={<ShoppingBag/>} color="bg-blue-500" />
                <StatCard title="Total Customers" value={stats.totalCustomers} icon={<Users/>} color="bg-purple-500" />
                <StatCard title="Menu Items" value={stats.totalMenuItems} icon={<Utensils/>} color="bg-primary" />
            </div>
        </div>
    );
};
export default AdminStats;
