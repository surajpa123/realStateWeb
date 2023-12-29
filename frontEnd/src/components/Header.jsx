import React from "react";
import {FaSearch} from "react-icons/fa"
import { Link } from "react-router-dom";
export const Header = () => {
  return (
    <header className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
        <h1 className="font-bold text-sm sm:text-3xl flex flex-wrap">
          <span className="text-slate-400">Real</span>
          <span className="text-slate-800">Estate</span>
        </h1>

        </Link>

        <ul className="flex gap-6">
            <Link to={'/'}>
            <li className="hidden sm:inline hover:cursor-pointer">Home</li>

            </Link>
            <Link to={"/about"}>
            <li className="hover:cursor-pointer">About</li>

            </Link>

            <Link to={"/sign"}>

            <li className="hover:cursor-pointer">Sign In</li>

            </Link>

        </ul>

        <form className="bg-slate-100  p-3 rounded-lg flex items-center">
          <input type="text" placeholder="Search " className="bg-transparent focus:outline-none w-24 sm:w-64" />
          <FaSearch/>
        </form>
       
      </div>
    </header>
  );
};
