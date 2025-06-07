import classes from './page.module.css';
import Image from 'next/image';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';

export default async function MealDetailsPage({params}: {params: Promise<{ mealSlug: string }>}){
  //params is an object that contains the dynamic segments of the URL
  const mealName= await params; //this is to take out mealSlug from Promise
  const meal = await getMeal(mealName.mealSlug); //after that, we can use it 
  //async and await used here as params prop is now asynchronous, thus was showing error
  //due to direct access

  if(!meal){
    notFound(); //if meal is not found, call the notFound component
  }

  meal!.instructions=meal!.instructions.replace(/\n/g, '<br />') //replace new lines with <br> tags
  return (
    <>
    <header className={classes.header}>
      <div className={classes.image}>
        <Image src={`https://pub-a419ff2525834eb4bdd889e2a1e64999.r2.dev/${meal!.image}`} alt={meal!.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal?.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal?.creator_email}`}>{meal?.creator}</a>
          </p>
          <p className={classes.summary}> {meal?.summary}</p>
        </div>
    </header>
    <main>
      <p className={classes.instructions} dangerouslySetInnerHTML={{  //*called dangerously as it opens to cross-site scripting attacks
        __html: meal!.instructions 
      }}></p> 
    </main>
    </>
  );
  
}