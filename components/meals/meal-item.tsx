import Link from 'next/link';
import Image from 'next/image';

import classes from './meal-item.module.css';

export type MealItemProps = {
  id: number;
  title: string;
  slug: string;
  image: string;
  summary: string;
  creator: string;
  creator_email:string;
  instructions: string;
};

export default function MealItem({ title, slug, image, summary, creator }: MealItemProps) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={`https://pub-a419ff2525834eb4bdd889e2a1e64999.r2.dev/${image}`} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}