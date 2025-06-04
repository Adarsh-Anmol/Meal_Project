export interface ShareMealItem {
  title: string;
  slug?: string;
  summary: string;
  instructions: string;
  image: File | string; 
  //imagePath?: string;
  creator: string;
  creator_email:string;
}
