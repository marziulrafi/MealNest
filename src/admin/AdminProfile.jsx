import { useContext } from 'react'
import { AuthContext } from '../provider/AuthProvider'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FaUtensils } from 'react-icons/fa'

const AdminProfile = () => {
    const { user } = useContext(AuthContext)

    const { data: count = 0, isLoading } = useQuery({
        queryKey: ['admin-meals', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/admin/meals-count?email=${user.email}`)
            return res.data.count
        }
    })

    return (
        <div className="max-w-xl mx-auto mt-12">
            <div className="bg-gradient-to-br from-purple-100 via-white to-purple-50 shadow-lg rounded-xl p-8 text-center">
                <img
                    src={user?.photoURL || '/default-avatar.png'}
                    alt="Admin Avatar"
                    className="w-28 h-28 rounded-full mx-auto border-4 border-purple-400 shadow-md"
                />
                <h2 className="mt-4 text-2xl font-semibold text-purple-800">{user?.displayName}</h2>
                <p className="text-gray-600">{user?.email}</p>

                <div className="mt-6 flex items-center justify-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium shadow-inner inline-block">
                    <div className='flex justify-center'><FaUtensils /></div>
                    {isLoading ? 'Loading meals...' : `Meals Added: ${count}`}
                </div>
            </div>
        </div>
    )
}

export default AdminProfile
