import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const badgeColors = {
    Bronze: 'bg-amber-600 text-white',
    Silver: 'bg-gray-300 text-gray-800',
    Gold: 'bg-yellow-400 text-yellow-900',
    Platinum: 'bg-blue-400 text-white',
};

const MyProfile = () => {
    const { user, dbUser } = useContext(AuthContext);


    if (!user || !dbUser) {
        return (
            <div className="flex justify-center items-center h-60">
                <span className="loading loading-spinner text-purple-600"></span>
            </div>
        );
    }

    const badge = dbUser?.badge;

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg text-center border border-purple-200">
            <img
                src={user.photoURL}
                alt="User Avatar"
                className="w-24 h-24 rounded-full mx-auto border-4 border-purple-300 shadow mb-4"
            />
            <h2 className="text-2xl font-semibold text-purple-700 mb-1">{user.displayName}</h2>
            <p className="text-gray-600 mb-4">{user.email}</p>

            <div
                className={`inline-block px-4 py-1 rounded-full text-sm font-semibold shadow-sm capitalize 
        transition-all duration-300
        ${badgeColors[badge] || 'bg-gray-200 text-gray-600'}`}
            >
                {badge || 'No Badge'}
            </div>
        </div>
    );
};

export default MyProfile;
