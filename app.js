//Important** - 7th step init folder ke andar h.** 
const express = require("express");// 1st Step - express package ko require krenge
const app = express();// 1st Step
const mongoose = require("mongoose");// 4th step
const Listing = require("./models/listing.js");// 5th step to create Schema and model and then export
//them to app.js by (module.exports) [for 5th step's more information, Go to models/listing.js]
const path = require("path");//8th step - ye phli line hoti h [app.set("views", path.join(__dirname, "views"))] ke liye.
// path ek package h jisko require krna hota h views ko path dikhane ke liye.
//Aur ejs package ko require krne ki zrurat nhi hoti kuki usko express package ne automaically, internally require kr liya h. 
const methodOverride = require("method-override"); 
const ejsMate = require("ejs-mate");//15th step - Helps to create common templates or layout like Navbars, footers etc.

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
async function main(){
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
app.set("views engine", "ejs");//8th step - IInd step - "views engine" ko "ejs" set krenge, app.set ki help se.
//views ka matlab ham template samajh skte h matlab ek aise package jo hamare views ko create, render ya show krne ke 
//kaam aayega usko ham ejs pe set krdenge. 
//render ka matlab hota h file ko send krna aur res.render() me ham sirf ejs file ko hi send krenge. 
app.set("views", path.join(__dirname, "views"));//is line ka matlab h ki ham views naam ke folder ka path set krne 
// ki koshish kr rhe h. Path dikhane ke liye hamne ek function use kiya h (path.join). Path package ke andar ek path
//naam ka method hota jo 2 paths ko join krne ke kaam aata h. Aur isme phla path hamne liya h "__dirname". "__dirname"
//index.js ki ek current working directory h. Aur index.js ki current working directory h -> backend/ejsdir. Matlab
//__dirname me "backend/ejsdir" path likha hua h aur isko hamne aage, "views" se join kr diya to views ka correct path ho gya 
//"backend/ejsdir/views". Aur isi joined path se ham app ko bta rhe h ki views ko vha mat search krna jha se server run hua h. 
//Usko hamesha is joined path pe jaakar search krna. 
app.use(express.urlencoded({extended: true}));// requested Data ko parse krne ke liye.(Show Route ka part h ye)
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


//Index Route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});//8th step - IInd step - "/listings" naam ka route, database ke saare data tak phuchne 
    //ke liye. Isme hamne Listing.find({}) method use kiya aur empty condition pass ki h. Is method se sara data find hoke store ho jayega
    //allListings naam ke variable me. Ab ham response me render kr denge "index.ejs" ko jo listings folder ke andar h isliye ham 
    //"listings/index.ejs" likhenge aur index.ejs ke andar ham pass krdenge apne saare listings ko {allListings} ki help se. 
    //Aur ab listings folder ke andar index.ejs ko prepare krenge jisme 2 cheeze hongi - phli sare title links jispe click krte hi user click kre hue link ke data
    //par phuch jayega (show Route pe, show.ejs pe) aur dusra ek button hoga "Create New Listing" jispe click krte hi user ek form pr phuch jayega (new Route pe, new.ejs pe)
});

//New Route - 10th step - Is step me ham get request send kr rhe honge "/listings/new" route ko jiske base pe hame ek form milega listing ko create krne ke liye.
//Jaise hi ham form ko submit krenge vaise hi 2nd request jo jayegi vo POST request par jayegi "/listings" route par. Ye request ham next step me create krenge. 
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");//Ab hamne new.ejs ke andar ek form prepare kr liya h aur use ab index.ejs ke andar ek button h "Create New Listing" jo show.ejs ke baad
    //create krna h [steps ko dhyaan se padhna], us par click krke is form pr phuch gya h. Ab jaise hi sari info fill krke user Add pe click krega to ek POST 
    // request "/listings" pr jayegi. Ye post request next step me create krenge. 
});

