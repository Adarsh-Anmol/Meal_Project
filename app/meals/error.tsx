'use client';

export default function Error(){ //Also has error props that can contain more info about the error
    //NextJS hides the actual error message so that info is not shown to the users.
    return(
        <main className="error">
            <h1>An error occured!!</h1>
            <p> Failed to fetch Meal data.  </p>
        </main>
    )
}