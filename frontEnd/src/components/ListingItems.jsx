import React from 'react'
import { Link } from 'react-router-dom';
import { FaLocationDot, FaSquareParking } from "react-icons/fa6";
import { MdDinnerDining } from "react-icons/md";


import { FaBed, FaBath } from "react-icons/fa";


export const ListingItems = ({listing}) => {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[300px]'> 
        <Link to={`/listing/${listing._id}`}>
          <img className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300' src={listing.imageUrls[0] || 'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'  } alt="listings_cover" />  
          <div className='p-3 flex flex-col gap-2 w-full'>
        <h3 className='truncate font-semibold text-slate-700'>{listing.name}</h3>

       <div className='flex items-center gap-2'>
    <FaLocationDot className='text-green-700'/>
    <p>{!listing.address ? "Not Provided" : listing.address}</p>
    </div> 
    <p className='text-sm text-slate-700 line-clamp-2' >{listing.description}</p>



<p className='text-slate-700 pt-1'>{listing.regularPrice}k / Month</p>


<div className='flex gap-3 items-center'>
<>{listing.furnished || listing.parking || listing.bedRooms ? (
  <>
    {listing.furnished && <MdDinnerDining  className='text-orange-700' />}
    {listing.parking && <FaSquareParking   className='text-orange-700'/>}
    {listing.bedRooms && <FaBed className='text-orange-700' />}
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

