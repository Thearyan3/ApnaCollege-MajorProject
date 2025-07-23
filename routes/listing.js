const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

//Index Route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });//8th step - IInd step - "/listings" naam ka route, database ke saare data tak phuchne 
    //ke liye. Isme hamne Listing.find({}) method use kiya aur empty condition pass ki h. Is method se sara data find hoke store ho jayega
    //allListings naam ke variable me. Ab ham response me render kr denge "index.ejs" ko jo listings folder ke andar h isliye ham 
    //"listings/index.ejs" likhenge aur index.ejs ke andar ham pass krdenge apne saare listings ko {allListings} ki help se. 
    //Aur ab listings folder ke andar index.ejs ko prepare krenge jisme 2 cheeze hongi - phli sare title links jispe click krte hi user click kre hue link ke data
    //par phuch jayega (show Route pe, show.ejs pe) aur dusra ek button hoga "Create New Listing" jispe click krte hi user ek form pr phuch jayega (new Route pe, new.ejs pe)
}));

//New Route - 10th step - Is step me ham get request send kr rhe honge "/listings/new" route ko jiske base pe hame ek form milega listing ko create krne ke liye.
//Jaise hi ham form ko submit krenge vaise hi 2nd request jo jayegi vo POST request par jayegi "/listings" route par. Ye request ham next step me create krenge. 
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");//Ab hamne new.ejs ke andar ek form prepare kr liya h aur use ab index.ejs ke andar ek button h "Create New Listing" jo show.ejs ke baad
    //create krna h [steps ko dhyaan se padhna], us par click krke is form pr phuch gya h. Ab jaise hi sari info fill krke user Add pe click krega to ek POST 
    // request "/listings" pr jayegi. Ye post request next step me create krenge. 
});

//Show Route - 9th step - Ye baat dhyaan rhe ki show route new route ke neeche hi aaye kuki router.js /new ko id samajh kr search
//krega jo use nhi milegi.
router.get("/:id", wrapAsync(async (req, res) => {// Ye ek async function hoga jisme request aur response ayega
    let { id } = req.params; //aur jaise hi request /:id pe ayegi to ham use phle req.params se extract krenge aur {id} me store krenge. 
    const listing = await Listing.findById(id).populate("reviews");//ab isi extracted id ki help se ham listing ke data ko find krenge aur isko listing variable ke andar store kradenge. 
    if(!listing){
        req.flash("error", "Listing you requested for does not exist");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });//jo data mila h use show.ejs ko pass krdenge aur show.ejs ko render kr denge is route pe.
    //Ye route isliye create kiya gya h taki 8th step wali listings me create kiye hue links par click krke jo data show hoga vo isi route ke base par hoga.
    //Aur ye route bhi "/listings/:id" pe jo get request aayegi us specific id ke data ko return krega.
    //Vo krne ke liye hame ek show.ejs file banani padegi aur usme isi extracted data ko show krna hoga. To vo listings folder me mil jayegi.
}));

//Create Route - 11th step - new.ejs ke andar wale add button pe click krte hi jis route pr phuchna h vo route yehi h yani create route. 
router.post("/", validateListing, wrapAsync(async (req, res) => {
    // Normal way --> let {title, descripition, image, price, location, country} = req.body;
    // Easier Way --> let listing = req.body.listing;       But we are doing it the below given way, but ye krne ke liye hamne phle new.ejs me name ko javascript object
    //banayi h. name="title" na likhke, name="listing[title]" likh kr.
    // if(!req.body.listing){
    //     throw new ExpressError(400, "Send Valid data for listing");
    // }
    const newListing = new Listing(req.body.listing);
    await newListing.save();//Ab jo data hamne create krke add kr liya h, use database me insert krne ke liye save() method ka use krenge. 
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");//Aur jaise hi add button par click krenge, vaise hi sara data ek listing me insert hokar vo listing database
    //me store ho jayegi aur index.ejs wali file matlab "/listings" route par show ho jayegi. 
})
);

//Edit Route - 12th step - show.ejs me ek anchor tag add kiya jiska href direct hoga "/listings/:id/edit" route pe jiske liye ham ye route
//create kr rhe h. Edit.ejs me form ke andar method to post h but action me method ko "?_method=PUT" ki help se put me convert kr diya taki data update hojaye.
//method ko convert krne ke liye ek npm ka package aata h "npm i method-override".fir ise require krke use krna hota h.
router.get("/:id/edit", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params; //Phle id extract kri
    const listing = await Listing.findById(id);//ab us id se specific listing ka data store kr liye listing me 
    res.render("listings/edit.ejs", { listing });//ab yehi listing edit.ejs ko pass krdi aur edit.ejs render kr diya is route pe.
}));

//Update Route - 13th step - Jaise hi user show.ejs wale edit this listing pe click krega to vo "/listings/:id/edit" route pe aajayega, is route pe use ek edit form
//milega jiske end me ek aur edit button hoga jo form submit krne ke liye hoga. Ab jaise hi user is button pr click krega to vo "/listings/:id" route pe phuch jayega
//matlab dobara show.ejs pe phuch jayega.
router.put("/:id", wrapAsync(async (req, res) => {
    // if(!req.body.listing){
    //     throw new ExpressError(400, "Send Valid data for listing");
    // }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });//findbyidandupdate me id ki help se data find kiya aur ab use update krenge, aur saath hi me {
    //...req.body.listing} se saare data ko deconstruct krenge aur ek-ek krke show krenge. 
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}));

//Delete Route - 14th step - project1 (part-a) ke last part me ye delete route banega aur isko banane ke liye show.ejs file me ek delete button
//create hoga jo ek form ke andar hoga aur form ke andar post method ko ham convert krenge delete me with the help of method-override.
//Ab jaise hi user "/listings/:id" route pe aayega to use ek delete button milega aur jaise hi vo uspe click krega to vo specific id wala
//data ya listing database aur route se delete ho jayegi.
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    // console.log(deletedListing);
        req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}));

module.exports = router;