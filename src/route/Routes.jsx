import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import JoinUs from '../pages/JoinUs';
import Meals from '../pages/Meals';
import MealDetails from '../pages/MealDetails';
import PrivateRoutes from './PrivateRoutes'
import DashboardLayout from '../layouts/DashboardLayout';
import MyProfile from '../student/MyProfile';
import Checkout from '../pages/Checkout';
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


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/join', element: <JoinUs /> },
            { path: '/meals', element: <Meals /> },
            { path: '/meals/:id', element: <MealDetails /> },
            { path: 'upcoming-meals', element: <UpcomingMeals /> },
        ],
    },

    {
        path: '/dashboard',
        element: <PrivateRoutes><DashboardLayout /></PrivateRoutes>,
        children: [
            { path: 'profile', element: <MyProfile /> },
            { path: 'requests', element: <RequestedMeals /> }

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
