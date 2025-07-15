import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const ManageUsers = () => {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users', search],
        queryFn: async () => {
            const url = search.length >= 2
                ? `http://localhost:3000/users?search=${search}`
                : `http://localhost:3000/users`;
            const res = await axios.get(url);
            return res.data;
        }
    });

    const { mutate, isLoading: isMutating } = useMutation({
        mutationFn: (email) => axios.patch(`http://localhost:3000/users/${email}/make-admin`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        }
    });

    return (
        <div className="p-6 bg-white shadow rounded-xl max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold text-purple-700 mb-6">👥 Manage Users</h2>

            <input
                type="text"
                placeholder="🔍 Search by name or email..."
                className="w-full md:w-1/2 px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {isLoading ? (
                <p className="text-gray-500">Loading users...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border">
                        <thead className="bg-purple-100 text-purple-800">
                            <tr>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Email</th>
                                <th className="px-4 py-3 text-center">Role</th>
                                <th className="px-4 py-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.email} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2">{user.name}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2 capitalize text-center">{user.role}</td>
                                    <td className="px-4 py-2 text-center">
                                        {user.role !== 'admin' ? (
                                            <button
                                                onClick={() => mutate(user.email)}
                                                disabled={isMutating}
                                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded transition-all duration-200"
                                            >
                                                {isMutating ? 'Updating...' : 'Make Admin'}
                                            </button>
                                        ) : (
                                            <span className="text-green-600 font-medium">Admin</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {users.length === 0 && (
                        <p className="text-center text-gray-500 py-4">No users found</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ManageUsers;
