// 5th step to create listing and model and then export them to app.js by (module.exports)

const mongoose = require("mongoose");// for 5th step, first require mongoose but don't connect mongoDB to express 
// or JS, because this file will be exported to app.js anyways. And app.js is already connected to DataBase.

const Schema = mongoose.Schema;//IInd step for Schema and model is to store schema method inside a variable so 
// we don't have to write it again and again. 

const Review = require("./reviews");
const { string } = require("joi");

const listingSchema = new Schema({//IIIrd step is creating Schema like this given below:
  title: {
    type: String,
    required: true
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Review",
  }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry:{
    type: {
  type: String, // Don't do `{ location: { type: String } }`
  enum: ['Point'], // 'location.type' must be 'Point'
  required: true
},
  coordinates: {
  type: [Number],
  required: true
}
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
})

const Listing = mongoose.model("Listing", listingSchema);// IVth step is to create model from the already 
// created Schema with the (mongoose.model) method and give any name to the model as you want. And write the schema 
//name just beside the model name with a coma[("listing", listingSchema) like this]. Aur dhyaan rahe, jo naam model 
//ko doge vohi naam variable ka hoga [const Listing = ("Listing")] aur vohi naam database me collection ka hoga aur 
// plural aur first letter small bankar aayega jaise(Listing ka listings banega).

module.exports = Listing;// Ab last me is Listing naame ke model ya (Database me collection) ko app.js tak export 
// kr denge(module.exports) se aur app.js me is file ko require ke lenge mtlb ek tareeke se connect kr denge.  