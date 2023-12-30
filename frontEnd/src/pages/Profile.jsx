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
export const Profile = () => {

  const fileRef = useRef(null);

  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

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


  const {currentUser} = useSelector(state => state.user)

  return (
    <>
    
    <div className='p-3 max-w-lg mx-auto'>
   
    <div className='text-3xl font-semibold text-center my-5'>Profile</div>

    <form className='flex flex-col gap-6'>

      <input type="file" ref={fileRef} accept='image/*' onChange={(e)=> setFile(e.target.files[0])} hidden />

      <img src={currentUser.user.avatar} className='rounded-full self-center w-24' alt="" onClick={()=> fileRef.current.click()} />

      <p className='text-center'>
        {fileUploadError ? (<span className='text-red-500'>Error Uploading image</span> )
        : filePerc > 0 && filePerc < 100 ? 
          <span className='text-green-700' >{`Uploading ${filePerc}%`}</span> 
          
        :  filePerc == 100 ? <span className='text-green-800 font-semibold text-center'>Sucessfully Uploaded</span> 
         : ""
      }
      </p>

      <input defaultValue={currentUser.user.userName} type = "text" className='border-2 rounded-lg p-2 focus:outline-none' id='userName'   placeholder='userName'/>

      <input defaultValue={currentUser.user.email} type = "text" className='border-2 rounded-lg p-2 focus:outline-none'   placeholder='userName'/>

      <button className='bg-gray-600 rounded-lg p-3 hover:opacity-95 text-white'>Update</button>

    </form>

    <div className='border-blue-600 flex flex-col mt-2'>

    <button className='bg-red-500 rounded-lg p-3 hover:opacity-95 text-white'>Sign Out</button>

    </div>
    </div>

    </>

  )
}
