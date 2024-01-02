import React, { useEffect, useState } from "react";
import {FaSearch} from "react-icons/fa"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export const Header = () => {

  const {currentUser}= useSelector(state => state.user);
  const [searchTerm,setSearchTerm]= useState('');
  const navigate = useNavigate();



const handelSubmit = (e)=>{

e.preventDefault();
const urlParams = new URLSearchParams(window.location.search);
urlParams.set('searchTerm', searchTerm);

const searchQuery = urlParams.toString();
navigate(`/search?${searchQuery}`)

// console.log(searchTerm)
  }

  useEffect(()=>{

    const urlParams = new URLSearchParams(location.search);

  const searchTermFromURL =   urlParams.get('searchTerm');

if(searchTermFromURL){
  setSearchTerm(searchTermFromURL);

}



  },[location.search])

console.log(searchTerm)
  return (
    <header className="bg-slate-200">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-3">
        <Link to={"/"}>
        <h1 className="font-bold text-sm sm:text-3xl flex flex-wrap">
          <span className="text-slate-400 hover:text-slate-700 transition-colors duration-300">Real</span>
          <span className="text-slate-800 hover:text-orange-500 transition-colors duration-300">Estate</span>
        </h1>

        </Link>

         <div className="flex justify-between gap-0 sm:gap-6"> 
        
        <form  onSubmit={handelSubmit} className="bg-slate-100  p-3 rounded-lg flex items-center">
          <input defaultValue={searchTerm} type="text" placeholder="Search " onChange={(e)=> setSearchTerm(e.target.value)} className="bg-transparent focus:outline-none w-14 sm:w-64" />
          <button><FaSearch/></button>
        </form>


        <ul className="flex gap-7  items-center">
            <Link to={'/'}>
            <li className="hidden sm:inline hover:cursor-pointer">Home</li>

            </Link>
            <Link to={"/about"}>
            <li className="hover:cursor-pointer">About</li>

            </Link>



            <Link to={"/profile"}>
  {currentUser ? (<img className="w-10 self-center rounded-full object-cover" src={currentUser?.avatar}/>)  : ( <li className="hover:cursor-pointer">Sign In</li>)}
            </Link>


        </ul>


        </div>
       
      </div>
    </header>
  );
};
