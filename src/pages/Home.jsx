import React from 'react';
import Banner from '../components/Banner';
import MealsByCategory from '../components/MealsByCategory';
import Membership from '../components/Membership';
import MostLovedMeals from '../components/MostLovedMeals';

const Home = () => {
    return (
        <div>
            <Banner />
            <MealsByCategory />
            <MostLovedMeals />
            <Membership />
        </div>
    );
};

export default Home;