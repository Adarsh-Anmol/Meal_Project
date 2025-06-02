import sql from 'better-sqlite3';
import { MealItemProps } from "@/components/meals/meal-item";


const db = sql('meals.db');

export async function getMeals(): Promise<MealItemProps[]> {
    await new Promise ((resolve) => setTimeout(resolve, 2000)); // Simulating a delay for async operation
    return db.prepare('SELECT * FROM meals').all() as MealItemProps[]; //all for fetching all rows of  data; get for single row of data;
}