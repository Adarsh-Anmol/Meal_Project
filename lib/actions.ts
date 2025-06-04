'use server'

import { saveMeal } from "./meals";
import { ShareMealItem } from "@/components/meals/share-meal-item";
import { redirect } from "next/navigation";

export async function shareMeal(formData: FormData): Promise<void> {
  const title = formData.get('title');
  const summary = formData.get('summary');
  const instructions = formData.get('instructions');
  const image = formData.get('image');
  const creator = formData.get('name');
  const creator_email = formData.get('email');

  if (
    typeof title !== 'string' ||
    typeof summary !== 'string' ||
    typeof instructions !== 'string' ||
    !(image instanceof File) ||
    typeof creator !== 'string' ||
    typeof creator_email !== 'string'
  ) {
    throw new Error('Invalid form data: all fields must be provided and image must be a file');
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
    redirect('/meals')
  }