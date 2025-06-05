'use client';

import { useFormStatus } from "react-dom";
//find out the form status

export default function MealsFormSubmit(){

    const {pending} = useFormStatus();
    // deconstruct the pending value from useFormStatus, is either true of false 
    // depending on whether the form is being processed or not

    return (
        <button disabled={pending}>
            {pending? 'Submitiing...': 'Share Meal'}
        </button>
    );

}