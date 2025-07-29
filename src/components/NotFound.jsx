import React from 'react';
import { Link } from 'react-router';


const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <img src='https://st5.depositphotos.com/12659858/71031/i/450/depositphotos_710315182-stock-photo-rendering-error-404-text-screen.jpg' alt="Page Not Found" className="w-fit h-fit mb-4 rounded-xl" />
            <h2 className="text-3xl font-bold text-red-600 mb-2">Page Not Found</h2>
            <p className="mb-6 text-gray-600">Sorry, the page you're looking for doesn't exist.</p>
            <Link to="/" className="btn btn-primary">
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;