import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import BannerImg from '../assets/banner.jpg'

const Banner = () => {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const handleSearch = () => {
        if (search.trim()) {
            navigate(`/meals?search=${search.trim()}`)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSearch()
    }

    return (
        <div className="relative py-16 md:py-28 px-4 text-center overflow-hidden">
           
            <img
                src={BannerImg}
                alt="Banner"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

           
            <div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-white/50 to-purple-400 z-10"></div>

          
            <div className="relative z-20">
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-purple-800 leading-tight"
                >
                    Welcome to <span className="text-purple-600">MealNest</span> 🍽️
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mt-4 text-gray-700 text-base sm:text-lg md:text-xl max-w-xl mx-auto"
                >
                    Explore, rate, and enjoy delicious hostel meals every day.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-8 max-w-2xl mx-auto px-4"
                >
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                        <input
                            type="text"
                            placeholder="Search meals..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleKeyPress}
                            className="w-full sm:w-2/3 px-4 py-2 rounded-full border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition w-full sm:w-auto"
                        >
                            Search
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Banner
