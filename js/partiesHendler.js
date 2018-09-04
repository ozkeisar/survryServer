const createNew = require('./createNewObject');
const fs = require('fs');
const db = require('./mongodb/mongodb');

let collection = [];

class parties {

    constructor(){
        db.parties.getCollection().then((col)=>{
            // console.log('parties coll',col);
            collection = col;
        });
    }


    async updateCollection() {
        collection = await db.parties.getCollection();
    }

    async addParty(newParty) {
        // console.log('name',newParty.name);

        let newPartyObject = await createNew.party(newParty.name,newParty.candidate);

        // console.log(newPartyObject);

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

            let votedParty = collection.find(p => p._id == partyId);
            console.log(votedParty);
            if(votedParty){
                db.parties.unVote(partyId);
                this.updateCollection();
            }
        }
    }

}

module.exports = new parties();