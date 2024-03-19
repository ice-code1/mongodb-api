//const mongoose = require("mongoose")

const {model, Schema} = require("mongoose")
const constants = require("./constants")
const {USER_TYPES, DATABASE} = constants

const RoomSchema = new Schema(
    {
        _id:{
            type:Schema.Types.ObjectId,
        },
        name:{
            type:String,
            required:true,
        },

        room_type:{
            type: Schema.Types.ObjectId,
            required: true,
            enum:[USER_TYPES.USER,USER_TYPES.AGENT],
        },

        price:{
            type:Number,
            required: true,
        }

    },
    {
        timestamps:true
    }
)

const Room = model(DATABASE.ROOM, RoomSchema)

module.exports = Room