import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
export const Contact = ({listings}) => {
    console.log(listings)

    const {currentUser}= useSelector(state => state.user);

    console.log(currentUser)

    const [message,setMessage] = useState('');

    const handelChange = (e)=>{
        setMessage(e.target.value);
        console.log(message)
    }


  return (
    <div className='flex flex-col items-center gap-2 flex-wrap max-w-4xl m-auto'>

<p className='font-semibold mt-2 text-green-700'>Contact to {currentUser.userName} for {listings.name}</p>

   <textarea onChange={handelChange} type="text" className=' border mt-2 p-3 sm:w-1/2 text-center' placeholder='Enter your message' />

<Link className='text-white p-2 uppercase bg-green-700 rounded-lg text-center' to={`mailto:${currentUser.email}?subject=Regarding${listings.name}&body=${message}`}>
Send Message
</Link>
    </div>
  )
}
