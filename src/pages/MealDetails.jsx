import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import toast from 'react-hot-toast';

const MealDetails = () => {
    const { id } = useParams();
    const { user, dbUser } = useContext(AuthContext);
    const [review, setReview] = useState('');

    const { data: meal = {}, refetch } = useQuery({
        queryKey: ['meal', id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/meals/${id}`);
            return res.data;
        }
    });

    const handleLike = async () => {
        if (!user) return toast.error("Login required to like");
        await axios.patch(`http://localhost:3000/meals/${id}`, {
            likes: (meal.likes || 0) + 1
        });
        refetch();
    };

    const handleRequest = async () => {
        if (!user) return toast.error("Login required to request meal");
        if (!dbUser?.badge || !['silver', 'gold', 'platinum'].includes(dbUser.badge.toLowerCase())) {
            return toast.error("You must have a subscription to request a meal");
        }


        try {
            await axios.post(`http://localhost:3000/serve-meals`, {
                mealId: id,
                mealTitle: meal.title,
                email: user.email,
                name: user.displayName,
                status: 'pending',
            });
            toast.success('Meal requested!');
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Failed to request meal');
        }
    };

    const handleReview = async () => {
        if (!user) return toast.error("Login required to post review");
        if (!review) return toast.error('Write a review');
        await axios.post(`http://localhost:3000/reviews`, {
            mealId: id,
            email: user.email,
            name: user.displayName,
            content: review,
        });
        setReview('');
        toast.success('Review added!');
        refetch();
    };

    return (
        <div className="max-w-5xl mx-auto p-4 space-y-6 bg-white rounded-xl shadow-md mt-6">
            <img src={meal.image} alt={meal.title} className="w-full h-[400px] object-cover rounded-md shadow" />
            <h1 className="text-3xl font-bold text-purple-700">{meal.title}</h1>
            <p className="text-gray-600">
                👨‍🍳 Distributor: <span className="font-medium">{meal.distributorName}</span>
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2 text-purple-800">Description</h2>
            <p className="text-md text-gray-700 leading-relaxed">{meal.description}</p>

            <div className="flex flex-wrap gap-4 mt-4">
                <button onClick={handleLike} className="bg-red-100 text-red-600 px-4 py-2 rounded-full">
                    ❤️ Like ({meal.likes || 0})
                </button>
                <button onClick={handleRequest} className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full">
                    🍽️ Request Meal
                </button>
            </div>

            {meal.ingredients?.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold mt-6 mb-2 text-purple-800">🧂 Ingredients</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {meal.ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}
                    </ul>
                </div>
            )}

            <div className="border-t pt-4 mt-6">
                <h2 className="text-xl font-semibold mb-2 text-green-700">📝 Leave a Review</h2>
                <textarea
                    rows={3}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="w-full border rounded-md p-3 focus:outline-purple-400"
                    placeholder="Share your thoughts..."
                />
                <button onClick={handleReview} className="mt-2 px-5 py-2 bg-green-500 text-white rounded">
                    Submit Review
                </button>
            </div>

            {meal.reviews?.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-3 text-blue-700">⭐ Reviews ({meal.reviews.length})</h2>
                    <div className="space-y-3">
                        {meal.reviews.map((r, idx) => (
                            <div key={idx} className="p-3 border rounded-lg bg-gray-50">
                                <p className="font-semibold text-gray-800">{r.name}</p>
                                <p className="text-gray-600 text-sm">{r.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MealDetails;
