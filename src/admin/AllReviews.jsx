import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router';

const AllReviews = () => {
    const [reviewMeals, setReviewMeals] = useState({});

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['all-reviews'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/reviews');
            return res.data;
        }
    });

    // Fetch associated meal info
    useEffect(() => {
        const uniqueMealIds = [...new Set(reviews.map(r => r.mealId))];

        const fetchMealDetails = async () => {
            const newMealMap = {};

            await Promise.all(uniqueMealIds.map(async (id) => {
                try {
                    const res = await axios.get(`http://localhost:3000/meals/${id}`);
                    newMealMap[id] = res.data;
                } catch (e) {
                    newMealMap[id] = null; // meal may have been deleted
                }
            }));

            setReviewMeals(newMealMap);
        };

        if (reviews.length > 0) fetchMealDetails();
    }, [reviews]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/reviews/${id}`);
            toast.success('✅ Review deleted');
            refetch();
        } catch (err) {
            console.error(err);
            toast.error('❌ Failed to delete review');
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">📋 All Reviews</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full border">
                    <thead className="bg-purple-100 text-purple-800">
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Review</th>
                            <th>Meal Title</th>
                            <th>Likes</th>
                            <th>Reviews Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((r, index) => {
                            const meal = reviewMeals[r.mealId];
                            return (
                                <tr key={r._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <p className="font-semibold">{r.name}</p>
                                        <p className="text-sm text-gray-500">{r.email}</p>
                                    </td>
                                    <td>{r.content}</td>
                                    <td>{meal?.title || <span className="text-red-400">[Deleted]</span>}</td>
                                    <td>{meal?.likes ?? '-'}</td>
                                    <td>{meal?.reviews_count ?? '-'}</td>
                                    <td className="flex flex-col gap-2 md:flex-row">
                                        <button
                                            onClick={() => handleDelete(r._id)}
                                            className="btn btn-sm bg-red-100 text-red-700 hover:bg-red-200"
                                        >
                                            Delete
                                        </button>
                                        {meal?._id && (
                                            <Link
                                                to={`/meals/${meal._id}`}
                                                className="btn btn-sm bg-green-100 text-green-700 hover:bg-green-200"
                                            >
                                                View Meal
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllReviews;
