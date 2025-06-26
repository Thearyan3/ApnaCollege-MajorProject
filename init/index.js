//Sab kuch krne ke baad index.js kuki ek js file h to phle ise execute krna hoga terminal me node index.js likh kr.
//Uske baad hi iske andar ka sara data database me insert ho payega. Matlab data tabhi initialize hoga. 
//7th step - IInd step for 7th step -> Phle data.js se saare exported hue data ko require krenge.
const initData = require("./data.js");//Aise 
const mongoose = require("mongoose");//Ab mongoose ko bhi require krenge aur baad me connect krenge index.js se.
const Listing = require("../models/listing.js");//Main and last step for 7th step. app.js me hame ek get request bheji
//thi "/testListing" naam ke route pe to usme hamne data manually insert kiya tha database me, to ab usi data ko delete
//aur naye data ko insert krne ke liye ham ek function create krenge aur uske liye hame listing.js ko require krna hoga. 
// Neeche function me ache se samjahya hua h, ek baar padhlo.

//yha pe ham mongoDB ko index.js se connect kr rhe h. app.js me ache se samjhaya hua h ki kaise connect hota h.
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
.then((res) => {
    console.log("Connected to DB");
})
.catch((err) => {
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL);
}


//Ye function hi sabse main h is file ke andar:
const initDB = async () => {
    await Listing.deleteMany({});//Listing.deleteMany({}) jo ek mongoDB ka method h kisi bhi collection/model ke andar 
    //saare present data ko ek baar me delete krne ke liye {yaha pe ({}) is khali object aur bracket ka matlab h ki 
    //bina kisi condition ke sara data delete krdo.}, Yaha pe Listing naam isliye use hua h kuki listing.js me jo 
    //hamne model create kiya tha uska naam hamne Listing rakha tha aur deleteMany({}) method model/collection ke naame
    //ke saath hi lagta h.
    await Listing.insertMany(initData.data);//Listing.insertMany() bhi same mongoDB ka method h aur isse bhotsara data
    //ek hi baar me insert kiya jata h database ke andar.
    //yaha pe (initData.data) isliye likha h kuki initData naam ke variable me to sara data hamne require kr liya jo
    //data.js se export kiya tha aur ".data" isliye likha h kuki data ek object ki key h aur key ko .(dot) lgake hi 
    //access kiya jata h. 
    console.log("Data was initialized");//Upar wale dono step complete hone ke baad terminal me console kradenge 
    //"Data was initialized".
}

initDB();// IInd step of function() - Callback for execution. 
