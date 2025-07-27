import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const MostLovedMeals = () => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/meals')
            .then(res => {
                const topMeals = res.data.sort((a, b) => b.likes - a.likes).slice(0, 6);
                setMeals(topMeals);
            });
    }, []);

    return (
        <div className="my-12 px-4">
            <h2 className="text-3xl font-extrabold text-center mb-8 text-purple-700">❤️ Most Loved Meals</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {meals.map(meal => (
                    <div key={meal._id} className="bg-white rounded-2xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="relative">
                            <img src={meal.image} alt={meal.title} className="h-48 w-full object-cover" />
                            <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full capitalize shadow-lg">
                                {meal.category}
                            </span>
                        </div>
                        <div className="p-5">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{meal.title}</h3>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">{meal.description?.slice(0, 100)}...</p>
                            <div className="flex justify-between items-center">
                                <p className="text-rose-600 font-bold">❤️ {meal.likes}</p>
                                <Link to={`/meals/${meal._id}`}>
                                    <button className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition cursor-pointer">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MostLovedMeals;
