import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const MyReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const userEmail = 'user@example.com';

    useEffect(() => {
        axios
            .get(`http://localhost:5000/reviews?email=${userEmail}`)
            .then((res) => {
                setReviews(res.data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, [userEmail]);

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this review?")) {
            try {
                await axios.delete(`http://localhost:5000/reviews/${id}`);
                setReviews((prev) => prev.filter((r) => r._id !== id));
            } catch (err) {
                console.error(err);
            }
        }
    };

    if (loading) return <p>Loading reviews...</p>;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
            {reviews.length === 0 ? (
                <p>No reviews submitted yet.</p>
            ) : (
                <table className="w-full table-auto border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">Meal</th>
                            <th className="p-2 border">Review</th>
                            <th className="p-2 border">Likes</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review) => (
                            <tr key={review._id}>
                                <td className="p-2 border">{review.mealTitle}</td>
                                <td className="p-2 border">{review.comment}</td>
                                <td className="p-2 border">{review.likes || 0}</td>
                                <td className="p-2 border flex gap-2 justify-center">
                                    <Link
                                        to={`/meals/${review.mealId}`}
                                        className="px-2 py-1 bg-blue-500 text-white rounded"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        to={`/edit-review/${review._id}`}
                                        className="px-2 py-1 bg-yellow-500 text-white rounded"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(review._id)}
                                        className="px-2 py-1 bg-red-500 text-white rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MyReviews;
