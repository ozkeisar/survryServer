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

    addClient(ipv6,vote){
        db.clients.insertNewClient()
    }

    getVotedPartyId(ipv6){

    }

    updateVote(userInfo,newVote){

    }

}

module.exports = new clients();