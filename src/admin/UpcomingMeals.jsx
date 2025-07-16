import { useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';
import AddUpcomingMealForm from './AddUpcomingMealForm';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const UpcomingMeals = () => {
    const { user, role } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const [showAdd, setShowAdd] = useState(false);

    const { data: meals = [], isLoading } = useQuery({
        queryKey: ['upcoming'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/upcoming-meals');
            return res.data;
        }
    });

    const publishMut = useMutation({
        mutationFn: (id) => axios.post(`http://localhost:3000/upcoming-meals/publish/${id}`),
        onSuccess: () => {
            toast.success('✅ Published to Meals!');
            queryClient.invalidateQueries({ queryKey: ['upcoming'] });
        }
    });

    const likeMut = useMutation({
        mutationFn: (id) => axios.patch(`http://localhost:3000/upcoming-meals/like/${id}`, {
            email: user.email
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['upcoming'] });
        },
        onError: () => toast.error('Already liked or not authorized.')
    });

    const isPremium = ['silver', 'gold', 'platinum'].includes(role?.toLowerCase());

    // --- Admin View ---
    if (role === 'admin') {
        return (
            <div className="p-6 max-w-5xl mx-auto bg-white rounded-xl shadow">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-purple-700">📅 Upcoming Meals (Admin View)</h2>
                    <button
                        onClick={() => setShowAdd(true)}
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                    >
                        ➕ Add Upcoming Meal
                    </button>
                </div>

                {isLoading ? (
                    <p className="text-gray-500">Loading upcoming meals...</p>
                ) : meals.length === 0 ? (
                    <p className="text-center text-gray-500">No upcoming meals available.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto text-sm border border-gray-200">
                            <thead className="bg-purple-100 text-purple-800">
                                <tr>
                                    <th className="px-4 py-2 text-left">Meal Title</th>
                                    <th className="px-4 py-2 text-center">Likes</th>
                                    <th className="px-4 py-2 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {meals
                                    .sort((a, b) => b.likes - a.likes)
                                    .map((meal) => (
                                        <tr key={meal._id} className="border-t hover:bg-gray-50">
                                            <td className="px-4 py-2">{meal.title}</td>
                                            <td className="px-4 py-2 text-center">{meal.likes}</td>
                                            <td className="px-4 py-2 text-center">
                                                <button
                                                    onClick={() => publishMut.mutate(meal._id)}
                                                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition-all"
                                                >
                                                    Publish
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <AnimatePresence>
                    {showAdd && (
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[600px] relative"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <button
                                    onClick={() => setShowAdd(false)}
                                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
                                >
                                    &times;
                                </button>
                                <AddUpcomingMealForm onClose={() => setShowAdd(false)} />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    // --- User View ---
    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-purple-700 mb-6">📅 Upcoming Meals</h2>
            {isLoading ? (
                <p className="text-gray-500">Loading meals...</p>
            ) : meals.length === 0 ? (
                <p className="text-center text-gray-500">No upcoming meals yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {meals.map(meal => (
                        <div key={meal._id} className="bg-white shadow rounded-lg overflow-hidden">
                            <img src={meal.image} alt={meal.title} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{meal.title}</h3>
                                <p className="text-sm text-gray-500">{meal.category}</p>
                                <p className="text-sm text-gray-600 mt-2">{meal.description?.slice(0, 60)}...</p>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-purple-600 font-bold">{meal.likes} ❤️</span>
                                    {isPremium && (
                                        <button
                                            onClick={() => likeMut.mutate(meal._id)}
                                            className="text-sm text-white bg-purple-600 px-3 py-1 rounded hover:bg-purple-700"
                                        >
                                            👍 Like
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UpcomingMeals;
