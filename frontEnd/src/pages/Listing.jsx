import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaLocationDot, FaSquareParking } from "react-icons/fa6";
import { FaBed, FaBath } from "react-icons/fa";
import { MdDinnerDining } from "react-icons/md";
import { Contact } from "../components/Contact";

export const Listing = () => {
  const [listings, setListings] = useState([]);

  const [loading, setLoading] = useState(false);

  const [contact,setContact] = useState(false)

  SwiperCore.use([Navigation]);

  const params = useParams();

  console.log(params.listingId);

  const token = Cookies.get("acess_token");

  const [showListingsErrors, setShowListingsErrors] = useState(false);

  const handelToggle = ()=>{
     if(contact){
        setContact(false)
     }else{
        setContact(true)
     }
  }

  useEffect(() => {
    const getListings = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://realestate-wsd6.onrender.com/api/listing/get/${params.listingId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();

        if (data.sucess == true) {
          setShowListingsErrors(false);
          setListings(data.listings);
          setLoading(false);
        }
        if (data.sucess == false) {
          setShowListingsErrors(true);
        }
      } catch (error) {
        setShowListingsErrors(true);
        console.log(error);
      }
    };

    getListings();

  }, [params]);

  console.log(listings);

  return (
    <div>
      {loading && <p className="text-center mt-5 text-2xl">Loading ...</p>}
      {showListingsErrors && (
        <p className="text-center mt-5 text-2xl">Error Occured</p>
      )}

      {listings && !loading && !showListingsErrors && (
        <>
          <div className="border border-red-50 max-w-7xl m-auto mt-5">
            <Swiper navigation>
              {listings.imageUrls?.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-[500px]"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="p-3">
              <h2 className="sm:text-3xl font-semibold pt-6 pb-6 font-roboto">
                {listings.name}{" "}
                {listings.type == "rent" ? (
                  <span className="text-slate-500 text-lg">{`${listings.regularPrice}k Per Month`}</span>
                ) : (
                  <span className="text-slate-500 text-lg">{`${listings.regularPrice}k`}</span>
                )}
              </h2>

              <h2 className="flex items-center gap-2">
                {" "}
                <FaLocationDot /> {listings.address}
              </h2>

              <p>
                {listings.type == "sale" ? (
                  <div>
                    {" "}
                    <button className="bg-red-700 rounded-lg p-2 sm:w-1/5 mt-3 hover:opacity-95 text-white">
                      For Sale
                    </button>{" "}
                    <button className="bg-green-700 rounded-lg p-2 w-1/5 mt-3 hover:opacity-95 text-white">{`${listings.regularPrice}k`}</button>{" "}
                  </div>
                ) : (
                  <button className="bg-green-700 rounded-lg p-3 mt-3 hover:opacity-95 text-white">
                    For Rent
                  </button>
                )}
              </p>

              <ul className="flex flex-wrap justify-start">
                <li className="flex gap-2 m-3 items-center">
                  <FaBed />
                  {`${listings.bedRooms} beds`}
                </li>
                <li className="flex gap-2 m-3 items-center">
                  <FaBath />
                  {`${listings.bathRooms} bathroom`}
                </li>

                <li className="flex gap-2 m-3 items-center">
                  <FaSquareParking />

                  {listings.parking == false ? (
                    <span> No Parking </span>
                  ) : (
                    <span>Parking availble</span>
                  )}
                </li>

                <li className="flex gap-2 m-3 items-center">
                  <MdDinnerDining />
                  {listings.furnished == false ? (
                    <span> Furnished </span>
                  ) : (
                    <span>Not furnished</span>
                  )}
                </li>
              </ul>
              <p className="sm:font-semibold pt-6">{listings.description}</p>
              {contact && <Contact listings = {listings}/>}

              <div className='flex justify-center gap-2 flex-wrap max-w-4xl m-auto'>


              <button onClick={handelToggle} className="bg-gray-600  sm:w-1/5 rounded-lg p-3 mt-3  hover:opacity-95 text-white text-center">
                Contact Owner
              </button>

              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
