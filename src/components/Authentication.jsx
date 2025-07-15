import { Tab } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { AuthContext } from '../provider/AuthProvider'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import { auth } from '../firebase.config'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Authentication = () => {
    const { createUser, loginUser, googleSignIn, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate()

    const {
        register: reg,
        handleSubmit: handleRegister,
        reset: resetReg,
    } = useForm()

    const {
        register: log,
        handleSubmit: handleLogin,
        reset: resetLog,
    } = useForm()

    // 🧠 Save user to MongoDB
    const saveUserToDB = async (user) => {
        try {
            const res = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            })
            return res.json()
        } catch (err) {
            console.error('❌ Error saving user:', err)
            return { error: true }
        }
    }

    // ✅ Register
    const onRegister = async (data) => {
        try {
            await createUser(data.email, data.password)
            await updateUserProfile(data.name, data.photo)

            const result = await saveUserToDB({
                name: data.name,
                email: data.email,
                image: data.photo,
                role: 'student',
                badge: 'Bronze',
            })

            if (result.insertedId || result.acknowledged || result.message === 'User already exists') {
                toast.success('Registration successful!')
                resetReg()
                navigate('/')
            } else {
                toast.error('Failed to save user in DB')
            }
        } catch (err) {
            toast.error(err.message || 'Registration failed')
        }
    }

    // ✅ Login (role logic included)
    const onLogin = async (data) => {
        try {
            await loginUser(data.email, data.password)

            toast.success(`${data.role === 'admin' ? 'Admin' : 'Student'} login successful!`)
            resetLog()

            // optional: navigate based on role
            navigate(data.role === 'admin' ? '/dashboard/admin' : '/dashboard/student')
        } catch (err) {
            toast.error(err.message)
        }
    }

    // ✅ Google Login
    const handleGoogle = async () => {
        try {
            const result = await googleSignIn()
            const user = result.user

            const saveResult = await saveUserToDB({
                name: user.displayName,
                email: user.email,
                image: user.photoURL,
                role: 'student',
                badge: 'Bronze',
            })

            if (saveResult.insertedId || saveResult.acknowledged || saveResult.message === 'User already exists') {
                toast.success('Google login successful!')
                navigate('/')
            } else {
                toast.error('Failed to save Google user in DB')
            }
        } catch (err) {
            toast.error(err.message || 'Google sign-in failed')
        }
    }

    // ✅ Update user info in DB (can be used in Profile page)
    const updateUser = async (email, updates) => {
        if (!auth.currentUser) throw new Error('Not authenticated')

        const idToken = await auth.currentUser.getIdToken()
        const res = await fetch(`http://localhost:3000/users/${email}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify(updates),
        })

        const data = await res.json()
        return data
    }

    return (
        <div className="max-w-md mx-auto mt-10 px-4">
            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-full bg-gray-200 p-1 mb-8">
                    {['Login', 'Register'].map((tab) => (
                        <Tab
                            key={tab}
                            className={({ selected }) =>
                                classNames(
                                    'w-full py-2 text-sm font-semibold leading-5 rounded-full transition',
                                    selected ? 'bg-purple-600 text-white shadow' : 'text-gray-700 hover:bg-purple-100 cursor-pointer'
                                )
                            }
                        >
                            {tab}
                        </Tab>
                    ))}
                </Tab.List>

                <Tab.Panels>
                    {/* 🔐 Login */}
                    <Tab.Panel>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white shadow-xl rounded-lg p-6"
                        >
                            <form onSubmit={handleLogin(onLogin)} className="space-y-4">
                                <input {...log('email')} type="email" placeholder="Email" className="input-field" required />
                                <input {...log('password')} type="password" placeholder="Password" className="input-field" required />

                                <select {...log('role')} className="input-field" required>
                                    <option value="">Select Role</option>
                                    <option value="student">Student</option>
                                    <option value="admin">Admin</option>
                                </select>

                                <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md shadow hover:bg-purple-700 transition font-semibold cursor-pointer">
                                    Login
                                </button>
                                <button
                                    type="button"
                                    onClick={handleGoogle}
                                    className="w-full bg-red-500 text-white py-2 rounded-md shadow hover:bg-red-600 transition font-semibold cursor-pointer"
                                >
                                    Continue with Google
                                </button>
                            </form>
                        </motion.div>
                    </Tab.Panel>

                    {/* 🧾 Register */}
                    <Tab.Panel>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white shadow-xl rounded-lg p-6"
                        >
                            <form onSubmit={handleRegister(onRegister)} className="space-y-4">
                                <input {...reg('name')} type="text" placeholder="Full Name" className="input-field" required />
                                <input {...reg('photo')} type="text" placeholder="Photo URL" className="input-field" required />
                                <input {...reg('email')} type="email" placeholder="Email" className="input-field" required />
                                <input {...reg('password')} type="password" placeholder="Password" className="input-field" required />

                                <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md shadow hover:bg-purple-700 transition font-semibold cursor-pointer">
                                    Register
                                </button>
                                <button
                                    type="button"
                                    onClick={handleGoogle}
                                    className="w-full bg-red-500 text-white py-2 rounded-md shadow hover:bg-red-600 transition font-semibold cursor-pointer"
                                >
                                    Continue with Google
                                </button>
                            </form>
                        </motion.div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

export default Authentication
