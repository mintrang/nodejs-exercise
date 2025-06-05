import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const BootcampSchema = new mongoose.Schema({
  "name": {
    type: String,
    required: [true, "Name is required!"],
    trim: true,
    unique: true,
    maxLength: [50, 'Name cannot be more than 50 chars']
  },
  slug: String,
  "description": {
    type: String,
    maxLength: [500, 'description cannot be more than 500 chars']
  },
  "phone": { type: String },
  "email": { type: String },
  "address": { type: String },
  location: {
    country: String,
    zipcode: String,
  },
  "careers": { type: [String], enum: ["Web Development", "UI/UX", "Business"], required: true },
  "housing": { type: Boolean },
  "jobAssistance": { type: String },
  "jobGuarantee": { type: String },
  "acceptGi": { type: String },
  photo: { type: String, default: 'photo' },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})


BootcampSchema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    replacement: '-',  // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: false,      // convert to lower case, defaults to `false`
    trim: true         // trim leading and trailing replacement chars, defaults to `true`
  })
  next()
})

export const BootcampModel = mongoose.model('Bootcamp', BootcampSchema)