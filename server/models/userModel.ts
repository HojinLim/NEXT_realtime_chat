import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 8 // 이렇게해도 이하로 해도 회원가입됨
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profileImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
