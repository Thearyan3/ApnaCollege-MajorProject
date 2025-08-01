const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedin, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer = require("multer")
const upload = multer({dest: "uploads/"});

router.route("/")
.get(wrapAsync(listingController.index))
// .post(isLoggedin, validateListing, wrapAsync(listingController.createListing));
.post(upload.single("listing[image]"), (req, res) => {
    res.send(req.file);
});

//New Route - 10th step - Is step me ham get request send kr rhe honge "/listings/new" route ko jiske base pe hame ek form milega listing ko create krne ke liye.
//Jaise hi ham form ko submit krenge vaise hi 2nd request jo jayegi vo POST request par jayegi "/listings" route par. Ye request ham next step me create krenge. 
router.get("/new", isLoggedin, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedin, isOwner, validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedin, isOwner, wrapAsync(listingController.destroyListing));

//Index Route
// router

//Show Route - 9th step - Ye baat dhyaan rhe ki show route new route ke neeche hi aaye kuki router.js /new ko id samajh kr search
//krega jo use nhi milegi.
// router.get("/:id", wrapAsync(listingController.showListing));

//Create Route - 11th step - new.ejs ke andar wale add button pe click krte hi jis route pr phuchna h vo route yehi h yani create route. 
// router

//Edit Route - 12th step - show.ejs me ek anchor tag add kiya jiska href direct hoga "/listings/:id/edit" route pe jiske liye ham ye route
//create kr rhe h. Edit.ejs me form ke andar method to post h but action me method ko "?_method=PUT" ki help se put me convert kr diya taki data update hojaye.
//method ko convert krne ke liye ek npm ka package aata h "npm i method-override".fir ise require krke use krna hota h.
router.get("/:id/edit", isLoggedin, isOwner, validateListing, wrapAsync(listingController.renderEditForm));

//Update Route - 13th step - Jaise hi user show.ejs wale edit this listing pe click krega to vo "/listings/:id/edit" route pe aajayega, is route pe use ek edit form
//milega jiske end me ek aur edit button hoga jo form submit krne ke liye hoga. Ab jaise hi user is button pr click krega to vo "/listings/:id" route pe phuch jayega
//matlab dobara show.ejs pe phuch jayega.
// router.put("/:id", isLoggedin, isOwner, validateListing, wrapAsync(listingController.updateListing));

//Delete Route - 14th step - project1 (part-a) ke last part me ye delete route banega aur isko banane ke liye show.ejs file me ek delete button
//create hoga jo ek form ke andar hoga aur form ke andar post method ko ham convert krenge delete me with the help of method-override.
//Ab jaise hi user "/listings/:id" route pe aayega to use ek delete button milega aur jaise hi vo uspe click krega to vo specific id wala
//data ya listing database aur route se delete ho jayegi.
// router.delete("/:id", isLoggedin, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;