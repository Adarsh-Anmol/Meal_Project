import { Suspense } from 'react';
import Link from 'next/link';
import classes from './page.module.css'
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';

async function Meals(){
    const meals = await getMeals();

    return <MealsGrid meals= {meals}/>
}

export const metadata={
    title: 'All Meals',
    description : 'Browse all the meals!!'
}
// async component so that only this part of the page will be loaded, other parts will be visible 

export default function MealsPage() {
    
    return (
        <>
        <header className={classes.header}>
            <h1>
            Delicious Meals, created {''}
            <span className={classes.highlight}>by you</span>
            </h1>
        <p>Choose your fav recipe. It&apos;s easy and very fun !!!</p>
        <p className={classes.cta}>
            <Link href='/meals/share'>
            Share Your fav Meals!
            </Link>
        </p>
        </header>
       
        <main className={classes.main}>
            <Suspense fallback = {<p className={classes.loading}>Fetching the Meals...</p>}>
                <Meals />
            </Suspense>
            {/*Suspense is used to load a part of the page, this is given by react */}
        </main>
        </>
    );
}