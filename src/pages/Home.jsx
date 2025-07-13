import React from 'react';
import Banner from '../components/Banner';
import MealsByCategory from '../components/MealsByCategory';
import Membership from '../components/Membership';

const Home = () => {
    return (
        <div>
            <Banner />
            <MealsByCategory />
            <Membership />
        </div>
    );
};

export default Home;