const mongoose = require("mongoose")
const constants = require("./constants")

function database() {
    mongoose
        .connect(constants.DATABASE_URI,{
            // useCreateIndex: true,
            // useNewUrlParser: true,
            // useUnifiedTopology: true.
        })
        .then(() => {
            console.log("mongodb is connected")
        })
        .catch((err) => {
            console.log("error occured while connewcting to database")
        })
}

module.exports = database