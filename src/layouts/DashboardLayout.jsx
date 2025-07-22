import { Link, Outlet } from 'react-router';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            {/* Mobile Nav */}
            <div className="md:hidden flex justify-between items-center p-4 bg-purple-600 text-white">
                <h2 className="text-lg font-bold">Dashboard</h2>
                <button onClick={toggleSidebar} className="text-2xl">
                    {sidebarOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`bg-purple-100 md:w-64 w-64 md:relative fixed z-30 top-0 left-0 h-full overflow-y-auto transition-transform duration-300 ease-in-out
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
            >
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-purple-800 mb-6">Dashboard</h2>
                    <ul className="space-y-4 text-lg font-medium">
                        <li>
                            <Link
                                to="/dashboard/profile"
                                className="block hover:text-purple-700 transition"
                                onClick={() => setSidebarOpen(false)}
                            >
                                My Profile
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/requests"
                                className="block hover:text-purple-700 transition"
                                onClick={() => setSidebarOpen(false)}
                            >
                                Requested Meals
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/reviews"
                                className="block hover:text-purple-700 transition"
                                onClick={() => setSidebarOpen(false)}
                            >
                                My Reviews
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/payments"
                                className="block hover:text-purple-700 transition"
                                onClick={() => setSidebarOpen(false)}
                            >
                                Payment History
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className="block hover:text-purple-700 transition"
                                onClick={() => setSidebarOpen(false)}
                            >
                                Back to Home
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 mt-16 md:mt-0">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
