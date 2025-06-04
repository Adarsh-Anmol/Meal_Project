'use server'



export async function shareMeal(formData: FormData) {
    'use server'; // This function will be executed on the server side. This is called a server action.

    const meal ={
      title: formData.get('title'),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      image: formData.get('image'),
      creator: formData.get('name'),
      creator_email: formData.get('email'),
    }

    console.log(meal);
  }