import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({

    name:{
        type:String, 
        require:true
    },

    description:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    regularPrice:{
        type:Number,
    },
    discountedPrice:{
        type:Number,
    },

    bathRooms:{
        type:Number,
        require:true
    },
    bedRooms:{
        type:Number,
        require:true
    },
    furnished:{
        type:Boolean,
    },
    offer:{
        type:Boolean,
        default:false
    },
    parking:{
        type:Boolean,
    },
    type:{
        type: String, // house or apartment
    },
    imageUrls:{
        type:Array,
    },
    userRef:{
        type:String,
        require:true
    }

},
{timestamps:true}

)


const Listing = mongoose.model("Listing", listingSchema);

export default Listing;