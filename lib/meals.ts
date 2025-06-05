import sql from 'better-sqlite3';
import { MealItemProps } from "@/components/meals/meal-item"; 
 //the type of the meal item
import slugify from "slugify";
import xss from "xss";
import { ShareMealItem } from '@/components/meals/share-meal-item'; 
import { promises as fsPromises } from 'fs';
import {join} from 'path';
import { promises } from 'node:dns';

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

export async function saveMeal(meal: ShareMealItem): Promise<void>{
    try{
    //slugify and sanitise the inputs
    meal.slug = slugify(meal.title, {lower:true});
    meal.instructions = xss(meal.instructions);

    // Check if image is a File object before processing
    if (!(meal.image instanceof File)) {
      throw new Error('Expected a File object for meal.image');
    }

    //check for the file extension
    const extension = meal.image.name.split('.').pop()
    if (!extension) {
      throw new Error('Invalid file extension');
    }
    
    //this is the way to rename uploaded file in Typescript
    const initialFileName = `${meal.slug}.${extension}`;
    const initialPath = join(process.cwd(), 'public', 'images', initialFileName);
    const newFileName = `meal-${meal.slug}-${Date.now()}.${extension}`; 
    // Unique name with timestamp
    const newPath = join(process.cwd(), 'public', 'images', newFileName);

    //save the image file
    const bufferedImage= await meal.image.arrayBuffer();
    const stream = fsPromises.writeFile(initialPath, Buffer.from(bufferedImage));
    await stream; // Wait for the write operation to complete

    // Rename the file after saving
    await fsPromises.rename(initialPath, newPath);

    // Store the new path in the meal object for database storage
    meal.image = `/images/${newFileName}`;
    } catch (error) {
    // Handle errors during file saving or renaming
    console.error('Error in saveMeal:', error instanceof Error ? error.message : error);
    throw new Error('Failed to save or rename meal image');
  }

  db.prepare(`
    INSERT INTO meals
    (title, summary, instructions, creator, creator_email, image, slug)
    VALUES(
    @title,
    @summary,
    @instructions,
    @creator,
    @creator_email,
    @image,
    @slug
    )
    `).run(meal)
}