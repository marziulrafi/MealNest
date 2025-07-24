import { useNavigate } from 'react-router'

const packages = [
    {
        name: 'Silver',
        price: 199,
        features: ['3 meal requests/day', 'View upcoming meals'],
        color: 'gray-300',
    },
    {
        name: 'Gold',
        price: 399,
        features: ['5 requests/day', 'Can like meals', 'Priority support'],
        color: 'yellow-300',
    },
    {
        name: 'Platinum',
        price: 599,
        features: ['Unlimited access', 'Meal analytics', 'Review boost'],
        color: 'purple-300',
    },
]

const Membership = () => {
    const navigate = useNavigate()

    return (
        <div className="py-20 bg-white px-4">
            <h2 className="text-3xl font-bold text-center text-purple-700 mb-12">
                Upgrade Your Meal Experience 🚀
            </h2>

            <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 py-8">
                {packages.map((pkg, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl shadow-xl border border-purple-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-2xl font-semibold text-purple-700 mb-2">{pkg.name} Plan</h3>
                            <p className="text-4xl font-bold text-purple-600 mb-4">৳{pkg.price}</p>
                            <ul className="text-gray-600 mb-6 space-y-2">
                                {pkg.features.map((f, idx) => (
                                    <li key={idx} className="flex items-start space-x-2">
                                        <span className="text-purple-500 mt-1">✔</span>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button
                            onClick={() => navigate(`/checkout/${pkg.name.toLowerCase()}`)}
                            className="mt-auto w-full py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition"
                        >
                            Get {pkg.name}
                        </button>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Membership
