import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const RequestedMeals = () => {
    const { user } = useContext(AuthContext);

    const { data: requests = [], refetch } = useQuery({
        queryKey: ['requested-meals', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/serve-meals?email=${user.email}`);
            return res.data;
        }
    });

    const handleCancel = async (id) => {
        await axios.delete(`http://localhost:3000/serve-meals/${id}`);
        refetch();
    };

    const hasCancelable = requests.some(req => req.status !== 'delivered');

    return (
        <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4 text-purple-700">Requested Meals</h2>
            {requests.length === 0 ? (
                <p className="text-gray-500 text-center">No requested meals found.</p>
            ) : (
                <table className="w-full border">
                    <thead>
                        <tr className="bg-purple-200">
                            <th className="py-2">Meal</th>
                            <th>Status</th>
                            <th>Requested At</th>
                            {hasCancelable && <th>Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(req => (
                            <tr key={req._id} className="text-center border-t">
                                <td className="py-2">{req.mealTitle}</td>
                                <td className="capitalize">{req.status}</td>
                                <td>{new Date(req.requestedAt).toLocaleDateString()}</td>
                                {req.status !== 'delivered' && (
                                    <td>
                                        <button
                                            onClick={() => handleCancel(req._id)}
                                            className="text-red-500 hover:underline"
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default RequestedMeals;
