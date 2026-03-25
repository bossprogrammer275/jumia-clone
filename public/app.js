import React, { useState } from 'react';
import './App.css';

const products = [
    { id: 1, name: 'Product 1', price: 10.99 },
    { id: 2, name: 'Product 2', price: 12.99 },
    { id: 3, name: 'Product 3', price: 8.99 },
];

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const addToWishlist = (product) => {
        setWishlist([...wishlist, product]);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">E-commerce Application</h1>
            <input
                type="text"
                placeholder="Search products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded p-2 mb-4 w-full"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredProducts.map(product => (
                    <div key={product.id} className="border p-4 rounded shadow">
                        <h2 className="font-semibold">{product.name}</h2>
                        <p className="text-lg">${product.price}</p>
                        <button
                            onClick={() => addToCart(product)}
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={() => addToWishlist(product)}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Add to Wishlist
                        </button>
                    </div>
                ))}
            </div>
            <h2 className="text-xl font-bold mt-6">Shopping Cart</h2>
            <ul>
                {cart.map(item => (<li key={item.id}>{item.name} - ${item.price}</li>))}
            </ul>
            <h2 className="text-xl font-bold mt-6">Wishlist</h2>
            <ul>
                {wishlist.map(item => (<li key={item.id}>{item.name} - ${item.price}</li>))}
            </ul>
        </div>
    );
}

export default App;