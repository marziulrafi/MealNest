import { Link, Outlet, useLocation } from 'react-router';
import { useState } from 'react';
import {
    FaBars,
    FaTimes,
    FaUser,
    FaUtensils,
    FaStar,
    FaMoneyBillAlt,
    FaHome,
} from 'react-icons/fa';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { pathname } = useLocation();

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const links = [
        {
            to: '/dashboard/profile',
            label: 'My Profile',
            icon: <FaUser className="text-purple-700" />,
        },
        {
            to: '/dashboard/requests',
            label: 'Requested Meals',
            icon: <FaUtensils className="text-purple-700" />,
        },
        {
            to: '/dashboard/reviews',
            label: 'My Reviews',
            icon: <FaStar className="text-purple-700" />,
        },
        {
            to: '/dashboard/payments',
            label: 'Payment History',
            icon: <FaMoneyBillAlt className="text-purple-700" />,
        },
        {
            to: '/',
            label: 'Back to Home',
            icon: <FaHome className="text-purple-700" />,
        },
    ];

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
           
            <div className="md:hidden flex justify-between items-center p-4 bg-purple-600 text-white fixed w-full z-40">
                <h2 className="text-lg font-bold">Dashboard</h2>
                <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
                    {sidebarOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

          
            <aside
                className={`bg-purple-100 md:w-64 w-64 fixed md:relative top-0 left-0 h-full z-30 overflow-y-auto transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
            >
                <div className="p-6 pt-20 md:pt-6">
                    <h2 className="text-2xl font-bold text-purple-800 mb-8 hidden md:block">Dashboard</h2>
                    <ul className="space-y-3">
                        {links.map(({ to, label, icon }) => (
                            <li key={to}>
                                <Link
                                    to={to}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all 
                    ${pathname === to
                                            ? 'bg-purple-200 text-purple-900 font-semibold'
                                            : 'text-gray-700 hover:bg-purple-50 hover:text-purple-800'
                                        }`}
                                >
                                    {icon}
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            <main className="flex-1 p-4 mt-16 md:mt-0 md:ml-64 transition-all duration-300">
                <div className="bg-white p-6 rounded-lg shadow-md min-h-[calc(100vh-6rem)]">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
