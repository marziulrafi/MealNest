import { Tab } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Loading from '../components/Loading'

const categories = ['Breakfast', 'Lunch', 'Dinner', 'All Meals']

const MealsByCategory = () => {
    const navigate = useNavigate()

    const { data: meals = [], isLoading } = useQuery({
        queryKey: ['meals-by-category'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/meals')
            return res.data
        }
    })

    const categorizedMeals = {
        Breakfast: meals.filter(m => m.category?.toLowerCase() === 'breakfast').slice(0, 3),
        Lunch: meals.filter(m => m.category?.toLowerCase() === 'lunch').slice(0, 3),
        Dinner: meals.filter(m => m.category?.toLowerCase() === 'dinner').slice(0, 3),
        'All Meals': meals.slice(0, 6)
    }

    if (isLoading) return <Loading />

    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
                Meals by Category 🍱
            </h2>

            <Tab.Group>
                <Tab.List className="flex justify-center gap-4 mb-6 flex-wrap">
                    {categories.map((cat) => (
                        <Tab
                            key={cat}
                            className={({ selected }) =>
                                `px-4 py-2 rounded-full font-medium ${selected
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
                            }
                        >
                            {cat}
                        </Tab>
                    ))}
                </Tab.List>

                <Tab.Panels>
                    {categories.map((cat, idx) => (
                        <Tab.Panel key={idx} className="grid md:grid-cols-3 gap-6">
                            {categorizedMeals[cat].map((meal) => (
                                <div
                                    key={meal._id}
                                    className="bg-white rounded-xl shadow-lg p-4 hover:scale-[1.02] transition"
                                >
                                    <img
                                        src={meal.image}
                                        alt={meal.name}
                                        className="w-full h-40 object-cover rounded-lg mb-3"
                                    />
                                    <h4 className="font-bold text-lg text-purple-800">{meal.name}</h4>
                                    <p className="text-sm text-gray-500">Rating: {meal.rating || 'N/A'}</p>
                                    <p className="text-sm text-gray-600 font-medium mb-3">
                                        Price: ৳{meal.price}
                                    </p>
                                    <button
                                        onClick={() => navigate(`/meal/${meal._id}`)}
                                        className="text-purple-600 hover:underline"
                                    >
                                        View Details →
                                    </button>
                                </div>
                            ))}
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

export default MealsByCategory
