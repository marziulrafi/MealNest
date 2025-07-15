import { useState, useEffect } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from '../components/Loading'

const PAGE_SIZE = 6

const Meals = () => {
    const [meals, setMeals] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(0)

    const [filters, setFilters] = useState({
        search: '',
        category: '',
        min: '',
        max: '',
    })

    const fetchMeals = async () => {
        const params = {
            skip: page * PAGE_SIZE,
            limit: PAGE_SIZE,
            ...filters,
        }
        const { data } = await axios.get('http://localhost:3000/meals', { params })
        if (data.length < PAGE_SIZE) setHasMore(false)
        setMeals(prev => [...prev, ...data])
    }

    useEffect(() => {
        setMeals([])
        setPage(0)
        setHasMore(true)
    }, [filters])

    useEffect(() => {
        fetchMeals()
    }, [page, filters])

    const handleLoadMore = () => {
        setPage(prev => prev + 1)
    }

    const handleFilterChange = e => {
        setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="grid gap-4 md:grid-cols-4 mb-6">
                <input
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    placeholder="🔍 Search meals..."
                    className="border px-3 py-2 rounded"
                />
                <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="border px-3 py-2 rounded"
                >
                    <option value="">All Categories</option>
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                </select>
                <input
                    name="min"
                    type="number"
                    placeholder="Min Price"
                    value={filters.min}
                    onChange={handleFilterChange}
                    className="border px-3 py-2 rounded"
                />
                <input
                    name="max"
                    type="number"
                    placeholder="Max Price"
                    value={filters.max}
                    onChange={handleFilterChange}
                    className="border px-3 py-2 rounded"
                />
            </div>

            <InfiniteScroll
                dataLength={meals.length}
                next={handleLoadMore}
                hasMore={hasMore}
                loader={<Loading />}
            >
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {meals.map(m => (
                        <div key={m._id} className="bg-white rounded shadow overflow-hidden">
                            <img src={m.image} alt={m.title} className="h-48 w-full object-cover" />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-1">{m.title}</h3>
                                <p className="text-gray-600">${m.price.toFixed(2)}</p>
                                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{m.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>

            {!meals.length && !hasMore && (
                <p className="text-center py-8 text-gray-500">No meals found.</p>
            )}
        </div>
    )
}

export default Meals
