const createNew = require('./createNewObject');
const fs = require('fs');
const db = require('./mongodb/mongodb');

let collection = [];

class parties {

    constructor(){
        this.updateCollection();
    }


    async updateCollection() {
        collection = await db.parties.getCollection();
    }

    addParty(newParty) {
        console.log('name',newParty.name);

        let newPartyObject = createNew.party(newParty.name);

        db.parties.insertParty(newPartyObject).then(()=>{
            this.updateCollection();
        });

    }

    getParties(){
        return collection;
    }

    vote(partyId){
        let votedParty = collection.find(p => p._id == partyId);
        if(votedParty){
            db.parties.vote(partyId);
        }
        console.log(votedParty);
        this.updateCollection();
    }

    unVote(partyId){
        if(partyId) {

            let votedParty = collection.find(p => p.id == partyId);
            console.log(votedParty);
            if(votedParty){
                db.parties.unVote(partyId);
                this.updateCollection();
            }
        }
    }

}

module.exports = new Partys();