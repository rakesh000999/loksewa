import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu, X, LogOut, Book, Home, User } from 'lucide-react';

const NavLink = ({ to, children, onClick }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            onClick={onClick}
            className={`relative px-3 py-2 transition-all duration-300 rounded-lg group hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-700'
                }`}
        >
            <span className="relative z-10">{children}</span>
            {isActive && (
                <div className="absolute inset-0 bg-blue-50 rounded-lg -z-0"></div>
            )}
            <div className="absolute inset-0 bg-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -z-0"></div>
        </Link>
    );
};

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-white'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                            <Book size={24} />
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:to-purple-600 transition-all duration-300">
                            Digital Access Nepal
                        </h1>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-1">
                        <NavLink to="/"><Home size={18} className="inline mr-1" /> Home</NavLink>
                        {!user ? (
                            <>
                                <NavLink to="/login"><User size={18} className="inline mr-1" /> Login</NavLink>
                                <Link
                                    to="/register"
                                    className="ml-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    Get Started
                                </Link>
                            </>
                        ) : (
                            <>
                                <NavLink to="/dashboard">Dashboard</NavLink>
                                <button
                                    onClick={() => { logout(); navigate('/'); }}
                                    className="ml-2 flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
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
                            className="text-gray-700 hover:text-blue-600 focus:outline-none transition-colors duration-300"
                        >
                            {menuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white/80 backdrop-blur-lg border-t">
                    <div className="flex flex-col space-y-1 p-4">
                        <NavLink to="/" onClick={toggleMenu}>
                            <Home size={18} className="inline mr-2" /> Home
                        </NavLink>
                        {!user ? (
                            <>
                                <NavLink to="/login" onClick={toggleMenu}>
                                    <User size={18} className="inline mr-2" /> Login
                                </NavLink>
                                <Link
                                    to="/register"
                                    onClick={toggleMenu}
                                    className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-lg text-center transition-all duration-300"
                                >
                                    Get Started
                                </Link>
                            </>
                        ) : (
                            <>
                                <NavLink to="/dashboard" onClick={toggleMenu}>Dashboard</NavLink>
                                <button
                                    onClick={() => { logout(); toggleMenu(); navigate('/'); }}
                                    className="mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg w-full transition-all duration-300"
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
