import Link from 'next/link';
import classes from './page.module.css'

export default function MealsPage() {
    return (
        <>
        <header className={classes.header}>
            <h1>
            Delicious Meals, created {''}
            <span className={classes.highlight}>by you</span>
            </h1>
        </header>
        <p>Choose your fav recipe. It's easy and very fun !!!</p>
        <p className={classes.cta}>
            <Link href='/meals/share'>
            Share Your fav Meals!
            </Link>
        </p>
        <main className={classes.main}></main>
        </>
    );
}