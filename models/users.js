import mongoose from "mongoose";

const { Schema, model } = mongoose;

const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

export const Users = model("Users", usersSchema, "Users");
