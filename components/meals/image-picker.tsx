'use client';
import { useRef } from 'react';
import classes from './image-picker.module.css';

export default function ImagePicker({label, name}: {label?: string, name?: string}) {
    // putting ? in front makes the input optional, so that initially when no label or name is provided, it will not throw an error

    const ImageInput= useRef<HTMLInputElement>(null); //useRef is used to create a reference to the input element, which can be used to access the DOM element directly

    function handlePickClick(){

        ImageInput.current?.click(); //if ImageInput is not null, call the click method on it
    }
    
    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <input
                className={classes.input}
                type="file"
                id={name}
                accept="image/png, image/jpeg, image/gif"
                name={name}
                ref={ImageInput}/>
                
            </div>
            <button className={classes.button} type="button" onClick={handlePickClick}>
                Pick An Image
            </button>
        </div>
    )
}