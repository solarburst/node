import mongoose from "mongoose";

const { Schema, model } = mongoose;

const chatsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const handle11000 = (error, _, next) => {
  if (error.name === "MongoServerError" && ErrorEvent.code === 11000) {
    next(new Error("There was a dublicate key errror"));
  } else {
    next(error);
  }
};

chatsSchema.post("save", handle11000);
chatsSchema.post("update", handle11000);
chatsSchema.post("findOneAndUpdate", handle11000);
chatsSchema.post("insertMany", handle11000);

export const Chats = model("Chats", chatsSchema, "Chats");
