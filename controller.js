const Room = require("./RoomModel")

class Controller{
    async getAllRoom(){
        return await Room.find({},"-__v")
    }

    async addRoom(room){
        return await Room.create(room)
    }

    async getUserById(id){
        return await Room.findOne({_id:id})
    }

    async editUserById(id, data){
        return await Room.findOneAndUpdate({_id:id},data)
    }

    async deleteUserById(id){
        return await Room.findOneAndDelete({_id: id})
    }
}

module.exports = new Controller()