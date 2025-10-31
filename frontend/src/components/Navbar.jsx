import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu, X, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold text-primary">Digital Access Nepal</h1>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex gap-6 items-center">
                        <Link to="/" className="text-gray-700 hover:text-primary font-medium">Home</Link>
                        {!user ? (
                            <>
                                <Link to="/login" className="text-gray-700 hover:text-primary font-medium">Login</Link>
                                <Link to="/register" className="text-gray-700 hover:text-primary font-medium">Register</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/dashboard" className="text-gray-700 hover:text-primary font-medium">Dashboard</Link>
                                <button
                                    onClick={() => { logout(); navigate('/'); }}
                                    className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile Toggle Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-700 hover:text-primary focus:outline-none"
                        >
                            {menuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t shadow-sm">
                    <div className="flex flex-col space-y-3 p-4">
                        <Link to="/" className="text-gray-700 hover:text-primary" onClick={toggleMenu}>Home</Link>
                        {!user ? (
                            <>
                                <Link to="/login" className="text-gray-700 hover:text-primary" onClick={toggleMenu}>Login</Link>
                                <Link to="/register" className="text-gray-700 hover:text-primary" onClick={toggleMenu}>Register</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/dashboard" className="text-gray-700 hover:text-primary" onClick={toggleMenu}>Dashboard</Link>
                                <button
                                    onClick={() => { logout(); toggleMenu(); navigate('/'); }}
                                    className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
