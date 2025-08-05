const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });//8th step - IInd step - "/listings" naam ka route, database ke saare data tak phuchne 
    //ke liye. Isme hamne Listing.find({}) method use kiya aur empty condition pass ki h. Is method se sara data find hoke store ho jayega
    //allListings naam ke variable me. Ab ham response me render kr denge "index.ejs" ko jo listings folder ke andar h isliye ham 
    //"listings/index.ejs" likhenge aur index.ejs ke andar ham pass krdenge apne saare listings ko {allListings} ki help se. 
    //Aur ab listings folder ke andar index.ejs ko prepare krenge jisme 2 cheeze hongi - phli sare title links jispe click krte hi user click kre hue link ke data
    //par phuch jayega (show Route pe, show.ejs pe) aur dusra ek button hoga "Create New Listing" jispe click krte hi user ek form pr phuch jayega (new Route pe, new.ejs pe)
}

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");//Ab hamne new.ejs ke andar ek form prepare kr liya h aur use ab index.ejs ke andar ek button h "Create New Listing" jo show.ejs ke baad
    //create krna h [steps ko dhyaan se padhna], us par click krke is form pr phuch gya h. Ab jaise hi sari info fill krke user Add pe click krega to ek POST 
    // request "/listings" pr jayegi. Ye post request next step me create krenge. 
}

module.exports.showListing = async (req, res) => {// Ye ek async function hoga jisme request aur response ayega
    let { id } = req.params; //aur jaise hi request /:id pe ayegi to ham use phle req.params se extract krenge aur {id} me store krenge. 
    const listing = await Listing.findById(id).populate({path: "reviews", populate:{path: "author",},}).populate("owner");//ab isi extracted id ki help se ham listing ke data ko find krenge aur isko listing variable ke andar store kradenge. 
    if(!listing){
        req.flash("error", "Listing you requested for does not exist");
        return res.redirect("/listings");
    }
    // console.log(listing);
    res.render("listings/show.ejs", { listing });//jo data mila h use show.ejs ko pass krdenge aur show.ejs ko render kr denge is route pe.
    //Ye route isliye create kiya gya h taki 8th step wali listings me create kiye hue links par click krke jo data show hoga vo isi route ke base par hoga.
    //Aur ye route bhi "/listings/:id" pe jo get request aayegi us specific id ke data ko return krega.
    //Vo krne ke liye hame ek show.ejs file banani padegi aur usme isi extracted data ko show krna hoga. To vo listings folder me mil jayegi.
}

module.exports.createListing = async (req, res, next) => {
    // Normal way --> let {title, descripition, image, price, location, country} = req.body;
    // Easier Way --> let listing = req.body.listing;       But we are doing it the below given way, but ye krne ke liye hamne phle new.ejs me name ko javascript object
    //banayi h. name="title" na likhke, name="listing[title]" likh kr.
    // if(!req.body.listing){
    //     throw new ExpressError(400, "Send Valid data for listing");
    // }
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url, "..", filename);
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();//Ab jo data hamne create krke add kr liya h, use database me insert krne ke liye save() method ka use krenge. 
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");//Aur jaise hi add button par click krenge, vaise hi sara data ek listing me insert hokar vo listing database
    //me store ho jayegi aur index.ejs wali file matlab "/listings" route par show ho jayegi. 
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params; //Phle id extract kri
    const listing = await Listing.findById(id);//ab us id se specific listing ka data store kr liya listing me 
    if(!listing){
        req.flash("error", "Listing you requested for does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });//ab yehi listing edit.ejs ko pass krdi aur edit.ejs render kr diya is route pe.
}

module.exports.updateListing = async (req, res) => {
    // if(!req.body.listing){
    //     throw new ExpressError(400, "Send Valid data for listing");
    // }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});//findbyidandupdate me id ki help se data find kiya aur ab use update krenge, aur saath hi me {
    //...req.body.listing} se saare data ko deconstruct krenge aur ek-ek krke show krenge. 
    req.flash("success", " listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    // console.log(deletedListing);
        req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}