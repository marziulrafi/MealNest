import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'

const Banner = () => {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const handleSearch = () => {
        if (search) {
            navigate(`/meals?search=${search}`)
            alert(`Search for: ${search}`)
        }
    }

    return (
        <div className="relative bg-gradient-to-br from-purple-100 via-white to-purple-200 py-16 md:py-28 px-4 text-center">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-extrabold text-purple-700 mb-4"
            >
                Welcome to MealNest 🍽️
            </motion.h1>
            <p className="text-lg md:text-xl text-gray-700 mb-6">
                Explore, rate, and enjoy delicious hostel meals every day.
            </p>

            <div className="max-w-xl mx-auto flex gap-2 mt-6">
                <input
                    type="text"
                    placeholder="Search meals..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-2 rounded-full border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                    onClick={handleSearch}
                    className="bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition"
                >
                    Search
                </button>
            </div>
        </div>
    )
}

export default Banner
