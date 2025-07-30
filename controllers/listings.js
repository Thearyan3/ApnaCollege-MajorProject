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