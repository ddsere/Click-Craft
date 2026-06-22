import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomeScreen: React.FC = () => {
    const [showcases, setShowcases] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchShowcases = async () => {
            try {
                const { data } = await axios.get('/api/showcases');
                setShowcases(data);
            } catch (err: any) {
                setError('Failed to load showcases. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchShowcases();
    }, []);

    const categories = [
        { name: 'Electronics & Tech', icon: '💻', color: 'from-blue-500 to-cyan-500' },
        { name: 'Fashion & Clothing', icon: '👕', color: 'from-purple-500 to-indigo-500' },
        { name: 'Home & Lifestyle', icon: '🛋️', color: 'from-pink-500 to-rose-500' },
        { name: 'Automotive & Parts', icon: '⚙️', color: 'from-emerald-500 to-teal-500' },
    ];

    return (
        <div className="min-h-screen">
            <div className="bg-slate-900 text-white rounded-3xl mx-4 mt-6 p-10 md:p-20 text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-3xl"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
                        Level Up Your Setup 🚀
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 font-medium">
                        Discover epic showcases and top-tier gaming gear from premium sellers.
                    </p>
                    <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition transform shadow-lg">
                        Explore Showcases
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-16">
                <div className="mb-16">
                    <h2 className="text-3xl font-extrabold text-slate-800 mb-8 border-l-4 border-indigo-600 pl-4">Shop by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.map((cat, index) => (
                            <div key={index} className={`bg-gradient-to-br ${cat.color} p-6 rounded-2xl shadow-lg text-white text-center transform hover:-translate-y-2 transition cursor-pointer`}>
                                <div className="text-5xl mb-4">{cat.icon}</div>
                                <h3 className="font-bold text-lg">{cat.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-extrabold text-slate-800 mb-8 border-l-4 border-purple-600 pl-4">Featured Showcases</h2>
                    
                    {loading ? (
                        <div className="text-center text-xl font-bold py-10">Loading Showcases... ⏳</div>
                    ) : error ? (
                        <div className="bg-red-100 text-red-700 p-4 rounded-xl text-center font-semibold">{error}</div>
                    ) : showcases.length === 0 ? (
                        <div className="text-center text-gray-500 py-10 text-lg">No showcases found. Be the first to create one!</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                            {showcases.map((showcase) => (
                                <Link to={`/showcase/${showcase.slug}`} key={showcase._id} className="block group">
                                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transform group-hover:scale-[1.02] transition duration-300">
                                        <div className={`h-48 ${showcase.theme || 'bg-slate-800'} flex items-center justify-center p-6 text-center`}>
                                            <h3 className="text-3xl font-extrabold text-white drop-shadow-md">{showcase.title}</h3>
                                        </div>
                                        <div className="p-6 flex justify-between items-center bg-white">
                                            <div>
                                                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Curated By</p>
                                                <p className="font-bold text-indigo-700 text-lg">
                                                    {showcase.user?.businessName || showcase.user?.name || 'Unknown Seller'}
                                                </p>
                                            </div>
                                            <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-bold">
                                                {showcase.items?.length || 0} Items
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;