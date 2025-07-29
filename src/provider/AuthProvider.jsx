import { createContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile,
} from 'firebase/auth'
import { auth } from '../firebase.config'

export const AuthContext = createContext(null)

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [dbUser, setDbUser] = useState(null)
    const [role, setRole] = useState(null)
    const [badge, setBadge] = useState(null)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logoutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const updateUserProfile = (name, photo) => {
        if (auth.currentUser) {
            return updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photo,
            })
        }
        return Promise.reject(new Error('No user to update'))
    }

    const fetchDbUser = async () => {
        try {
            const token = await auth.currentUser.getIdToken()
            const res = await fetch('https://meal-nest-server-inky.vercel.app//users/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (!res.ok) throw new Error('Failed to fetch user')
            const data = await res.json()
            setDbUser(data)
            setRole(data?.role || null)
            setBadge(data?.badge || null) // ✅ Set badge from DB
        } catch (err) {
            console.error('Error fetching dbUser:', err)
            setDbUser(null)
            setRole(null)
            setBadge(null)
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
            if (currentUser) {
                fetchDbUser()
            } else {
                setDbUser(null)
                setRole(null)
                setBadge(null)
            }
        })
        return () => unsubscribe()
    }, [])

    const authInfo = {
        user,
        dbUser,
        role,
        badge,           // ✅ Now available in context
        loading,
        createUser,
        loginUser,
        logoutUser,
        updateUserProfile,
        googleSignIn,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
