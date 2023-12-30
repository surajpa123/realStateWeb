import Listing from "../models/listingModel.js"

export const createListing = async (req,res)=>{
    try { 
   const listing =  await  Listing.create(req.body);
   res.json({listing:listing})
    } catch (error) {
        res.json(error.message)
    }
}


export const getListing = async (req,res) =>{

    try {


    const {id} =  req.params
   
    const listing = await  Listing.findById(id);

    console.log(req.body.param)

    if(!listing) return res.json({sucess:false,msg:"No listing found"});

    res.status(200).json({sucess:true,listings:listing});
   
        
    } catch (error) {
        res.json({sucess:false,error});

    }

}


