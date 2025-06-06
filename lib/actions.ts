'use server'

import { saveMeal } from "./meals";
import { ShareMealItem } from "@/components/meals/share-meal-item";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface form_State{
  message : string| null;
}

export async function shareMeal(prevState: form_State,formData: FormData): Promise<form_State> { //return object
  
  const title = formData.get('title');
  const summary = formData.get('summary');
  const instructions = formData.get('instructions');
  const image = formData.get('image');
  const creator = formData.get('name');
  const creator_email = formData.get('email');

  function isInvalidText(text : string){
    return !text || text.trim() === '';
  }
  //type-checking the data
  if (
    typeof title !== 'string' || isInvalidText(title) ||
    typeof summary !== 'string' || isInvalidText(summary)||
    typeof instructions !== 'string' || isInvalidText(instructions) ||
    !(image instanceof File) ||
    !image || image.size === 0 ||
    typeof creator !== 'string' || isInvalidText(creator) ||
    typeof creator_email !== 'string'|| isInvalidText(creator_email) || 
    !creator_email.includes('@')
  ) {
    //throw new Error('Invalid form data: all fields must be provided and image must be a file');
    return {
      message: 'Invalid Input' 
    }
  }

  const meal: ShareMealItem = {
    title,
    summary,
    instructions,
    image, // TypeScript now knows this is a File
    creator,
    creator_email,
  };

    await saveMeal(meal);
    revalidatePath('/meals');
    redirect('/meals')
  }