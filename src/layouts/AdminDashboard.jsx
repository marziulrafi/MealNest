import { NavLink, Outlet } from 'react-router'
import {
    FaUserCircle, FaUsers, FaUtensils, FaClipboardList,
    FaStar, FaServicestack, FaRegClock,
    FaHome
} from 'react-icons/fa'

const navItems = [
    { path: '/dashboard/admin/profile', label: 'Profile', icon: <FaUserCircle /> },
    { path: '/dashboard/admin/manage-users', label: 'Manage Users', icon: <FaUsers /> },
    { path: '/dashboard/admin/add-meal', label: 'Add Meal', icon: <FaUtensils /> },
    { path: '/dashboard/admin/all-meals', label: 'All Meals', icon: <FaClipboardList /> },
    { path: '/dashboard/admin/all-reviews', label: 'All Reviews', icon: <FaStar /> },
    { path: '/dashboard/admin/serve-meal', label: 'Serve Meals', icon: <FaServicestack /> },
    { path: '/dashboard/admin/upcoming-meals', label: 'Upcoming Meals', icon: <FaRegClock /> },
    { path: '/', label: 'Back to Home', icon: <FaHome /> },
]

const AdminDashboard = () => {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gradient-to-b from-purple-200 to-purple-100 p-6 shadow-md">
                <h2 className="text-2xl font-bold text-purple-800 mb-6">Admin Panel</h2>
                <nav className="space-y-3">
                    {navItems.map(({ path, label, icon }) => (
                        <NavLink
                            key={path}
                            to={path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-md transition-colors font-medium ${isActive
                                    ? 'bg-purple-600 text-white shadow'
                                    : 'text-purple-800 hover:bg-purple-200'
                                }`
                            }
                        >
                            {icon}
                            {label}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminDashboard
