function roomId(){
    return Math.random().toString(36).substr(2, 9);
}

class Room{
    constructor(){
        this.id = roomId()
        this.players = []
    }   
}

module.exports = {
    Room,
}