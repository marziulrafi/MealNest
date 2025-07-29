import { Tab } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react'
import { AuthContext } from '../provider/AuthProvider'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import { auth } from '../firebase.config'
import Select from 'react-select'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const roleOptions = [
    { value: 'student', label: 'Student' },
    { value: 'admin', label: 'Admin' }
]

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
        setValue,
    } = useForm()

    const [selectedRole, setSelectedRole] = useState(null)

    const saveUserToDB = async (user) => {
        try {
            const res = await fetch('https://meal-nest-server-inky.vercel.app//users', {
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

    const onLogin = async (data) => {
        try {
            await loginUser(data.email, data.password)
            toast.success(`${data.role === 'admin' ? 'Admin' : 'Student'} Login Successful!`)
            resetLog()
            navigate(data.role === 'admin' ? '/dashboard/admin/profile' : '/dashboard/profile')
        } catch (err) {
            toast.error(err.message)
        }
    }

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

    const updateUser = async (email, updates) => {
        if (!auth.currentUser) throw new Error('Not authenticated')
        const idToken = await auth.currentUser.getIdToken()
        const res = await fetch(`https://meal-nest-server-inky.vercel.app//users/${email}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify(updates),
        })
        return res.json()
    }

    return (
        <div className="max-w-lg w-full mx-auto mt-10 px-4">
            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-full bg-base-200 p-1 mb-8">
                    {['Login', 'Register'].map((tab) => (
                        <Tab
                            key={tab}
                            className={({ selected }) =>
                                classNames(
                                    'w-full py-2 text-sm font-semibold leading-5 rounded-full transition',
                                    selected ? 'bg-primary text-white shadow' : 'text-gray-700 hover:bg-primary/10 cursor-pointer'
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
                            className="bg-white shadow-md rounded-lg p-6"
                        >
                            <form onSubmit={handleLogin(onLogin)} className="space-y-4">
                                <input {...log('email')} type="email" placeholder="Email" className="input input-bordered w-full" required />
                                <input {...log('password')} type="password" placeholder="Password" className="input input-bordered w-full" required />

                                <Select
                                    options={roleOptions}
                                    placeholder="Select Role"
                                    onChange={(selected) => {
                                        setSelectedRole(selected)
                                        setValue('role', selected.value)
                                    }}
                                    className="text-sm"
                                    required
                                />

                                <button type="submit" className="btn btn-primary w-full">Login</button>
                                <button type="button" onClick={handleGoogle} className="btn btn-error w-full text-white">
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
                            className="bg-white shadow-md rounded-lg p-6"
                        >
                            <form onSubmit={handleRegister(onRegister)} className="space-y-4">
                                <input {...reg('name')} type="text" placeholder="Full Name" className="input input-bordered w-full" required />
                                <input {...reg('photo')} type="text" placeholder="Photo URL" className="input input-bordered w-full" required />
                                <input {...reg('email')} type="email" placeholder="Email" className="input input-bordered w-full" required />
                                <input {...reg('password')} type="password" placeholder="Password" className="input input-bordered w-full" required />

                                <button type="submit" className="btn btn-primary w-full">Register</button>
                                <button type="button" onClick={handleGoogle} className="btn btn-error w-full text-white">
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
