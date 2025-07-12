import { Link, NavLink } from 'react-router'
import { Bell, LogOut, Menu, User } from 'lucide-react'
import { useContext, useState } from 'react'
import { AuthContext } from '../provider/AuthProvider'
// import defaultAvatar from '../assets/default-avatar.png'

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext)
    const [menuOpen, setMenuOpen] = useState(false)

    const navLinks = (
        <>
            <NavLink to="/" className="hover:text-purple-500 transition">Home</NavLink>
            <NavLink to="/meals" className="hover:text-purple-500 transition">Meals</NavLink>
            <NavLink to="/upcoming-meals" className="hover:text-purple-500 transition">Upcoming Meals</NavLink>
        </>
    )

    return (
        <div className="bg-white/30 backdrop-blur-md shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
               
                <Link to="/" className="flex items-center gap-2 text-xl font-bold text-purple-700">
                    <img src="/logo.png" alt="Logo" className="w-8 h-8" />
                    MealNest
                </Link>

               
                <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
                    {navLinks}
                    <Bell className="w-5 h-5 hover:text-purple-500 cursor-pointer" />
                    {!user ? (
                        <Link to="/join" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full shadow">
                            Join Us
                        </Link>
                    ) : (
                        <div className="relative group">
                            <img
                                src={user?.photoURL}
                                alt="Profile"
                                className="w-9 h-9 rounded-full border-2 border-purple-500 cursor-pointer"
                            />
                            <div className="absolute right-0 top-12 hidden group-hover:flex flex-col bg-white shadow-lg rounded-md p-3 text-sm z-50 min-w-[150px]">
                                <span className="text-gray-600">{user.displayName || 'User'}</span>
                                <NavLink to="/dashboard" className="hover:text-purple-500">Dashboard</NavLink>
                                <button onClick={logoutUser} className="text-red-500 hover:underline flex items-center gap-1 mt-1">
                                    <LogOut size={16} /> Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>

               
                <div className="md:hidden flex items-center gap-3">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        <Menu className="w-6 h-6 text-purple-700" />
                    </button>
                </div>
            </div>

            
            {menuOpen && (
                <div className="md:hidden px-4 py-2 flex flex-col gap-2 bg-white shadow-md">
                    {navLinks}
                    <Bell className="w-5 h-5 text-gray-700" />
                    {!user ? (
                        <Link to="/join" className="bg-purple-600 text-white py-2 rounded text-center">Join Us</Link>
                    ) : (
                        <div className="flex flex-col text-sm gap-1">
                            <span className="text-gray-700">{user.displayName || 'User'}</span>
                            <NavLink to="/dashboard">Dashboard</NavLink>
                            <button onClick={logoutUser} className="text-red-500 text-left">Logout</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Navbar
