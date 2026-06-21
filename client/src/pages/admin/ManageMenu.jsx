import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Plus, Trash2, Edit } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';
const ManageMenu = () => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({ name: '', price: '', description: '', image: '', category: '', isFeatured: false });
    const fetchMenu = async () => {
        const [menuRes, catRes] = await Promise.all([axiosInstance.get('/menu'), axiosInstance.get('/categories')]);
        setItems(menuRes.data); setCategories(catRes.data);
    };
    useEffect(() => { fetchMenu(); }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try { await axiosInstance.post('/menu', formData); toast.success("Dish added!"); setFormData({ name: '', price: '', description: '', image: '', category: '', isFeatured: false }); fetchMenu(); } catch (err) { toast.error("Error adding dish"); }
    };
    const deleteItem = async (id) => {
        if (window.confirm("Delete this item?")) {
            try { await axiosInstance.delete(`/menu/${id}`); toast.success("Item removed"); fetchMenu(); } catch (err) { toast.error("Delete failed"); }
        }
    };
    return (
        <div className="space-y-10">
            <h1 className="text-3xl font-playfair font-bold">Menu <span className="text-primary">Management</span></h1>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border grid grid-cols-1 md:grid-cols-3 gap-6">
                <input placeholder="Dish Name" className="p-3 border rounded-xl" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input placeholder="Price" type="number" className="p-3 border rounded-xl" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                <select className="p-3 border rounded-xl" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
                <input placeholder="Image URL" className="p-3 border rounded-xl" required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
                <input placeholder="Description" className="p-3 border rounded-xl md:col-span-2" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                <button className="bg-primary text-white p-3 rounded-xl flex items-center justify-center gap-2"><Plus size={20}/> Add Dish</button>
            </form>
            <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold"><tr><th className="p-4">Dish</th><th className="p-4">Category</th><th className="p-4">Price</th><th className="p-4 text-right">Actions</th></tr></thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item._id} className="border-t hover:bg-gray-50"><td className="p-4 flex items-center gap-3"><img src={item.image} className="w-10 h-10 rounded-full object-cover" /><span className="font-medium">{item.name}</span></td><td className="p-4 text-gray-500">{item.category?.name}</td><td className="p-4 font-bold text-primary">₹{item.price}</td><td className="p-4 text-right flex justify-end gap-2"><button className="p-2 text-blue-500"><Edit size={18}/></button><button onClick={() => deleteItem(item._id)} className="p-2 text-accent"><Trash2 size={18}/></button></td></tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default ManageMenu;
