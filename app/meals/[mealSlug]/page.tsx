import classes from './page.module.css';
import Image from 'next/image';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';

export default function MealDetailsPage({params}: {params: {mealSlug: string}}) {
  //params is an object that contains the dynamic segments of the URL
  const meal= getMeal(params.mealSlug)

  if(!meal){
    notFound(); //if meal is not found, call the notFound component
  }

  meal!.instructions=meal!.instructions.replace(/\n/g, '<br />') //replace new lines with <br> tags
  return (
    <>
    <header className={classes.header}>
      <div className={classes.image}>
        <Image src={meal!.image} alt={meal!.title} fill />
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