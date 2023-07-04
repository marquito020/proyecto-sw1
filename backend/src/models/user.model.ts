import { Schema, model } from "mongoose";
import { User } from "../interfaces/user.intefaces.js";

const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      min: 8,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = model("User", UserSchema);

export default UserModel;
