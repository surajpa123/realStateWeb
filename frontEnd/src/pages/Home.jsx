import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { list } from 'firebase/storage';
import {ListingItems} from '../components/ListingItems';
import { FaHeart } from "react-icons/fa";



export const Home = () => {

const [offer,setOfferListings] = useState([]);
const [rent,setRentListings] = useState([])
const [sale,setSaleListings] = useState([]);

const [loading, setLoading] = useState(false);
SwiperCore.use([Navigation])


useEffect(()=>{

  const fetchOfferListings = async ()=>{
    console.log("Hey")
    setLoading(true);
    try {
      const res = await fetch("https://realestate-wsd6.onrender.com/api/listing/get?offer=true&limit=4");
      const data = await res.json();
      console.log(data)
      setOfferListings(data)
      fetchRentListings()
    } catch (error) {
      console.log(error)
    }
   
  }

  const fetchRentListings = async ()=>{
    console.log("Hey")
    setLoading(true);
    try {
      const res = await fetch("https://realestate-wsd6.onrender.com/api/listing/get?type=rent&limit=4");
      const data = await res.json();
      console.log(data)
      setRentListings(data);
      fetchSaleListings();

    } catch (error) {
      console.log(error)
    }
   
  }

  const fetchSaleListings = async ()=>{
    console.log("Hey")
    setLoading(true);
    try {
      const res = await fetch("https://realestate-wsd6.onrender.com/api/listing/get?type=sale&limit=4");
      const data = await res.json();
      console.log(data)
      setSaleListings(data)

    } catch (error) {
      console.log(error)
    }
   
  }


  fetchOfferListings();
},[])

  // useEffect(()=>{


  //   const fetchListings = async ()=>{

  //     setLoading(true)

  //     try {
  //       const res = await fetch(
  //         `http://localhost:3000/api/listing/get?offer=true`,
  //         {
  //           method: "GET",
            
  //             // Authorization: "Bearer" + token,
  //             "Content-Type": "application/json",
          
  //         }
  //       );
  
  //       const data = await res.json();

  //       if(data){
  //         setListings(data)
  //         setLoading(false)
  //       }
  

  //       console.log(data,'hey sea');

  //     //   if (data.sucess == true) {
  //     //     setShowListingsErrors(false);
  //     //     setListings(data.listings);
  //     //     setLoading(false);
  //     //   }
  //     //   if (data.sucess == false) {
  //     //     setShowListingsErrors(true);
  //     //   }
  //     } catch (error) {
  //     //   setShowListingsErrors(true);
  //       console.log(error);
  //     }




  //     fetchListings();
      


  //   }

  // },[])
  console.log(offer,'o')
  console.log(rent,'r')




  return (

    <div>
      {/* {top section} */}

   <div className='flex flex-col gap-6 px-5 sm:px-3 py-28 justify-center max-w-6xl mx-auto'>

<h1 className='text-slate-700 text-3xl font-bold lg:text-6xl'>Choose your next <br /> <span className='text-orange-500'>living</span>  space</h1>

 <div className='text-grey-500 text-xs font-semibold sm:text-sm'>
  We have wide range of <span className='text-orange-500'>properties </span> to choose from.
 </div>

 <Link className='text-blue-700 font-semibold text-lg hover:underline lg:font-bold' to={'/search'}>Let's start now...</Link>

   </div>




      {/* {slider} */}
     
<div className='mx-auto max-w-8xl'>
    <Swiper navigation>

           {
            offer && offer.map((list)=>
            
            <SwiperSlide key={list._id}>

          <div className='h-[500px]' style={{background:`url(${list.imageUrls[0]}) center no-repeat`,backgroundSize:"cover" }}>
          </div>



            </SwiperSlide>
            
            )
           }

    </Swiper> 

    </div>

      {/* {cards} */}

  {/* <div className='max-w-8xl mx-auto p-3 flex flex-col gap-8 my-10'>

{offer && offer.length > 0 && (

<div>

<div>

<div className= 'p-6'>
<h2 className='text-2xl font-semibold text-slate-600 pl-12'>
  Recent Offers
</h2>
<Link
  className='text-blue-800 hover:underline text-sm pl-12 sm:mx-0'
  to={'/search?offer=true'}
>
  Show More Offers
</Link>

</div>


<div className='flex flex-wrap gap-2 justify-center'>
{
  offer.map((list)=>(

    <ListingItems listing={list} key={list._id}   />
  )
  
  )
}

</div>
</div>

</div>


)}

      </div> */}

<div className='lg:max-w-7xl max-w-2xl mx-auto p-3 flex flex-col gap-8 my-10 md:max-w-1xl'>

      {offer && offer.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offer.map((listing) => (
                <ListingItems listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}


{/* {rent && rent.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more Rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rent.map((listing) => (
                <ListingItems listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )} */}



        
{sale && sale.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more Sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {sale.map((listing) => (
                <ListingItems listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}







</div>

{/* 
      <div className='max-w-8xl mx-auto lg:p-8 justify-center flex flex-col gap-8 my-10'>

{rent && rent.length > 0 && (

<div>

<div>
<h2 className='text-2xl font-semibold text-slate-600 text-center lg:text-left lg:px-14 sm:px-4'>
  Recent Places for Rent
</h2>
<Link
  className='text-blue-800 hover:underline text-sm text-center sm:text-center sm:px-14 lg:text-left lg:pl-14 block mx-auto sm:mx-0'
  to={'/search?type=rent'}
>
  Show More Places for Rent
</Link>

</div>
<div className='flex flex-wrap gap-2 justify-start'>
{
  rent.map((list)=>(

    <ListingItems listing={list} key={list._id}   />
  )
  
  )
}
</div>

</div>


)}

      </div> */}


{/* 
      
      <div  className='max-w-8xl mx-auto p-3 flex flex-col gap-8 my-10'>

{rent && rent.length > 0 && (

<div>

<div className='p-6'>
<h2 className='text-2xl font-semibold text-slate-600 pl-12'>
  Recent Places for Sale
</h2>
<Link
  className='text-blue-800 hover:underline text-sm pl-12 sm:mx-0'
  to={'/search?type=sale'}
>
  Show More Places for Sale
</Link>

</div>
<div className='flex flex-wrap gap-2 justify-center'>
{
  sale.map((list)=>(

    <ListingItems listing={list} key={list._id}   />
  )
  
  )
}
</div>

</div>


)}

      </div> */}


<div className='flex items-center gap-2 p-6 max-w-2xl justify-center mx-auto'>
<h2 className='text-slate-700 font-bold text-1xl'>Design by <span className='text-orange-600'>Suraj </span>  with</h2>
<FaHeart className='text-red-700 text-2xl' /> 

</div>
    </div>

  )
}
