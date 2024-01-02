import React, { useState } from 'react'
import { Link,useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { signInStart,signInFail,signInSuccess } from '../redux/user/userSlice';
import { Oauth } from '../components/OAuth.jsx';
import Cookies from "js-cookie"
export const SignIn = () => {

  const [formData,setFormData]= useState({})
  const [result,setResult] = useState("")
  // const [loading,setLoading] = useState(false)
  const {loading, error} = useSelector((state)=> state.user)


  const navigate = useNavigate()

  const dispatch = useDispatch()
const handelChange = (e)=>{
setFormData({...formData,
[e.target.id] : e.target.value
})
  }

  const handelSubmit = async (e)=>{
    e.preventDefault();
    try {

      // setLoading(true)
    const res = await fetch("https://realestate-wsd6.onrender.com/api/auth/signin", 
    {
      method:"POST",
      headers :{
        "Content-Type":"application/json",
      },
      body: JSON.stringify(formData)
    }
    ) 


const data = await res.json()
console.log(data)
dispatch(signInStart())
    if(data.sucess == true){
      navigate("/")
      console.log("Sucess")
      setResult(data.sucess)
      dispatch(signInSuccess(data.vaildUser))
      Cookies.set("acess_token", data.token)  
      console.log(data.token)
    }else{
      setResult(data.msg)
      dispatch(signInFail(data.msg))
    }
          
    } catch (error) {
      setResult(error.message)
    }
    
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>

<h1 className='text-3xl font-semibold text-center my-12'>Sign Up</h1>

<form onSubmit={handelSubmit} className='flex flex-col gap-6'>
<input type = "email" className='border-2 rounded-lg p-2 focus:outline-none' id='email'  placeholder='email'onChange={handelChange}/>
<input type = "password" className='border-2 rounded-lg p-2 focus:outline-none' id='password'  placeholder='password'onChange={handelChange}/>
<button className='bg-gray-600 rounded-lg p-3 hover:opacity-95 text-white'>{loading ? "Loading" :"Sign-In"}</button>
<Oauth/>
</form>
<div className='mt-5'>
  <p>Don't have an account ? Click on <Link to = {"/signup"} ><span className='text-blue-700'>Sign-Up</span> </Link> </p>
</div>
<p className='text-center mt-6 font-semibold'>{result ? result : ""}</p>
    </div>
  )
}
