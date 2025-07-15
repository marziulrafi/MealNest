import { useNavigate } from 'react-router'

const MealCard = ({ meal, onLike, onRequest }) => {
    const navigate = useNavigate()

    return (
        <div className="bg-white shadow rounded p-3">
            <img src={meal.image} alt={meal.name} className="w-full h-40 object-cover rounded" />
            <h2 className="font-bold mt-2">{meal.name}</h2>
            <p className="text-sm text-gray-600">{meal.description?.slice(0, 50)}...</p>
            <div className="flex gap-2 mt-3">
                <button onClick={() => onLike(meal._id)} className="text-red-500">❤️ {meal.likes}</button>
                <button onClick={() => onRequest(meal)} className="text-purple-600">Request</button>
            </div>
            <button
                onClick={() => navigate(`/meals/${meal._id}`)}
                className="text-purple-600 mt-2 block hover:underline"
            >
                View Details →
            </button>
        </div>
    )
}

export default MealCard