//Show Route - 9th step - Ye baat dhyaan rhe ki show route new route ke neeche hi aaye kuki app.js /new ko id samajh kr search
//krega jo use nhi milegi.
app.get("/listings/:id", async (req, res) => {// Ye ek async function hoga jisme request aur response ayega
    let {id} = req.params; //aur jaise hi request /:id pe ayegi to ham use phle req.params se extract krenge aur {id} me store krenge. 
    const listing = await Listing.findById(id);//ab isi extracted id ki help se ham listing ke data ko find krenge aur isko listing variable ke andar store kradenge. 
    res.render("listings/show.ejs", {listing});//jo data mila h use show.ejs ko pass krdenge aur show.ejs ko render kr denge is route pe.
    //Ye route isliye create kiya gya h taki 8th step wali listings me create kiye hue links par click krke jo data show hoga vo isi route ke base par hoga.
    //Aur ye route bhi "/listings/:id" pe jo get request aayegi us specific id ke data ko return krega.
    //Vo krne ke liye hame ek show.ejs file banani padegi aur usme isi extracted data ko show krna hoga. To vo listings folder me mil jayegi.
});

//Create Route - 11th step - new.ejs ke andar wale add button pe click krte hi jis route pr phuchna h vo route yehi h yani create route. 
app.post("/listings", async (req, res) => {
    // Normal way --> let {title, descripition, image, price, location, country} = req.body;
    // Easier Way --> let listing = req.body.listing;       But we are doing it the below given way, but ye krne ke liye hamne phle new.ejs me name ko javascript object
    //banayi h. name="title" na likhke, name="listing[title]" likh kr.
    const newListing = new Listing(req.body.listing);
    await newListing.save();//Ab jo data hamne create krke add kr liya h, use database me insert krne ke liye save() method ka use krenge. 
    res.redirect("/listings");//Aur jaise hi add button par click krenge, vaise hi sara data ek listing me insert hokar vo listing database
    //me store ho jayegi aur index.ejs wali file matlab "/listings" route par show ho jayegi. 
    });

//Edit Route - 12th step - show.ejs me ek anchor tag add kiya jiska href direct hoga "/listings/:id/edit" route pe jiske liye ham ye route
//create kr rhe h. Edit.ejs me form ke andar method to post h but action me method ko "?_method=PUT" ki help se put me convert kr diya taki data update hojaye.
//method ko convert krne ke liye ek npm ka package aata h "npm i method-override".fir ise require krke use krna hota h.
app.get("/listings/:id/edit", async (req, res) => {
    let {id} = req.params; //Phle id extract kri
    const listing = await Listing.findById(id);//ab us id se specific listing ka data store kr liye listing me 
    res.render("listings/edit.ejs", {listing});//ab yehi listing edit.ejs ko pass krdi aur edit.ejs render kr diya is route pe.
});

//Update Route - 13th step - Jaise hi user show.ejs wale edit this listing pe click krega to vo "/listings/:id/edit" route pe aajayega, is route pe use ek edit form
//milega jiske end me ek aur edit button hoga jo form submit krne ke liye hoga. Ab jaise hi user is button pr click krega to vo "/listings/:id" route pe phuch jayega
//matlab dobara show.ejs pe phuch jayega.
app.put("/listings/:id", async (req, res) =>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});//findbyidandupdate me id ki help se data find kiya aur ab use update krenge, aur saath hi me {
    //...req.body.listing} se saare data ko deconstruct krenge aur ek-ek krke show krenge. 
    res.redirect(`/listings/${id}`);
});

//Delete Route - 14th step - project1 (part-a) ke last part me ye delete route banega aur isko banane ke liye show.ejs file me ek delete button
//create hoga jo ek form ke andar hoga aur form ke andar post method ko ham convert krenge delete me with the help of method-override.
//Ab jaise hi user "/listings/:id" route pe aayega to use ek delete button milega aur jaise hi vo uspe click krega to vo specific id wala
//data ya listing database aur route se delete ho jayegi.
app.delete("/listings/:id", async (req, res) => {
    let {id} = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});

app.get("/", (req, res) => {
    res.send("Hi, I am root");// 3rd step [get request ke liye "/" route banayenge aur uspe response send krenge 
    // (res.send) ke help se aur check krenge ki hamara route work kr rha h ya nhi]
})

app.listen(8080, () => {
    console.log("Server is listening to port 8080"); // 2nd step [Server ready krenge aur port no. denge (8080)]
});