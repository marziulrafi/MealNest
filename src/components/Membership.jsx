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

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                {packages.map((pkg, i) => (
                    <div
                        key={i}
                        className={`bg-${pkg.color} rounded-xl shadow-lg p-6 border border-purple-200 hover:scale-105 transition-all duration-300`}
                    >
                        <h3 className="text-xl font-bold text-purple-800 mb-2">{pkg.name} Plan</h3>
                        <p className="text-3xl font-extrabold text-purple-700 mb-4">৳{pkg.price}</p>
                        <ul className="text-gray-700 mb-6 space-y-1 list-disc list-inside">
                            {pkg.features.map((f, idx) => (
                                <li key={idx}>{f}</li>
                            ))}
                        </ul>
                        <button
                            onClick={() => navigate(`/checkout/${pkg.name.toLowerCase()}`)}
                            className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
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
