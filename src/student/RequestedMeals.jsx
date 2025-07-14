import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../provider/AuthProvider'

const RequestedMeals = () => {
    const { user } = useContext(AuthContext)

    const { data: requests = [], refetch } = useQuery({
        queryKey: ['requested-meals', user.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/requests?email=${user.email}`)
            return res.data
        }
    })

    const handleCancel = async (id) => {
        await axios.delete(`http://localhost:3000/requests/${id}`)
        refetch()
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Requested Meals</h2>
            <table className="w-full border">
                <thead>
                    <tr className="bg-purple-200">
                        <th>Meal</th>
                        <th>Likes</th>
                        <th>Reviews</th>
                        <th>Status</th>
                        <th>Cancel</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map(req => (
                        <tr key={req._id}>
                            <td>{req.mealTitle}</td>
                            <td>{req.likes}</td>
                            <td>{req.reviews_count}</td>
                            <td>{req.status}</td>
                            <td><button onClick={() => handleCancel(req._id)} className="text-red-500">Cancel</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RequestedMeals
