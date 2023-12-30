import React, { useState } from 'react'
import { Link,useNavigate } from "react-router-dom";
import { Oauth } from '../components/Oauth';

export const SignUp = () => {

  const [formData,setFormData]= useState({})
  const [result,setResult] = useState("")
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()
const handelChange = (e)=>{
setFormData({...formData,
[e.target.id] : e.target.value
})
  }

  const handelSubmit = async (e)=>{
    e.preventDefault();
    try {
      setLoading(true)
    const res = await fetch("http://localhost:3000/api/auth/signup", 
    {
      method:"POST",
      headers :{
        "Content-Type":"application/json",
      },
      body: JSON.stringify(formData)
    }
    ) 

    console.log(formData)


const data = await res.json()
console.log(data)
    setLoading(false)
    if(data.sucess == true){
      navigate("/signin")
      
    }else{
      setResult(data.msg)
    }
          
    } catch (error) {
      setResult(error.message)
    }
    
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>

<h1 className='text-3xl font-semibold text-center my-12'>Sign Up</h1>

<form onSubmit={handelSubmit} className='flex flex-col gap-6'>
<input type = "text" className='border-2 rounded-lg p-2 focus:outline-none' id='userName'  placeholder='userName' onChange={handelChange}/>
<input type = "email" className='border-2 rounded-lg p-2 focus:outline-none' id='email'  placeholder='email'onChange={handelChange}/>
<input type = "password" className='border-2 rounded-lg p-2 focus:outline-none' id='password'  placeholder='password'onChange={handelChange}/>
<button className='bg-gray-600 rounded-lg p-3 hover:opacity-95 text-white'>{loading ? "Loading" :"Sign-Up"}</button>
<Oauth/>
</form>
<div className='mt-5'>
  <p>Have an account ? Click on <Link to = {"/signin"} ><span className='text-blue-700'>Sign-In</span> </Link> </p>
</div>
<p className='text-center mt-6 font-semibold'>{result}</p>
    </div>
  )
}
