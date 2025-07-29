import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between gap-8">

                    
                    <div>
                        <h2 className="text-2xl font-bold text-yellow-400">MealNest</h2>
                        <p className="mt-2 text-gray-400 max-w-xs">
                            Your ultimate destination for delicious meals. Discover, plan, and enjoy meals every day with ease.
                        </p>
                    </div>

                 
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li><a href="/" className="hover:text-yellow-400 transition">Home</a></li>
                            <li><a href="/meals" className="hover:text-yellow-400 transition">Meals</a></li>
                            <li><a href="/upcoming-meals" className="hover:text-yellow-400 transition">Upcoming</a></li>
                            <li><a href="/about" className="hover:text-yellow-400 transition">About Us</a></li>
                        </ul>
                    </div>

                  
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Contact</h3>
                        <p className="text-gray-300">Email: support@mealnest.com</p>
                        <p className="text-gray-300">Phone: +880 123 456 7890</p>
                        <div className="flex mt-4 space-x-4">
                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition text-xl"><FaFacebookF /></a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition text-xl"><FaInstagram /></a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition text-xl"><FaTwitter /></a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400 transition text-xl"><FaYoutube /></a>
                        </div>
                    </div>

                </div>

           
                <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} MealNest. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
