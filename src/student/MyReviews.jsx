import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';
import { Link } from 'react-router';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyReviews = () => {
    const { user } = useContext(AuthContext);

    const { data: reviews = [], isLoading, refetch } = useQuery({
        queryKey: ['my-reviews', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`https://meal-nest-server-inky.vercel.app//reviews?email=${user.email}`);
            return res.data;
        },
    });


    const handleUpdateReview = async (id, currentContent) => {
        const { value: newContent } = await Swal.fire({
            title: 'Edit your review',
            input: 'textarea',
            inputLabel: 'Update Review',
            inputValue: currentContent,
            showCancelButton: true,
            confirmButtonText: 'Update',
            inputValidator: (value) => {
                if (!value) return 'Review cannot be empty!';
            },
        });

        if (newContent) {
            try {
                const res = await axios.patch(`https://meal-nest-server-inky.vercel.app//reviews/${id}`, { content: newContent });
                if (res.data.modifiedCount > 0) {
                    Swal.fire('Updated!', 'Your review has been updated.', 'success');
                }
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'Could not update the review.', 'error');
            }
        }
    };


    const handleDeleteReview = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This review will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirm.isConfirmed) {
            try {
                const res = await axios.delete(`https://meal-nest-server-inky.vercel.app//reviews/${id}`);
                console.log(res.data); 
                if (res.data.deletedCount > 0) {
                    Swal.fire('Deleted!', 'Your review has been deleted.', 'success');
                    refetch();
                }
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'Could not delete the review.', 'error');
            }
        }
    };




    if (isLoading) {
        return <p className="text-center text-lg font-semibold text-gray-600">Loading your reviews...</p>;
    }

    return (
        <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6 text-purple-700">📋 My Reviews</h2>

            {reviews.length === 0 ? (
                <p className="text-center text-gray-500">You haven't submitted any reviews yet.</p>
            ) : (
                <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 bg-white">
                        <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                            <tr>
                                <th className="text-left px-4 py-3">#</th>
                                <th className="text-left px-4 py-3">Meal</th>
                                <th className="text-center px-4 py-3">Likes</th>
                                <th className="text-left px-4 py-3">Review</th>
                                <th className="text-center px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {reviews.map((review, idx) => (
                                <tr key={review._id} className="hover:bg-gray-50 transition duration-200">
                                    <td className="px-4 py-3">{idx + 1}</td>
                                    <td className="px-4 py-3 font-medium text-gray-800">{review.mealTitle}</td>
                                    <td className="px-4 py-3 text-center">{review.likes || 0}</td>
                                    <td className="px-4 py-3 max-w-xs truncate">{review.content}</td>
                                    <td className="px-4 py-3 flex justify-center gap-3 text-sm">
                                        <Link to={`/meals/${review.mealId}`}>
                                            <button className="text-blue-600 hover:text-blue-800" title="View Meal">
                                                <FaEye />
                                            </button>
                                        </Link>
                                        <button
                                            className="text-green-600 hover:text-green-800"
                                            title="Edit Review"
                                            onClick={() => handleUpdateReview(review._id, review.content)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-800"
                                            title="Delete Review"
                                            onClick={() => handleDeleteReview(review._id)}
                                        >
                                            <FaTrash />
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyReviews;
