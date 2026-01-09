import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    name: { type: String },
    photoURL: { type: String },
    // Add other fields as needed
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
