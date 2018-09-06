const createNew = require('./createNewObject');
const fs = require('fs');
const db = require('./mongodb/mongodb');

let collection;

class clients {

    constructor(){
        db.clients.getCollection().then(col=>{
            collection = col;
        })
    }

    async updateCollection(){
        collection = await db.clients.getCollection()
    }

    async addClient(user){
        let newUser = await createNew.client(user.userInfo,user.location);
        db.clients.insertNewClient(newUser);
        return newUser._id;
    }

    async getUserVotedPartyId(userInfo){
        let client = await collection.filter(c=>{c.userInfo.ipv6 === userInfo.ipv6});
        return client.currentVote;
    }

    vote(userInfo,newVote){
        let client = collection.find(c=>c.userInfo == userInfo);


        //dec old party
        db.parties.unVote(client.currentVote);

        //inc new one
        db.parties.vote(newVote);

        //update the currentVote fo the client
        db.clients.updateCurrentVote(client,newVote);

        //add vote to history
        db.clients.addVoteToHistory(client,newVote);

    }

    getClientNumber(){
        return collection.length;
    }
}

module.exports = new clients();