import React from 'react'
import { FaGoogle } from "react-icons/fa";
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';

export const Oauth = () => {
    const dispatch = useDispatch();


    const handelGoogleClick = async ()=>{

        try {

            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth,provider)

            console.log(result)
            
            const res = await fetch("http://localhost:3000/api/auth/google",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"

                },
                body: JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL
                })
            })

            const data = await res.json();
            dispatch(signInSuccess(data))
            


        } catch (error) {
            console.log("Unable to",error)
        }



    }
  return ( 
  
  <>

    <button onClick={handelGoogleClick} type='button' className='bg-blue-700 text-white rounded-lg p-3 hover:opacity-95 flex'>
    <span className=' border-red-200 mx-auto flex'>
    < FaGoogle/>
    </span>    
   </button>
   
  
    </>
  )
}
