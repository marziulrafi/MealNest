import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import MealCard from '../components/MealCard'
import { useMeals } from '../hooks/useMeals'
import Loading from '../components/Loading'

const Meals = () => {
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [priceRange, setPriceRange] = useState([0, 1000])

    const filters = {
        search,
        category,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
    }

    const { data, fetchNextPage, hasNextPage } = useMeals(filters)

    const allMeals = data?.pages.flatMap(page => page.meals) || []

    const handleLike = async (id) => {
        await fetch(`http://localhost:3000/meals/like/${id}`, { method: 'PATCH' })
    }

    const handleRequest = async (meal) => {
        await fetch('http://localhost:3000/requests', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mealId: meal._id, status: 'pending' })
        })
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search meals..."
                    className="border px-3 py-1 rounded"
                />
                <select onChange={(e) => setCategory(e.target.value)} className="border px-3 py-1 rounded">
                    <option value="">All</option>
                    <option value="veg">Veg</option>
                    <option value="non-veg">Non-Veg</option>
                </select>
                <input
                    type="range"
                    min={0}
                    max={1000}
                    step={50}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                />
                <span className="text-sm">Max: ${priceRange[1]}</span>
            </div>

            <InfiniteScroll
                dataLength={allMeals.length}
                next={fetchNextPage}
                hasMore={hasNextPage}
                loader={<Loading/>}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {allMeals.map(meal => (
                        meal?._id && (
                            <MealCard
                                key={meal._id}
                                meal={meal}
                                onLike={handleLike}
                                onRequest={handleRequest}
                            />
                        )
                    ))}

                </div>
            </InfiniteScroll>
        </div>
    )
}

export default Meals