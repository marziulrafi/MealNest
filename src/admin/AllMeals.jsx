import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';

const AllMeals = () => {
    const qc = useQueryClient();

    const { data: meals = [], isLoading } = useQuery({
        queryKey: ['meals', 'all'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/meals?sortBy=likes');
            return res.data;
        }
    });

    const deleteMeal = useMutation({
        mutationFn: id => axios.delete(`http://localhost:3000/meals/${id}`),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['meals', 'all'] });
            Swal.fire('Deleted!', 'The meal has been removed.', 'success');
        }
    });

    const handleDelete = (id, name) => {
        Swal.fire({
            title: `Are you sure?`,
            text: `You are about to delete "${name}". This action cannot be undone!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMeal.mutate(id);
            }
        });
    };

    return (
        <div className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-purple-700 text-center">🍽️ All Meals</h2>

            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-300 border-t-transparent"></div>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full bg-white shadow-xl rounded-lg overflow-hidden">
                        <thead className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800">
                            <tr>
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4">Likes</th>
                                <th className="p-4">Reviews</th>
                                <th className="p-4">Rating</th>
                                <th className="p-4">Distributor</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {meals.map((m, index) => (
                                    <motion.tr
                                        key={m._id}
                                        className="border-t"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ scale: 1.01 }}
                                    >
                                        <td className="p-4">{m.title}</td>
                                        <td className="p-4 text-center">{m.likes}</td>
                                        <td className="p-4 text-center">{m.reviews_count}</td>
                                        <td className="p-4 text-center">{m.rating}</td>
                                        <td className="p-4">{m.distributorName}</td>
                                        <td className="p-4 flex gap-2 justify-center">
                                            <button
                                                onClick={() => handleDelete(m._id, m.title)}
                                                className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 transition-all duration-300"
                                            >
                                                🗑️ Delete
                                            </button>
                                            <button
                                                onClick={() => window.open(`/meal/${m._id}`, '_blank')}
                                                className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition-all duration-300"
                                            >
                                                🔍 View
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllMeals;
