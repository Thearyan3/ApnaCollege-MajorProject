 const express = require("express");// 1st Step - express package ko require krenge
const app = express();// 1st Step
const mongoose = require("mongoose");// 4th step
const path = require("path");//8th step - ye phli line hoti h [app.set("views", path.join(__dirname, "views"))] ke liye.
// path ek package h jisko require krna hota h views ko path dikhane ke liye.
//Aur ejs package ko require krne ki zrurat nhi hoti kuki usko express package ne automaically, internally require kr liya h. 
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");//15th step - Helps to create common templates or layout like Navbars, footers etc.
const ExpressError = require("./utils/ExpressError.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";// 4th step[IIIrd step for 4th step- ye bas ek URL h, jo
// mongoose.connect me likhna hota h ye batane ke liye ki kisko kisse connect krna h. Yaha pe hamne isko ek variable
// me store kr diya aur uske baad usi variable ko mongoose.connect me likh diya h. Ham chahe to ye step skip krke 
//directly URL ko mongoose.connect() me bhi likh skte h. Is URL ka Basic matlab h ki ("mongodb") ko connect krna h
//, ("127.0.0.1:27017") se aur mongodb ke andar database ka naam hoga ("Wanderlust").]

main()//IInd step for 4th step - main() function ko callback krenge, usko execute krne ke liye. Ye function ko create
    //krne ke baad, II step hota h use execute krne ke liye. aur kuki ye promise return krega to ham ispe then() method
    //apply kr denge.Aur then() method me ek console kra denge ("connected to DB"), yehi terminal me show hoga jab 
    //main() function execute hoga, mongoDB ke express ya Js se successfully connect hone par (with the help of
    // mongoose.connect method se).
    .then((res) => {
        console.log("Connected to DB");//4th step
    })
    .catch((err) => {
        console.log(err);//Agar koi (err) ayega to use console kradenge [console.log(err)] se. 
    });
async function main() {
    await mongoose.connect(MONGO_URL);//4th step [Ist step for 4th step - mongoDB ko express ya JS se connect krenge
    // mongoose.connect method se (ye ek mongoose ka method h), aur kuki ye method promise return krta h isiliye 
    //isko await kr denge aur main() naam ke function ke andar isko rakhenge aur function ko async kr denge. Yehi iska 
    //syntax h.(mongoosejs.com website pe jake check kr skte h). Promise ek aisi cheez hoti h jo code ki timeline ke 
    //hisaab se na chalke apne time pe chlti h to ham uspe (async-await, ya fir, then() method laga dete h), In dono
    //method ki help se promise jab bhi return hoke aayega vo usko code ke andar fit krdega aur mainly inki help se code
    //run krna band nhi hoga.]
}

//Jab bhi ham express package ke andar views engine ko use krte h, iska matlab hota h ki saare ejs template ek views naame
//ke folder ke andar hone chahiye. Kuki express views naam ke folder ko hi dhudenga render krne ke liye. 
app.set("view engine", "ejs");//8th step - IInd step - "views engine" ko "ejs" set krenge, app.set ki help se.
//views ka matlab ham template samajh skte h matlab ek aisa package jo hamare views ko create, render ya show krne ke 
//kaam aayega usko ham ejs pe set krdenge. 
//render ka matlab hota h file ko send krna aur res.render() me ham sirf ejs file ko hi send krenge. 
app.set("views", path.join(__dirname, "views"));//is line ka matlab h ki ham views naam ke folder ka path set krne 
// ki koshish kr rhe h. Path dikhane ke liye hamne ek function use kiya h (path.join). Path package ke andar ek path
//naam ka method hota jo 2 paths ko join krne ke kaam aata h. Aur isme phla path hamne liya h "__dirname". "__dirname"
//index.js ki ek current working directory h. Aur index.js ki current working directory h -> backend/ejsdir. Matlab
//__dirname me "backend/ejsdir" path likha hua h aur isko hamne aage, "views" se join kr diya to views ka correct path ho gya 
//"backend/ejsdir/views". Aur isi joined path se ham app ko bta rhe h ki views ko vha mat search krna jha se server run hua h. 
//Usko hamesha is joined path pe jaakar search krna. 
app.use(express.urlencoded({ extended: true }));// requested Data ko parse krne ke liye.(Show Route ka part h ye)
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);//15th step - yha pe ejs ke liye engine define kiya ja rha h, jo hoga ejsMate.
//16th step - To create a layouts folder inside views folder. For more info go to layouts folder.
app.use(express.static(path.join(__dirname, "/public")));//to use static files like CSS.

// app.get("/testListing", async (req, res) => { //6th step - Ab Wanderlust Database mongoDB ke andar create ho chuka h
//to lekin iske andar jo listings naam ki collection/model hamne listing.js me allListing Schema ki help se banayi h,
//uske andar abhi kuch data show nhi hoga, to ham ab uske liye data ko manually insert krenge. jaisa ke hamne is get
//request se kiya h. Isme hamne request ko "/testListings pe bheja h taki ham test kr ske ki database ke andar data 
// insert ho pa rha h ya nhi. Bina data insert kre listings naam ki collection/model jo database ke andar create ho
//chuki h, uske andar kuch show nhi hoga. {Data insert krna bhot zruri h}

//     let sampleListing = new Listing({ // Jo structure matlab Schema hamne listing.js me ready kiya tha, usi ke 
//according ham data ko bhi fill krenge schema me. (jaise title ka type hamne string set kiya tha listing.js ke
//listingSchema me, to ham title ko as a string hi likhenge "" ke andar.)[let sampleListing = new Listing({}), 
//yehi iska syntax h.]
//         title: "My new villa",
//         description:"By the beach",
//         price:1200,
//         location:"Calangute, Goa",
//         country:"India",
//     });

//     await sampleListing.save();// Ab ham is data ko save() naam ke method se mongoDB ke andar insert krenge.
//Aur save() function bhi promise return krta h to ispe bhi ham async-await ya then() method apply kr skte h. 

//     console.log("sample was saved");//Terminal me console kra denge ki sample was saved.
//     res.send("Successful testing");//"/testListing" naam ke route pe ("successful testing") likh kr response send
//krayenge res.send() se. 
// });
//Last me isko comment out kr denge kuki ye route hamne bas database ko check krne ke liye banaya tha. 

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

app.get("/", (req, res) => {
    res.send("Hi, I am root");// 3rd step [get request ke liye "/" route banayenge aur uspe response send krenge 
    // (res.send) ke help se aur check krenge ki hamara route work kr rha h ya nhi]
});

app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something Went Wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, () => {
    console.log("Server is listening to port 8080"); // 2nd step [Server ready krenge aur port no. denge (8080)]
});