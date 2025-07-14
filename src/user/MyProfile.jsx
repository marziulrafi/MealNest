import { useContext } from 'react'
import { AuthContext } from '../provider/AuthProvider'

const MyProfile = () => {
    const { user } = useContext(AuthContext)

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
            <img src={user.photoURL} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
            <p><strong>Name:</strong> {user.displayName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Badge:</strong> Bronze</p>
        </div>
    )
}

export default MyProfile
