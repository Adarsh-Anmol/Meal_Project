import sql from 'better-sqlite3';
import { MealItemProps } from "@/components/meals/meal-item"; 
 //the type of the meal item
import slugify from "slugify";
import xss from "xss";
import { ShareMealItem } from '@/components/meals/share-meal-item'; 
import fs from 'node:fs';


const db = sql('meals.db');

//function to fetch all the meals from dummy database and show in mealsgrid
export async function getMeals(): Promise<MealItemProps[]> {
    await new Promise ((resolve) => setTimeout(resolve, 2000));
     // Simulating a delay for async operation

    //throw new Error('Database connection failed');
    // Simulate an error in fetching meals

    return db.prepare('SELECT * FROM meals').all() as MealItemProps[]; 
    //all for fetching all rows of data;
    //  get for single row of data; run for inserting data
}

//function to fetch all the details for a single dish
export function getMeal(slug: string): MealItemProps | null {

    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug) as MealItemProps;
    // get for fetching single row of data
    //should always use dynamic values as simply putting +slug after the '' 
    // will lead to SQL injection attacks

}

//function to save the meals uploaded by the user


export async function saveMeal(meal: ShareMealItem){
    meal.slug = slugify(meal.title, {lower:true});
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop() //gives the file extension
    const fileName = `${meal.slug}.${extension}`

    const stream =fs.createWriteStream(`@/public/images/${fileName}`);
    const bufferedImage= await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error){
            throw new Error('Saving image failed!!');
        }
    });
        

}