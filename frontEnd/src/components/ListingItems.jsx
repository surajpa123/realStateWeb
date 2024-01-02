import React from 'react'
import { Link } from 'react-router-dom';
import { FaLocationDot, FaSquareParking } from "react-icons/fa6";
import { MdDinnerDining } from "react-icons/md";


import { FaBed, FaBath } from "react-icons/fa";


export const ListingItems = ({listing}) => {
  return (
    <div className='p-1 shadow-xl hover:shadow-lg borde w-[320px] rounded-lg sm:w[300px] hover:scale-105 trasition-scale duration-300 m-2 justify-center'> 
        <Link to={`/listing/${listing._id}`}>
          <img className='h-[200px] sm:[200px] w-full object-cover hover:scale-105 trasition-scale duration-300' src={listing.imageUrls[0]} alt="listings_cover" />  
          <div className='p-3'>
        <h3 className='truncate font-semibold text-slate-700'>{listing.name}</h3>

       <div className='flex items-center gap-2'>
    <FaLocationDot/>
    <p>{!listing.address ? "Not Provided" : listing.address}</p>
    </div> 
    <p className='text-sm text-slate-700 line-clamp-2' >{listing.description}</p>

<p className='text-slate-700 pt-1'>{listing.regularPrice}k Month</p>

<div className='flex gap-3 items-center'>
<>{listing.furnished || listing.parking || listing.bedRooms ? (
  <>
    {listing.furnished && <MdDinnerDining />}
    {listing.parking && <FaSquareParking />}
    {listing.bedRooms && <FaBed />}
  </>
) : ""}</>

<span>{}</span>

{/* <span> <FaBath/></span> */}


</div>

    
        </div>
        </Link>
    </div>
  )
}
