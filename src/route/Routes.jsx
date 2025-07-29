import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import JoinUs from '../pages/JoinUs';
import Meals from '../pages/Meals';
import MealDetails from '../pages/MealDetails';
import PrivateRoutes from './PrivateRoutes'
import DashboardLayout from '../layouts/DashboardLayout';
import MyProfile from '../student/MyProfile';
import Checkout from '../pages/Success';
import AdminRoute from './AdminRoute';
import AdminDashboard from '../layouts/AdminDashboard';
import AdminProfile from '../admin/AdminProfile';
import RequestedMeals from '../student/RequestedMeals';
import ManageUsers from '../admin/ManageUsers';
import AddMeal from '../admin/AddMeal';
import AllMeals from '../admin/AllMeals';
import ServeMeal from '../admin/ServeMeal';
import UpcomingMeals from '../admin/UpcomingMeals';
import AllReviews from '../admin/AllReviews';
import CheckoutForm from '../components/CheckoutForm';
import Success from '../pages/Success';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentHistory from '../student/PaymentHistory';
import MyReviews from '../student/MyReviews';
import NotFound from '../components/NotFound';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE);


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/join', element: <JoinUs /> },
            { path: '/meals', element: <Meals /> },
            { path: '/meals/:id', element: <MealDetails /> },
            { path: '/upcoming-meals', element: <UpcomingMeals /> },
            {
                path: '/checkout/:plan',
                element: (
                    <PrivateRoutes>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    </PrivateRoutes>
                ),
            },
            {
                path: '/checkout/success',
                element: <Success />,
            },
            {
                path: '/*',
                element: <NotFound />
            }
        ],
    },

    {
        path: '/dashboard',
        element: <PrivateRoutes><DashboardLayout /></PrivateRoutes>,
        children: [
            { path: 'profile', element: <MyProfile /> },
            { path: 'requests', element: <RequestedMeals /> },
            { path: 'payments', element: <PaymentHistory /> },
            { path: 'reviews', element: <MyReviews /> },

        ]
    },

    {
        path: '/dashboard/admin',
        element: <PrivateRoutes><AdminRoute><AdminDashboard /></AdminRoute></PrivateRoutes>,
        children: [
            { path: 'profile', element: <AdminProfile /> },
            { path: 'manage-users', element: <ManageUsers /> },
            { path: 'add-meal', element: <AddMeal /> },
            { path: 'all-meals', element: <AllMeals /> },
            { path: 'all-reviews', element: <AllReviews /> },
            { path: 'serve-meal', element: <ServeMeal /> },
            { path: 'upcoming-meals', element: <UpcomingMeals /> },

        ]
    }
]);

export default router;
