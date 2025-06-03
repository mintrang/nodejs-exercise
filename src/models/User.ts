import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  "name": { type: String, required: true },
  "email": { type: String, required: true },
  "role": { type: String, enum: ['admin', 'user'] },
  "password": { type: String, required: true },
})

UserSchema.virtual('bootcamp', {
  ref: 'Bootcamp',
  localField: '_id',
  foreignField: 'user',
})

UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });
export const UserModel =  mongoose.model('User', UserSchema)