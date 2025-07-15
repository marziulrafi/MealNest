import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router'
import { AuthContext } from '../provider/AuthProvider'
import Loading from '../components/Loading'

const AdminRoute = ({ children }) => {
    const { user, dbUser, loading } = useContext(AuthContext)
    const location = useLocation()

    if (loading || dbUser === null) {
        return <Loading /> 
    }

    if (!user || !user.email) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (dbUser?.role !== 'admin') {
        return <Navigate to="/unauthorized" replace />
    }

    return children
}

export default AdminRoute
