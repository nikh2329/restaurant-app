import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) setCart(JSON.parse(storedCart));
    }, []);
    useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
    const addToCart = (product) => {
        setCart((prev) => {
            const exists = prev.find(item => item._id === product._id);
            if (exists) return prev.map(item => item._id === product._id ? { ...item, qty: item.qty + 1 } : item);
            return [...prev, { ...product, qty: 1 }];
        });
        toast.success(`${product.name} added to cart!`);
    };
    const removeFromCart = (id) => setCart(prev => prev.filter(item => item._id !== id));
    const updateQty = (id, qty) => setCart(prev => prev.map(item => item._id === id ? { ...item, qty } : item));
    const clearCart = () => setCart([]);
    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    return <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal }}>{children}</CartContext.Provider>;
};