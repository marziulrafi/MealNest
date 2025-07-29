import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const ServeMeal = () => {
    const qc = useQueryClient();

    // ✅ v5-compliant useQuery
    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['requests'],
        queryFn: async () => {
            const res = await axios.get('https://meal-nest-server-inky.vercel.app//serve-meals');
            return res.data;
        }
    });

    // ✅ v5-compliant useMutation
    const serveMut = useMutation({
        mutationFn: id => axios.patch(`https://meal-nest-server-inky.vercel.app//serve-meals/${id}`),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['requests'] });
        }
    });

    return (
        <div>
            <h2 className="text-xl font-bold mb-4 text-purple-700">📦 Serve Meals</h2>
            {isLoading ? (
                <div className="flex justify-center items-center h-60">
                    <span className="loading loading-spinner text-purple-600"></span>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full bg-white shadow-md rounded-lg">
                        <thead className="bg-purple-100 text-purple-800">
                            <tr>
                                <th className="p-3 text-left">Meal</th>
                                <th className="p-3 text-left">User Email</th>
                                <th className="p-3 text-center">Status</th>
                                <th className="p-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((r) => (
                                <tr key={r._id} className="border-t hover:bg-gray-50 transition">
                                    <td className="p-3">{r.mealTitle}</td>
                                    <td className="p-3">{r.email}</td>
                                    <td className="p-3 text-center capitalize">{r.status}</td>
                                    <td className="p-3 text-center">
                                        {r.status !== 'delivered' && (
                                            <button
                                                onClick={() => serveMut.mutate(r._id)}
                                                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
                                            >
                                                Serve
                                            </button>
                                        )}
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

export default ServeMeal;
