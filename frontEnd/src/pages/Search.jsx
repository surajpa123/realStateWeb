import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ListingItems } from '../components/ListingItems';

export const Search = () => {

const [listing,setListings] = useState([]);
const [loading, setLoading] = useState(false);

const navigate = useNavigate();
const [formData, setFormData]= useState({
        searchTerm :'',
        type:'all',
        parking:false,
        furnished:false,
        offer:false,
        sort:"created_at",
        order:"desc"
    })

    const handelChange = (e)=>{

    if(e.target.id == "searchTerm"){
        
        setFormData({...formData,searchTerm:e.target.value})
    }           

if(e.target.id == "rent" || e.target.id == "sale" || e.target.id == "all" ){
setFormData({...formData,type:e.target.id})
}
if(e.target.id == "offer"){
    setFormData({...formData,offer: formData.offer == true ? formData.offer = false : formData.offer = true })
}
if(e.target.id == "parking"){
    setFormData({...formData,parking: formData.parking == true ? formData.parking = false : formData.parking = true })
}
if(e.target.id == "furnished"){
    setFormData({...formData,furnished: formData.furnished == true ? formData.furnished = false : formData.furnished = true })
}

if(e.target.id == "sort_order"){
           let sort = e.target.value.split("_")[0] || 'created_at'

           let order = e.target.value.split("_")[1] || 'desc'

           setFormData({...formData,sort,order})

    }

}

const handelSubmit = (e)=>{

    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", formData.searchTerm);
    urlParams.set("type", formData.type);
    urlParams.set("parking", formData.parking);
    urlParams.set("furnished", formData.furnished);
    urlParams.set("offer", formData.offer);

    urlParams.set("order", formData.order);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)

};


useEffect(()=>{

  const urlParams = new URLSearchParams(location.search);

  const searchTermFromURL =   urlParams.get('searchTerm');
  const type =   urlParams.get('type');
  const parking =   urlParams.get('parking');
  const furnished =   urlParams.get('furnished');
  const offer =   urlParams.get('offer');
  const order =   urlParams.get('order');
  const sort =   urlParams.get('sort');


  if(searchTermFromURL||type||parking||furnished||offer||order){
    setFormData({
        searchTerm:searchTermFromURL || "",
        type:type || "all",
        parking:parking === "true" ? true : false,
        furnished:furnished === "true" ? true : false, 
        offer : offer === "true" ? true : false, 
        sort: sort || 'created_at',
        order : order || 'desc',
    })
  }

  const searchQuery = urlParams.toString();


  const getListings = async ()=>{
console.log(loading)
    setLoading(true);
    console.log(searchQuery)
    try {
      const res = await fetch(
        `https://realestate-wsd6.onrender.com/api/listing/get?${searchQuery}`,
        {
          method: "GET",
          
            // Authorization: "Bearer" + token,
            "Content-Type": "application/json",
        
        }
      );

      const data = await res.json();
      console.log(data,'');
      if(data){
        setListings(data)
        setLoading(false)
      }

    //   if (data.sucess == true) {
    //     setShowListingsErrors(false);
    //     setListings(data.listings);
    //     setLoading(false);
    //   }
    //   if (data.sucess == false) {
    //     setShowListingsErrors(true);
    //   }
    } catch (error) {
    //   setShowListingsErrors(true);
      console.log(error);
    }


  }

  getListings();


  },[location.search])

  return (


    <div className='flex flex-col md:flex-row m-auto gap-4'> 
        
        <div className='p-6 border-r-2 sm:w-[60%]'>

            <form onSubmit={handelSubmit}>
                <div className='flex items-center gap-2 '>
                    <label className='whitespace-nowrap' >Search Term:</label>
                    <input onChange={handelChange}  className='border rounded-lg p-3 w-full' type="text" placeholder="Search..." name="search" id="searchTerm"/>
                </div>
                <div className='flex gap-2 items-center flex-wrap p-7 '>
                    <label>Type:</label>
                    <div className='flex gap-2'>
                    <input onChange={handelChange} checked={ formData.type == "all"} className='w-5' type="checkbox" id='all' />
                    <span>Rent & Sale</span>
                    </div>

                    <div className='flex gap-2'>
                    <input onChange={handelChange} checked = {formData.type == "rent"}  className='w-5' type="checkbox" id='rent' />
                    <span>Rent</span>
                    </div>

                    <div className='flex gap-2'>
                    <input onChange={handelChange} checked = {formData.type == "sale"}  className='w-5' type="checkbox" id='sale' />
                    <span>Sale</span>
                    </div>

                    <div className='flex gap-2'>
                    <input onChange={handelChange} checked = {formData.offer}  className='w-5' type="checkbox" id='offer' />
                    <span>Offer</span>
                    </div>
                </div>


                <div className='flex gap-2 items-center flex-wrap'>
                    <label>Aminities :</label>
                    <div className='flex gap-2'>
                    <input onChange={handelChange} checked = {formData.parking} className='w-5' type="checkbox" id='parking' />
                    <span>Parking</span>
                    </div>

                    <div className='flex gap-2'>
                    <input  onChange={handelChange} checked = {formData.furnished}  className='w-5' type="checkbox" id='furnished' />
                    <span>furnished</span>
                    </div>


                    <div className='flex items-center gap-2'>
                        <label>Sort :</label>
                        <select onChange={handelChange} className='border rounded-lg p-3' id="sort_order">

                         <option value='regularPrice_desc' >High to low</option>

                         <option value='regularPrice_asc'>Low to high</option>

                         <option value="createdAt_desc">Latest</option>

                         <option value="createdAt_asc">Oldest</option>

                        </select>
                    </div>

                 <button className='bg-slate-700 p-3 rounded-lg  text-white'>Search</button>
                  
                </div>


            </form>

        </div>
        <div className=' p-3'>
           <h1 className='ml-14 text-2xl font-semibold mt-3 text-slate-700'>Property Result :</h1> 

<div className='flex flex-wrap justify-center'>
    {!loading && listing.length == 0 && (
        <p className='text-lg text-center text-slate-700 mt-5'>No Property Found!</p>
    )}

    {
        loading && (
            <p className='text-lg text-slate-700 text-center'>Loading...</p>
        )
    }

    {
        !loading && listing && listing.map((listing)=>(
            <ListingItems key={listing._id} listing={listing} />
        ))
    }

</div>

        </div>

    </div>


  )



}