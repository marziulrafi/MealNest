import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import JoinUs from '../pages/JoinUs';
import Meals from '../pages/Meals';
import MealDetails from '../pages/MealDetails';
import PrivateRoutes from './PrivateRoutes'
import DashboardLayout from '../layouts/DashboardLayout';
import MyProfile from '../user/MyProfile';


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/join', element: <JoinUs /> },
            { path: '/meals', element: <Meals /> },
            { path: '/meals/:id', element: <MealDetails /> },
        ],
    },

    {
        path: '/dashboard',
        element: <PrivateRoutes><DashboardLayout /></PrivateRoutes>,
        children: [
            
           
        ]
    }
]);

export default router;
