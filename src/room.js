export default class Room{
    constructor(){
        this.id = roomId();
        this.players = []
    }

    roomId(){
        return Math.random().toString(36).substr(2, 9);
    }
}