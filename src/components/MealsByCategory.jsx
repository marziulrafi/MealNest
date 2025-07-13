import { Tab } from '@headlessui/react'

const meals = {
    Breakfast: [
        { title: 'Pancakes', img: '/img/pancakes.jpg', rating: 4.8, price: 40 },
        { title: 'Paratha', img: '/img/paratha.jpg', rating: 4.6, price: 25 },
    ],
    Lunch: [
        { title: 'Chicken Curry', img: '/img/chicken.jpg', rating: 4.9, price: 60 },
    ],
    Dinner: [
        { title: 'Fried Rice', img: '/img/friedrice.jpg', rating: 4.7, price: 50 },
    ],
    'All Meals': [
        { title: 'Egg Toast', img: '/img/eggtoast.jpg', rating: 4.5, price: 30 },
    ],
}

const MealsByCategory = () => {
    const categories = Object.keys(meals)

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
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`
                            }
                        >
                            {cat}
                        </Tab>
                    ))}
                </Tab.List>

                <Tab.Panels>
                    {categories.map((cat, idx) => (
                        <Tab.Panel key={idx} className="grid md:grid-cols-3 gap-6">
                            {meals[cat].map((meal, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-xl shadow-lg p-4 hover:scale-[1.02] transition"
                                >
                                    <img
                                        src={meal.img}
                                        alt={meal.title}
                                        className="w-full h-40 object-cover rounded-lg mb-3"
                                    />
                                    <h4 className="font-bold text-lg text-purple-800">{meal.title}</h4>
                                    <p className="text-sm text-gray-500">Rating: {meal.rating}</p>
                                    <p className="text-sm text-gray-600 font-medium mb-3">
                                        Price: ৳{meal.price}
                                    </p>
                                    <button className="text-purple-600 hover:underline">View Details →</button>
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
