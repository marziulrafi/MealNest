import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router';

const PAGE_SIZE = 6;

const Meals = () => {
    const [meals, setMeals] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const fetchMeals = async () => {
        const params = {
            skip: page * PAGE_SIZE,
            limit: PAGE_SIZE,
            ...(search && { search }),
            ...(category && { category }),
            ...(minPrice && { min: minPrice }),
            ...(maxPrice && { max: maxPrice }),
        };

        const res = await axios.get('http://localhost:3000/meals', { params });
        const newMeals = res.data;

        // Filter out duplicates by _id
        const uniqueMeals = newMeals.filter(
            newMeal => !meals.some(existingMeal => existingMeal._id === newMeal._id)
        );

        setMeals(prev => [...prev, ...uniqueMeals]);
        setHasMore(newMeals.length === PAGE_SIZE);
        setPage(prev => prev + 1);
    };


    const handleFilter = () => {
        setMeals([]);
        setPage(0);
        setHasMore(true);
    };

    useEffect(() => {
        // Reset and fetch first batch
        const resetMeals = async () => {
            const params = {
                skip: 0,
                limit: PAGE_SIZE,
                ...(search && { search }),
                ...(category && { category }),
                ...(minPrice && { min: minPrice }),
                ...(maxPrice && { max: maxPrice }),
            };
            const res = await axios.get('http://localhost:3000/meals', { params });
            setMeals(res.data);
            setHasMore(res.data.length === PAGE_SIZE);
            setPage(1);
        };
        resetMeals();
    }, [search, category, minPrice, maxPrice]);

    return (
        <div className="p-5">
            {/* Search & Filters */}
            <div className="mb-4 grid md:grid-cols-4 gap-4">
                <input
                    type="text"
                    placeholder="Search meals..."
                    className="border px-3 py-2 rounded"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select className="border px-3 py-2 rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Dinner">Dinner</option>
                </select>
                <input
                    type="number"
                    placeholder="Min Price"
                    className="border px-3 py-2 rounded"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    className="border px-3 py-2 rounded"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </div>

            {/* Infinite Scroll */}
            <InfiniteScroll
                dataLength={meals.length}
                next={fetchMeals}
                hasMore={hasMore}
                loader={<h4 className="text-center mt-4">Loading...</h4>}
                endMessage={<p className="text-center mt-4">No more meals to load</p>}
            >
                <div className="grid md:grid-cols-3 gap-6 px-4">
                    {meals.map(meal => (
                        <div
                            key={meal._id}
                            className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-2xl"
                        >
                            <img
                                src={meal.image}
                                alt={meal.title}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-bold text-gray-800 mb-1">{meal.title}</h2>
                                <p className="text-gray-600 text-sm mb-2">
                                    {meal.description?.slice(0, 80)}...
                                </p>
                                <p className="text-lg font-semibold text-green-600">৳{meal.price}</p>
                                <Link to={`/meals/${meal._id}`}>
                                    <button className="mt-3 w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-md shadow hover:from-blue-600 hover:to-indigo-700 transition-all duration-300">
                                        View Details
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L21 10.5m0 0l-3.75 3.75M21 10.5H3" />
                                        </svg>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>

        </div>
    );
};

export default Meals;
