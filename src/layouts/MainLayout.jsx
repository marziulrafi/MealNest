import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router'

const MainLayout = () => {
    return (
        <div className="font-sans text-gray-800 bg-gradient-to-b from-white via-purple-50 to-purple-100 min-h-screen">
            <Navbar />
            <div className="px-4 md:px-8 lg:px-12 mt-4">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout
