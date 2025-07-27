import React from 'react';
import Banner from '../components/Banner';
import MealsByCategory from '../components/MealsByCategory';
import Membership from '../components/Membership';
import MostLovedMeals from '../components/MostLovedMeals';
import TopChefs from '../components/TopChefs';

const Home = () => {
    return (
        <div>
            <Banner />
            <MealsByCategory />
            <Membership />
            <MostLovedMeals />
        </div>
    );
};

export default Home;