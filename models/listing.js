// 5th step to create listing and model and then export them to app.js by (module.exports)

const mongoose = require("mongoose");// for 5th step, first require mongoose but don't connect mongoDB to express 
// or JS, because this file will be exported to app.js anyways. And app.js is already connected to DataBase.

const Schema = mongoose.Schema;//IInd step for Schema and model is to store schema method inside a variable so 
// we don't have to write it again and again. 

const Review = require("./reviews");

const listingSchema = new Schema({//IIIrd step is creating Schema like this given below:
  title: {
    type: String,
    required: true
  },
  description: String,
  image: {
    type: String,
    default: "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    set: (v) => {
      // Handle object input
      if (typeof v === "object" && v.url) {
        return v.url;
      }
      // Handle empty string input
      if (v === "") {
        return "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
      }
      // Otherwise use value as-is
      return v;
    }
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
  }
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