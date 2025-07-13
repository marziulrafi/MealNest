// src/pages/JoinUs.jsx
import Authentication from '../components/Authentication'

const JoinUs = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 flex items-center justify-center px-4">
            <div className="bg-white shadow-xl rounded-2xl max-w-4xl w-full overflow-hidden grid md:grid-cols-2">
                {/* Left side visual */}
                <div className="bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-400 text-white p-10 hidden md:flex flex-col justify-center">
                    <h2 className="text-3xl font-bold">Welcome to MealNest 🍽</h2>
                    <p className="mt-4">
                        Join our vibrant student community. Review meals, earn badges, and upgrade to premium.
                    </p>
                    <img src="/img/login-art.svg" alt="MealNest" className="w-full mt-8" />
                </div>

                {/* Auth Tabs */}
                <div className="p-8 md:p-10">
                    <Authentication />
                </div>
            </div>
        </div>
    )
}

export default JoinUs
