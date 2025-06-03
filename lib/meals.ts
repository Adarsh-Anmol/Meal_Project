import sql from 'better-sqlite3';
import { MealItemProps } from "@/components/meals/meal-item"; 
 //the type of the meal item


const db = sql('meals.db');

export async function getMeals(): Promise<MealItemProps[]> {
    await new Promise ((resolve) => setTimeout(resolve, 2000));
     // Simulating a delay for async operation

    //throw new Error('Database connection failed');
    // Simulate an error in fetching meals

    return db.prepare('SELECT * FROM meals').all() as MealItemProps[]; 
    //all for fetching all rows of data;
    //  get for single row of data; run for inserting data
}

export function getMeal(slug: MealItemProps){

    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug) as MealItemProps;
    // get for fetching single row of data
    //should always use dynamic values as simply putting +slug after the '' 
    // will lead to SQL injection attacks

}