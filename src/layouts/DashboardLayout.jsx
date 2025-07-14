import { Link, Outlet } from 'react-router'

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-purple-100 p-4 space-y-4">
                <h2 className="text-xl font-bold mb-4">Dashboard</h2>
                <ul className="space-y-2">
                    <li><Link to="/dashboard/profile" className="hover:text-purple-700">My Profile</Link></li>
                    <li><Link to="/dashboard/requests" className="hover:text-purple-700">Requested Meals</Link></li>
                    <li><Link to="/dashboard/reviews" className="hover:text-purple-700">My Reviews</Link></li>
                    <li><Link to="/dashboard/payments" className="hover:text-purple-700">Payment History</Link></li>
                </ul>
            </aside>
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout
