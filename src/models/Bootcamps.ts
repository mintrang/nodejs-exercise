import mongoose from "mongoose";
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
  }
})

export const Bootcamps = mongoose.model('Bootcamps', BootcampSchema)