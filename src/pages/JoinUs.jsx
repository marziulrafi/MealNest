import Authentication from '../components/Authentication'

const JoinUs = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 flex items-center justify-center px-4">
            <div className="bg-white shadow-xl rounded-2xl max-w-4xl w-full overflow-hidden grid md:grid-cols-2">
               
                <div className="bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-400 text-white p-10 hidden md:flex flex-col justify-center">
                    <h2 className="text-3xl font-bold">Welcome to MealNest 🍽</h2>
                    <p className="mt-4">
                        Join our vibrant student community. Review meals, earn badges, and upgrade to premium.
                    </p>
                    <img src="https://img.icons8.com/?size=100&id=tXZRYH4mKfxQ&format=png&color=000000" alt="MealNest" className="w-30 h-30 mt-8 ml-28" />
                </div>


                <div className="p-8 md:p-10">
                    <Authentication />
                </div>
            </div>
        </div>
    )
}

export default JoinUs
