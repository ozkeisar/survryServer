const createNew = require('./createNewObject');
const fs = require('fs');
const db = require('./mongodb/mongodb');

let collection;

class clients {

    constructor(){
        this.updateCollection();
    }

    async updateCollection(){
        collection = await db.clients.getCollection()
    }

    async addClient(userInfo){
        db.clients.insertNewClient(createNew.client(userIfo));
    }

    async getUserVotedPartyId(userInfo){
        let client = await collection.filter(c=>{c.userInfo.ipv6 === userInfo.ipv6});
        return client.currentVote;
    }

    updateVote(userInfo,newVote){
        //dec old party
        // partys.unVoteParty(this.getUserVotedPartyId(req.body.ipv6));

        //inc new one
        // partys.voteParty(req.body.partyId);

        //update the currentVote fo the client
        // db.clients.updateVote();
    }

    getClientNumber(){
        return collection.length;
    }
}

module.exports = new clients();