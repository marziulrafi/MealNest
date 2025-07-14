import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useContext, useState } from 'react'
import { AuthContext } from '../provider/AuthProvider'
import toast from 'react-hot-toast'

const MealDetails = () => {
    const { id } = useParams()
    const { user } = useContext(AuthContext)
    const [review, setReview] = useState('')

    const { data: meal = {}, refetch } = useQuery({
        queryKey: ['meal', id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/meals/${id}`)
            return res.data
        }
    })

    const handleLike = async () => {
        await axios.patch(`http://localhost:3000/meals/like/${id}`)
        refetch()
    }

    const handleRequest = async () => {
        await axios.post(`http://localhost:3000/requests`, { mealId: id, status: 'pending' })
        toast.success('Requested!')
    }

    const handleReview = async () => {
        if (!review) return toast.error('Write a review')
        await axios.post(`http://localhost:3000/reviews`, {
            mealId: id,
            email: user.email,
            name: user.displayName,
            content: review,
        })
        setReview('')
        refetch()
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <img src={meal.image} alt={meal.name} className="w-full h-64 object-cover rounded" />
            <h1 className="text-2xl font-bold mt-4">{meal.name}</h1>
            <p className="text-gray-600">Distributor: {meal.distributorName}</p>
            <p className="my-4 text-gray-700">{meal.description}</p>

            <div className="flex gap-4 mb-4">
                <button onClick={handleLike} className="bg-red-100 px-3 py-1 rounded-full text-red-500">❤️ {meal.likes}</button>
                <button onClick={handleRequest} className="bg-purple-100 px-3 py-1 rounded-full text-purple-600">Request Meal</button>
            </div>

            <div className="my-6">
                <h2 className="text-lg font-semibold mb-2">Ingredients</h2>
                <ul className="list-disc list-inside text-sm text-gray-700">
                    {meal.ingredients?.map((ing, idx) => <li key={idx}>{ing}</li>)}
                </ul>
            </div>

            <div className="my-6">
                <h2 className="text-lg font-semibold mb-2">Post a Review</h2>
                <textarea
                    rows={3}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="w-full border p-2 rounded"
                    placeholder="Write your thoughts..."
                ></textarea>
                <button onClick={handleReview} className="mt-2 px-4 py-1 bg-green-500 text-white rounded">Submit</button>
            </div>

            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Reviews ({meal.reviews?.length || 0})</h2>
                {meal.reviews?.map((r, idx) => (
                    <div key={idx} className="mb-2 p-2 border rounded">
                        <p className="font-semibold">{r.name}</p>
                        <p className="text-sm text-gray-600">{r.content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MealDetails
