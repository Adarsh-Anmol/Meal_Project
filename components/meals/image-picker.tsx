'use client';
import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({label, name}:{label: string, name: string}) {
    // putting ? in front makes the input optional, so that initially when no label or name is provided, it will not throw an error

    const [pickedImage, setPickedImage] = useState<string | null>();
    
    const ImageInput= useRef<HTMLInputElement>(null); //useRef is used to create a reference to the input element, which can be used to access the DOM element directly

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]; //get the first file from the input, if it exists
        if (!file) {
            setPickedImage(null); //if no file is selected, set the pickedImage state to null
            return; //if no file is selected, return    
        }

        const fileReader = new FileReader(); //create a new FileReader object to read the file, inbuilt function
        fileReader.readAsDataURL(file); //read the file as a data URL, which is a base64 encoded string representation of the file
        fileReader.onload = () => {
            if(typeof fileReader.result === 'string') {
                setPickedImage(fileReader.result); //set the pickedImage state to the result of the fileReader, which is the base64 encoded string representation of the file
            }
        }    
    }
    function handlePickClick(){

        ImageInput.current?.click(); //if ImageInput is not null, call the click method on it
    }
    
    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {pickedImage && <p>No image picked yet!</p>}
                    {pickedImage && <Image src={pickedImage} alt="Picked Image by the User" fill />}
                </div>
                <input
                className={classes.input}
                type="file"
                id={name}
                accept="image/png, image/jpeg"
                name={name}
                ref={ImageInput}
                onChange={handleImageChange}
                required //required is used to make the input mandatory, so that the user has to select an image before submitting the form
                />
                
            </div>
            <button className={classes.button} type="button" onClick={handlePickClick}>
                Pick An Image
            </button>
        </div>
    )
}
