import { Link, NavLink } from 'react-router'
import { Bell, LogOut, Menu } from 'lucide-react'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../provider/AuthProvider'
import logo from '../assets/logo.png'

const Navbar = () => {
    const { user, logoutUser, role } = useContext(AuthContext)
    const [menuOpen, setMenuOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const dropdownRef = useRef(null)

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

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
                    <img src={logo} alt="Logo" className="w-12 h-12" />
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
                        <div className="relative" ref={dropdownRef}>
                            <img
                                src={user?.photoURL}
                                alt="Profile"
                                onClick={toggleDropdown}
                                className="w-9 h-9 rounded-full border-2 border-purple-500 cursor-pointer"
                            />
                            {isDropdownOpen && (
                                <div className="absolute right-0 top-12 flex flex-col bg-white shadow-lg rounded-md p-3 text-sm z-50 min-w-[150px] animate-fadeIn">
                                    <span className="text-gray-600">{user.displayName || 'User'}</span>
                                    <NavLink to={role === 'admin' ? '/dashboard/admin/profile' : '/dashboard/profile'} className="hover:text-purple-500">
                                        Dashboard
                                    </NavLink>
                                    <button onClick={logoutUser} className="text-red-500 cursor-pointer hover:underline flex items-center gap-1 mt-1">
                                        <LogOut size={16} /> Logout
                                    </button>
                                </div>
                            )}

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
                            <NavLink to={role === 'admin' ? '/dashboard/admin/profile' : '/dashboard/profile'}>
                                Dashboard
                            </NavLink>
                            <button onClick={logoutUser} className="text-red-500 text-left cursor-pointer">Logout</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Navbar
