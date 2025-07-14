import { Tab } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { AuthContext } from '../provider/AuthProvider'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Authentication = () => {
    const { createUser, loginUser, googleSignIn, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate();

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


    const onRegister = (data) => {
        createUser(data.email, data.password)
            .then(() => {
                updateUserProfile(data.name, data.photo)
                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: data.name,
                        email: data.email,
                        image: data.photo,
                        role: 'student',
                        badge: 'Bronze',
                    }),
                })
                toast.success('Registration successful!')
                resetReg()
                navigate('/')
            })
            .catch((err) => toast.error(err.message))
    }


    const onLogin = (data) => {
        loginUser(data.email, data.password)
            .then(() => {
                toast.success('Login successful!')
                resetLog()
                navigate('/')
            })
            .catch((err) => toast.error(err.message))
    }


    const handleGoogle = () => {
        googleSignIn().then((result) => {
            const user = result.user
            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: user.displayName,
                    email: user.email,
                    image: user.photoURL,
                    role: 'student',
                    badge: 'Bronze',
                }),
            })
            toast.success('Logged in with Google!')
            navigate('/') 
        })
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

                                <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md shadow hover:bg-purple-700 transition font-semibold cursor-pointer">Login</button>
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
                                <button
                                    type="submit"
                                    className="w-full bg-purple-600 text-white py-2 rounded-md shadow hover:bg-purple-700 transition font-semibold cursor-pointer"
                                >
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

export default Authentication;
