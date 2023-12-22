import mongoose from "mongoose";

export const connectdb = ()=>{
    mongoose
      .connect("mongodb+srv://admin:pakadmin@cluster0.ch5egeu.mongodb.net/", {
        dbName: "Markaz",
      })
      .then(() => {
        console.log("database connected");
      })
      .catch((e) => {
        console.log(e);
      });
}

