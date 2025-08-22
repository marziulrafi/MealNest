import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaUtensils, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const AdminProfile = () => {
    const { user } = useContext(AuthContext);

    const { data: count = 0, isLoading } = useQuery({
        queryKey: ["admin-meals", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(
                `https://meal-nest-server-inky.vercel.app/admin/meals-count?email=${user.email}`
            );
            return res.data.count;
        },
    });

    return (
        <div className="max-w-3xl mx-auto mt-12">
            <div className="bg-gradient-to-br from-purple-100 via-white to-purple-50 shadow-lg rounded-xl p-8">
                {/* Profile Header */}
                <div className="flex flex-col items-center text-center">
                    <img
                        src={user?.photoURL || "/default-avatar.png"}
                        alt="Admin Avatar"
                        className="w-32 h-32 rounded-full border-4 border-purple-400 shadow-md"
                    />
                    <h2 className="mt-4 text-2xl font-semibold text-purple-800">
                        {user?.displayName || "Admin User"}
                    </h2>
                    <p className="text-gray-600 flex items-center gap-2">
                        <FaEnvelope className="text-purple-500" /> {user?.email}
                    </p>
                </div>

                {/* Profile Details */}
                <div className="mt-8 grid md:grid-cols-2 gap-6 text-gray-700">
                    <div className="p-4 bg-purple-50 rounded-lg shadow-sm flex items-center gap-3">
                        <FaPhone className="text-purple-600 text-xl" />
                        <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p>{user?.phoneNumber || "Not Provided"}</p>
                        </div>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg shadow-sm flex items-center gap-3">
                        <FaMapMarkerAlt className="text-purple-600 text-xl" />
                        <div>
                            <p className="text-sm text-gray-500">Address</p>
                            <p>Dhaka, Bangladesh</p>
                        </div>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg shadow-sm flex items-center gap-3 md:col-span-2">
                        <FaUtensils className="text-purple-600 text-xl" />
                        <div>
                            <p className="text-sm text-gray-500">Meals Added</p>
                            <p>{isLoading ? "Loading..." : count}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
