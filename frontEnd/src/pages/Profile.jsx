import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { app } from '../firebase';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";

import { signOut, updateUserStart,updateUserSucess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export const Profile = () => {

  const fileRef = useRef(null);

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const token = Cookies.get("acess_token");

  console.log(token)

  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  const [listings, setListings] = useState([])

  const [showListingsErrors, setShowListingsErrors] = useState(false)

  const [file, setFile] = useState(undefined);


  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

 
console.log(file)

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  console.log(filePerc)
  console.log(formData)

  const handelChange = (e)=>{

    console.log(e.target)
    setFormData({...formData,[e.target.id]: e.target.value});

    console.log(formData)

  }

  const handelSubmit = async (e)=>{

  e.preventDefault();

    try {
dispatch(updateUserStart());
const res = await fetch(`http://localhost:3000/api/user/update/${currentUser._id}`, 
{
  method:"POST",
  headers :{
    "Authorization" : "Bearer" + token,
    "Content-Type":"application/json",
  },
  body: JSON.stringify(formData)
}
) 

const data = res.json();

if(data.sucess == true){
dispatch(updateUserSucess(data.user))
alert("Profile Updated Successfully")
}   
} catch (error) {
      console.log(error.message)
    }
  }



  const {currentUser} = useSelector(state => state.user)



  const handelShowListings = async ()=>{

    try {
      
const res = await fetch(`http://localhost:3000/api/user/listings/${currentUser._id}`, 
{
  method:"GET",
  headers :{
    "Authorization" : "Bearer" + token,
    "Content-Type":"application/json",
  }

}
)



const data = await res.json();

if(data.sucess == true){
  setShowListingsErrors(false)

  console.log(data)
  setListings(data.listings)
}
if(data.sucess == false){
  setShowListingsErrors(true)
}  

    } catch (error) {
      setShowListingsErrors(true)
    }


   }

   console.log(listings,'hey')

  return (
    <>
    
    <div className='p-3 max-w-lg mx-auto'>
   
    <div className='text-3xl font-semibold text-center my-5'>Profile</div>

    <form onSubmit={handelSubmit} className='flex flex-col gap-6'>

      <input type="file" ref={fileRef} accept='image/*' onChange={(e)=> setFile(e.target.files[0])} hidden />

      <img src={currentUser?.avatar} className='rounded-full self-center w-24' alt="" onClick={()=> fileRef.current.click()} />

      <p className='text-center'>
        {fileUploadError ? (<span className='text-red-500'>Error Uploading image</span> )
        : filePerc > 0 && filePerc < 100 ? 
          <span className='text-green-700' >{`Uploading ${filePerc}%`}</span> 
          
        :  filePerc == 100 ? <span className='text-green-800 font-semibold text-center'>Sucessfully Uploaded</span> 
         : ""
      }
      </p>

      <input defaultValue={currentUser?.userName} type = "text" className='border-2 rounded-lg p-2 focus:outline-none' id='userName' onChange={handelChange}  placeholder='userName'/>

      <input defaultValue={currentUser?.email} type = "text" className='border-2 rounded-lg p-2 focus:outline-none' id='email'  onChange={handelChange} placeholder='email'/>

      <button className='bg-gray-600 rounded-lg p-3 hover:opacity-95 text-white'>Update</button>

    </form>

    <div className='border-blue-600 flex flex-col mt-2'>
 

    <button className='bg-green-700 rounded-lg p-3 mb-2 hover:opacity-95 text-white' onClick={() =>  navigate("/create-listing") }>Create Listings</button>


    <button className='bg-green-700 rounded-lg p-3 mb-2 hover:opacity-95 text-white' onClick={handelShowListings}>Show Listings</button>



    <button className='bg-red-500 rounded-lg p-3 hover:opacity-95 text-white' onClick={() => dispatch(signOut())}>Sign Out</button>


    <p className='text-red-700 mt-5'>{showListingsErrors ? "Error showing listings" : ""}</p>

<div>
    
{
  listings && listings.length > 0 && listings.map((user)=>
  
<div key={user._id} className='border p-3 flex justify-between items-center'>

<Link to={`/listing/${user._id}`}>
{user.imageUrls.length == 0 ? <span>No Image</span> : <img className='w-16 h-16 object-contain rounded-lg'  src={user.imageUrls[0]} alt="" /> }
</Link>


<Link to={`/listing/${user._id}`}>
<h1 className='font-semibold p-3 hover:underline'>{user.name}</h1>
</Link>

  </div>
  
  
  )
}

</div>

    </div>
    </div>

    </>

  )
}
