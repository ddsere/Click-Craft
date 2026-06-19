import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../store/store';
import { logout } from '../store/slices/authSlice';

const Header: React.FC = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <header className="bg-slate-900 shadow-md">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold tracking-wider">
                    ClickCraft <span className="text-indigo-500">🚀</span>
                </Link>
                
                <div className="flex space-x-6 items-center">
                    {userInfo ? (
                        <>
                            <Link to="/create-showcase" className="text-gray-300 hover:text-white font-medium mr-4 transition">
                                + Create Showcase
                            </Link>

                            <span className="text-gray-300 font-medium">
                                Hi, <span className="text-white">{userInfo.name}</span>
                            </span>
                            <button 
                                onClick={logoutHandler}
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 text-sm font-semibold ml-4"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-300 hover:text-white font-medium transition">
                                Login
                            </Link>
                            <Link to="/register" className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition duration-300 font-medium">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;