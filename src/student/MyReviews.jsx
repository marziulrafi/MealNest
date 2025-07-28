import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const MyReviews = ({ email }) => {
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    const fetchReviews = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/reviews?email=${email}`);
            setReviews(res.data);
        } catch (err) {
            console.error('Failed to fetch reviews', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/reviews/${id}`);
            setReviews(prev => prev.filter(r => r._id !== id));
        } catch (err) {
            console.error('Delete failed', err);
        }
    };

    useEffect(() => {
        if (email) fetchReviews();
    }, [email]);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">My Reviews</h2>
            <table className="w-full table-auto border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Meal Title</th>
                        <th className="p-2 border">Likes</th>
                        <th className="p-2 border">Review Count</th>
                        <th className="p-2 border">Your Review</th>
                        <th className="p-2 border">Date</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review) => (
                        <tr key={review._id}>
                            <td className="p-2 border">{review.mealTitle}</td>
                            <td className="p-2 border">{review.likes}</td>
                            <td className="p-2 border">{review.reviewsCount}</td>
                            <td className="p-2 border">{review.content}</td>
                            <td className="p-2 border">{new Date(review.createdAt).toLocaleDateString()}</td>
                            <td className="p-2 border space-x-2">
                                <button
                                    onClick={() => navigate(`/meal/${review.mealId}`)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                >
                                    View Meal
                                </button>
                                <button
                                    onClick={() => handleDelete(review._id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {reviews.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center p-4 text-gray-500">
                                No reviews found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MyReviews;
